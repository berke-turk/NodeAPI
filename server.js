const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var path = require('path'),
    __parentDir = path.dirname(process.mainModule.filename);
const db = require(__parentDir + '/my_modules/db');
const fs = require('fs');
const funcs = require(__parentDir + '/functions/functions');


// Static use
app.use('/static', express.static(__dirname + '/static'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
//

// Routers
var routers = {
    user: require(__parentDir + '/routers/user/userRouter'),
    login: require(__parentDir + '/routers/login/loginRouter'),
};
//

// Routing
app.use('/api/user', routers.user);
app.use('/api/login', routers.login);
//

// Pages
app.get('/', (request, response) => {
    console.log("Index Page");
    response.end();
});
app.get('/:page', (request, response) => {
    response.header('content-type', 'text/html; utf-8');
    fs.readFile(__parentDir + '/pages/' + request.params.page + ".html", (err, data) => {
        if (err) { funcs.errorPage404(response); return; }

        response.end(data);
    });

});
//

app.get('*', (request, response) => {
    funcs.errorPage404(response); return;
});

app.listen(80); // Listen port

console.log("Started the server!");