import Listener from '../../../structures/Listener.js'

export default class Disconnected extends Listener {
  constructor (client) {
    super(client)
  }

  onDisconnected (EResult, message) {}
}
