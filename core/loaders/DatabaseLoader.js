import { Mongo } from '@database/index.js'
import Loader from '@structures/Loader.js'

export default class DatabaseLoader extends Loader {
  constructor (client) {
    super(client, { singleShot: true })

    this.database = null
  }

  load () {
    this.initializeDatabase(Mongo, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    })
  }

  initializeDatabase (DatabaseWrapper, options = {}) {
    this.client.database = new DatabaseWrapper(options)
    this.client.database
      .connect()
      .then(() =>
        this.logger.info({ labels: ['Database'] }, 'Connection established')
      )
      .catch((error) => {
        this.logger.error({ labels: ['Database'] }, error.message)
        this.client.database = null
      })
  }
}
