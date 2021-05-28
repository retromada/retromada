import { MONGO_URI } from '@env'
import Mongoose from 'mongoose'

import DatabaseWrapper from '../DatabaseWrapper.js'
import Repositories from './repositories/index.js'

export default class Mongo extends DatabaseWrapper {
  constructor (options) {
    super(options)

    this.mongoose = Mongoose
  }

  async connect () {
    return Mongoose.connect(MONGO_URI, this.options).then((mongo) => {
      for (const [name, Repository] of Repositories) {
        this[name] = new Repository(mongo)
      }
    })
  }
}
