///////////////////////////////////////////////
//CreateTable
const BrowserWindow = require("electron").remote.BrowserWindow;
const path = require("path");
const url = require("url");
const { remote } = require("electron");
const { Menu, MenuItem } = remote;
const menu = new Menu();
// delete start text
localStorage.clear();
function DeleteStartText() {
  if ($(".lab").attr("id") === "lab") {
    $(".lab").remove();
  }
}
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
  });
  if (
    typeof $("#startdat").val() === "undefined" &&
    typeof $("#enddat").val() === "undefined"
  ) {
    var sql = "Select `DokID`, `DokN`, `DokDat` From `dokum`";
  } else {
    var sql =
      "Select `DokID`, `DokN`, `DokDat` From `dokum` WHERE DokDat BETWEEN '" +
      $("#startdat").val() +
      "' AND '" +
      $("#enddat").val() +
      "'";
  }
  connection.query(sql, (err, rows, fields) => {
    if (err) {
      console.log(err);
      return;
    }
    callback(rows);
  });
  connection.end(() => {});
}
$("#First_ms").on("click", () => {
  FirstCreateTable();
  DeleteStartText();
  CreateDataElement();
});
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
  });

  var sql = "Select `N_tov`, `Tovar`, `El`, `Cena` From `tovary`";
  connection.query(sql, (err, rows, fields) => {
    if (err) {
      console.log(err);
      return;
    }
    callback(rows);
  });
  connection.end(() => {});
}
$("#Second_ms").on("click", () => {
  SecondCreateTable();
  DeleteStartText();
  DeleteDat();
});
$("#Search_Table").on("click", () => {
  CreateWindowSerchTable();
});
///////////////////////////////////////////////
//GetNumberRow
$(document).on("click", "table tbody tr", function(e) {
  var strk = $(this).index() + 1;
  $("tr").css("background-color", "#fff");
  $("tr:even").css("background-color", "#bdbcbc");
  $("tr").css("color", "#000");
  $(this).css("background-color", "#333335");
  $(this).css("color", "#fff");
  localStorage.setItem("key", strk);
  if ($("table").attr("id") === "First_table") {
    localStorage.removeItem("NameTov");
    localStorage.removeItem("elem");
    localStorage.removeItem("Cen");
    var oTable = document.getElementById("First_table");
    var DkID = oTable.rows.item(strk).cells[0].innerHTML;
    var Nd = oTable.rows.item(strk).cells[1].innerHTML;
    var Dd = oTable.rows.item(strk).cells[2].innerHTML;
    localStorage.setItem("DokID", DkID);
    localStorage.setItem("Numberdokc", Nd);
    localStorage.setItem("Datadock", Dd);
  }
  if ($("table").attr("id") === "Second_table") {
    localStorage.removeItem("Numberdokc");
    localStorage.removeItem("Datadock");
    var oTable = document.getElementById("Second_table");
    var NumbTov = oTable.rows.item(strk).cells[0].innerHTML;
    var Nametov = oTable.rows.item(strk).cells[1].innerHTML;
    var element = oTable.rows.item(strk).cells[2].innerHTML;
    var Cena = oTable.rows.item(strk).cells[3].innerHTML;
    localStorage.setItem("NumbTov", NumbTov);
    localStorage.setItem("NameTov", Nametov);
    localStorage.setItem("elem", element);
    localStorage.setItem("Cen", Cena);
  }
});
/////////////////////////////////////////////////
//// Li button click
$(document).on("click", "#addt", function(e) {
  CreateWindowAdd();
});
$(document).on("click", "#edt", function(e) {
  CreateWindowEddit();
});
$(document).on("click", "#delt", function(e) {
  DeleteRow();
});
$(document).on("click", "#refr", function(e) {
  RefreshTable();
});
$(document).on("click", "#startdat", function(e) {
  DatChange();
  FirstCreateTable();
});
$(document).on("click", "#enddat", function(e) {
  DatChange();
  FirstCreateTable();
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
function DeleteRow() {
  if (confirm("Do you wan to delete this row?")) {
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
    if (localStorage.getItem("table") === "tovary") {
      var sql =
        "DELETE FROM `company`.`tovary` WHERE (`N_tov` = '" +
        localStorage.getItem("NumbTov") +
        "')";
      connection.query(sql, (err, rows, fields) => {
        if (err) throw err;
      });
    }
    if (localStorage.getItem("table") === "dokum") {
      var sql =
        "DELETE FROM `company`.`dokum` WHERE (`DokID` = '" +
        localStorage.getItem("DokID") +
        "')";
      connection.query(sql, (err, rows, fields) => {
        if (err) throw err;
      });
    }
    connection.end(() => {
      RefreshTable();
    });
  }
}
function FirstCreateTable() {
  localStorage.setItem("key", 1);
  localStorage.setItem("table", "dokum");
  getFirstTenRows(function(rows) {
    var tbods = "";
    var theads = "";
    var theads =
      "<tr><th>Dokument ID</th><th>Number Dokument</th><th>Data Dokument</th></tr>";
    $("table thead").html(theads);
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
      tbods += "</tr>";
    });
    $("table tbody").html(tbods);
    $("table").attr("id", "First_table");
    var rowCount = MaxRowId();
    localStorage.setItem("rowcount", rowCount);
    CreateElement();
  });
}
function SecondCreateTable() {
  localStorage.setItem("key", 1);
  localStorage.setItem("table", "tovary");
  getSecondTenRows(function(rows) {
    var tbods = "";
    var theads = "";
    var theads =
      "<tr><th>Number Tovar</th><th>Name Tovar</th><th>element</th><th>Cenа</th></tr>";
    $("table thead").html(theads);
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
      tbods += "</tr>";
    });
    $("table tbody").html(tbods);
    $("table").attr("id", "Second_table");
    var rowCount = MaxRowId();
    localStorage.setItem("rowcount", rowCount);
    CreateElement();
  });
}
function RefreshTable() {
  if (localStorage.getItem("table") === "tovary") {
    SecondCreateTable();
  }
  if (localStorage.getItem("table") === "dokum") {
    FirstCreateTable();
  }
}
function MaxRowId() {
  var max = 0;
  $("tr td:first-child").each(function() {
    thisis = parseInt($(this).text());
    if (thisis > max) {
      max = thisis;
    }
  });
  return max;
}
function CreateElement() {
  var spr =
    "<ul><li id='addt'><img src='../svg/add.svg'></li><li id = 'edt'><img src='../svg/edit.svg'></li><li id = 'delt'><img src='../svg/minus.svg'></li><li id = 'refr'><img src='../svg/repeat.svg'></li></ul>";
  $("#MenuGen").html(spr);
}
function CreateWindowAdd() {
  var mainWindowtwo = new BrowserWindow({
    width: 200,
    height: 270
  });
  mainWindowtwo.loadURL(
    url.format({
      pathname: path.join(__dirname, "/html/AddFirstWindow.html"),
      protocol: "file",
      slashes: true
    })
  );
}
function CreateWindowEddit() {
  var mainWindowThird = new BrowserWindow({
    width: 200,
    height: 270
  });
  mainWindowThird.loadURL(
    url.format({
      pathname: path.join(__dirname, "/html/EditFirstWindow.html"),
      protocol: "file",
      slashes: true
    })
  );
}
function CreateDataElement() {
  var datel =
    "<input type='date' id='startdat' name='trip-start'value='2019-03-03'min='2016-01-01' max='20-12-31'><input type='date' id='enddat' name='trip-end'value='2019-12-11'min='2016-01-01' max='2020-12-31'>";
  $("#MenuDat").html(datel);
}
function DeleteDat() {
  $("#startdat").remove();
  $("#enddat").remove();
}
function DatChange() {
  var sqlvoice =
    "SELECT * FROM company.dokum WHERE DokDat BETWEEN '" +
    $("#startdat").val() +
    "' AND '" +
    $("#enddat").val() +
    "'";
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
    connection.query(sqlvoice, function(err, result) {
      if (err) throw err;
    });
    connection.end(() => {});
  });
}
function CreateWindowSerchTable() {
  var mainWindowStab = new BrowserWindow({
    width: 1000,
    height: 750
  });
  mainWindowStab.loadURL(
    url.format({
      pathname: path.join(__dirname, "html/indextable.html"),
      protocol: "file",
      slashes: true
    })
  );
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
