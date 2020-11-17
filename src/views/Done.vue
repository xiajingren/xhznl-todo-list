<template>
  <div class="root">
    <div class="list" v-for="(value, key) in doneGroupList" :key="key">
      <div class="group">{{ getDateStr(key) }}</div>
      <div class="item" v-for="(done, index) in value" :key="done.id">
        <p>{{ index + 1 }}.{{ done.content }}</p>
      </div>
    </div>
  </div>
</template>
<script>
import { ipcRenderer } from "electron";
import DB from "@/utils/db";
import { getDateStr, getNowDate, getNowDateTime } from "@/utils/common";

export default {
  name: "Done",
  data() {
    return {
      doneGroupList: null,
    };
  },
  methods: {
    getDateStr,
    getDoneList() {
      const list = DB.groupby("doneList", "done_date");
      if (Object.keys(list).length === 0) {
        this.doneGroupList = {};
        this.doneGroupList[getNowDate()] = [
          {
            done_date: getNowDate(),
            done_datetime: getNowDateTime(),
            todo_date: getNowDate(),
            todo_datetime: getNowDateTime(),
            content: "开始开发xhznl-todo-list",
            id: "272aa857-bd53-44fb-b6fc-49d4ef595ade",
          },
          {
            done_date: getNowDate(),
            done_datetime: getNowDateTime(),
            todo_date: getNowDate(),
            todo_datetime: getNowDateTime(),
            content: "完成软件界面部分开发",
            id: "6d44c352-3f38-45e1-b9e2-a9cc1f37deac",
          },
          {
            done_date: getNowDate(),
            done_datetime: getNowDateTime(),
            todo_date: getNowDate(),
            todo_datetime: getNowDateTime(),
            content: "完成数据的本地存储与读取",
            id: "f75654aa-ef3c-4000-96f2-3a78b9101c8d",
          },
          {
            done_date: getNowDate(),
            done_datetime: getNowDateTime(),
            todo_date: getNowDate(),
            todo_datetime: getNowDateTime(),
            content: "完成软件的自动更新",
            id: "fc41038a-edff-4c48-98bf-b0e8647fee7e",
          },
          {
            done_date: getNowDate(),
            done_datetime: getNowDateTime(),
            todo_date: getNowDate(),
            todo_datetime: getNowDateTime(),
            content: "完成软件的开机自启动",
            id: "d2ae51ea-5255-4b64-b270-d3a946862f1e",
          },
          {
            done_date: getNowDate(),
            done_datetime: getNowDateTime(),
            todo_date: getNowDate(),
            todo_datetime: getNowDateTime(),
            content: "完成软件打包",
            id: "56f2f1c1-cfde-439c-9fe2-3abf8be7243b",
          },
          {
            done_date: getNowDate(),
            done_datetime: getNowDateTime(),
            todo_date: getNowDate(),
            todo_datetime: getNowDateTime(),
            content: "将项目代码提交到GitHub",
            id: "acd69f91-6dac-43b7-a1b0-2e446afe2ba3",
          },
        ];
        return;
      }
      this.doneGroupList = list;
    },
  },
  created() {
    ipcRenderer.invoke("getDataPath").then((storePath) => {
      DB.initDB(storePath);

      this.getDoneList();
    });
  },
};
</script>

<style lang="scss" scoped>
.root {
  width: 100%;
  min-height: 100%;
  box-sizing: border-box;
  padding: 0 15px 28px 15px;
  .list {
    .group {
      position: sticky;
      top: 0;
      z-index: -999;
      height: 224px;
      line-height: 180px;
      box-sizing: border-box;
      color: rgba($color: #cccccc, $alpha: 0.8);
      font-size: 35px;
      text-align: center;
      user-select: none;
    }
    .item {
      height: 28px;
      p {
        width: 100%;
        height: 100%;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        line-height: 28px;
      }
    }
    .item:hover {
      p {
        color: rgba($color: #ffffff, $alpha: 0.6);
      }
    }
  }
}
</style>
