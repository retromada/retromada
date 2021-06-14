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
  conf: String,
  database: Object,
  seq: Number,
  steamID: 'any',
  role: String,
  credentials: CredentialsSchema,
  user: 'any'
}, {
  methods: {
    onlyEmployee () {
      return this.role === EmulatorsRoles.EMPLOYEE
    }
  }
})

const Master = EmulatorsSchema

const Employee = EmulatorsSchema

export default { Master, Employee }
