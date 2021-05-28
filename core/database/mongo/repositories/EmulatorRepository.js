import MongoRepository from '../MongoRepository.js'
import EmulatorSchema from '../schemas/EmulatorSchema.js'

export default class EmulatorRepository extends MongoRepository {
  constructor (mongoose) {
    super(mongoose, mongoose.model('Emulator', EmulatorSchema))
  }
}
