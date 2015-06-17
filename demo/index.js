/*globals google*/
var test = require('tape')
var panorama = require('../')

var service = new google.maps.StreetViewService()
var location = [-3.850392, -32.440783]

test('should get photosphere data with service', function (t) {
  t.plan(4)
  panorama({
    service: service,
    location: location
  }, function (err, result) {
    if (err) return t.fail(err)
    t.deepEqual(result.id, 'FIBH8jtubItyC2AUqPhQFw')
    t.deepEqual(result.latitude, -3.850392)
    t.deepEqual(result.longitude, -32.44078300000001)
    t.deepEqual(typeof result.copyright, 'string', 'extra data')
  })
})
