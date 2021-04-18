import express from 'express'

import Loader from '../structures/Loader.js'
import { Root } from '../utils/Constants.js'

export default class HTTPLoader extends Loader {
  load () {
    this.initializeHTTPServer()

    return this.loadFiles(Root().Core('http'))
  }

  loadFile (Route, name) {
    const route = new Route({ name })

    route._register(this.app)
  }

  initializeHTTPServer (port = process.env.PORT) {
    this.app = express()

    this.app.use(express.json())

    this.app.listen(port)
  }
}
