import Utils from '@utils/index.js'

export default class Loader {
  constructor (options = {}, logger) {
    this.singleShot = !!options.singleShot

    this.logger = logger
  }

  async loadFiles (path, options) {
    await Utils.File.requireDirectory(
      path,
      (file, filename, folder) => this.loadFile(file, filename, folder),
      console.error,
      options
    )
  }
}
