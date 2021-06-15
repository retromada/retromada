export default class Listener {
  constructor (client, options = {}) {
    this.client = client
    this.logger = client.logger
  }
}
