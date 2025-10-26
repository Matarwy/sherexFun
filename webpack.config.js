module.exports = {
  // ...your config
  experiments: {
    ...((config && config.experiments) || {}),
    importAttributes: true // <-- important
  },
  module: {
    rules: [
      // make sure JSON is handled as JSON modules
      { test: /\.json$/i, type: 'json' }
    ]
  }
}
