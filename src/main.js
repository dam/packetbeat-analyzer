'use strict';

var app = require('app'); 
var ipc = require('electron').ipcMain;

// browser-window creates a native window
var BrowserWindow = require('browser-window');
var mainWindow = null;
var settingsWindow = null;

var Menu = require('menu');
var configuration = require('./electron/configuration');

app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', function () {
  configuration.setDefault();
    
  // Initialize the window to our specified dimensions
  mainWindow = new BrowserWindow({ width: 1200, height: 900 });

  // Tell Electron where to load the entry point from
  mainWindow.loadURL('file://' + __dirname + '/index.html');
  
  configureNativeApp();
  
  // Clear out the main window when the app is closed
  mainWindow.on('closed', function () {

    mainWindow = null;
  });

});

var configureNativeApp = function() {
  var app_name = app.getName();
  
  // Menus
  var application_menu = [];
  application_menu.push({ 
    label: 'Help', 
    role: 'help', 
    submenu: [{
      label: 'Developer Tools',
      submenu: [
        { label: 'Show', click: function() { mainWindow.openDevTools(); } },
        { label: 'Hide', click: function() { mainWindow.closeDevTools(); } }
      ]
    }]
  });
  
  if (process.platform == 'darwin') {
    application_menu.unshift({
      label: app_name,
      submenu: [
        { label: 'About ' + app_name, role: 'about' },
        { type: 'separator' },
        { label: 'User settings', accelerator: 'Command+,', click: function() { openSettingWindow(); } },
        { type: 'separator' },
        { label: 'Hide ' + app_name, accelerator: 'Command+H', role: 'hide' },
        { label: 'Hide Others', accelerator: 'Command+Shift+H', role: 'hideothers' },
        { label: 'Show All', role: 'unhide' },
        { type: 'separator' },
        { label: 'Quit ' + app_name, accelerator: 'Command+Q', click: function() { app.quit(); } },
      ]
    });
  }

  Menu.setApplicationMenu(Menu.buildFromTemplate(application_menu)); 
};

var openSettingWindow = function() {
  if(settingsWindow) { return; }
  
  settingsWindow = new BrowserWindow({
    height: 400,
    resizable: false,
    width: 400
  })
  
  settingsWindow.loadURL('file://' + __dirname + '/electron/settings.html');
  
  settingsWindow.on('closed', function() {
    settingsWindow = null;
  });
};

ipc.on('open-settings-window', openSettingWindow);
ipc.on('get-configuration', function() {
  var conf = configuration.getConfiguration();
  mainWindow.webContents.send('configuration', conf);
});