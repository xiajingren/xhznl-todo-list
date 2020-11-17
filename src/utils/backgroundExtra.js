import { app, ipcMain, Tray, Menu, shell, dialog } from "electron";
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

  const firstRun = DB.get("settings.firstRun");
  if (firstRun) {
    setOpenAtLogin(true);
    DB.set("settings.firstRun", false);
  }
}

export function createTray(setPosition) {
  tray = new Tray(path.join(__static, "./tary.png"));

  const contextMenu = Menu.buildFromTemplate([
    {
      label: "开机自启动",
      type: "checkbox",
      checked: getOpenAtLogin(),
      click() {
        const openAtLogin = getOpenAtLogin();
        setOpenAtLogin(!openAtLogin);
      },
    },
    {
      label: "项目地址",
      click: () => {
        shell.openExternal("https://github.com/xiajingren/xhznl-todo-list");
      },
    },
    {
      label: "问题反馈",
      click: () => {
        shell.openExternal(
          "https://github.com/xiajingren/xhznl-todo-list/issues"
        );
      },
    },
    {
      label: "关于",
      role: "abort",
      click() {
        dialog.showMessageBox({
          title: pkg.name,
          message: pkg.description,
          detail: `Version: ${pkg.version}\nAuthor: ${pkg.author}\nGithub: https://github.com/xiajingren/xhznl-todo-list`,
        });
      },
    },
    {
      label: "退出",
      role: "quit",
    },
  ]);
  tray.setContextMenu(contextMenu);

  tray.setToolTip(pkg.name);

  tray.on("click", (event, bounds, position) => {
    setPosition();
  });
}

function setOpenAtLogin(openAtLogin) {
  if (app.isPackaged) {
    app.setLoginItemSettings({
      openAtLogin: openAtLogin,
    });
  } else {
    app.setLoginItemSettings({
      openAtLogin: openAtLogin,
      openAsHidden: false,
      path: process.execPath,
      args: [path.resolve(process.argv[1])],
    });
  }
}

function getOpenAtLogin() {
  if (app.isPackaged) {
    const { openAtLogin } = app.getLoginItemSettings();
    return openAtLogin;
  } else {
    const { openAtLogin } = app.getLoginItemSettings({
      path: process.execPath,
      args: [path.resolve(process.argv[1])],
    });
    return openAtLogin;
  }
}
