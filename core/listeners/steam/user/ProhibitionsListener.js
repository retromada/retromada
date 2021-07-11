import Listener from '../../../structures/Listener.js'

export default class ProhibitionsListener extends Listener {
  constructor (client) {
    super(client, {
      unifiedEvents: true,
      events: ['accountLimitations', 'vacBans']
    })
  }

  onAccountLimitations (limited, communityBanned, locked, canInviteFriends) {}

  onVacBans (numBans, appIDs) {}
}
