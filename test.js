var getPanorama = require('./node')
var test = require('tape')

test('gets a Google StreetView by [ lat, lng ]', function (t) {
  t.plan(4)

  getPanorama([ 51.50700703827454, -0.12791916931155356 ], function (err, res) {
    if (err) return t.fail(err)
    t.deepEqual(res.id, 'dXZfBMex9_L7jO2JW3FTdA', 'id')
    t.deepEqual(res.latitude, 51.50706735455254, 'lat')
    t.deepEqual(res.longitude, -0.1280162324293091, 'long')
  })

  getPanorama([ 51.50700703827454, -0.12791916931155356 ], {
    radius: 50
  }, function (err, res) {
    if (err) return t.fail(err)
    t.deepEqual(res.id, 'dXZfBMex9_L7jO2JW3FTdA', 'id')
  })
})

test('photosphere only works with service', function (t) {
  t.plan(1)
  getPanorama([ -21.203982, -159.83700899999997 ], function (err) {
    if (err) t.ok(true, 'got error')
    else t.ok(false, 'expected error')
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

  getPanorama([ 51.50700703827454, -0.12791916931155356 ], {
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
