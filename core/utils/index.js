import Toolbox from '@retromada/toolbox'

export default class Utils {
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
