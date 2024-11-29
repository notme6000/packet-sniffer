const { app, BrowserWindow, shell } = require('electron');
const { spawn } = require('child_process');
const path = require('path');



function createWindow() {
    const win = new BrowserWindow({
        width: 650,
        height: 750,
        frame: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            nativeWindowOpen: true
        }
    });

    win.loadFile('index.html');

    win.webContents.on('new-window', (event, url) => {
        event.preventDefault(); // Prevent Electron from handling the link
        shell.openExternal(url); // Open the link in the default browser
    });
}

function opensniffer() {
    const terminal = spawn("gnome-terminal", ["-e", "sudo python3 packet_sniffer.py"], {
        cwd: __dirname,
        detached: true,
        stdio: "ignore",
    });

    terminal.on("error", (err) => {
        console.error("failed to start termial:", err.message);
    })

    terminal.unref();
}

app.whenReady().then(() => {
    createWindow();
});

const { ipcMain } = require("electron");

ipcMain.on("start-sniffing", () => {
    console.log("sniffing started");
    opensniffer();
});


app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

