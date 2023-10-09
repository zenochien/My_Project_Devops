const amqp = require('amqp-connection-manager');
const fs = require('fs');
const path = require('path');

function isPromise(value) {
  return Boolean(value && typeof value.then === 'function');
}

class RabbitMq {
  constructor(exchange, handlerPath) {
    if (!fs.existsSync(handlerPath)) {
      throw new Error(`The handler path does not exist`);
    }
    this.connections = {};
    this.exchange = exchange;
    this.handlerPath = handlerPath;
  }

  checkConnection(connectionName) {
    if (!this.connections[connectionName]) {
      throw new Error(`Connection for ${connectionName} does not exist`);
    }
  }

  initConnection({ connectionName, url, options = {} }) {
    if (this.connections[connectionName]) {
      throw new Error(`Connection for ${connectionName} have existed`);
    }
    const exchange = this.exchange;
    const connection = amqp.connect([url], options);
    this.connections[connectionName] = {
      connection,
      channelPulish: connection.createChannel({
        json: true,
        setup: function (channel) {
          return channel.assertExchange(exchange, 'topic');
        },
      }),
    };
    connection.on('connect', () => console.log('Connected!'));
    connection.on('disconnect', (err) => console.log('Disconnected.', err));
  }

  publish({ connectionName = 'publisher', data, eventName }) {
    this.checkConnection(connectionName);
    return this.connections[connectionName].channelPulish.publish(this.exchange, eventName, data, {
      contentType: 'application/json',
      persistent: true,
    });
  }

  async subcribe({ connectionName = 'consumer', handler, eventName, queueName, prefetch = 10 }) {
    this.checkConnection(connectionName);
    const [file, method] = handler.split('.');
    const filePath = path.join(this.handlerPath, `${file}.js`);
    console.log(filePath);
    if (!fs.existsSync(filePath)) {
      throw new Error(`the handler does not exist`);
    }
    const instance = require(filePath);
    if (!instance[method]) {
      throw new Error('the handler method dose not exist');
    }
    const handleMessage = instance[method].bind(instance);

    const channelWrapper = this.connections[connectionName].connection.createChannel({ json: true });
    channelWrapper.addSetup((channel) => {
      const promises = [
        channel.assertExchange(this.exchange, 'topic'),
        channel.prefetch(prefetch),
        channel.assertQueue(queueName, { durable: true }),
        channel.consume(queueName, async (data) => {
          const key = data.fields.routingKey;
          const content = JSON.parse(data.content.toString());
          console.log(`[Rabbitmq][receive]::${key}::`, content);
          try {
            const result = handleMessage(content);
            if (isPromise(result)) {
              await result;
            }
          } catch (e) {
            console.error(`[Rabbitmq][error]::key(${key})::queue(${queueName})::`, content, e);
          }
          channel.ack(data);
        }),
      ];
      const events = Array.isArray(eventName) ? eventName : [eventName];
      events.forEach((event) => {
        promises.push(channel.bindQueue(queueName, this.exchange, event));
      });
      return Promise.all(promises);
    });
  }
}

let manager = undefined;

module.exports = {
  getInstance: () => {
    if (manager === undefined) {
      manager = new RabbitMq('Hairlie', path.join(__dirname, '..', 'listeners'));
    }
    return manager;
  },
};
