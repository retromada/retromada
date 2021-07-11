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
    const eventFn = (...v) => listener['on' + event.capitalize()](...v)

    if (listener.unifiedEvents) {
      listener.events.forEach((_event) =>
        this.client[folder].on(_event, (...v) =>
          listener['on' + _event.capitalize()](...v)
        )
      )
    } else {
      this.client[folder].on(event, eventFn)
    }
  }
}
