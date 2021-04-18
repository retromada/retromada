module.exports = class Route {
  constructor (options) {
    this.name = options.name
  }

  get path () {
    return '/api/' + this.name
  }

  _register (app) {
    this.register(app)
  }

  register (app) {}
}
