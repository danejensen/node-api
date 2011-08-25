url = require('url');
qs = require('querystring');

Object.extend = function(destination, source) {
    for (var property in source) {
        if (source.hasOwnProperty(property)) {
            destination[property] = source[property];
        }
    }
    return destination;
};


var Client = exports.Client = function(urlStr) {
  var urlObj = url.parse(urlStr, true);
  
  this.host = urlObj.hostname;
  this.path = urlObj.pathname;
  this.protocol = (urlObj.protocol == 'http:') ? require('http') : require('https');
  this.defaultParams = urlObj.query;
}

Client.prototype.get = function(params, callback){
  var callParams = Object.extend(params, this.defaultParams);
  
  var options = {
    host: this.host,
    path: this.path + '?' + qs.stringify(callParams),
    method: 'GET'
  }

  var req = this.protocol.get(options, function(res){
    var data = "";
    res.on('data', function(chunk){
      data += chunk;
    });
    res.on('close', function(){
      callback(JSON.parse(data));
    });
    res.on('end', function(){
      callback(JSON.parse(data));
    });
  }).on('error', function (err) { callback(err); });
  

  return ;
}


