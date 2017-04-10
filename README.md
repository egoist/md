# marked2

[![NPM version](https://img.shields.io/npm/v/marked2.svg?style=flat)](https://npmjs.com/package/marked2) [![NPM downloads](https://img.shields.io/npm/dm/marked2.svg?style=flat)](https://npmjs.com/package/marked2) [![Build Status](https://img.shields.io/circleci/project/egoist/marked2/master.svg?style=flat)](https://circleci.com/gh/egoist/marked2) [![codecov](https://codecov.io/gh/egoist/marked2/branch/master/graph/badge.svg)](https://codecov.io/gh/egoist/marked2)
 [![donate](https://img.shields.io/badge/$-donate-ff69b4.svg?maxAge=2592000&style=flat)](https://github.com/egoist/donate)

> This is a fork of [marked](https://github.com/chjj/marked)

**Why?**

- Actively maintained
- Rewrote in ES6 and bundled with Rollup for smaller size (15KB)
- Support more GFM extras like [task lists](https://github.com/blog/1375-task-lists-in-gfm-issues-pulls-comments)

## Install

```bash
yarn add marked2
```

You can find a CDN version at https://unpkg.com/marked2/

## Usage

```js
const marked2 = require('marked2')

const html = marked2(`## hello world

A modern **markdown** parser!

- [ ] todo
- [x] done
`)
```

You can preview the HTML result here: https://egoistian.com/md2html/ ([source](https://github.com/egoist/md2html))

## API

### marked2(src, [options])

#### src

Type: `string`<br>
Required: `true`

Input markdown string.

#### options

All marked [options](https://github.com/chjj/marked#options-1) plus:

##### taskLists

Type: `boolean`<br>
Default: `true`

Enable GFM task lists, this will only work if `options.gfm` is `true`.

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D


## Author

**marked2** © [egoist](https://github.com/egoist), Released under the [MIT](./LICENSE) License.<br>
Authored and maintained by egoist with help from contributors ([list](https://github.com/egoist/marked2/contributors)).

> [egoistian.com](https://egoistian.com) · GitHub [@egoist](https://github.com/egoist) · Twitter [@rem_rin_rin](https://twitter.com/rem_rin_rin)
