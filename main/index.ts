import { BrowserWindow, app, ipcMain, shell } from "electron";
import { join } from "path";

function createWindow(url: string) {
  const window: BrowserWindow = new BrowserWindow({
    height: 800,
    width: 1000,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload: join(__dirname, "../preload.js"),
    },
  });

  if (true) {
    try {
      require("electron-reloader")(module, {});
    } catch (_) {}
    window.webContents.openDevTools();
    window.loadURL(url);
  }

  return window;
}

app.on("ready", () => {
  const window = createWindow("http://localhost:3000");

  ipcMain.handle('get',async () => {
    return {code:1}
  })

  ipcMain.handle('st',async () => {
    return {code:2}
  })

  window.webContents.on("ipc-message", () => {
    console.log("ipc-message");
    shell.openExternal("http://www.google.com");
  });

  window.loadURL("http://localhost:3000");
});
