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
if (localStorage.getItem('TableTwo') === 'table_tov') {
    var inpe = '<p>Name Good: <input type="text" id = "Tovar"></p></p><p>Count: <input type="text" id = "Count"></p>';
    $("#content").html(inpe);
    $('#Tovar').val(localStorage.getItem('NameTov_tov'));
    $('#Count').val(localStorage.getItem('kolv_tov'));
  } 
  if (localStorage.getItem('TableTwo') === 'table_doc') {
    var inpe = '<p>№ Dokument: <input type="text" id = "DokN"></p><p>Dokument Date: <input type="text" id = "DokDat"></p>';
    $("#content").html(inpe);
    $('#DokN').val(localStorage.getItem('Numberdokc'));
    $('#DokDat').val(localStorage.getItem('Datadock'));
  } 
$("#Edding").on("click",() => { 
  if (localStorage.getItem('TableTwo') === 'table_tov') {
    var sql ="UPDATE `company`.`tovary` SET `Tovar` = '"+$('#Tovar').val()+"', `El` = '"+$('#El').val()+"', `Cena` = '"+$('#Cena').val()+"' WHERE (`N_tov` = "+localStorage.getItem('NumbTov')+")";
    console.log(sql);
    connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  }); 
    }
  if (localStorage.getItem('TableTwo') === 'table_doc') {
  var sql ="UPDATE `company`.`tovary` SET `Tovar` = '"+$('#Tovar').val()+"', `El` = '"+$('#El').val()+"', `Cena` = '"+$('#Cena').val()+"' WHERE (`N_tov` = "+localStorage.getItem('NumbTov')+")";
  console.log(sql);
  connection.query(sql, function (err, result) {
  if (err) throw err;
  console.log("1 record inserted");
}); 
    }
  connection.end(() => {
    console.log("Connection succesfully closed");
    }); 
    var win = remote.getCurrentWindow()
    win.close()
});
$("#closedes").on("click",() => {
    var win = remote.getCurrentWindow()
    win.close()
  });
