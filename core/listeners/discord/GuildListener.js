import Listener from '../../structures/Listener.js'

export default class GuildListener extends Listener {
  constructor (client) {
    super(client, {
      unifiedEvents: true,
      events: [
        'guildCreate',
        'guildDelete',
        'guildMemberAdd',
        'guildMemberRemove'
      ]
    })
  }

  onGuildCreate (guild) {}

  onGuildDelete (guild) {}

  onGuildMemberAdd (member) {}

  onGuildMemberRemove (member) {}
}
