# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="2.3.5"></a>
## [2.3.5](https://github.com/npm/npm-merge-driver/compare/v2.3.4...v2.3.5) (2017-12-06)


### Bug Fixes

* **engines:** actually remove this altogether. causes more problems than it solves ([65a60aa](https://github.com/npm/npm-merge-driver/commit/65a60aa))
* **engines:** Change npm engine specification to >=5. ([#1](https://github.com/npm/npm-merge-driver/issues/1)) ([cafda00](https://github.com/npm/npm-merge-driver/commit/cafda00))



<a name="2.3.4"></a>
## [2.3.4](https://github.com/npm/npm-merge-driver/compare/v2.3.3...v2.3.4) (2017-12-05)



<a name="2.3.3"></a>
## [2.3.3](https://github.com/npm/npm-merge-driver/compare/v2.3.2...v2.3.3) (2017-12-05)


### Bug Fixes

* **install:** manually replace $HOME ([ae40f2d](https://github.com/npm/npm-merge-driver/commit/ae40f2d))



<a name="2.3.2"></a>
## [2.3.2](https://github.com/npm/npm-merge-driver/compare/v2.3.1...v2.3.2) (2017-12-05)


### Bug Fixes

* **install:** be a bit smarter about adding to attributes files ([a046cbc](https://github.com/npm/npm-merge-driver/commit/a046cbc))



<a name="2.3.1"></a>
## [2.3.1](https://github.com/npm/npm-merge-driver/compare/v2.3.0...v2.3.1) (2017-12-04)


### Bug Fixes

* **legacy:** warn people that legacy mode might throw away some of their changes ([d633205](https://github.com/npm/npm-merge-driver/commit/d633205))



<a name="2.3.0"></a>
# [2.3.0](https://github.com/npm/npm-merge-driver/compare/v2.2.0...v2.3.0) (2017-12-04)


### Features

* **legacy:** add legacy command support ([361dec7](https://github.com/npm/npm-merge-driver/commit/361dec7))
* **log:** add stderr logging ([184d6ec](https://github.com/npm/npm-merge-driver/commit/184d6ec))



<a name="2.2.0"></a>
# [2.2.0](https://github.com/npm/npm-merge-driver/compare/v2.1.0...v2.2.0) (2017-12-03)


### Features

* **uninstall:** add uninstaller ([a42a4de](https://github.com/npm/npm-merge-driver/commit/a42a4de))



<a name="2.1.0"></a>
# [2.1.0](https://github.com/npm/npm-merge-driver/compare/v2.0.1...v2.1.0) (2017-12-03)


### Features

* **global:** add --global flag for global installation ([b9c131f](https://github.com/npm/npm-merge-driver/commit/b9c131f))



<a name="2.0.1"></a>
## [2.0.1](https://github.com/npm/npm-merge-driver/compare/v2.0.0...v2.0.1) (2017-12-03)


### Bug Fixes

* **merge:** make sure to merge the right lockfile ([09f6b25](https://github.com/npm/npm-merge-driver/commit/09f6b25))



<a name="2.0.0"></a>
# [2.0.0](https://github.com/npm/npm-merge-driver/compare/v1.0.2...v2.0.0) (2017-12-03)


### Bug Fixes

* **deps:** force unbump of broken rxjs version ([72dcd14](https://github.com/npm/npm-merge-driver/commit/72dcd14))


### Features

* **non-npm:** add support for running non-npm commands ([aee4e70](https://github.com/npm/npm-merge-driver/commit/aee4e70))


### BREAKING CHANGES

* **non-npm:** this removes the --npm-bin option in favor of --command



<a name="1.0.2"></a>
## [1.0.2](https://github.com/npm/npm-merge-driver/compare/v1.0.1...v1.0.2) (2017-12-03)


### Bug Fixes

* **deps:** accidentally added devdeps to deps object ([f865567](https://github.com/npm/npm-merge-driver/commit/f865567))



<a name="1.0.1"></a>
## [1.0.1](https://github.com/npm/npm-merge-driver/compare/v1.0.0...v1.0.1) (2017-12-03)


### Bug Fixes

* **docs:** fix some badges. oops. ([0cdfbfc](https://github.com/npm/npm-merge-driver/commit/0cdfbfc))



<a name="1.0.0"></a>
# [1.0.0](https://github.com/npm/npm-merge-driver/compare/v0.0.0...v1.0.0) (2017-12-03)


### Features

* **api:** set up install and merge as separate command ([76072b9](https://github.com/npm/npm-merge-driver/commit/76072b9))


### BREAKING CHANGES

* **api:** This changes the install api to `npm-merge-driver install [opts]`, and the merge api to `npm-merge-driver merge <npm-bin> <current> <old> <theirs> <filename>`.



<a name="0.0.0"></a>
# 0.0.0 (2017-12-02)


### Bug Fixes

* **merge:** get merging working right ([28af1f2](https://github.com/npm/npm-merge-driver/commit/28af1f2))
