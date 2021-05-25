
const path = require('path')
const  electron = require('electron')
const url = require("url");
const { Menu } = require('electron')
const {app, BrowserWindow, ipcMain} = electron;


module.exports =  function createConnectionWindow() {    
    connectionWindow = new BrowserWindow({
        width : 480,
        height : 300,
        title : "Connection Info",
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
        },
        resizable : false,

    })

    connectionWindow.loadURL(url.format({
        pathname : path.join(__dirname, "pages/connectionInfo.html"),
        protocol : "file",
        slashes : true
    }))

    return connectionWindow;

    const close =  () =>
      {
        connectionWindow.on("close", ()=> {
        connectionWindow = null;
        }) 
        };

    const connect = () => {
        
    }
    
    
    
}

