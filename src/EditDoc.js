
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
$('#data_doc').val(localStorage.getItem('Datadock'));
$('#naims').val(localStorage.getItem('Numberdokc'));
$('#naims').prop('disabled', true);
// button click add
$('#added').on('click', () => {
  const sql = `UPDATE \`company\`.\`dokum\` SET \`DokDat\` = '${$('#data_doc').val()}' WHERE (\`DokID\` = ${localStorage.getItem('DokID')})`;
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
