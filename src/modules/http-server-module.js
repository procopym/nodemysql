const Hapi = require('hapi');

class HttpServer {
    constructor(config){
        this.config = config;
        this.server = new Hapi.Server();
        this.setConnection();
        this.startServer();

        return this.server;
    }

    setConnection(){
        this.server.connection(this.config);
    }

    startServer(){
        this.server.start((err) => {
            if (err) {
                throw err;
            }
            console.log('Server running at:', this.server.info.uri);
        });
    }
}


module.exports = HttpServer;
