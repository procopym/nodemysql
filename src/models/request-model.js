const DbConfig = require('../config/db-config');
let Db = require('../modules/db-module');

class RequestModel {
    constructor() {
        this.db = new Db({...DbConfig});
    }

    getData(requestNumber, callback) {
        const sqlQuery = `select reqno, description, date, user from requests where 0 = "${requestNumber}" or reqno = "${requestNumber}"`;
        return this.db.query(sqlQuery, callback);
    }

    deteleData(requestNumber, callback) {
        const sqlQuery = `delete from requests where  reqno = "${requestNumber}"`;
        return this.db.query(sqlQuery, callback);
    }

    addData(description, date, status, user, callback) {
        const sqlQuery = `INSERT INTO requests (description,date,status,user) VALUES ("${description}","${date}","${status}","${user}")`;
        return this.db.query(sqlQuery, callback);
    }

    updateData(reqno, description, user, callback) {
        const sqlQuery = `update requests set description = "${description}",user = "${user}" where reqno = ${reqno}`;
        return this.db.query(sqlQuery, callback);
    }

}


module.exports = RequestModel;
