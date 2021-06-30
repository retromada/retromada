import { Router } from 'express'

import Route from '../../structures/Route.js'

export default class Statistics extends Route {
  register (app) {
    const router = Router()

    router.get('/', (request, response) =>
      response.status(200).json({ foo: 'bar' })
    )

    app.use(this.path, router)
  }
}
