const { app, BrowserWindow } = require("electron");
const path = require("path");
const ejse = require("ejs-electron");

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1100,
    height: 650,
    icon: __dirname + '/assets/pacman.png',
    webPreferences: {
      nodeIntegration: true,
    },
  });

  //mainWindow.removeMenu();
  //mainWindow.webContents.on("devtools-opened", () => {mainWindow.webContents.closeDevTools(); });

  mainWindow.loadURL("file://" + __dirname + "/views/index.ejs");
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});
