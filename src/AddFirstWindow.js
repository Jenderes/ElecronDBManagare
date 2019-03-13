// Connect MySQL
const {remote} = require('electron');
const mysql = require('mysql');

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
// create input text
if (localStorage.getItem('table') === 'dokum') {
  const inpe = '<p>Nomer Dokument: <input type="text" id = "DokN"></p><p>Dokument Date: <input type="text" id = "DokDat"></p>';
  $('#content').html(inpe);
}
if (localStorage.getItem('table') === 'tovary') {
  const inpe = '<p>Name Tovar: <input type="text" id = "Tovar"></p><p>Element: <input type="text" id = "El"></p><p>Cena: <input type="text" id = "Cena"></p>';
  $('#content').html(inpe);
}
console.log($('#DokN').val());
console.log($('#DokDat').val());
console.log(parseInt(localStorage.getItem('rowcount'))+1);
// Add New Row in MySQL
$('#added').on('click', () => {
  if (localStorage.getItem('table') === 'dokum') {
    const sql = `INSERT INTO \`company\`.\`dokum\` (\`DokID\`, \`DokN\`, \`DokDat\`) VALUES ('${parseInt(localStorage.getItem('rowcount'))+1}', '${$('#DokN').val()}', '${$('#DokDat').val()}')`;
    console.log(sql);
    connection.query(sql, (err) => {
      if (err) throw err;
      console.log('1 record inserted');
      connection.end(() => {
        console.log('Connection succesfully closed');
      });
    });
  }
  if (localStorage.getItem('table') === 'tovary') {
    const sql = `INSERT INTO \`company\`.\`tovary\` (\`N_tov\`, \`Tovar\`, \`El\`, \`Cena\`) VALUES ('${parseInt(localStorage.getItem('rowcount'))+1}', '${$('#Tovar').val()}', '${$('#El').val()}', '${$('#Cena').val()}')`;
    console.log(sql);
    connection.query(sql, (err) => {
      if (err) throw err;
      console.log('1 record inserted');
      connection.end(() => {
        console.log('Connection succesfully closed');
      });
    });
  }
  const win = remote.getCurrentWindow();
  win.close();
});
// Close button
$('#closeds').on('click', () => {
  let win = remote.getCurrentWindow();
  win.close();
});
