export default class Listener {
  constructor (client) {
    this.client = client
    this.logger = client.logger
  }
}
