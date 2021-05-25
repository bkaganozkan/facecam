const path = require('path')
const  electron = require('electron')
const url = require("url");
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

    mainWindow.loadURL(
        url.format({
            pathname: path.join(__dirname,"pages/main.html"),
            protocol : "file",
            slashes : true,
        })
    )
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    Menu.setApplicationMenu(mainMenu)

     ipcMain.on("key:inputValue", (err, data) => {
        console.log(data)
        
    })

    ipcMain.on("key:newWindow", () => {
        //createWindow()
    })

    mainWindow.on("close", ()=>{
        app.quit()
    })
    ipcMain.on("key:connectionWindow", () => {
        connectionWindow = createConnectionWindow();
    })
    // IP ve Port dataları buradan alınıyor
    ipcMain.on("key:connectionData", (err,data) =>{        
        if (data.port ){   
            IP = toString(data.ip)
            port = parseInt(data.port)
            connectionWindow.close();
        }
        mainWindow.webContents.send("connectionData", data)
        connect(IP,port)
           
    })

    const connect = (ipAddress, port) => {
        
        server.on('message', (msg, err) => {
            console.log(msg)

        } )

        server.bind({
            port : port,
             address:ipAddress,           
            exclusive : true,
        })

        
        
    
    }
})

const mainMenuTemplate = [
    {
        label : "Dosya",
        submenu : [
            {
                label : "Yeni"
            },
            {
                label : "Test 1"
            }
        ]
    }
]






