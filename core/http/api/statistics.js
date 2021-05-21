const { Router } = require('express')

const Route = require('../../structures/Route.js')

module.exports = class Statistics extends Route {
  register (app) {
    const router = Router()

    router.get('/', (request, response) =>
      response.status(200).json({ foo: 'bar' })
    )

    app.use(this.path, router)
  }
}
