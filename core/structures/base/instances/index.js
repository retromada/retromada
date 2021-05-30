import { Manager } from '@retromada/instance-manager'

import Schemas from './Schemas.js'

export default (iterable) => {
  const manager = new Manager(iterable)

  return manager.each((_) =>
    manager.cache.set(
      _.seq,
      new Schemas[_.role.capitalize()]({
        conf: null,
        database: null,
        seq: _.seq,
        steamID: _.steam_id,
        role: _.role,
        credentials: _.credentials
      }).toObject()
    )
  )
}
