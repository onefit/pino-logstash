var util = require('util');
var dgram = require('dgram');

function logstashUDP(host, port, type, message, fields, callback) {
    var client = dgram.createSocket('udp4');
    var logObject = {
        '@timestamp': (new Date).toISOString(),
        type: type,
        message: message,
        fields: fields
    };
    var m = new Buffer(JSON.stringify(logObject));
    client.send(m, 0, m.length, port, host, function(err, bytes) {
        client.close();
        callback(err);
    });
}

logstashUDP('127.0.0.1', 10001, 'js', 'hello world', {'level': 'debug'}, function(err) {
    if(err) {
        console.log('Error logging: %s', util.inspect(err));
    }
});