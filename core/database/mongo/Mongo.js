import { MONGO_URI } from '@env'
import Mongoose from 'mongoose'

import DatabaseWrapper from '../DatabaseWrapper.js'

export default class Mongo extends DatabaseWrapper {
  constructor (options) {
    super(options)

    this.mongoose = Mongoose
  }

  async connect () {
    return Mongoose.connect(
      MONGO_URI,
      this.options
    ).then((model) => {})
  }
}
