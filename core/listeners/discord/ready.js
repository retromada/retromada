import Listener from '../../structures/Listener.js'

const PRESENCE_STATUS_DATA = ['online', 'idle', 'dnd', 'offline']

export default class Ready extends Listener {
  constructor (client) {
    super(client)
  }

  onReady () {
    this.presences
      .map((presence) => {
        if (
          typeof presence.status === 'string' &&
          /\$(rand|random|all)/.test(presence.status)
        ) {
          presence.status = PRESENCE_STATUS_DATA.random()
        }
        if (!!this.presences.status && presence.status.constructor === Object) {
          const [operator, status] = Object.entries(presence.status).shift()

          if (/\$in/.test(operator)) {
            presence.status = Array.isArray(status) ? status.random() : status
          } else if (/\$not/.test(operator)) {
            presence.status = PRESENCE_STATUS_DATA.filter((_status) =>
              Array.isArray(status)
                ? !status.includes(_status)
                : _status !== status
            )
          } else {
            presence.status = 'online'
          }
        }
        if (Array.isArray(presence.status)) {
          presence.status = presence.status.random()
        }

        return presence
      })
      .forEach((presence, current, self) =>
        setTimeout(() => {
          this.client.discord.user.setPresence(presence).then((_presence) => {
            const activity = _presence.activities.shift()

            this.logger.debug(
              {
                labels: ['Discord', 'ready', '#setPresence'],
                status: activity.status
              },
              `"${activity.name}" (${current + 1} of ${self.length})`
            )
          })
        }, current * 3 * 1e3)
      )
  }

  get presences () {
    return [
      {
        activity: {
          name: 'www.retromada.ga',
          type: 'WATCHING'
        },
        status: { $not: 'offline' }
      }
    ]
  }
}
