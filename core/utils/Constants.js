import Path from 'path'

export const Root = (root = process.cwd()) => ({
  Core: (folder) => Path.resolve(root, 'core', folder),
  Conf: Path.resolve(root, 'conf')
})
