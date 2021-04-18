import Loaders from '../../loaders/index.js'

export default class Retromada {
  constructor (options = {}) {
    this.options = options
  }

  initialize () {
    this.initializeLoaders()
  }

  async initializeLoaders () {
    for (const loader in Loaders) {
      const _loader = new Loaders[loader]()

      try {
        await _loader.load()
      } catch (error) {
        console.error(error)
      }
    }
  }
}
