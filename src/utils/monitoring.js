const { MeterProvider } = require('@opentelemetry/sdk-metrics-base');
const { PrometheusExporter } = require('@opentelemetry/exporter-prometheus');
const responseTime = require('response-time');

const exporter = new PrometheusExporter({ preventServerStart: false });
const provider = new MeterProvider({
  // The Prometheus exporter runs an HTTP server which
  // the Prometheus backend scrapes to collect metrics.
  exporter,
  interval: 1000,
});
const meter = provider.getMeter('hairlie-api');
const duration = meter.createHistogram('request_duration_seconds', {
  description: 'Incoming requests duration',
  boundaries: [0.1, 0.5, 1.0, 2.0, 5.0],
  unit: 'second',
});

/*
 * This middleware will collect request's duration and related information likes: method, path, type (success or error)
 */
function metricMiddleware() {
  return responseTime(function (req, res, time) {
    if (/\/functions\/\w+/.test(req.url)) {
      duration.record(time / 1000, {
        method: req.method,
        path: req.url,
        type: res.statusCode >= 400 ? 'error' : 'success', // NOTE: server error status's code should >= 500 but Parse does not follow standard HTTP status's code
        pid: process.pid, // NOTE: process id is needed to distinct between process when running in cluster mode.
      });
    }
  });
}
module.exports = { metricMiddleware };
