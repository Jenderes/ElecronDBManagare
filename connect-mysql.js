/* eslint-disable comma-dangle */
/* eslint-disable prefer-destructuring */
// CreateTable
const BrowserWindow = require('electron').remote.BrowserWindow;
const path = require('path');
const url = require('url');
const mysql = require('mysql');
const { remote } = require('electron');

const { Menu, MenuItem } = remote;
const menu = new Menu();
// delete start text
localStorage.clear();
function DeleteStartText() {
  if ($('.lab').attr('id') === 'lab') {
    $('.lab').remove();
  }
}
function MaxRowId() {
  let max = 0;
  $('tr td:first-child').each(function () {
    let setcount = parseInt($(this).text());
    if (setcount > max) {
      max = setcount;
    }
  });
  return max;
}
function CreateElement() {
  const spr = "<ul><li id='addt'><img src='../svg/add.svg'></li><li id = 'edt'><img src='../svg/edit.svg'></li><li id = 'delt'><img src='../svg/minus.svg'></li><li id = 'refr'><img src='../svg/repeat.svg'></li></ul>";
  $('#MenuGen').html(spr);
}
function DeleteRow() {
  if (confirm('Do you wan to delete this row?')) {
    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'rosq1921',
      database: 'Company',
    });
    connection.connect((err) => {
      if (err) {
        return console.log(err.stack);
      }
    });
    if (localStorage.getItem('table') === 'tovary') {
      const sql =
        `DELETE FROM \`company\`.\`tovary\` WHERE (\`N_tov\` = '${
          localStorage.getItem('NumbTov')
        }')`;
      connection.query(sql, (err) => {
        if (err) throw err;
      });
    }
    if (localStorage.getItem('table') === 'dokum') {
      const sql = `DELETE FROM \`company\`.\`dokum\` WHERE (\`DokID\` = '${
        localStorage.getItem('DokID')
      }')`;
      connection.query(sql, (err) => {
        if (err) throw err;
      });
    }
    connection.end(() => {
      RefreshTable();
    });
  }
}
function FormatDate(standate) {
  const stardate = `${standate}`;
  let SecondDat;
  const stdat = stardate.match(/\w{2,4}/gi);
  const ArrayMonth = [
    { month: 'Jan', number: '01' },
    { month: 'Feb', number: '02' },
    { month: 'Mar', number: '03' },
    { month: 'Apr', number: '04' },
    { month: 'May', number: '05' },
    { month: 'Jun', number: '06' },
    { month: 'Jul', number: '07' },
    { month: 'Aug', number: '08' },
    { month: 'Sep', number: '09' },
    { month: 'Oct', number: '10' },
    { month: 'Nov', number: '11' },
    { month: 'Dec', number: '12' },
  ];
  for (let i = 0; i < ArrayMonth.length; i += 1) {
    if (stdat[1] === ArrayMonth[i].month) {
      SecondDat = ArrayMonth[i].number;
    }
  }
  return `${stdat[3]}-${SecondDat}-${stdat[2]}`;
}
function getFirstTenRows(callback) {
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'rosq1921',
    database: 'Company',
  });

  connection.connect((err) => {
    if (err) {
      return console.log(err.stack);
    }
  });
  if (
    typeof $('#startdat').val() === 'undefined'
    && typeof $('#enddat').val() === 'undefined'
  ) {
    const sql = 'Select `DokID`, `DokN`, `DokDat` From `dokum`';
    connection.query(sql, (err, rows) => {
      if (err) {
        console.log(err);
        return;
      }
      callback(rows);
    });
  } else {
    const sql = `Select \`DokID\`, \`DokN\`, \`DokDat\` From \`dokum\` WHERE DokDat BETWEEN '${
      $('#startdat').val()
    }' AND '${
      $('#enddat').val()
    }'`;
    connection.query(sql, (err, rows) => {
      if (err) {
        console.log(err);
        return;
      }
      callback(rows);
    });
  }
  connection.end(() => {});
}
function getSecondTenRows(callback) {
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'rosq1921',
    database: 'Company',
  });

  connection.connect((err) => {
    if (err) {
      return console.log(err.stack);
    }
  });
  const sql = 'Select `N_tov`, `Tovar`, `El`, `Cena` From `tovary`';
  connection.query(sql, (err, rows) => {
    if (err) {
      console.log(err);
      return;
    }
    callback(rows);
  });
  connection.end(() => {});
}
function FirstCreateTable() {
  localStorage.setItem('key', 1);
  localStorage.setItem('table', 'dokum');
  getFirstTenRows((rows) => {
    let tbods = '';
    const theads = '<tr><th>Dokument ID</th><th>Number Dokument</th><th>Data Dokument</th></tr>';
    $('table thead').html(theads);
    rows.forEach((row) => {
      tbods += '<tr>';
      tbods += '<td>';
      tbods += row.DokID;
      tbods += '</td>';
      tbods += '<td>';
      tbods += row.DokN;
      tbods += '</td>';
      tbods += '<td>';
      tbods += FormatDate(row.DokDat);
      tbods += '</td>';
      tbods += '</tr>';
    });
    $('table tbody').html(tbods);
    $('table').attr('id', 'First_table');
    const str = MaxRowId();
    localStorage.setItem('rowcount', str);
    CreateElement();
  });
}
function SecondCreateTable() {
  localStorage.setItem('key', 1);
  localStorage.setItem('table', 'tovary');
  getSecondTenRows((rows) => {
    let tbods = '';
    const theads = '<tr><th>Number Tovar</th><th>Name Tovar</th><th>element</th><th>Cenа</th></tr>';
    $('table thead').html(theads);
    rows.forEach((row) => {
      tbods += '<tr>';
      tbods += '<td>';
      tbods += row.N_tov;
      tbods += '</td>';
      tbods += '<td>';
      tbods += row.Tovar;
      tbods += '</td>';
      tbods += '<td>';
      tbods += row.El;
      tbods += '</td>';
      tbods += '<td>';
      tbods += row.Cena;
      tbods += '</td>';
      tbods += '</tr>';
    });
    $('table tbody').html(tbods);
    $('table').attr('id', 'Second_table');
    const str = MaxRowId();
    localStorage.setItem('rowcount', str);
    CreateElement();
  });
}
function RefreshTable() {
  if (localStorage.getItem('table') === 'tovary') {
    SecondCreateTable();
  }
  if (localStorage.getItem('table') === 'dokum') {
    FirstCreateTable();
  }
}
function CreateWindowAdd() {
  const mainWindowtwo = new BrowserWindow({
    width: 200,
    height: 270,
  });
  mainWindowtwo.loadURL(
    url.format({
      pathname: path.join(__dirname, '/html/AddFirstWindow.html'),
      protocol: 'file',
      slashes: true,
    })
  );
}
function CreateWindowEddit() {
  const mainWindowThird = new BrowserWindow({
    width: 200,
    height: 270,
  });
  mainWindowThird.loadURL(
    url.format({
      pathname: path.join(__dirname, '/html/EditFirstWindow.html'),
      protocol: 'file',
      slashes: true,
    })
  );
}
function CreateDataElement() {
  const datel = "<input type='date' id='startdat' name='trip-start'value='2019-03-03'min='2016-01-01' max='20-12-31'><input type='date' id='enddat' name='trip-end'value='2019-12-11'min='2016-01-01' max='2020-12-31'>";
  $('#MenuDat').html(datel);
}
function DeleteDat() {
  $('#startdat').remove();
  $('#enddat').remove();
}
function DatChange() {
  const sqlvoice = `SELECT * FROM company.dokum WHERE DokDat BETWEEN '${
    $('#startdat').val()
  }' AND '${
    $('#enddat').val()
  }'`;
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'rosq1921',
    database: 'Company',
  });
  connection.connect((err) => {
    if (err) {
      return console.log(err.stack);
    }
    connection.query(sqlvoice, (err) => {
      if (err) throw err;
    });
    connection.end(() => {});
  });
}
function CreateWindowSerchTable() {
  const mainWindowStab = new BrowserWindow({
    width: 1000,
    height: 750,
  });
  mainWindowStab.loadURL(
    url.format({
      pathname: path.join(__dirname, 'html/indextable.html'),
      protocol: 'file',
      slashes: true,
    })
  );
}
// get rows on first table
$('#First_ms').on('click', () => {
  FirstCreateTable();
  DeleteStartText();
  CreateDataElement();
});
// get rows on Second table
$('#Second_ms').on('click', () => {
  SecondCreateTable();
  DeleteStartText();
  DeleteDat();
});
$('#Search_Table').on('click', () => {
  CreateWindowSerchTable();
});
// GetNumberRow
// eslint-disable-next-line func-names
$(document).on('click', 'table tbody tr', function () {
  const strk = $(this).index() + 1;
  console.log(strk);
  $('tr').css('background-color', '#fff');
  $('tr:even').css('background-color', '#bdbcbc');
  $('tr').css('color', '#000');
  $(this).css('background-color', '#333335');
  $(this).css('color', '#fff');
  localStorage.setItem('key', strk);
  if ($('table').attr('id') === 'First_table') {
    localStorage.removeItem('NameTov');
    localStorage.removeItem('elem');
    localStorage.removeItem('Cen');
    const oTable = document.getElementById('First_table');
    const DkID = oTable.rows.item(strk).cells[0].innerHTML;
    const Nd = oTable.rows.item(strk).cells[1].innerHTML;
    const Dd = oTable.rows.item(strk).cells[2].innerHTML;
    localStorage.setItem('DokID', DkID);
    localStorage.setItem('Numberdokc', Nd);
    localStorage.setItem('Datadock', Dd);
  }
  if ($('table').attr('id') === 'Second_table') {
    localStorage.removeItem('Numberdokc');
    localStorage.removeItem('Datadock');
    const oTable = document.getElementById('Second_table');
    const NumbTov = oTable.rows.item(strk).cells[0].innerHTML;
    const Nametov = oTable.rows.item(strk).cells[1].innerHTML;
    const element = oTable.rows.item(strk).cells[2].innerHTML;
    const Cena = oTable.rows.item(strk).cells[3].innerHTML;
    localStorage.setItem('NumbTov', NumbTov);
    localStorage.setItem('NameTov', Nametov);
    localStorage.setItem('elem', element);
    localStorage.setItem('Cen', Cena);
  }
});
// Li button click
$(document).on('click', '#addt', () => {
  CreateWindowAdd();
});
$(document).on('click', '#edt', () => {
  CreateWindowEddit();
});
$(document).on('click', '#delt', () => {
  DeleteRow();
});
$(document).on('click', '#refr', () => {
  RefreshTable();
});
$(document).on('click', '#startdat', () => {
  DatChange();
  FirstCreateTable();
});
$(document).on('click', '#enddat', () => {
  DatChange();
  FirstCreateTable();
});
// ContextMenu
menu.append(
  new MenuItem({
    label: 'Add',
    click() {
      CreateWindowAdd();
    },
  })
);
menu.append(new MenuItem({ type: 'separator' }));
menu.append(
  new MenuItem({
    label: 'Edit',
    click() {
      CreateWindowEddit();
    },
  })
);
menu.append(new MenuItem({ type: 'separator' }));
menu.append(
  new MenuItem({
    label: 'Delete',
    click() {
      DeleteRow();
    },
  })
);
menu.append(new MenuItem({ type: 'separator' }));
menu.append(
  new MenuItem({
    label: 'Refresh',
    click() {
      RefreshTable();
    },
  })
);
window.addEventListener(
  'contextmenu',
  (e) => {
    e.preventDefault();
    menu.popup({ window: remote.getCurrentWindow() });
  },
  false
);
