import { app, ipcMain } from "electron";
import DB from "./db";

const storePath = getDataPath();
DB.initDB(storePath);

export function getDataPath() {
  return app.getPath("userData");
}

ipcMain.handle("getDataPath", (event) => {
  return getDataPath();
});
