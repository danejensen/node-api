var api = require('../node-api.js');
var Apricot = require('apricot').Apricot


var gplacesdetail = new api.Client("https://maps.googleapis.com/maps/api/place/details/json?sensor=true&key=AIzaSyDieNDmrN2Ot7NPF5krqOGyNtjbdeb3gjU");
var gplaces = new api.Client("https://maps.googleapis.com/maps/api/place/search/json?radius=500&sensor=false&key=AIzaSyDieNDmrN2Ot7NPF5krqOGyNtjbdeb3gjU");
var geocode = new api.Client("http://maps.googleapis.com/maps/api/geocode/json?sensor=true");


geocode.get({address: 'new york'}, function(data){
  var p = {location: data.results[0].geometry.location.lat.toString() + "," + data.results[0].geometry.location.lng.toString()}
  gplaces.get(p, function(data){
    gplacesdetail.get({reference:data.results[0].reference}, function(data){
      Apricot.open(data.result.url, function(err, doc) {
        doc.find('img.pp-linked-photo');
        doc.each(function(el){
          console.log(el._attributes._nodes.src._nodeValue);
        });
      });
    });
  });
});

