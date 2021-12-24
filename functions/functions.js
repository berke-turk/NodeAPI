var path = require('path'),
    __parentDir = path.dirname(process.mainModule.filename);
const db = require(__parentDir + '/my_modules/db');
const fs = require('fs');


class Functions {

    Authorization(table, request, response, callback) {

        if (request.headers['authorization'] == null) { response.status(500).json(); return; }
        var authorization = request.headers['authorization'].split(' ');
        if (authorization[0] != "Bearer" || authorization[1] == null) { response.status(500).json(); return; }

        db.query("SELECT id FROM " + table + " WHERE token = ?", [authorization[1]], (err, result, fields) => {
            if (err) throw err;
            if (result[0] == null) { response.status(500).json(); return; }

            let data = result[0];
            callback(parseInt(data.id));
        });
    }

    errorPage404(response) {
        fs.readFile(__parentDir + '/static/html/404.html', (err, data) => {
            if (err) { response.status(400).json(); return; }

            response.status(400);
            response.end(data);
        });
    }
}

module.exports = new Functions();