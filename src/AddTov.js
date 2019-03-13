// /////////////////////////////////////////////
// Connect MySQL
const remote = require('electron').remote;
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
// ///////////////////////////
// Crate Array Tov
const Qtxt = 'SELECT N_tov,Tovar FROM tovary';
connection.query(Qtxt, (err, rows) => {
  if (err) {
    console.log('An error ocurred perfoming the query.');
    console.log(err);
    return;
  }
  let array_tov = [];
  let it = 0;
  rows.forEach((row) => {
    array_tov[it] = { N_tov: row.N_tov, Tovar: row.Tovar };
    it += 1;
  });
  console.log(array_tov);
  let StrSel = '';
  for (let i = 0; i < array_tov.length; i += 1) {
    StrSel += `<option id = '${array_tov[i].N_tov}' >${array_tov[i].Tovar}</option>`;
  }

  $('#naim').html(StrSel);
});
// //////////////////
// Get ID good which need add
$(document).on('change', '#naim', () => {
  const id = $(this).children(':selected').attr('id');
  localStorage.setItem('IdTov', id);
  console.log(id);
});
// ///////////////////////
// button click add
$('#added').on('click', () => {
  const sql = `INSERT INTO \`company\`.\`prihod\` (\`N_pri\`, \`N_tov\`, \`kolvo\`) VALUES ('${localStorage.getItem('DokID')}', '${localStorage.getItem('IdTov')}', '${$('#Counts').val()}')`;
  console.log(sql);
  connection.query(sql, (err) => {
    if (err) throw err;
    console.log('1 record inserted');
    connection.end(() => {
      console.log('Connection succesfully closed');
    });
  });
  const win = remote.getCurrentWindow();
  win.close();
});
// Close button
$('#closeds').on('click', () => {
  const win = remote.getCurrentWindow();
  win.close();
});
