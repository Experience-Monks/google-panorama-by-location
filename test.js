var getPanorama = require('./')
var test = require('tape')

test('gets a Google StreetView by [ lat, lng ]', function (t) {
  t.plan(6)

  getPanorama([ 51.50700703827454, -0.12791916931155356 ], function (err, res) {
    if (err) return t.fail(err)
    t.deepEqual(res[0].id, 'dXZfBMex9_L7jO2JW3FTdA', 'id')
    t.deepEqual(res[0].yaw, 134.95367, 'yaw')
    t.deepEqual(res[0].image_type, 1, 'image_type')
    t.deepEqual(res[0].latitude, 51.50706735455254, 'lat')
    t.deepEqual(res[0].longitude, -0.1280162324293091, 'long')
  })

  getPanorama({
    location: [ 51.50700703827454, -0.12791916931155356 ],
    radius: 50
  }, function (err, res) {
    if (err) return t.fail(err)
    t.deepEqual(res[0].id, 'dXZfBMex9_L7jO2JW3FTdA', 'id')
  })
})

test('fails gracefully', function (t) {
  t.plan(2)

  getPanorama([ 521.50700703827454, -0.12791916931155356 ], function (err, res) {
    if (err) {
      t.equal(typeof err.message, 'string', 'got error')
    } else {
      t.ok(false, 'did not get error')
    }
  })

  getPanorama({
    location: [ 51.50700703827454, -0.12791916931155356 ],
    radius: 1
  }, function (err, res) {
    if (err) {
      t.equal(typeof err.message, 'string', 'got error on small radius')
    } else {
      t.ok(false, 'did not get error on small radius')
    }
  })

  if (typeof window !== 'undefined' && window.close) {
    setTimeout(function () {
      window.close()
    }, 3000)
  }
})
