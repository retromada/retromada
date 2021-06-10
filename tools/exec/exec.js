const { exec } = require('child_process')
const { promisify } = require('util')

const scripts = require('../scripts.json')
const _exec = promisify(exec)

const [, , script] = process.argv

_exec(scripts[script]).then(({ stdout }) => console.log(stdout))
