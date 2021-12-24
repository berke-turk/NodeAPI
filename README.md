# NodeAPI
Web &amp; RestfulAPI template with MySQL database

## Few fixes before launch
* ### Install Database
1. You can run the "**db.sql**" file in the "**/my_modules**" folder on the database you created.
* ### Connection fix
1. Go to "**/my_modules**" folder,
2. Edit the "**db.js**" file.
``` response.header('content-type', 'text/html; utf-8');
var connection = mysql.createConnection({
    host: 'HOSTNAME',
    user: 'USERNAME',
    password: 'PASSWORD',
    database: 'DATABASE_NAME'
});
```
## You can also edit the port setting if you want
* Open holy "**server.js**" located in main folder,
* The port number is 80 by default. You can change it if you want.
```
app.listen(PORT_NUMBER); // Listen port
```
## Run app
* Open console while in project folder,
* Write "**node server.js**" to console,
* The server has started!

## URLs
* ### /api/user
  * **Sample** : domain.com/api/user
   * **GET** : ***success***
    ```
    {
        "success": true,
        "users": [
            {
                "name": "Joe",
                "email": "joe@mail.com",
                "createdAt": "2021-12-23T20:20:04.000Z"
            },
            {
                "name": "Doe",
                "email": "doe@mail.com",
                "createdAt": "2021-12-23T20:20:39.000Z"
            }
        ]
    }
    ```
* ### /api/user/:id 
  *  **Sample** : domain.com/api/user/59 -> request.params.id : 59
   * **GET** : ***success***
    ```
    {
        "success": true,
        "user": {
                "name": "Joe",
                "email": "joe@mail.com",
                "createdAt": "2021-12-23T20:20:04.000Z"
            }
    }
     ```
   * **GET** : ***failure***
      ```
      {
          "success": false
      }
      ```
   * **PUT(UPDATE)** : ***success***
    * Request Header: { Authorization : "Bearer TOKEN" }
     ```
     {
         "success": true
     }
     ```
   * **PUT(UPDATE)** : ***failure***
      ```
      {
          "success": false
      }
      ```
      or
      ```
      statuscode : 404 & response : 404 page
      ```
    
* ### /:pageName
  * **Sample** : domain.com/contact -> request.params.pageName : "contact"
   * **GET** : ***success***
    * Request: /:pageName
     ```
     content-type: text/html; utf-8 page
     ```
   * **GET** : ***failure***
    * Request: /:pageName
      ```
      statuscode : 404 & response : 404 page
      ```
