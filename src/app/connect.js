var mysql = require('mysql');

var con = mysql.createConnection({
  host: "127.0.0.1",
  user: "ICCT",
  password: "12311561"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
})
