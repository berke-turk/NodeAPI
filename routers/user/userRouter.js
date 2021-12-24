const express = require('express');
const router = express.Router();
var path = require('path'),
    __parentDir = path.dirname(process.mainModule.filename);
const db = require(__parentDir + '/my_modules/db');
const funcs = require(__parentDir + '/functions/functions');
const DataTypes = require(__parentDir + '/models/dataTypes');

// Get All Users
router.get('/', (request, response) => {
    db.query("SELECT name, email, createdAt FROM user", (err, result, fields) => {
        if (err) throw err;
        response.status(200).json({ success: true, users: result });
    });
});


// Get User
router.get('/:id', (request, response) => {
    db.query("SELECT name, email, createdAt FROM user WHERE id = ?", [request.params.id], (err, result, fields) => {
        if (err) throw err;
        let user = result[0];
        response.status(200).json({ success: true, user: user });
    });
});

// Update User
router.put('/:id', (request, response) => {
    funcs.Authorization("user", request, response, (userID) => {
        var body = request.body;
        var fields = { name: DataTypes.STRING, email: DataTypes.STRING };
        var sqlParam = "";
        for (const key in body) {
            if (fields[key] == null) { response.status(400).json(); return; }

            if (fields[key] == DataTypes.STRING)
                body[key] = "'" + body[key] + "'";
            else if (fields[key] == DataTypes.DOUBLE)
                body[key] = parseFloat(body[key]);

            if (sqlParam == "")
                sqlParam = key + " = " + body[key];
            else
                sqlParam += ", " + key + " = " + body[key];
        }
        if (sqlParam == "") { response.status(400).json(); return; }

        // Update
        db.query("UPDATE user SET " + sqlParam + " WHERE id = ?", [userID], (err, result, fields) => {
            if (err) throw err;
            response.status(200).json({ success: true });
        });
    });
});

module.exports = router;