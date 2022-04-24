const { contextBridge, ipcRenderer } = require("electron");
const remove = require('@electron/remote')

contextBridge.exposeInMainWorld("electron", {
  ipcRenderer,
  require,
remove,
});

contextBridge.exposeInMainWorld("ipcRenderer", ipcRenderer);



