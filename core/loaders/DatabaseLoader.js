import { Mongo } from '../database/index.js'
import Loader from '../structures/Loader.js'

export default class DatabaseLoader extends Loader {
  constructor () {
    super()

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
    this.database = new DatabaseWrapper(options)
    this.database.connect().catch(console.error)
  }
}
