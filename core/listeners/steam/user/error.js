import Listener from '../../../structures/Listener.js'

export default class Error extends Listener {
  constructor (client) {
    super(client)
  }

  async onError (error) {
    const { player_name, level } = await this.client.user.getUser()

    this.logger.error(
      {
        labels: ['Steam', 'User', 'error'],
        player_name,
        level,
        eresult: error.eresult
      },
      `${this.client.user.profileURL} -- "${error.message}"`
    )
  }
}
