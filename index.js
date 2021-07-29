const {app,BrowserWindow,webContents,shell} = require('electron');
const path = require('path')
const url = require('url')
const electron = require('electron');
var notification = require("./module/notification.js");
notification_status = new notification;                      
 
/* 修改完儲存立即更新*/
require('electron-reload')(__dirname,{
     electron: path.join(__dirname, 'node_modules', '.bin', 'electron') //Linux&macos: electron , Windows: electron.cmd
});

/*網頁登入*/
app.userAgentFallback = app.userAgentFallback.replace('Electron/' + process.versions.electron, '');

/*視窗設定*/
function createWindow () {
  const mainWindow = new BrowserWindow({
    /* 視窗大小 */
    width: 1024,
    height: 800,
    /*打開視窗後要運行的動作*/
    webPreferences: {
        sandbox: true , //沙箱機制:啟用
        webSecurity: true ,  //安全性功能
        minimumFontSize: 17 //最小字体大小
      }  
  })
  mainWindow.loadURL('https://hackmd.io') ;
   /*控制視窗按扭是否顥示*/
  //mainWindow.maximizable = false; //最大化
  //mainWindow.minimizable = false;  //最小化
  //mainWindow.closable = false; //関閉
  mainWindow.menuBarVisible =  true;//菜單
}

app.on('ready', ( ) => {
   createWindow();
  notification_status.start();
   /*系統休眠時*/
    electron.powerMonitor.on("suspend",() =>{
        notification_status.suspend();
    });

})
 
/*打開視窗*/
app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  })
  
/*関掉視窗*/
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
  notification_status.close();
})

/*用外部的瀏覽器打開連結*/
app.on('web-contents-created', (e, webContents) => {
    webContents.on('new-window', (event, url) => {
        event.preventDefault();
        shell.openExternal(url);
        notification_status.open_link();
    });
});
