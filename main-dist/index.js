"use strict";
exports.__esModule = true;
var electron_1 = require("electron");
var path_1 = require("path");
function createWindow(url) {
    var window = new electron_1.BrowserWindow({
        height: 800,
        width: 1000,
        webPreferences: {
            nodeIntegration: true,
            preload: (0, path_1.join)(__dirname, "../preload.js")
        }
    });
    window.loadURL(url);
    if (!electron_1.app.isPackaged) {
        try {
            require("electron-reloader")(module, {});
        }
        catch (_) { }
        window.webContents.openDevTools();
        window.loadURL(url);
    }
    return window;
}
electron_1.app.on("ready", function () {
    process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true"; //关闭web安全警告
    createWindow("http://localhost:3000");
});
