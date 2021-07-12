import Listener from '../../../structures/Listener.js'

export default class ProhibitionsListener extends Listener {
  constructor (client) {
    super(client, {
      unifiedEvents: true,
      events: ['accountLimitations', 'vacBans']
    })
  }

  onAccountLimitations (limited, communityBanned, locked, canInviteFriends) {
    const limitations = []

    if (!this.client.onlyEmployee()) {
      if (limited) limitations.push('Limited')
      if (!canInviteFriends) limitations.push("Can't invite friends")
    }
    if (communityBanned) limitations.push('Community Banned')
    if (locked) limitations.push('Locked')

    if (limitations.length) {
      this.logger.warn(
        { labels: ['Steam', 'User', 'accountLimitations'], limitations },
        `This account has ${limitations.length} limitation${
          limitations.length > 1 ? 's' : ''
        }`
      )
    }
  }

  onVacBans (numBans, appIDs) {
    if (numBans > 0) {
      this.logger.debug(
        { labels: ['Steam', 'User', 'vacBans'], app_ids: appIDs },
        `This account contains ${numBans} VAC ban${numBans > 1 ? 's' : ''}`
      )
    }
  }
}
