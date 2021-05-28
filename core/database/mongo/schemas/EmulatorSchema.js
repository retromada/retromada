import { Schema } from 'mongoose'

const CredentialsSchema = new Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    shared_secret: String,
    identity_secret: String,
    sentry: Buffer
  },
  {
    _id: false
  }
)

export default new Schema({
  _id: String,
  seq: Number,
  steam_id: { type: Object, required: true },
  enabled: { type: Boolean, default: false },
  role: { type: String, required: true },
  is_bot_account: { type: Boolean, required: true },
  credentials: CredentialsSchema
})
