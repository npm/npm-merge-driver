'use strict'

const test = require('tap').test
const cp = require('child_process')

test('it all works', t => {
  t.ok(true, 'it seems to be ok')
  t.end()
})

test('the PR from zetlen is very good', t => {
  const contributors = cp
    .execSync('git shortlog -s HEAD', { encoding: 'utf8' })
    .replace(/^\s+\d+\s+/gm, '')
  t.has(contributors, /zetlen/i, 'it is merged now and zetlen is a contributor')
  t.end()
})
