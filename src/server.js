(function(){
    'use strict';

    var restify = require('restify');
    var Bunyan = require('bunyan');
    var util = require('util');
    var path = require('path');

    var env = process.env.NODE_ENV || 'development';
    var config = require('../config/config')[env];


    var log = new Bunyan({
        name: 'rest-api',
        streams: [{
            stream: process.stdout,
            level: 'debug'
        }, {
            path: config.log.path,
            level: config.log.level || 'debug'
        }],
        serializers: {
            req: Bunyan.stdSerializers.req
        }
    });

    var server = restify.createServer({
        log: log
    });
   

    server.use(restify.bodyParser());
    server.use(restify.queryParser());
    server.use(restify.requestLogger());

    server.use(function(req, res, next) {
        req.config = config;
        next();
    });

    server.get(/\/docs\/?.*/, restify.serveStatic({
        directory: path.join(__dirname, '..', 'build'),
        default: 'index.html'
    }));

    // Load in the routes
    require('./routes/deals')(server);

    exports.startServer = function (callback) {

        var port = config.server.port;

        server.listen(port, config.server.host, function () {
            log.debug('%s server listening at %s', server.name, server.url);

            if (typeof callback === 'function'){
                callback(server);
            }
        });
    };

    exports.getLogger = function() {
        return log;
    };

    // Start the server if this file was executed.
    if (require.main === module){
        exports.startServer();
    }

})();