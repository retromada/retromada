import Loader from '@structures/Loader.js'
import { Root } from '@utils/Constants.js'

export default class ListenerLoader extends Loader {
  constructor (client) {
    super(client)
  }

  load () {
    return this.loadFiles(Root().Core('listeners'))
  }

  loadFile (Listener, event, folder) {
    const listener = new Listener(this.client)

    if (folder === 'user') {
      this.client.user.on(event, (...v) =>
        listener['on' + event.capitalize()](...v)
      )
    }
  }
}
