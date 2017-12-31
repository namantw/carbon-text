const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow

const path = require('path');
const url = require('url');

let win;

function createWindow() {
  win = new BrowserWindow({
  	width: 800,
  	height: 600,
  	//titleBarStyle: 'hiddenInset',
  	autoHideMenuBar: true,
  	//frame: false,
  	icon: path.join(__dirname, 'lib/icon.png')
  })

  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Uncomment if in development mode
  // win.webContents.openDevTools();
  win.on('closed', function () {
    win = null
  })
  require('./mainmenu');
}

app.on('ready', createWindow);

app.on('window-all-closed', function () { 
  //For mac
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (win === null) {
    createWindow();
  }
});
