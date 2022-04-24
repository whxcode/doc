import { BrowserWindow, app, ipcMain } from "electron";
import { join } from "path";


function createWindow(url: string) {
  const window: BrowserWindow = new BrowserWindow({
    height: 800,
    width: 1000,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: join(__dirname, "../preload.js"),
    },
  });

  ipcMain.handle("test-1", async (event, ...args) => {
    const result = await Promise.resolve({ code: 0 });
    return "0000";
  });

  window.loadURL(url);

  if (!app.isPackaged) {
    try {
      require("electron-reloader")(module, {});
    } catch (_) {}
    window.webContents.openDevTools();
    window.loadURL(url);
  }

  return window;
}

app.on("ready", () => {
  process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true"; //关闭web安全警告

  const window = createWindow("http://localhost:3000");


  window.webContents.on("ipc-message", () => {
    console.log("ipc-message");
  });
});
