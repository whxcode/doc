import { BrowserWindow, app, ipcMain ,shell} from "electron";
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


  return window;
}

app.on("ready", () => {

 return;
  const window = createWindow("http://localhost:3000");

  ipcMain.on("test-1", async (event, ...args) => {
    shell.openExternal('http://www.google.com')
    console.log("111");
    return "0000";
  });

  window.webContents.on("ipc-message", () => {
    console.log("ipc-message");
    shell.openExternal('http://www.google.com')
  });

  console.log(
    'end  '
  )

  // window.loadURL('http://localhost:3000');
  window.loadFile('index.html')
 
});
