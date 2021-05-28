import Conf from '@retromada/conf'

import { Root } from '@utils/Constants.js'
import Utils from '@utils/index.js'
import Path from 'path'

export default class extends Conf {
  static files (filenames) {
    return super.files(
      filenames.map((filename) =>
        Path.resolve(Root().Conf, [filename, Utils.whatEnv(), 'conf'].join('.'))
      )
    )
  }
}
