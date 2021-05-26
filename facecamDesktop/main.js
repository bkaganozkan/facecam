const path = require('path')
const  electron = require('electron')
const url = require("url");
const fs = require('fs')
const { Menu, ipcRenderer } = require('electron');
const createConnectionWindow = require("./connection")
const dgram = require("dgram")
const server = dgram.createSocket('udp4');

const {app, BrowserWindow, ipcMain} = electron;

let mainWindow;
let connectionWindow;

let IP = "192.168.0.16"
let port = 3000


app.on('ready', () =>{

    // Created Main Menu
    mainWindow = new BrowserWindow({
        title:" FaceApp",
        height : 700,
        width : 550,
        resizable : false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true
        }
    });
    // Main Menu HTML
    mainWindow.loadURL(
        url.format({
            pathname: path.join(__dirname,"pages/main.html"),
            protocol : "file",
            slashes : true,
        })
    )

    // Run function when menu closed
    mainWindow.on("close", ()=>{
        app.quit()
    })

    // Created connection Window, recieved key
    ipcMain.on("key:connectionWindow", () => {
        connectionWindow = createConnectionWindow();
    })

    // get ip & port datas from ./connection 
    ipcMain.on("key:connectionData", (err,data) =>{        
        if (data.port ){   
            IP = toString(data.ip)
            port = parseInt(data.port)
            connectionWindow.close();
        }
        mainWindow.webContents.send("connectionData", data)
        
        connect(IP,port)
              
           
    })
    
    // UDP connection, run function when message recieved
    const connect = (ipAddress, port) => {
        
        server.on("message", (msg, info) => {
            console.log("data alindi")
            //edMsg = String.fromCharCode.apply(null, new Uint8Array(msg));
            mainWindow.webContents.send("Test", msg)  
        })

        // bind to port and local
        server.bind({
            port : port,                      
            exclusive : true,
        })
    }
        
})

