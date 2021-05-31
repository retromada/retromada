import Loaders from '../../loaders/index.js'
import Logger from '../Logger.js'

export default class Retromada {
  constructor (options = {}) {
    this.options = options
    this.logger = new Logger({ prettyPrint: true })
  }

  initialize () {
    this.initializeLoaders(true)
  }

  async initializeLoaders (singleShot) {
    for (const loader in Loaders) {
      const _loader = new Loaders[loader]({ logger: this.logger })

      try {
        if (_loader.singleShot === singleShot) {
          await _loader.load()
        } else {
          continue
        }
      } catch (error) {
        console.error(error)
      }
    }
  }
}
