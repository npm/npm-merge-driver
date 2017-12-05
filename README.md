[![npm](https://img.shields.io/npm/v/npm-merge-driver.svg)](https://npm.im/npm-merge-driver) [![license](https://img.shields.io/npm/l/npm-merge-driver.svg)](https://npm.im/npm-merge-driver) [![Travis](https://img.shields.io/travis/npm/npm-merge-driver.svg)](https://travis-ci.org/npm/npm-merge-driver) [![AppVeyor](https://ci.appveyor.com/api/projects/status/github/npm/npm-merge-driver?svg=true)](https://ci.appveyor.com/project/npm/npm-merge-driver) [![Coverage Status](https://coveralls.io/repos/github/npm/npm-merge-driver/badge.svg?branch=latest)](https://coveralls.io/github/npm/npm-merge-driver?branch=latest)

# npm-merge-driver(1) -- git merge driver for automatic merging of lockfiles

### Automatic Setup (recommended):

To start using it right away:

```
$ npx npm-merge-driver install --global
```

**Or** install it locally, per-project:
```
$ cd /path/to/git/repository
$ npx npm-merge-driver install
```

...And you're good to go!

Next time your lockfile has a conflict, it will be automatically fixed. You
don't need to do anything else.

### Example

```
$ npx npm-merge-driver install
$ git merge my-conflicting-branch
npm WARN conflict A git conflict was detected in package-lock.json. Attempting to auto-resolve.

added 1 package in 0.077s
Auto-merging package-lock.json
Merge made by the 'recursive' strategy.
 package-lock.json | 6 +++---
 1 file changed, 3 insertions(+), 3 deletions(-)
$ git status
<clean>
```

### Advanced

The following section is only for advanced configuration of the driver if you
have specific needs.

#### Setup Options

`npm-merge-driver install` supports a couple of config options:

`--driver` - string to install as the driver in the git configuration

`--driver-name` - string to use as the merge driver name in your configuration

`--files` - list of files that will trigger this driver

`--no-legacy` - disables retrying legacy commands on error

#### Merge Options

`npm-merge-driver merge` can also be configured:

`-c, --command` - command to execute when a lockfile is conflicted

`--no-legacy` - disables retrying legacy commands on error

#### Install as Dependency

To avoid regular `npx` installs, consider installing the driver:

`$ npm install [-g|--save-dev] npm-merge-driver`

#### Manual Setup (advanced):

`npm-merge-driver` requires two git configurations to work: a git configuration
to add the driver to git, which is by default your local `.git/config` file, and
a `gitattributes(5)` configuration, which is by default your local
`.git/info/attributes`.

If you **do not** want `npm-merge-driver` to install itself for you:

Add the driver to `.git/config`:
```
$ git config merge."npm-merge-driver".name \
    "Automatically merge npm lockfiles"
$ git config merge."npm-merge-driver".driver \
    "npx npm-merge-driver merge %A %O %B %P"
```

Add the relevant attributes to `.gitattributes` or `.git/info/attributes`:
```
package-lock.json merge=npm-merge-driver
npm-shrinkwrap.json merge=npm-merge-driver
```

#### Using with other package managers

`npm-merge-driver` can be used with package managers other than npm! It's a bit
more verbose, but works just as well, assuming the package manager has a command
that can automatically resolve merge conflicts in its lockfile:

```
$ npx npm-merge-driver install \
    --driver-name yarn-merge-driver \
    --driver "npx npm-merge-driver merge %A %O %B %P -c yarn"
    --files yarn.lock
```

...and now, any time `yarn.lock` has a conflict, it will be automatically
resolved without you having to manually run `yarn`.

#### Uninstalling

To remove an installed merge driver, use `npm-merge-driver uninstall`:

```
$ npx npm-merge-driver uninstall [--global] [--driver-name=npm-merge-driver]
```

## AUTHOR

Written by [Kat Marchan](https://github.com/zkat)

## REPORTING BUGS

Please file any relevant issues [on Github.](https://github.com/npm/npm-merge-driver)

## LICENSE

This work is released under the terms of the ISC license. See `LICENSE.md` for details.

## SEE ALSO

* `git-config(1)`
* `gitattributes(5)`
