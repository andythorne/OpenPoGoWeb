'use strict';

define(["app/map", "app/socket", "settings", "app/logger"], function(map, socket, settings, logger){
    return {
        boot: function(){
            map.init();

            socket.on('logging', function(msg) {
              for(var i = 0; i < msg.length; i++) {
                logger.log({
                  message: msg[i].output,
                  color: msg[i].color + "-text"
                });
              }
            });

            socket.on('position', function(msg) {
                map.updateTrainerPosition(msg.user, {
                    lat: msg.coords[0],
                    lng: msg.coords[1]
                })
            });
        }
    }
});
