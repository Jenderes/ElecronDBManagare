var electron = require('electron');
var app = electron.app;
var BrowserWindow = electron.BrowserWindow;
var path = require('path');

var mainWindow = null;
// listen for app to be ready
app.on('ready', function() {
   mainWindow = new BrowserWindow({
     width: 800,
     height: 600
   });
   mainWindow.loadURL(`file://${__dirname}/index.html`);
   mainWindow.on('closed', function() {
     mainWindow = null;
   });
 });
