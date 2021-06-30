import { readdir, stat } from 'fs/promises'
import { resolve, sep } from 'path'

export default class File {
  /**
   * Require all files in a directory
   * @param {string} directory Relative path to files
   * @param {Function} success Callback when successful
   * @param {Function} error Callback when failure
   * @param {Object} [options] Definitions for required files
   * @param {number} [options.folderIndex=1] Index where the parent folder is
   * @param {string|string[]} [options.extensions=['js']] File extension to be required
   * @param {boolean} [options.recursive=true] Recursion requirements
   * @returns {Promise<{[filename]: {required, filename: string, folder: string}}>}
   */
  static async requireDirectory (
    directory,
    success,
    error,
    { folderIndex = 1, extensions = ['js'], recursive = true } = {}
  ) {
    const files = await readdir(directory)
    const filesObject = {}

    return Promise.all(
      files.map(async (file) => {
        const path = resolve(directory, file)
        extensions =
          Array.isArray(extensions) && extensions.length
            ? extensions.join('|')
            : extensions

        if (file.match(new RegExp(`\\.(${extensions})$`))) {
          try {
            const { default: required } = await import(path)
            const filename = file.match(/^\w+/)[0]
            const folder = path.split(sep).reverse()[folderIndex]

            if (success) {
              await success(required, filename, folder)
            }

            filesObject[filename] = {
              required,
              filename,
              folder
            }

            return required
          } catch (_error) {
            error(_error)
          }
        } else if (recursive) {
          const isDirectory = await stat(path).then((file) =>
            file.isDirectory()
          )

          if (isDirectory) {
            return File.requireDirectory(path, success, error, {
              folderIndex,
              extensions,
              recursive
            })
          }
        }
      })
    ).then(() => filesObject)
  }
}
