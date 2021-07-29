import Listener from '../../structures/Listener.js'

export default class Error extends Listener {
  constructor (client) {
    super(client)
  }

  onError (error) {
    this.logger.error({ labels: ['Discord', 'error'] }, error)
  }
}
