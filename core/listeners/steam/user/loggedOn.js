import Listener from '../../../structures/Listener.js'

export default class LoggedOn extends Listener {
  constructor (client) {
    super(client)
  }

  onLoggedOn () {
    this.logger.info(
      { labels: ['Steam', 'User', 'loggedOn'] },
      `https://steamcommunity.com/${
        this.client.user.vanityURL
          ? `id/${this.client.user.vanityURL}`
          : `profiles/${this.client.steamID}`
      }`
    )

    this.client.user.setPersona(1)
  }
}
