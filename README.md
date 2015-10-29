# google-panorama-by-location

[![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)

Gets a Google StreetView Panorama by `[ lat, lng ]`, supports API v3.20-v3.22. Also features some Node support.

```js
var panorama = require('google-panorama-by-location')

var location = [ 51.50700703827454, -0.12791916931155356 ]
panorama(location, function (err, result) {
  if (err) throw err
  
  // pano ID
  console.log(result.id)

  // actual latitude, longitude
  console.log(result.latitude)
  console.log(result.longitude)

  // other details from Google API
  console.log(result.copyright)
})
```

In Node, the request uses an undocumented API entry-point, using [xhr-request](https://www.npmjs.com/package/xhr-request). It only provides `{ id, latitude, longitude }`. This is mostly useful for unit testing.

## Usage

[![NPM](https://nodei.co/npm/google-panorama-by-location.png)](https://www.npmjs.com/package/google-panorama-by-location)

#### `panorama(location, [opt], cb)`

Gets the panorama data at the given `location`, which is an array of `[ latitude, longitude ]`. The `opt` object is optional, containing:

- `radius` - the radius to search, defaults to 50
- `service` - (browser only) the Google API `StreetViewService` to use, defaults to a new instance

In API v3.21+, you can also pass `preference` and `source` for the [StreetViewLocationRequest](https://developers.google.com/maps/documentation/javascript/3.exp/reference#StreetViewLocationRequest).

The Node-style callback uses the form `(err, result)`, where `err` will be null if a street view was found. On success, `result` is an object containing:

```js
{
  id: String, // pano ID
  latitude: Number,
  longitude: Number
}
```

In the browser, the `result` object will also contain other details from `StreetViewService`, like `copyright`. 

## node

The [node.js](./node.js) entry point uses [xhr-request](https://github.com/maxogden/xhr-request) to request the JSON, so it works in both Node and the Browser. This means you can require it for demos and quick unit testing in the browser, without bringing in the entire Google Client library. 

```js
var panorama = require('google-panorama-by-location/node')

panorama([ lat, lng ], callback)
```

However, this is not recommended for production, since it uses an undocumented API entry point.

## See Also

- [google-panorama-by-id](https://github.com/Jam3/google-panorama-by-id)
- [google-panorama-equirectangular](https://github.com/mattdesl/google-panorama-equirectangular)

## License

MIT, see [LICENSE.md](http://github.com/Jam3/google-panorama-by-location/blob/master/LICENSE.md) for details.
