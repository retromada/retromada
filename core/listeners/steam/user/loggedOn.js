/* eslint camelcase: "off" */

import { User } from '@retromada/steam'

import Listener from '../../../structures/Listener.js'

const {
  EClanRelationship,
  EFriendRelationship,
  EPersonaState,
  EPersonaStateFlag
} = User

export default class LoggedOn extends Listener {
  constructor (client) {
    super(client)
  }

  async onLoggedOn () {
    const { player_name, level } = await this.client.user.getUser()
    const fetchList = (list, only) =>
      Object.keys(list).filter((steamID) => list[steamID] === only)
    const friends = fetchList(
      this.client.user.myFriends,
      EFriendRelationship.Friend
    ).length
    const groups = fetchList(
      this.client.user.myGroups,
      EClanRelationship.Member
    ).length

    this.logger.info(
      {
        labels: ['Steam', 'User', 'loggedOn'],
        player_name,
        level,
        friends,
        groups
      },
      this.client.user.profileURL
    )

    this.client.user.setActivity({
      state: EPersonaState.Online,
      flag: this.client.onlyEmployee()
        ? EPersonaStateFlag.ClientTypeTenfoot
        : EPersonaState.ClientTypeVR
    })
  }
}
