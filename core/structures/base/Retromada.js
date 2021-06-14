import Loaders from '../../loaders/index.js'
import Logger from '../Logger.js'
import Instances from './instances/index.js'

export default class Retromada {
  constructor (options = {}) {
    this.client = {
      logger: new Logger(options.logger)
    }

    this.options = options
  }

  async initialize () {
    this.initializeLoaders(true)

    if (await this.databaseConnected()) {
      Instances(
        this.client,
        await this.client.database.emulators.findAll({
          seq: { $in: [246, 247, 248, 249, 250] }
        })
      ).cached((emulator) => {
        // Magic!
      })
    }
  }

  async initializeLoaders (singleShot) {
    for (const loader in Loaders) {
      const _loader = new Loaders[loader](this.client)

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

  async databaseConnected (connected = false) {
    const database = this.client?.database.mongoose

    while (!connected) {
      if (database.STATES[database.connection.readyState] === 'connected') {
        connected = true
      }

      await new Promise((resolve) => setTimeout(resolve, 750))
    }

    return connected
  }
}
