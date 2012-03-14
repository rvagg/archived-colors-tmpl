var colors = require('colors')

  , types = Object.keys(colors).filter(function (k) {
      return /^[a-z]+$/.test(k) && typeof colors[k] == 'function'
    })

  , translators = types.map(function (type) {
      var re = new RegExp('\\{' + type + '\\}(.*)\\{/' + type + '\\}')
      return function (str) {
        return str.replace(re, '$1'[type])
      }
    })

  , render = function (str) {
      return [str].concat(translators).reduce(function (str, fn) {
        return fn(str)
      })
    }

module.exports.render = render