import Toolbox from '@retromada/toolbox'

export default class Utils {
  static optionHandler (structure, options = {}) {
    return {
      default (name, defaultValue) {
        const value = options[name]

        return typeof value === 'undefined'
          ? Array.isArray(defaultValue)
            ? defaultValue.random()
            : defaultValue
          : value
      },

      optional (name) {
        return options[name] || null
      },

      required (name) {
        const value = options[name]

        if (typeof value === 'undefined') {
          throw new Error(`The "${name}" option in the ${structure} structure is required`)
        }

        return value
      }
    }
  }

  static whatEnv (value) {
    const env = process.env.NODE_ENV

    if (typeof value === 'string' && value !== env) {
      process.emitWarning(
        'Different environment than requested' +
          (value && ` (${value.toUpperCase()})`),
        {
          code: 'WHAT_ENV',
          detail: `The current environment is ${env.toUpperCase()}`
        }
      )
    }

    return env
  }
}

Object.assign(Utils, Toolbox)
