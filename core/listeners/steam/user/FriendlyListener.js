import Listener from '../../../structures/Listener.js'

export default class FriendlyListener extends Listener {
  constructor (client) {
    super(client, {
      unifiedEvents: true,
      events: ['friendRelationship', 'friendsList']
    })
  }

  onFriendRelationship (senter, relationship) {}

  onFriendsList () {}
}
