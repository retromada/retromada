import Conf from '@retromada/conf'

import Utils from '@utils/index.js'
import Path from 'path'

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
