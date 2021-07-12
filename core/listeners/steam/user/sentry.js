import Listener from '../../../structures/Listener.js'

export default class Sentry extends Listener {
  constructor (client) {
    super(client)
  }

  onSentry (sentry) {
    const labels = ['Steam', 'User', 'sentry']
    const masterSequence = +this.client.conf.masterSequence

    if (!this.client.cache.has(masterSequence)) {
      return this.logger.warn(
        { labels },
        `Sentinel was not written to ${this.client.steamID} because the master was not found`
      )
    }

    this.client.cache
      .get(masterSequence)
      .database.emulators.update(
        { seq: this.client.seq },
        { $set: { 'credentials.sentry': sentry } }
      )
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
