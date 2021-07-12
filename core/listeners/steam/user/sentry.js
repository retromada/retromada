import Listener from '../../../structures/Listener.js'

export default class Sentry extends Listener {
  constructor (client) {
    super(client)
  }

  onSentry (sentry) {
    const labels = ['Steam', 'User', 'sentry']

    this.client.database.emulators
      .update({ seq: this.client.seq })
      .then(() =>
        this.logger.debug(
          {
            labels
          },
          `Sentry written to ${this.client.steamID}`
        )
      )
      .catch((error) => this.logger.error({ labels }, error))
  }
}
