import Loaders from '../../loaders/index.js'

export default class Retromada {
  constructor (options = {}) {
    this.options = options
  }

  initialize () {
    this.initializeLoaders(true)
  }

  async initializeLoaders (singleShot) {
    for (const loader in Loaders) {
      const _loader = new Loaders[loader]()

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
