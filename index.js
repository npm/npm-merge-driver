#!/usr/bin/env node
'use strict'

const cp = require('child_process')
const fs = require('fs')
const path = require('path')
const yargs = require('yargs')

if (require.main === module) {
  parseArgs()
}

function parseArgs () {
  return yargs
    .command(
      'install',
      'Set up the merge driver in the current git repository.',
    {
      driver: {
        type: 'string',
        default: 'npx npm-merge-driver merge npm %A %O %B %P',
        description:
            'string to install as the driver in the git configuration'
      },
      'driver-name': {
        type: 'string',
        default: 'npm-merge-driver',
        description:
            'string to use as the merge driver name in your configuration'
      }
    },
      configureGit
    )
    .command(
      'merge <npm-bin> <%A> <%O> <%B> <%P>',
      'Check for lockfile conflicts and correct them if necessary.',
      {},
      mergeFiles
    )
    .version(require('./package.json').version)
    .alias('version', 'v')
    .help()
    .alias('help', 'h')
    .epilogue('For the full documentation, see npm-merge-driver(1)')
    .demandCommand().argv
}

function configureGit (argv) {
  cp.execSync(
    `git config merge."${argv.driverName}".name "automatically merge npm lockfiles"`
  )
  cp.execSync(`git config merge."${argv.driverName}".driver "${argv.driver}"`)
  const gitDir = cp
    .execSync(`git rev-parse --git-dir`, {
      encoding: 'utf8'
    })
    .trim()
  fs.appendFileSync(
    path.join(gitDir, 'info', 'attributes'),
    [
      '',
      `npm-shrinkwrap.json merge=${argv.driverName}`,
      `package-lock.json merge=${argv.driverName}`
    ].join('\n')
  )
}

function mergeFiles (argv) {
  const ret = cp.spawnSync(
    'git',
    ['merge-file', '-p', argv['%A'], argv['%O'], argv['%B']],
    {
      stdio: [0, 'pipe', 2]
    }
  )
  fs.writeFileSync(argv['%P'], ret.stdout)
  cp.spawnSync(argv.npmBin, ['install', '--package-lock-only'], {
    stdio: 'inherit'
  })
  fs.writeFileSync(argv['%A'], fs.readFileSync(argv['%P']))
}
