const BrowserWindow = require("electron").remote.BrowserWindow;
const path = require("path");
const url = require("url");
const { remote } = require("electron");
const { Menu, MenuItem } = remote;
const menu = new Menu();
// get rows on first table
function getFirstTenRows(callback) {
  var mysql = require("mysql");

  var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "rosq1921",
    database: "Company"
  });

  connection.connect(err => {
    if (err) {
      return console.log(err.stack);
    }
    console.log("Connection sucsefully enstabled");
  });
  console.log($("#startdat_doc").val());
  console.log($("#enddat_doc").val());
  if (
    typeof $("#startdat_doc").val() === "undefined" ||
    typeof $("#enddat_doc").val() === "undefined"
  ) {
    var Qtxt =
      "Select DokID, DokN, DokDat, Sum(Kolvo*Cena) As Suma From Dokum, Prihod P, Tovary T " +
      "Where DokID = N_pri And P.N_tov = T.N_tov Group By DokID, DokN, DokDat" +
      " UNION Select DokID, DokN, DokDat, 0.00 As Suma From Dokum Where Not Exists ( Select * From Prihod Where DokID = N_pri )" +
      " Order By DokDat DESC, DokN ";
    console.log(Qtxt);
  } else {
    var Qtxt =
      "Select DokID, DokN, DokDat, Sum(Kolvo*Cena) As Suma From Dokum, Prihod P, Tovary T" +
      " Where DokID = N_pri And P.N_tov = T.N_tov And DokDat Between '" +
      $("#startdat_doc").val() +
      "' And '" +
      $("#enddat_doc").val() +
      "' Group By DokID, DokN, DokDat " +
      "UNION Select DokID, DokN, DokDat, 0.00 As Suma From Dokum Where " +
      "DokDat Between '" +
      $("#startdat_doc").val() +
      "' And '" +
      $("#enddat_doc").val() +
      "' " +
      "And Not Exists ( Select * From Prihod Where DokID = N_pri )" +
      "Order By DokDat DESC, DokN";
  }
  connection.query(Qtxt, (err, rows, fields) => {
    if (err) {
      console.log("An error ocurred perfoming the query.");
      console.log(err);
      return;
    }
    callback(rows);

    console.log("Query succesfully executed");
  });
  connection.end(() => {
    console.log("Connection succesfully closed");
  });
}
// get rows on Second table
function getSecondTenRows(callback) {
  var mysql = require("mysql");

  var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "rosq1921",
    database: "Company"
  });

  connection.connect(err => {
    if (err) {
      return console.log(err.stack);
    }
    console.log("Connection sucsefully enstabled");
  });

  var Qtxt =
    "Select P.N_tov, Tovar, El, Cena, Kolvo, Kolvo*Cena As Stoim From prihod P, Tovary T Where N_pri = " +
    localStorage.getItem("DokID") +
    " And P.N_tov = T.N_tov Order By Tovar";
  connection.query(Qtxt, (err, rows, fields) => {
    if (err) {
      console.log("An error ocurred perfoming the query.");
      console.log(err);
      return;
    }
    callback(rows);

    console.log("Query succesfully executed");
  });
  connection.end(() => {
    console.log("Connection succesfully closed");
  });
}
$(document).ready(() => {
  FirstCreateTable();
  CreateDataElement();
});
///////////////////////////////////////////////
//GetNumberRow
$(document).on("click", "#dc_table tbody tr", function(e) {
  console.log("You clicked row " + ($(this).index() + 1));
  var strk_doc = $(this).index() + 1;
  $("tr").css("background-color", "#fff");
  $("tr:even").css("background-color", "#bdbcbc");
  $("tr").css("color", "#000");
  $(this).css("background-color", "#333335");
  $(this).css("color", "#fff");
  localStorage.setItem("key", strk_doc);
  var oTable = document.getElementById("dc_table");
  var DkID = oTable.rows.item(strk_doc).cells[0].innerHTML;
  var Nd = oTable.rows.item(strk_doc).cells[1].innerHTML;
  var Dd = oTable.rows.item(strk_doc).cells[2].innerHTML;
  var Sd = oTable.rows.item(strk_doc).cells[3].innerHTML;
  localStorage.setItem("DokID", DkID);
  localStorage.setItem("Numberdokc", Nd);
  localStorage.setItem("Datadock", Dd);
  localStorage.setItem("Sumdok", Sd);
  localStorage.setItem("TableTwo", "table_doc");
  SecondCreateTable();
});
$(document).on("click", "#tv_table tbody tr", function(e) {
  console.log("You clicked row " + ($(this).index() + 1));
  var strk_tov = $(this).index() + 1;
  $("tr").css("background-color", "#fff");
  $("tr:even").css("background-color", "#bdbcbc");
  $("tr").css("color", "#000");
  $(this).css("background-color", "#333335");
  $(this).css("color", "#fff");
  localStorage.setItem("key_tov", strk_tov);
  var oTable = document.getElementById("tv_table");
  var NumbTov = oTable.rows.item(strk_tov).cells[0].innerHTML;
  var Nametov = oTable.rows.item(strk_tov).cells[1].innerHTML;
  var kolv = oTable.rows.item(strk_tov).cells[4].innerHTML;
  localStorage.setItem("NumbTov", NumbTov);
  localStorage.setItem("NameTov_tov", Nametov);
  localStorage.setItem("kolv_tov", kolv);
  localStorage.setItem("TableTwo", "table_tov");
});
/////////////////////////////////////////////////
//// Li button click
$(document).on("click", "#addt_doc", function(e) {
  CreateWindowAdd_doc();
  console.log("click");
});
$(document).on("click", "#edt_doc", function(e) {
});
$(document).on("click", "#delt_doc", function(e) {
  if (
    confirm(
      "Do you wan to delete document number: " +
        localStorage.getItem("Numberdokc") +
        " ?"
    )
  ) {
    DeleteRow_doc();
  }
});
$(document).on("click", "#refr_doc", function(e) {
  FirstCreateTable();
});
$(document).on("click", "#startdat_doc", function(e) {
  FirstCreateTable();
});
$(document).on("click", "#enddat_doc", function(e) {
  FirstCreateTable();
});
$(document).on("click", "#addt_tov", function(e) {
  CreateWindowAdd_tov();
  console.log("click");
});
$(document).on("click", "#edt_tov", function(e) {
  CreateWindowEddit();
});
$(document).on("click", "#delt_tov", function(e) {
  if (
    confirm(
      "Do you wan to delete tovar with name : " +
        localStorage.getItem("NameTov") +
        " ?"
    )
  ) {
    DeleteRow_tov();
  }
});
$(document).on("click", "#refr_tov", function(e) {
  SecondCreateTable();
});
///////////////////////////////////////////////
//ContextMenu
menu.append(
  new MenuItem({
    label: "Add",
    click() {
      CreateWindowAdd();
    }
  })
);
menu.append(new MenuItem({ type: "separator" }));
menu.append(
  new MenuItem({
    label: "Edit",
    click() {
      CreateWindowEddit();
    }
  })
);
menu.append(new MenuItem({ type: "separator" }));
menu.append(
  new MenuItem({
    label: "Delete",
    click() {
      DeleteRow();
    }
  })
);
menu.append(new MenuItem({ type: "separator" }));
menu.append(
  new MenuItem({
    label: "Refresh",
    click() {
      RefreshTable();
    }
  })
);
window.addEventListener(
  "contextmenu",
  e => {
    e.preventDefault();
    menu.popup({ window: remote.getCurrentWindow() });
  },
  false
);
//////////////////////////////////////////
/////Delete Row in SQL
function DeleteRow_doc() {
  const mysql = require('mysql');
  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "rosq1921",
    database: "Company"
  });
  connection.connect(function(err) {
    if (err) {
      return console.log(err.stack);
    }
  });
  var sqlt =
    "Delete From Prihod Where N_pri = " + localStorage.getItem("DokID");
  connection.query(sqlt, (err, rows, fields) => {
    if (err) throw err;
  });
  sqld = "DELETE FROM Dokum WHERE DokID = " + localStorage.getItem("DokID");
  connection.query(sqld, (err, rows, fields) => {
    if (err) throw err;
  });
  connection.end(() => {
    FirstCreateTable();
  });
}
function DeleteRow_tov() {
  var mysql = require("mysql");
  var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "rosq1921",
    database: "Company"
  });
  connection.connect(err => {
    if (err) {
      return console.log(err.stack);
    }
  });
  var sqls =
    "Delete From Prihod Where N_pri = " +
    localStorage.getItem("DokID") +
    " And N_tov = " +
    localStorage.getItem("NumbTov");
  connection.query(sqls, (err, rows, fields) => {
    if (err) throw err;
  });
  connection.end(() => {
    SecondCreateTable();
  });
}
function FirstCreateTable() {
  localStorage.setItem("key", 1);
  getFirstTenRows(function(rows) {
    var tbods = "";
    var theads = "";
    var theads =
      "<tr><th>Dokument ID</th><th>№ Dokument</th><th>Data Dokument</th><th>Summ</th></tr>";
    $("#DocTable table thead").html(theads);
    rows.forEach(function(row) {
      tbods += "<tr>";
      tbods += "<td>";
      tbods += row.DokID;
      tbods += "</td>";
      tbods += "<td>";
      tbods += row.DokN;
      tbods += "</td>";
      tbods += "<td>";
      tbods += FormatDate(row.DokDat);
      tbods += "</td>";
      tbods += "<td>";
      tbods += row.Suma;
      tbods += "</td>";
      tbods += "</tr>";
    });
    $("#DocTable table tbody").html(tbods);
    CreateElement_doc();
    var rowCount = MaxRowId_doc();
    localStorage.setItem("rowcount_doc", rowCount);
  });
}
function SecondCreateTable() {
  localStorage.setItem("key", 1);
  localStorage.setItem("table", "tovary");
  getSecondTenRows(function(rows) {
    var tbods = "";
    var theads = "";
    var theads =
      "<tr><th>№ Goods</th><th>Name Goods</th><th>element</th><th>Price</th><th>Count</th><th>Cost</th></tr>";
    $("#TovaryTable table thead").html(theads);
    rows.forEach(function(row) {
      tbods += "<tr>";
      tbods += "<td>";
      tbods += row.N_tov;
      tbods += "</td>";
      tbods += "<td>";
      tbods += row.Tovar;
      tbods += "</td>";
      tbods += "<td>";
      tbods += row.El;
      tbods += "</td>";
      tbods += "<td>";
      tbods += row.Cena;
      tbods += "</td>";
      tbods += "<td>";
      tbods += row.Kolvo;
      tbods += "</td>";
      tbods += "<td>";
      tbods += row.Stoim;
      tbods += "</td>";
      tbods += "</tr>";
    });
    $("#TovaryTable table tbody").html(tbods);
    var rowCount = MaxRowId_tov();
    localStorage.setItem("rowcount_tov", rowCount);
    CreateElement_tov();
  });
}
function MaxRowId_doc() {
  var max = 0;
  $("#dc_table tr td:first-child").each(function() {
    thisis = parseInt($(this).text());
    if (thisis > max) {
      max = thisis;
    }
  });
  return max;
}
function MaxRowId_tov() {
  var max = 0;
  $("#tv_table tr td:first-child").each(function() {
    thisis = parseInt($(this).text());
    if (thisis > max) {
      max = thisis;
    }
  });
  return max;
}
function CreateElement_doc() {
  var spr =
    "<ul><li id='addt_doc'><img src='../svg/add.svg'></li><li id = 'edt_doc'><img src='../svg/edit.svg'></li><li id = 'delt_doc'><img src='../svg/minus.svg'></li><li id = 'refr_doc'><img src='../svg/repeat.svg'></li></ul>";
  $("#MenuGen_doc").html(spr);
}
function CreateElement_tov() {
  var spr =
    "<ul><li id='addt_tov'><img src='../svg/add.svg'></li><li id = 'edt_tov'><img src='../svg/edit.svg'></li><li id = 'delt_tov'><img src='../svg/minus.svg'></li><li id = 'refr_tov'><img src='../svg/repeat.svg'></li></ul>";
  $("#MenuGen_tov").html(spr);
}
function CreateWindowAdd_doc() {
  var mainWindowtwo = new BrowserWindow({
    width: 200,
    height: 270
  });
  mainWindowtwo.loadURL(
    url.format({
      pathname: path.join(__dirname, "../html/AddDoc.html"),
      protocol: "file",
      slashes: true
    })
  );
  mainWindowtwo.on('closed', function() {
    FirstCreateTable();
    });
}
function CreateWindowAdd_tov() {
  var mainWindowtwo = new BrowserWindow({
    width: 200,
    height: 270
  });
  mainWindowtwo.loadURL(
    url.format({
      pathname: path.join(__dirname, "../html/AddTov.html"),
      protocol: "file",
      slashes: true
    })
  );
  mainWindowtwo.on('closed', function() {
    SecondCreateTable();
    });
}
function CreateWindowEddit() {  
  var mainWindowThird = new BrowserWindow({
    width: 200,
    height: 270
  });
  mainWindowThird.loadURL(
    url.format({
      pathname: path.join(__dirname, "../html/EditTov.html"),
      protocol: "file",
      slashes: true
    })
  );
  mainWindowtwo.on('closed', function() {
    SecondCreateTable();
    });
}
function CreateDataElement() {
  var datel =
    "<input type='date' id='startdat_doc' name='trip-start'value='2019-03-03'min='2016-01-01' max='20-12-31'><input type='date' id='enddat_doc' name='trip-end'value='2019-12-11'min='2016-01-01' max='2020-12-31'>";
  $("#MenuDat").html(datel);
}
function FormatDate(standate) {
  let stardate = "" + standate;
  let normdate = "";
  let SecondDat, FirstDat, ThirdDat;
  let stdat = stardate.match(/\w{2,4}/gi);
  ArrayMonth = [
    { month: "Jan", number: "01" },
    { month: "Feb", number: "02" },
    { month: "Mar", number: "03" },
    { month: "Apr", number: "04" },
    { month: "May", number: "05" },
    { month: "Jun", number: "06" },
    { month: "Jul", number: "07" },
    { month: "Aug", number: "08" },
    { month: "Sep", number: "09" },
    { month: "Oct", number: "10" },
    { month: "Nov", number: "11" },
    { month: "Dec", number: "12" }
  ];
  for (let i = 0; i < ArrayMonth.length; i++) {
    if (stdat[1] === ArrayMonth[i].month) {
      SecondDat = ArrayMonth[i].number;
    }
  }
  ThirdDat = stdat[2];
  FirstDat = stdat[3];
  normdate = FirstDat + "-" + SecondDat + "-" + ThirdDat;
  return normdate;
}
