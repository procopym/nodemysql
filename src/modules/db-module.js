const MySQL = require('mysql');

class Db {
    constructor(config){
        this.connection = MySQL.createConnection(config);
    }

    getConnection() {
        return this.connection;
    }

    query(slqQuery, callback) {
        return  this.connection.query(slqQuery, callback);
    }
}

module.exports = Db;
