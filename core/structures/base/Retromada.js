import Loaders from '../../loaders/index.js'
import Logger from '../Logger.js'
import Instances, { Manager } from './instances/index.js'

export default class Retromada {
  constructor (options = {}) {
    this.client = {
      http: {},
      logger: new Logger(options.logger),
      ...(delete options.logger && options)
    }
  }

  async initialize () {
    this.initializeLoaders(true)

    if (await this.databaseConnected()) {
      Instances(
        this.client,
        await this.client.database.emulators.findAll({
          seq: { $in: [246, 247, 248, 249, 250] },
          enabled: true
        })
      ).cached((client, index) => {
        Manager.wait(({ credentials, user } = client) => {
          if (credentials.sentry) {
            user.setSentry(credentials.sentry.buffer)
          }

          user.logOn({
            accountName: credentials.username,
            password: credentials.password
          })

          this.initializeLoaders(false, client)
        }, index * Math.between(45, 60) * 1e3)
      })
    }
  }

  async initializeLoaders (singleShot, client = this.client) {
    for (const loader in Loaders) {
      const _loader = new Loaders[loader](client)

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
