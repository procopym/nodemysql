let RequestModel = require('../models/request-model');
let Response = require('../view/response-module');

class RequestController {
    constructor() {
        this.requestModel = new RequestModel();
    }

    helloWorldAction(request, reply) {
        return reply('hello world');
    }

    getData(request, reply) {
        const requestNumber = request.params.reqno ? request.params.reqno : 0;
        this.requestModel.getData(requestNumber, (error, results, fields) => {
            if (error) {
                return Response(reply, {
                    success: false,
                    message: error.sqlMessage
                });
            }

            return Response(reply, {
                success: true,
                data: results
            });
        });

        return;
    }

    deteleData(request, reply) {
        const requestNumber = request.params.reqno;
        this.requestModel.deteleData(requestNumber, (error, results, fields) => {
            if (error) {
                console.log(error);

                return Response(reply, {
                    success: false,
                    message: error.sqlMessage
                });
            } else if (results.affectedRows < 1) {
                // console.log(results.affectedRows);

                return Response(reply, {
                    success: false,
                    data: results
                });
            }

            return Response(reply, {
                success: true,
                data: results
            });
        });

        return;
    }

    addData(request, reply) {
        const description = request.payload.description;
        const user = request.payload.user;
        const dateObj = new Date();
        let month = dateObj.getMonth() + 1;
        month = month < 10 ? '0' + month : month;
        let day = dateObj.getDate();
        day = day < 10 ? '0' + day : day;
        const date = dateObj.getFullYear() + '-' + month + '-' + day;
        const status = 1;

        this.requestModel.addData(description, date, status, user, (error, results, fields) => {
            if (error) {
                return Response(reply, {
                    success: false,
                    message: error.sqlMessage
                });
            }

            return Response(reply, {
                success: true
            });
        });

        return;
    }

    updateData(request, reply) {
        const reqno = request.payload.reqno;
        const description = request.payload.description;
        const user = request.payload.user;

        this.requestModel.updateData(reqno, description, user, (error, results, fields) => {
            if (error) {
                console.log(error);
                return Response(reply, {
                    success: false,
                    message: error.sqlMessage
                });
            } else if (results.affectedRows < 1) {
                // console.log(results.affectedRows);
                return Response(reply, {
                    success: false,
                    data: results
                });
            }


            return Response(reply, {
                success: true,
                data: results
            });
        });

        return;


    }
}

module.exports = RequestController;
