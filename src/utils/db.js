import Datastore from "lowdb";
import LodashId from "lodash-id";
import FileSync from "lowdb/adapters/FileSync";
import path from "path";
import fs from "fs-extra";

import { getNowDate, getNowDateTime } from "@/utils/common";

const isDevelopment = process.env.NODE_ENV !== "production";

let db;

const DB = {
  initDB(storePath) {
    if (!fs.pathExistsSync(storePath)) {
      fs.mkdirpSync(storePath);
    }

    const dbFile = isDevelopment ? "/data-dev.json" : "/data.json";

    const adapter = new FileSync(path.join(storePath, dbFile));

    db = Datastore(adapter);

    db._.mixin(LodashId);

    db.defaults({
      todoList: [
        {
          todo_date: getNowDate(),
          todo_datetime: getNowDateTime(),
          content: "“单击”下方空处，创建一个Todo",
        },
        {
          todo_date: getNowDate(),
          todo_datetime: getNowDateTime(),
          content: "“双击”Todo，表示已完成",
        },
        {
          todo_date: getNowDate(),
          todo_datetime: getNowDateTime(),
          content: "“单击”Todo，可进行更改或删除",
        },
        {
          todo_date: getNowDate(),
          todo_datetime: getNowDateTime(),
          content: "“长按”Todo，可进行拖动排序",
        },
        {
          todo_date: getNowDate(),
          todo_datetime: getNowDateTime(),
          content: "【重要】给项目点一个star",
        },
      ],
      doneList: [
        {
          done_date: getNowDate(),
          done_datetime: getNowDateTime(),
          todo_date: getNowDate(),
          todo_datetime: getNowDateTime(),
          content: "【重要】给爱的人一个温暖的拥抱",
          id: "272aa857-bd53-44fb-b6fc-49d4ef595ade",
        },
      ],
      settings: {},
    }).write();

    if (!this.has("settings.firstRun")) {
      this.set("settings.firstRun", true);
    }
  },
  has(key) {
    return db
      .read()
      .has(key)
      .value();
  },
  get(key) {
    return db
      .read()
      .get(key)
      .value();
  },
  set(key, value) {
    return db
      .read()
      .set(key, value)
      .write();
  },
  insert(key, value) {
    return db
      .read()
      .get(key)
      .insert(value)
      .write();
  },
  removeById(key, id) {
    return db
      .read()
      .get(key)
      .removeById(id)
      .write();
  },
  groupby(key, prop) {
    const d = db
      .read()
      .get(key)
      .sortBy(prop)
      .reverse()
      .groupBy(prop)
      .value();
    return d;
  },
};

export default DB;
