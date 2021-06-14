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
    id: false,
    _id: false
  }
)

export default new Schema(
  {
    _id: { type: String, required: true, alias: 'steam_id' },
    seq: Number,
    enabled: { type: Boolean, default: false },
    role: { type: String, required: true },
    is_bot_account: { type: Boolean, required: true },
    credentials: CredentialsSchema
  },
  { id: false }
)
