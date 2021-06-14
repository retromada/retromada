import Retromada from '@structures/base/Retromada.js'
import Conf from '@structures/Conf.js'

require('@retromada/prototype').load()

const retromada = new Retromada({
  logger: { prettyPrint: true },
  conf: Object.assign(
    {},
    ...Conf.files(['General', 'Discord', 'Steam']).decode({ case: 'camel' })
  )
})

retromada.initialize()
