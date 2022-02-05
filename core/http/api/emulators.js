import { Router } from 'express'

import Route from '../../structures/Route.js'

export default class Emulators extends Route {
  register (app) {
    const router = Router()

    router.get('/', (request, response) => {
      const emulators = this.client.http.emulators?.array()

      if (emulators?.length) {
        response
          .status(200)
          .json(
            emulators.map(({ seq, steamID, role }) => ({
              seq,
              steam_id: steamID.getSteamID64(),
              role
            }))
          )
      } else {
        response.status(400).json({ message: 'Emulators not loaded.' })
      }
    })

    app.use(this.path, router)
  }
}
