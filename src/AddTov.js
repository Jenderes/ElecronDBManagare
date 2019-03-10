///////////////////////////////////////////////
// Connect MySQL
const remote = require('electron').remote;
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
});
/////////////////////////////
//Crate Array Tov
var Qtxt ="SELECT N_tov,Tovar FROM tovary";
    connection.query(Qtxt, (err, rows, fields) => {
      if (err) {
        console.log("An error ocurred perfoming the query.");
        console.log(err);
        return;
      }
      var array_tov = [];
      var it = 0;
      rows.forEach(function(row) {
      array_tov[it] = { N_tov: row.N_tov, Tovar: row.Tovar};
      it += 1;
      });
      console.log(array_tov);
      var StrSel = '';
      for (let i = 0; i < array_tov.length; i++) {
        StrSel += "<option id = '"+array_tov[i].N_tov+"' >"+array_tov[i].Tovar+"</option>"
      }

      $("#naim").html(StrSel);
    });
////////////////////
// Get ID good which need add
$(document).on("change", "#naim", function(e) {
  var id = $(this).children(":selected").attr("id");
  localStorage.setItem('IdTov',id);
  console.log(id);
});
/////////////////////////
//button click add
$("#added").on("click",() => { 
      var sql ="INSERT INTO `company`.`prihod` (`N_pri`, `N_tov`, `kolvo`) VALUES ('"+localStorage.getItem('DokID')+"', '"+localStorage.getItem('IdTov')+"', '"+$("#Counts").val()+"')";
      console.log(sql);
      connection.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
        connection.end(() => {
          console.log("Connection succesfully closed");
          });
      });  
  var win = remote.getCurrentWindow();
  win.close(); 
});
// Close button
$("#closeds").on("click",() => {
  var win = remote.getCurrentWindow();
  win.close();
});