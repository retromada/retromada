import { Schema } from '@retromada/instance-manager'

const CredentialsSchema = new Schema({
  username: String,
  password: String,
  sharedSecret: String,
  identitySecret: String,
  sentry: 'any'
})

const EmulatorsSchema = new Schema({
  conf: String,
  seq: Number,
  steamID: Object,
  role: String,
  credentials: CredentialsSchema
})

const Master = EmulatorsSchema.extend({
  database: Object
})

export default { Master }
