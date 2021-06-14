import { Manager } from '@retromada/instance-manager'
import { ID, User } from '@retromada/steam'

import Schemas from './Schemas.js'

export default ({ conf, database }, iterable) => {
  const manager = new Manager(iterable)

  return manager.each((_) =>
    manager.cache.set(
      _.seq,
      new Schemas[_.role.capitalize()]({
        conf,
        database,
        seq: _.seq,
        steamID: new ID(_.steam_id),
        role: _.role,
        credentials: _.credentials,
        user: new User()
      })
    )
  )
}
