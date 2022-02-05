export default class Route {
  constructor (client, options) {
    this.client = client

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
