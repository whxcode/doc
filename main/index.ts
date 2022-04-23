import { BrowserWindow, app } from "electron";
import { join } from "path";

function createWindow(url: string) {
  const window: BrowserWindow = new BrowserWindow({
    height: 800,
    width: 1000,
    webPreferences: {
      nodeIntegration: true,
      preload: join(__dirname, "../preload.js"),
    },
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

  createWindow("http://localhost:3000");
});
