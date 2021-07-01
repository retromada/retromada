import { User } from '@retromada/steam'

import Listener from '../../../structures/Listener.js'

const { EPersonaState, EPersonaStateFlag } = User

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

    this.client.user.setActivity({
      state: EPersonaState.Online,
      flag: this.client.onlyEmployee()
        ? EPersonaStateFlag.ClientTypeTenfoot
        : EPersonaState.ClientTypeVR
    })
  }
}
