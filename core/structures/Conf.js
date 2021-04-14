import Conf from '@retromada/conf'

import Path from 'path'

import Utils from '../utils/index.js'

export default class extends Conf {
  static files (filenames) {
    return super.files(
      filenames.map((filename) =>
        Path.resolve(
          process.cwd(),
          'conf',
          [filename, Utils.whatEnv(), 'conf'].join('.')
        )
      )
    )
  }
}
