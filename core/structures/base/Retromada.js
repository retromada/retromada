export default class Retromada {
  constructor (options = {}) {
    this.conf = options.conf
  }

  initialize () {
    console.log(this.conf)
  }
}
