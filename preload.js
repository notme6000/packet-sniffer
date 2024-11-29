const { ipcRenderer, contextBridge } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    startSniffing: () => ipcRenderer.send('start-sniffing')
});
