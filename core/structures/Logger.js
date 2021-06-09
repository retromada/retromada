import Utils from '@utils/index.js'
import Pino from 'pino'

export default class Logger {
  constructor (options = {}) {
    try {
      require.resolve('pino-pretty')
    } catch (error) {
      options.prettyPrint = false
    }

    return Pino({
      name: options.name || 'Retromada',
      level: options.level || 'debug',
      base: { pid: options.pid, hostname: process.platform },
      timestamp: () =>
        `,"time":"${new Date().toLocaleTimeString('en-US', {
          hour12: false
        })}"`,
      messageKey: 'message',
      nestedKey: 'payload',
      prettyPrint:
        options.prettyPrint && Utils.whatEnv('development') === 'development'
    })
  }
}
