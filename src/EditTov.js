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
const inpe = '<p>Name Good: <input type="text" id = "Tovar"></p></p><p>Count: <input type="text" id = "Count"></p>';
$('#content').html(inpe);
$('#Tovar').val(localStorage.getItem('NameTov_tov'));
$('#Tovar').prop('disabled', true);
$('#Count').val(localStorage.getItem('kolv_tov'));
$('#Edding').on('click', () => {
  const sql = `UPDATE \`company\`.\`tovary\` SET \`Tovar\` = '${$('#Tovar').val()}', \`El\` = '${$('#El').val()}', \`Cena\` = '${$('#Cena').val()}' WHERE (\`N_tov\` = ${localStorage.getItem('NumbTov')})`;
  console.log(sql);
  connection.query(sql, (err) => {
    if (err) throw err;
    console.log('1 record inserted');
  });
  connection.end(() => {
    console.log('Connection succesfully closed');
  });
  const win = remote.getCurrentWindow();
  win.close();
});
$('#closedes').on('click', () => {
  const win = remote.getCurrentWindow();
  win.close();
});
