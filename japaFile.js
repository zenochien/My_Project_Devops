
const { configure } = require('japa')
const result = require('dotenv').config({path: './.env.testing'})
if (result.error) {
    throw result.error
}
configure({
  files: [ './src/test/**/*.spec.js']
})