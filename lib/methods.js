const YIQ = require('./YIQ')
const RGB = require('./RGB')

module.exports = {
  rgb: RGB.rgbDistance,
  rgbTuned: RGB.rgbDistanceTuned,
  yiq: YIQ.rgb2yiqDistance,
  yiqTuned: YIQ.rgb2yiqDistanceTuned
}
