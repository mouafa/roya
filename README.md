# Roya

Roya is a small low-level image comparison library.

[![npm version](https://badge.fury.io/js/roya.svg)](https://badge.fury.io/js/roya)
[![Coverage Status](https://coveralls.io/repos/github/mouafa/roya/badge.svg?branch=master)](https://coveralls.io/github/mouafa/roya?branch=master)
[![Build Status](https://api.travis-ci.org/mouafa/roya.svg?branch=master)](https://travis-ci.org/mouafa/roya#)

Inspired by [pixelmatch](https://github.com/mapbox/pixelmatch)

## Installation

using yarn

```bash
yarn add roya
```

using npm

```bash
npm i -S roya
```

### API

```
roya(img1, img2, [, options])
```

`img1`, `img2` — Image data of type `Buffer` of the images to compare

`options` is an object literal with the following properties:

| Property  | Description                                                                               | Default |
| --------- | ----------------------------------------------------------------------------------------- | ------- |
| threshold | Matching threshold, ranges from 0 to 1. Smaller values make the comparison more sensitive | 0.1     |

## Usage

```js
const fs = require('fs')
const PNG = require('pngjs').PNG
const roya = require('roya')

var img1 = fs
  .createReadStream('img1.png')
  .pipe(new PNG())
  .on('parsed', parsed)

var img2 = fs
  .createReadStream('img2.png')
  .pipe(new PNG())
  .on('parsed', parsed)

let done = 0
function parsed() {
  done++
  if (done < 2) return
  const out = roya(img1.data, img2.data)

  const diff = new PNG({ width: img1.width, height: img1.height })

  diff.data = out.data

  diff
    .pack()
    .pipe(fs.createWriteStream('diff.png'))
    .on('finish', () => console.log('done'))
}
```

**P.S.** image dimensions must be equal.
