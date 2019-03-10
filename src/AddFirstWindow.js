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
///////////////////////////////////////
//create input text
if (localStorage.getItem('table') === 'dokum') {
var inpe = '<p>Nomer Dokument: <input type="text" id = "DokN"></p><p>Dokument Date: <input type="text" id = "DokDat"></p>';
  $("#content").html(inpe);
}
if (localStorage.getItem('table') === 'tovary') {
  var inpe = '<p>Name Tovar: <input type="text" id = "Tovar"></p><p>Element: <input type="text" id = "El"></p><p>Cena: <input type="text" id = "Cena"></p>';
  $("#content").html(inpe);
} 
/////////////////////////////////////
// Add New Row in MySQL
$("#added").on("click",() => { 
  if (localStorage.getItem('table') === 'dokum') {
    var stra = '' + (parseInt(localStorage.getItem('rowcount'))+1);
    var sql ="INSERT INTO `company`.`dokum` (`DokID`, `DokN`, `DokDat`) VALUES ('"+stra+"', '"+$('#DokN').val()+"', '"+$('#DokDat').val()+"')";
    console.log(sql);
    connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
    connection.end(() => {
      console.log("Connection succesfully closed");
      });
  });
  }
  if (localStorage.getItem('table') === 'tovary') {
      var stra = '' + (parseInt(localStorage.getItem('rowcount'))+1);
      var sql ="INSERT INTO `company`.`tovary` (`N_tov`, `Tovar`, `El`, `Cena`) VALUES ('"+stra+"', '"+$("#Tovar").val()+"', '"+$("#El").val()+"', '"+$("#Cena").val()+"')";
      console.log(sql);
      connection.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
      connection.end(() => {
        console.log("Connection succesfully closed");
        });
    }); 
  } 
  var win = remote.getCurrentWindow();
  win.close();
});
// Close button
$("#closeds").on("click",() => {
  var win = remote.getCurrentWindow();
  win.close();
});