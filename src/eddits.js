///////////////////////////////////////////////
// Connect MySQL
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
//create input text and add in input data
if (localStorage.getItem('table') === 'dokum') {
var inpe = '<p>Nomer Dokument: <input type="text" id = "DokN"></p><p>Dokument Date: <input type="text" id = "DokDat"></p>';
    $("#content").html(inpe);
    $('#DokN').val(localStorage.getItem('Numberdokc'));
    $('#DokDat').val(localStorage.getItem('Datadock'));

}
if (localStorage.getItem('table') === 'tovary') {
  var inpe = '<p>Name Tovar: <input type="text" id = "Tovar"></p><p>Element: <input type="text" id = "El"></p><p>Cena: <input type="text" id = "Cena"></p>';
  $("#content").html(inpe);
  $('#Tovar').val(localStorage.getItem('NameTov'));
  $('#El').val(localStorage.getItem('elem'));
  $('#Cena').val(localStorage.getItem('Cen'));
} 

/////////////////////////////////////
// Add New Row in MySQL
$("#Edding").on("click",() => { 
  if (localStorage.getItem('table') === 'dokum') {
    var sql ="UPDATE `company`.`dokum` SET `DokN` = '"+$('#DokN').val()+"', `DokDat` = '"+$('#DokDat').val()+"' WHERE (`DokID` = '"+localStorage.getItem('key')+"')";
    console.log(sql);
    // connection.query(sql, function (err, result) {
    // if (err) throw err;
    // console.log("1 record inserted");
    // }); 
    }
  if (localStorage.getItem('table') === 'tovary') {
      var stra = '' + (parseInt(localStorage.getItem('rowcount'))+1);
      var sql ="UPDATE `company`.`tovary` SET `Tovar` = '"+$('#Tovar').val()+"', `El` = '"+$('#El').val()+"', `Cena` = '"+$('#Cena').val()+"' WHERE (`N_tov` = "+localStorage.getItem('key')+")";
      console.log(sql);
    //   connection.query(sql, function (err, result) {
    //   if (err) throw err;
    //   console.log("1 record inserted");
    // }); 
  }
  connection.end(() => {
    console.log("Connection succesfully closed");
    }); 
});