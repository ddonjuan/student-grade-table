const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const webserver = express();
const { credentials } = require('./config/mysqlCredentials');
const database = mysql.createConnection( credentials );

webserver.use(bodyParser.urlencoded( {extended: false} ));
webserver.use(bodyParser.json());

database.connect( (error) => {
    if( error ) throw error;
    console.log("database connection successful");
} );

webserver.use(express.static( __dirname + "/client" + "/build" ));

// ====================================
// ======= Endpoints start here =======
// ====================================

require('./routes')(webserver, mysql, database);

webserver.get('/test', (req, res)=> {
    res.sendFile('/Users/Danny/Desktop/projects/student_grade_table/test.html');
})

webserver.listen( 9000 , () => {
    console.log("webserver listening on port 9000");
} )