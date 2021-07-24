import { User } from '@retromada/steam'

import Listener from '../../../structures/Listener.js'

const { EFriendRelationship } = User

export default class FriendlyListener extends Listener {
  constructor (client) {
    super(client, {
      unifiedEvents: true,
      events: ['friendRelationship', 'friendsList']
    })
  }

  onFriendRelationship (sender, relationship) {
    const labels = ['Steam', 'User', 'friendRelationship']

    if (
      EFriendRelationship.RequestRecipient === relationship &&
      this.client.onlyEmployee() &&
      this.client.conf.steam.friendly.acceptFriendRequests
    ) {
      this.client.user.addFriend(sender, (error, personaName) => {
        if (!error) {
          this.logger.debug(
            { labels, player_name: personaName },
            `profiles/${sender} -- "Added to friends list"`
          )
        } else {
          this.logger.error(
            { labels, player_name: personaName, eresult: error.eresult },
            `profiles/${sender} -- "${error.message}"`
          )
        }
      })
    } else if (EFriendRelationship.None === relationship) {
      this.logger.debug(
        { labels },
        `profiles/${sender} -- "Removed from friends list"`
      )
    }
  }

  onFriendsList () {
    if (
      this.client.onlyEmployee() &&
      this.client.conf.steam.friendly.acceptFriendRequests
    ) {
      const friends = this.client.myFriends
      const inviters = Object.keys(friends).filter(
        (steamID) => friends[steamID] === EFriendRelationship.RequestRecipient
      )

      if (inviters.length) {
        const labels = ['Steam', 'User', 'friendsList']

        this.logger.info({ labels, inviters })

        inviters.forEach((inviter, index) => {
          setTimeout(() => {
            this.client.user.addFriend(inviter, (error, personaName) => {
              if (!error) {
                this.logger.debug(
                  {
                    labels,
                    player_name: personaName
                  },
                  `profiles/${inviter}`
                )
              } else {
                this.logger.error(
                  {
                    labels,
                    player_name: personaName,
                    eresult: error.eresult
                  },
                  `profiles/${inviter} -- "${error.message}"`
                )
              }
            })
          }, index * Math.between(10, 15) * 1e3)
        })
      }
    }
  }
}
