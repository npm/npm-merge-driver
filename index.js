#!/usr/bin/env node
'use strict'

const cp = require('child_process')
const fs = require('fs')
const mkdirp = require('mkdirp')
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
      global: {
        type: 'boolean',
        default: false,
        description: 'install to your user-level git configuration'
      },
      driver: {
        type: 'string',
        default: 'npx npm-merge-driver merge %A %O %B %P',
        description:
            'string to install as the driver in the git configuration'
      },
      'driver-name': {
        type: 'string',
        default: 'npm-merge-driver',
        description:
            'String to use as the merge driver name in your configuration.'
      },
      files: {
        description: 'Filenames that will trigger this driver.',
        type: 'array',
        default: ['npm-shrinkwrap.json', 'package-lock.json']
      }
    },
      configureGit
    )
    .command(
      'merge <%A> <%O> <%B> <%P>',
      'Check for lockfile conflicts and correct them if necessary.',
    {
      command: {
        alias: 'c',
        description: 'Command to execute to resolve conflicts.',
        type: 'string',
        default: 'npm install --package-lock-only'
      }
    },
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
  let attrFile
  let opts = ''
  if (argv.global) {
    opts = '--global'
    try {
      attrFile = cp
        .execSync(`git config --global core.attributesfile`)
        .toString('utf8')
        .trim()
    } catch (e) {}
    if (!attrFile) {
      if (process.env.XDG_CONFIG_HOME) {
        attrFile = path.join(process.env.XDG_CONFIG_HOME, 'git', 'attributes')
      } else {
        attrFile = path.join(process.env.HOME, '.config', 'git', 'attributes')
      }
    }
  } else {
    opts = '--local'
    const gitDir = cp
      .execSync(`git rev-parse --git-dir`, {
        encoding: 'utf8'
      })
      .trim()
    attrFile = path.join(gitDir, 'info', 'attributes')
  }
  cp.execSync(
    `git config ${opts} merge."${argv.driverName}".name "automatically merge npm lockfiles"`
  )
  cp.execSync(
    `git config ${opts} merge."${argv.driverName}".driver "${argv.driver}"`
  )
  mkdirp.sync(path.dirname(attrFile))
  fs.appendFileSync(
    attrFile,
    '\n' + argv.files.map(f => `${f} merge=${argv.driverName}`).join('\n')
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
  cp.execSync(argv.command, {
    stdio: 'inherit',
    cwd: path.dirname(argv['%P'])
  })
  fs.writeFileSync(argv['%A'], fs.readFileSync(argv['%P']))
}
