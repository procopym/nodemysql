let Response = (reply, data) => {
    return reply(data)
        .header('Access-Control-Allow-Origin', '*')
        .header('Access-Control-Allow-Headers', 'content-type')
        .header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
};

module.exports = Response;
