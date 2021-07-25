import { Manager } from '@retromada/instance-manager'
import { ID, User } from '@retromada/steam'

import Discord from 'discord.js'

import Logger from '../../Logger.js'
import Schemas from './Schemas.js'

export { Manager }

export default ({ conf, database }, iterable) => {
  const manager = new Manager(iterable)

  return manager.each((_) =>
    manager.cache.set(
      _.seq,
      new Schemas[_.role.capitalize()]({
        conf,
        database,
        cache: manager.cache,
        seq: _.seq,
        steamID: new ID(_.steam_id),
        role: _.role,
        credentials: _.credentials,
        discord: new Discord.Client(),
        user: new User(),
        logger: new Logger({ pid: _.seq, prettyPrint: true })
      })
    )
  )
}
