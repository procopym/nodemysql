'use strict';

const Hapi = require('hapi');
const MySQL = require('mysql');
// Create a server with a host and port
const server = new Hapi.Server();

const connection = MySQL.createConnection({
     host: 'localhost',
     user: 'root',
     password: '',
     database: 'imobile'
});

server.connection({
    host: 'localhost',
    port: 8038
});


server.route({
    method: 'GET',
    path: '/helloworld',
    handler: function (request, reply) {
        return reply('hello world');
    }
});
// Start the server
server.start((err) => {

    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});


server.route({
    method: 'GET',
    path: '/getdata/{reqno?}',
    handler: function (request, reply) {
		
       var reqno = request.params.reqno?request.params.reqno:0;
	     
	   console.log(reqno);
	   
       connection.query('select reqno, description, date, status from requests where 0 = "'+reqno+'" or reqno = " ' + reqno + '"',
       function (error, results, fields) {
       if (error) {
		   console.log('Data not found!');
		   return;
	   };

       reply(results);
    });
  }
});

server.route({
    method: 'POST',
    path: '/newrequest',
    handler: function (request, reply) {
    const description = request.payload.description;
    const date = request.payload.date;
	const status = request.payload.status;
	const user = request.payload.user;

    connection.query('INSERT INTO requests (description,date,status,user) VALUES ("' + description + '","' + date + '","' + status + '","' + user + '")',
    function (error, results, fields) {
        if (error) throw error;

        reply(results);
    });
}
});
