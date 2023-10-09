const EventEmitter = require('events');
const fs = require('fs');
const path = require('path');

class Emitter extends EventEmitter {
  constructor(handlerPath) {
    super();
    if (!fs.existsSync(handlerPath)) {
      throw new Error(`The handler path does not exist`);
    }
    this.handlerPath = handlerPath;
  }

  subcribe({ event, handler }) {
    const [file, method] = handler.split('.');
    const filePath = path.join(this.handlerPath, `${file}.js`);
    if (!fs.existsSync(filePath)) {
      throw new Error(`the handler does not exist`);
    }
    const instance = require(filePath);
    if (!instance[method]) {
      throw new Error('the handler method dose not exist');
    }
    const handleMessage = instance[method].bind(instance);
    this.on(event, (data) => {
      setImmediate(async () => {
        try {
          const result = handleMessage(data);
          if (this.isPromise(result)) {
            await result;
          }
        } catch (error) {
          console.log('[MeshiEmitter][subcribe]error::', error);
        }
      });
    });
  }

  isPromise(value) {
    return Boolean(value && typeof value.then === 'function');
  }
}

const eventManager = new Emitter(path.join(__dirname, '..', 'listeners'));
module.exports = eventManager;
