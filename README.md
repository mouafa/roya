<p align="center"><img width="auto" src="https://raw.githubusercontent.com/mouafa/roya/master/assets/cover.png"></p>

Roya is a small low-level image comparison library.

[![npm version](https://badge.fury.io/js/roya.svg)](https://badge.fury.io/js/roya)
[![Coverage Status](https://coveralls.io/repos/github/mouafa/roya/badge.svg?branch=master)](https://coveralls.io/github/mouafa/roya?branch=master)
[![Build Status](https://api.travis-ci.org/mouafa/roya.svg?branch=master)](https://travis-ci.org/mouafa/roya#)

Inspired by [pixelmatch](https://github.com/mapbox/pixelmatch) with more bells and whistles.

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

`options` Optional object options with the following properties:

| Property       | Description                                                                                                    | Default     |
| -------------- | -------------------------------------------------------------------------------------------------------------- | ----------- |
| threshold      | Matching threshold, ranges from 0 to 1. Smaller values make the comparison more sensitive                      | 0.1         |
| highlightFade  | Highlight color intensity will depend on the pixel ditance value                                               | true        |
| highlightColor | The used highlight color, should be an array of [R,G,B] values                                                 | [255, 0, 0] |
| transparent    | Whether to keep the original image ot to use a blank convas to highlight the diff                              | false       |
| overlapse      | Whether to use the highlight color or use the changing pixel itself                                            | false       |
| method         | Matching and diffing method to be used, should be one of the available methods, rgb, rgbTuned, yiq or yiqTuned | 'rgb'       |

**P.S.** rgb method is the fastest but it might not be the best for your usecase, try the others method and pick the right one for you.

### Example:

| img1                            | img2                            |
| ------------------------------- | ------------------------------- |
| ![](testdrive/fixture/img1.png) | ![](testdrive/fixture/img2.png) |

| options                                        | result                                           |
| ---------------------------------------------- | ------------------------------------------------ |
| `undefined`                                    | ![](testdrive/fixture/diff_default.png)          |
| `{ threshold: 0.5 }`                           | ![](testdrive/fixture/diff_higher_threshold.png) |
| `{ highlightColor: [255, 255, 0] }`            | ![](testdrive/fixture/diff_yellow.png)           |
| `{ highlightFade: false }`                     | ![](testdrive/fixture/diff_solid.png)            |
| `{ transparent: true, highlightFade: false }`  | ![](testdrive/fixture/diff_transparent.png)      |
| `{ overlapse: true, transparent: true }`       | ![](testdrive/fixture/diff_overlapse.png)        |
|                                                |
| `{ method: 'rgb', highlightFade: false }`      | ![](testdrive/fixture/diff_method_rgb.png)       |
| `{ method: 'rgbTuned', highlightFade: false }` | ![](testdrive/fixture/diff_method_rgbTuned.png)  |
| `{ method: 'yiq', highlightFade: false }`      | ![](testdrive/fixture/diff_method_yiq.png)       |
| `{ method: 'yiqTuned', highlightFade: false }` | ![](testdrive/fixture/diff_method_yiqTuned.png)  |

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
