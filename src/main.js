var app = require('app'); 

// browser-window creates a native window
var BrowserWindow = require('browser-window');
var mainWindow = null;

var Menu = require('menu');

app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', function () {

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
        { label: 'User settings', accelerator: 'Command+,', click: function() { console.log('should configure app settings'); } },
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