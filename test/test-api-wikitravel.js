//This uses node-api to hit wikitravels api

var api = require('../node-api.js');

var city_info = new api.Client("http://wikitravel.org/wiki/en/api.php?action=query&prop=revisions&format=json&rvprop=content");
var city_image = new api.Client("http://wikitravel.org/wiki/en/api.php?action=query&prop=images&format=json&rvprop=url")

city_info.get({titles:'Austin'}, function(data){console.log(data);});

