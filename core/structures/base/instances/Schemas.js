import { Schema } from '@retromada/instance-manager'

import { EmulatorsRoles } from '@utils/Constants.js'

const CredentialsSchema = new Schema({
  username: String,
  password: String,
  sharedSecret: String,
  identitySecret: String,
  sentry: 'any'
})

const EmulatorsSchema = new Schema({
  conf: Object,
  cache: 'any',
  seq: Number,
  steamID: 'any',
  role: String,
  credentials: CredentialsSchema,
  user: 'any',
  logger: 'any'
}, {
  methods: {
    onlyEmployee () {
      return this.role === EmulatorsRoles.EMPLOYEE
    }
  }
})

const Master = EmulatorsSchema.extend({
  database: Object,
  discord: 'any'
})

const Employee = EmulatorsSchema

export default { Master, Employee }
