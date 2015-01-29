angular.module('auroraWatchUK.services', [])

.factory('Links', function() {

  var links = [{
    id: 0,
    name: 'Aurora Watch UK website',
    url:'http://aurorawatch.lancs.ac.uk/'
  }, {
    id: 1,
      name: 'Aurora Watch UK on Twitter',
      url:'https://twitter.com/aurorawatchuk'
  }, {
    id: 2,
      name: 'Aurora Watch UK on Facebook',
      url:'https://www.facebook.com/aurorawatchuk'
  }, {
    id: 3,
      name: 'Aurora Watch UK on Flickr',
      url:'http://www.flickr.com/groups/aurorawatch'
  }, {
    id: 4,
      name: 'Top Spots',
      url:'http://aurorawatch.lancs.ac.uk/photo_sites'
  }, {
    id: 4,
      name: 'Aurora Watch UK Report Sighting',
      url:'http://aurorawatch.lancs.ac.uk/cgi-bin/report_sighting'
  }];

  return {
    all: function() {
      return links;
    }
  }
})
