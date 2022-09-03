import {
  app,
  ipcMain,
  Tray,
  Menu,
  shell,
  dialog,
  Notification
} from "electron";
import DB from "./db";
import path from "path";

import pkg from "../../package.json";

import ExcelJS from "exceljs";

import { getNowDateTimeForFlieName } from "@/utils/common";

let tray;

export function getDataPath() {
  return app.getPath("userData");
}

ipcMain.handle("getDataPath", event => {
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

export function createTray(showWindow) {
  tray = new Tray(
    path.join(
      __static,
      process.platform !== "darwin" ? "./tray.png" : "./tray-mac.png"
    )
  );

  const contextMenu = Menu.buildFromTemplate([
    {
      label: "开机启动",
      type: "checkbox",
      checked: getOpenAtLogin(),
      click() {
        const openAtLogin = getOpenAtLogin();
        setOpenAtLogin(!openAtLogin);
      }
    },
    {
      label: "项目地址",
      click: () => {
        shell.openExternal("https://github.com/xiajingren/xhznl-todo-list");
      }
    },
    {
      label: "问题反馈",
      click: () => {
        shell.openExternal(
          "https://github.com/xiajingren/xhznl-todo-list/issues"
        );
      }
    },
    {
      label: "关于",
      role: "abort",
      click() {
        dialog.showMessageBox({
          title: pkg.name,
          message: pkg.description,
          detail: `Version: ${pkg.version}\nAuthor: ${pkg.author}\nGithub: https://github.com/xiajingren/xhznl-todo-list`
        });
      }
    },
    {
      label: "退出",
      role: "quit"
    }
  ]);
  tray.setContextMenu(contextMenu);

  tray.setToolTip(pkg.name);

  tray.on("click", (event, bounds, position) => {
    showWindow();
  });
}

export function createAppMenu() {
  const template = [
    // { role: 'appMenu' }
    ...(process.platform === "darwin"
      ? [
          {
            label: app.name,
            submenu: [
              { role: "about", label: "关于" },
              { type: "separator" },
              { role: "quit", label: "退出" }
            ]
          }
        ]
      : [])
  ];
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

function setOpenAtLogin(openAtLogin) {
  if (app.isPackaged) {
    app.setLoginItemSettings({
      openAtLogin: openAtLogin
    });
  } else {
    app.setLoginItemSettings({
      openAtLogin: openAtLogin,
      openAsHidden: false,
      path: process.execPath,
      args: [path.resolve(process.argv[1])]
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
      args: [path.resolve(process.argv[1])]
    });
    return openAtLogin;
  }
}

ipcMain.handle("exportData", event => {
  exportData();
});

function exportData() {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = pkg.name;

  const sheet1 = workbook.addWorksheet("todo list");
  sheet1.addRow(["内容", "建立时间"]);
  const todoList = DB.get("todoList");

  for (let i in todoList) {
    sheet1.addRow([todoList[i].content, todoList[i].todo_datetime]);
  }

  const sheet2 = workbook.addWorksheet("done list");
  sheet2.addRow(["内容", "建立时间", "完成时间"]);
  const doneGroupList = DB.groupby("doneList", "done_date");

  for (let prop in doneGroupList) {
    for (let i in doneGroupList[prop]) {
      sheet2.addRow([
        doneGroupList[prop][i].content,
        doneGroupList[prop][i].todo_datetime,
        doneGroupList[prop][i].done_datetime
      ]);
    }
  }

  const defaultPath = `/${getNowDateTimeForFlieName()}.xlsx`;

  dialog
    .showSaveDialog({ title: "数据导出", defaultPath: defaultPath })
    .then(async result => {
      if (result.canceled) return;

      await workbook.xlsx.writeFile(result.filePath);

      showNotification(
        { title: "导出完成", body: `数据已导出到：${result.filePath}` },
        () => {
          shell.openExternal(result.filePath);
        }
      );
    });
}

export function showNotification(option, clickCallback) {
  if (Notification.isSupported()) {
    const notification = new Notification(option);
    if (clickCallback) {
      notification.on("click", () => {
        clickCallback();
      });
    }
    notification.show();
  }
}
