[![npm](https://img.shields.io/npm/v/srisum.svg)](https://npm.im/srisum) [![license](https://img.shields.io/npm/l/srisum.svg)](https://npm.im/srisum) [![Travis](https://img.shields.io/travis/npm/npm-merge-driver.svg)](https://travis-ci.org/npm/npm-merge-driver) [![AppVeyor](https://ci.appveyor.com/api/projects/status/github/npm/npm-merge-driver?svg=true)](https://ci.appveyor.com/project/npm/npm-merge-driver) [![Coverage Status](https://coveralls.io/repos/github/npm/npm-merge-driver/badge.svg?branch=latest)](https://coveralls.io/github/npm/npm-merge-driver?branch=latest)

# npm-merge-driver(1) -- git merge driver for automatic merging of npm files

## Installing

It's recommended to use `npm-merge-driver` through `npx`, or else to install it
as a local `devDependency`.

This merge driver works only with `npm@>=5.7`.

### Configuring git

Some assembly is required before you can start auto-merging those lockfiles!

Automatic (recommended):
```
$ cd /your/project/dir
$ npx npm-merge-driver --install
```

Manual:

Add the driver to `.git/config`:
```
$ git config merge."npm-merge-driver".name \
    "Automatically merge npm lockfiles"
$ git config merge."npm-merge-driver".driver \
    "npx npm-merge-driver %A %O %B %P"
```

Add the relevant attributes to `.gitattributes` or `.git/info/attributes`:
```
package-lock.json merge=npm-merge-driver
npm-shrinkwrap.json merge=npm-merge-driver
```

Globally: Do the manual steps, on your global or system configurations.

## AUTHOR

Written by [Kat Marchan](https://github.com/zkat)

## REPORTING BUGS

Please file any relevant issues [on Github.](https://github.com/npm/npm-merge-driver)

## LICENSE

This work is released under the terms of the ISC license. See `LICENSE.md` for details.

## SEE ALSO

* `git-config(1)`
* `gitattributes(5)`
