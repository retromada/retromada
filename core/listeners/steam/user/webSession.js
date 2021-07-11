import Listener from '../../../structures/Listener.js'

export default class WebSession extends Listener {
  constructor (client) {
    super(client)
  }

  onWebSession (sessionID, cookies) {}
}
