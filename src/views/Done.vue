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
            content: "【重要】给爱的人一个温暖的拥抱",
            id: "272aa857-bd53-44fb-b6fc-49d4ef595ade",
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
