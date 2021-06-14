import File from '@utils/File.js'

export default class Loader {
  constructor (client, options = {}) {
    this.client = client
    this.logger = client.logger

    this.singleShot = !!options.singleShot
  }

  async loadFiles (path, options) {
    await File.requireDirectory(
      path,
      (file, filename, folder) => this.loadFile(file, filename, folder),
      console.error,
      options
    )
  }
}
