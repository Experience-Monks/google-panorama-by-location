/*globals google*/
var defined = require('defined')

module.exports = function panoramaByLocation (opt, cb) {
  opt = opt || {}
  if (Array.isArray(opt)) {
    opt = { location: opt }
  }
  var location = opt.location
  if (!location) {
    throw new TypeError('must provide location [ lat, lng ]')
  }
  var radius = defined(opt.radius, 50)
  var service = opt.service
  if (!service) {
    if (typeof google === 'undefined' || !google.maps) {
      throw new Error('tried to use Google API without "google.maps" in global scope\n'
        + '  try using \'google-panorama-by-location/node.js\' instead')
    }
    service = new google.maps.StreetViewService()
  }

  if (typeof service.getPanoramaByLocation !== 'function') {
    throw new TypeError('must provide valid service with getPanoramaByLocation')
  }
  service.getPanoramaByLocation({
    lat: location[0],
    lng: location[1]
  }, radius, function (result, status) {
    if (/^ok$/i.test(status)) {
      result.id = result.location.pano
      result.latitude = result.location.latLng.lat()
      result.longitude = result.location.latLng.lng()
      cb(null, result)
    } else {
      cb(bail(location))
    }
  })
}

function bail (location) {
  return new Error('could not find street view at: [ ' + location.join(', ') + ' ]')
}
