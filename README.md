# md

[![NPM version](https://img.shields.io/npm/v/md.svg?style=flat)](https://npmjs.com/package/md) [![NPM downloads](https://img.shields.io/npm/dm/md.svg?style=flat)](https://npmjs.com/package/md) [![Build Status](https://img.shields.io/circleci/project/egoist/md/master.svg?style=flat)](https://circleci.com/gh/egoist/md) [![codecov](https://codecov.io/gh/egoist/md/branch/master/graph/badge.svg)](https://codecov.io/gh/egoist/md)
 [![donate](https://img.shields.io/badge/$-donate-ff69b4.svg?maxAge=2592000&style=flat)](https://github.com/egoist/donate)

> This is a fork of [marked](https://github.com/chjj/marked)

**Why?**

- Actively maintained
- Rewrote in ES6 and bundled with Rollup for smaller size (15KB)
- Support more GFM extras like [task lists](https://github.com/blog/1375-task-lists-in-gfm-issues-pulls-comments)

## Install

```bash
yarn add md
```

You can find a CDN version at https://unpkg.com/md/

## Usage

```js
const md = require('md')

const html = md(`## hello world

A modern **markdown** parser!

- [ ] todo
- [x] done
`)
```

You can preview the HTML result here: https://egoist.moe/md2html/ ([source](https://github.com/egoist/md2html))

## API

### md(src, [options])

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

##### linksInNewTab

Type: `boolean | (href: string) => boolean`<br>
Default: `undefined`

Open links in a new window/tab.

##### dataLine

Type: `boolean`<br>
Default: `true`

Add `data-line` attribute to `<pre>` tag for code fences, it's useful with the [line-highlight](http://prismjs.com/plugins/line-highlight/) plugin in PrismJS. 

````markdown
```js{1}
console.log('hi')
```
````

This will yield:

```html
<pre data-line="1"><code class="lang-js">console.log('hi')</code></pre>
```

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D


## Development

```bash
# lint and unit test
yarn test

# lint only
yarn lint

# fix lint issues
yarn lint -- --fix
```

## Author

**md** © [egoist](https://github.com/egoist), Released under the [MIT](./LICENSE) License.<br>
Authored and maintained by egoist with help from contributors ([list](https://github.com/egoist/md/contributors)).

> [egoist.moe](https://egoist.moe) · GitHub [@egoist](https://github.com/egoist) · Twitter [@_egoistlily](https://twitter.com/_egoistlily)
