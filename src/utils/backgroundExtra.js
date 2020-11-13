import { app, ipcMain, Tray, Menu } from "electron";
import DB from "./db";
import path from "path";

import pkg from "../../package.json";

let tray;

export function getDataPath() {
  return app.getPath("userData");
}

ipcMain.handle("getDataPath", (event) => {
  return getDataPath();
});

export function initExtra() {
  const storePath = getDataPath();
  DB.initDB(storePath);
}

export function createTray(setPosition) {
  tray = new Tray(path.join(__static, "./tary.png"));

  const contextMenu = Menu.buildFromTemplate([
    {
      label: "联系作者",
      click: () => {},
    },
    {
      label: "退出",
      click: () => {
        app.quit();
      },
    },
  ]);
  tray.setContextMenu(contextMenu);

  tray.setToolTip(pkg.name);

  tray.on("click", (event, bounds, position) => {
    setPosition();
  });
}
