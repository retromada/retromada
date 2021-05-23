import Utils from '@utils/index.js'

export default class Loader {
  async loadFiles (path, options) {
    await Utils.File.requireDirectory(
      path,
      (file, filename, folder) => {
        this.loadFile(file, filename, folder)
      },
      console.error,
      options
    )
  }
}
