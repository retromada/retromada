import Utils from '@utils/index.js'

export default class Listener {
  constructor (client, options = {}) {
    this.client = client
    this.logger = client.logger

    options = Utils.optionHandler('Listener', options)

    this.unifiedEvents = options.default('unifiedEvents', false)
    this.events = options.optional('events')
  }
}
