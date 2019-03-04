const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require('path');
const url = require('url');
var mainWindow = null;
// listen for app to be ready
function CreateWindow() {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 750,
    icon: __dirname + '/svg/ico.icns'
  });
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname,'index.html'),
    protocol:'file',
    slashes: true
  }));
  mainWindow.on('closed', function() {
  mainWindow = null;
  });
}
app.on('ready', CreateWindow);

app.on('window-all-closed',function() {
  app.quit()
});

app.on('activate',function () {
  if(mainWindow === null) {
    CreateWindow()
  }
});