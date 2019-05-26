class RouteModule {
    constructor(server) {
        this.server = server;
    }

    route(method, path, handler) {
        this.server.route({
            method,
            path,
            handler: (request, reply) => handler(request, reply)
        });
    }
}

module.exports = RouteModule;
