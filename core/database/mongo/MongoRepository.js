import Repository from '../Repository.js'

export default class MongoRepository extends Repository {
  constructor (mongoose, model) {
    super()

    this.mongoose = mongoose
    this.model = typeof model === 'string' ? mongoose.model(model) : model
  }

  parse (entity) {
    return entity
      ? entity.toObject({ virtuals: true, versionKey: false })
      : null
  }

  insert (entity) {
    return this.model.create(entity).then(this.parse)
  }

  findOne (id, projection) {
    return this.model.findById(id, projection).then(this.parse)
  }

  findAll (query = {}, projection) {
    return this.model
      .find(query, projection)
      .then((entities) => entities.map(this.parse))
  }

  get (query, projection) {
    return this.model.findOne(query, projection).then(this.parse)
  }

  delete (id) {
    return this.model.findByIdAndRemove(id).then(this.parse)
  }

  update (query, entity, options = { upsert: true, new: true }) {
    return this.model.updateOne(query, entity, options).then(this.parse)
  }
}
