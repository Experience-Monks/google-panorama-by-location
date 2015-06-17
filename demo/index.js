/*globals google*/
var test = require('tape')
var panorama = require('../')

var service = new google.maps.StreetViewService()
// var location = [ 51.50700703827454, -0.12791916931155356 ]
var location = [-3.850392,-32.440783]
var expected = [{'id': 'dXZfBMex9_L7jO2JW3FTdA', 'score': 756.916259765625, 'yaw': 134.95367, 'image_type': 1, 'latitude': 51.50706735455254, 'longitude': -0.1280162324293091}]

test('should get data without service', function (t) {
  t.plan(1)

  panorama(location, function (err, results) {
    if (err) return t.fail(err)
      console.log(results)
    t.deepEqual(results, expected)
  })
})

test('should get data with service', function (t) {
  panorama({
    service: service,
    location: location
  }, function (err, results) {
    if (err) return t.fail(err)
      console.log(results)
    // t.deepEqual(results[0].id, expected[0].id)
    // t.deepEqual(results, expected)
  })
})
