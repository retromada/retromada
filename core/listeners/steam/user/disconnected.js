import Listener from '../../../structures/Listener.js'

export default class Disconnected extends Listener {
  constructor (client) {
    super(client)
  }

  async onDisconnected (EResult, message) {
    const { player_name, level } = await this.client.user.getUser()

    this.logger.warn(
      {
        labels: ['Steam', 'User', 'disconnected'],
        player_name,
        level,
        eresult: EResult
      },
      `${this.client.user.profileURL} -- "${message}"`
    )
  }
}
