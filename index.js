#!/usr/bin/env node
'use strict'

const cp = require('child_process')
const fs = require('fs')
const path = require('path')

if (require.main === module) {
  main(process.argv)
}

function main (argv) {
  if (argv[2] === '--install') {
    return configureGit()
  } else if (argv.length < 6) {
    console.error('ERROR: merge file arguments required. Were you looking for --install?')
    process.exit(1)
  } else {
    return mergeFiles.apply(null, argv.slice(2))
  }
}

function configureGit () {
  cp.execSync(`git config merge."npm-merge-driver".name "automatically merge npm lockfiles"`)
  cp.execSync(`git config merge."npm-merge-driver".driver "npx npm-merge-driver %A %O %B %P"`)
  const gitDir = cp.execSync(`git rev-parse --git-dir`, {
    encoding: 'utf8'
  }).trim()
  fs.appendFileSync(path.join(gitDir, 'info', 'attributes'), [
    '',
    'npm-shrinkwrap.json merge=npm-merge-driver',
    'package-lock.json merge=npm-merge-driver'
  ].join('\n'))
}

function mergeFiles (current, old, theirs, file) {
  const out = cp.execSync(`git merge-file -p ${current} ${old} ${theirs}`)
  fs.writeFileSync(file, out)
  cp.execSync('npm install --package-lock-only')
  fs.writeFileSync(current, fs.readFileSync(file))
}
