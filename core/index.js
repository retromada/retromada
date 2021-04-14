import Retromada from './structures/base/Retromada.js'
import Conf from './structures/Conf.js'

const retromada = new Retromada({
  conf: Object.assign(
    {},
    ...Conf.files(['General', 'Discord', 'Steam']).decode({ case: 'camel' })
  )
})

retromada.initialize()
