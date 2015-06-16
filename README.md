# google-panorama-by-location

[![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)

Gets a Google StreetView Panorama by `[ lat, lng ]`. Uses `reqest` in Node and `xhr` in the browser.

This uses an undocumented API entry point, which may break or change at any time. This is mainly useful for unit testing in Node/browser without the entire Google JS API.

```js
var panorama = require('google-panorama-by-location')

panorama([ 51.50700703827454, -0.12791916931155356 ], function (err, results) {
  if (err) throw err

  // the resulting image type
  console.log(results[0].id)
  console.log(results[0].yaw)
  console.log(results[0].image_type)
})
```

## Usage

[![NPM](https://nodei.co/npm/google-panorama-by-location.png)](https://www.npmjs.com/package/google-panorama-by-location)

#### `panorama(opt, cb)`

Gets the panorama data at the given location, where `opt` can be an array of `[ latitude, longitude ]` or an options object with:

- `location` - the `[ lat, lng ]` array
- `radius` - the radius to search, defaults to 50

The Node-style callback uses the form `(err, results)`, where `err` will be non-null if one or more street views was found. `results` is an array of data from the request, typically containing `id`, `yaw`, `image_type`, `latitude` and `longitude` fields.

## License

MIT, see [LICENSE.md](http://github.com/Jam3/google-panorama-by-location/blob/master/LICENSE.md) for details.
