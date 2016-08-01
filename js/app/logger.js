'use strict'

define(['jquery', 'materialize'], function(jQuery){

    var logger = {
        log: function(log_object) {
            var currentDate = new Date();
            var time = ('0' + currentDate.getHours()).slice(-2) + ':' + ('0' + (currentDate.getMinutes())).slice(-2);
            $("#logs-panel .card-content").append("<div class='log-item'><span class='log-date'>" + time + "</span><p class='" + log_object.color + "'>" + log_object.message + "</p></div>");
            if (!$('#logs-panel').is(":visible")) {
              Materialize.toast(log_object.message, 3000);
            }
        }
    };

    return logger;

});
