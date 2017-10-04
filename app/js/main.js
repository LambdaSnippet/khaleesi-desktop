'use strict';
const {app, Tray, Menu, BrowserWindow, shell} = require('electron')
const path = require('path')
const url = require('url')
const iconPath = path.join(__dirname, '../assets/icon.png');
const window_width = 1280;
const window_height = 520;
const debugMode = false;

let appIcon = null;
let win

app.on('ready', function(){
  win = new BrowserWindow({width: window_width, height: window_height})
  console.log(iconPath);
  appIcon = new Tray(iconPath);
  var contextMenu = Menu.buildFromTemplate([
    {
      label: 'About this App',
      click: function(){
        shell.openExternal('https://github.com/LambdaSnippet/khaleesi-desktop');
      }
    },
    {
      label: 'Open on Web',
      click: function(){
        shell.openExternal('http://khaleesi.unisem.mx/admin/');
      }
    },
    { 
      label: 'Quit Khaleesi App',
      accelerator: 'Alt+F4',
      click: function(){
        app.quit();
      }
    }
  ]);
  appIcon.setToolTip('Khaleesi App.');
  appIcon.setContextMenu(contextMenu);

  win.setMenu(null);
  win.loadURL(url.format({
    pathname: path.join(__dirname, '../index.html'),
    protocol: 'file:',
    slashes: true
  }));

  if(debugMode){
    win.webContents.openDevTools();
  }

  win.on('closed', () => {
    win = null
  });
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})
