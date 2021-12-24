const express = require('express');
const router = express.Router();
var path = require('path'),
    __parentDir = path.dirname(process.mainModule.filename);
const db = require(__parentDir + '/my_modules/db');
const md5 = require('md5');


router.use((request, response, next) => {
    var body = request.body;
    if (body.email == null || body.password == null) { response.status(400).json(); return; }

    next();
});

router.post('/', (request, response) => {
    var body = request.body;
    db.query("SELECT id, name, password FROM user WHERE email = ?", [body.email], (err, result, fields) => {
        if (err) throw err;
        if (result[0] == null) { response.status(200).json({ success: false }); return; }

        let user = result[0];
        if (user.password != body.password) { response.status(200).json({ success: false }); return; }

        // Create Token
        var tokenJson = { id: user.id, name: user.name, createdAt: Date.now() };
        var token = md5(JSON.stringify(tokenJson));
        db.query("UPDATE user SET token = ? WHERE id = ?", [token, user.id], (err, result, fields) => {
            if (err) throw err;
            response.status(200).json({ success: true, token: token });
        });
    });
});
module.exports = router;