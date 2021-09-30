var mysql = require('mysql');
var db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'1q2w3e1q2w3e',
    database:'users',
    stringifyObjects:true
  });

  db.connect(function(err){
    if(err)
    {
      console.log(err);
    }else{
      console.log("database connected");
    }});

    module.exports = db;