'use strict'

define(["socket_io"], function(io) {
    var socket_io = io.connect('http://' + document.domain + ':' + location.port + '/event');
    socket_io.on('connect', function() {
      console.log('connected!');
    });

    return socket_io;
});
