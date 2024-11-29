const { ipcRenderer } = require('electron');

document.getElementById("startSniffing").addEventListener("click", () => {
    alert("starting packet sniffing");
    ipcRenderer.send("start-sniffing");

});
