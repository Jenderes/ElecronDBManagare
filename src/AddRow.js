el("btnAdd").addEventListener("click" ,() => {
    var mysql = require("mysql");

    var connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: 'rosq1921',
        database: "Company"
    });
    connection.connect((err) => {
        if(err){
            return console.log(err.stack);
    
        }
        console.log("Connection sucsefully enstabled");
    });
    var sql = "INSERT INTO `company`.`dokum` (`DokID`, `DokN`, `DokDat`) VALUES ('3', '323', '03.08.2009')";
    connection.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
      });
},false);