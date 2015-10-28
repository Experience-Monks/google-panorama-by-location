/*globals google*/
var assign = require('object-assign')

module.exports = function panoramaByLocation (location, opt, cb) {
  if (!location || !Array.isArray(location)) {
    throw new TypeError('must provide location [ lat, lng ]')
  }

  if (typeof opt === 'function') {
    cb = opt
    opt = {}
  }

  opt = assign({
    radius: 50
  }, opt)
  
  var service = opt.service
  if (!service) {
    if (typeof google === 'undefined' || !google.maps || !google.maps.LatLng) {
      throw new Error('tried to use Google API without "google.maps" in global scope\n'
        + '  try using \'google-panorama-by-location/node.js\' instead')
    }
    service = new google.maps.StreetViewService()
  }

  var latLng = new google.maps.LatLng(location[0], location[1])

  if (typeof service.getPanorama === 'function') {
    // v3.21
    opt.location = latLng
    service.getPanorama({
      location: latLng,
      preference: opt.preference,
      radius: opt.radius,
      source: opt.source
    }, handleResponse)
  } else if (typeof service.getPanoramaByLocation === 'function') {
    // v3.20
    service.getPanoramaByLocation(latLng, opt.radius, handleResponse)
  } else {
    throw new TypeError('must provide valid service with getPanorama or getPanoramaByLocation')
  }

  function handleResponse (result, status) {
    if (/^ok$/i.test(status)) {
      result.id = result.location.pano
      result.latitude = result.location.latLng.lat()
      result.longitude = result.location.latLng.lng()
      cb(null, result)
    } else {
      cb(new Error('could not find street view at: [ ' + location.join(', ') + ' ]'))
    }
  }
}
