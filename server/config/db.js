const sql = require('mysql2');

const { HOST, USER, PASSWORD} = process.env;
const db =  sql.createConnection({host: HOST, user: USER, password: PASSWORD, database: 'fintrack'});

db.connect((err) =>{
    if(err) throw err;
    console.log('Connected to MySQL Server');
})

module.exports = db;