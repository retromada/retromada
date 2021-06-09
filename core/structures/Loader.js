import File from '@utils/File.js'

export default class Loader {
  constructor (options = {}, logger) {
    this.singleShot = !!options.singleShot

    this.logger = logger
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
