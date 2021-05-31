import { PORT } from '@env'
import Loader from '@structures/Loader.js'
import { Root } from '@utils/Constants.js'
import express from 'express'

export default class HTTPLoader extends Loader {
  constructor ({ logger }) {
    super({ singleShot: true }, logger)
  }

  load () {
    this.initializeHTTPServer()

    return this.loadFiles(Root().Core('http'))
  }

  loadFile (Route, name) {
    const route = new Route({ name })

    route._register(this.app)
  }

  initializeHTTPServer (port = PORT) {
    if (!port) {
      return this.logger.warn(
        { labels: ['HTTP'] },
        'Server not started - Environment variable "PORT" is not set'
      )
    }

    this.app = express()

    this.app.use(express.json())

    this.app.listen(port, () => this.logger.info({ labels: ['HTTP'], port }))
  }
}
