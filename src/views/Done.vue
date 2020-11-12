<template>
  <div class="root">
    <div class="list" v-for="group in doneGroupList" :key="group.date">
      <div class="group">{{ group.date }}</div>
      <div
        class="item"
        v-for="(done, index) in group.doneList"
        :key="done.centent"
      >
        <p>{{ index + 1 }}.{{ done.content }}</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Done",
  data() {
    return {
      doneGroupList: null,
    };
  },
  methods: {
    getDoneList() {
      this.doneGroupList = [];
      for (let i = 0; i < 5; i++) {
        let group = { date: "today" + i, doneList: [] };
        for (let j = 0; j < 10; j++) {
          group.doneList.push({
            content: "This is an Done page This is an Done page" + i + j,
          });
        }
        this.doneGroupList.push(group);
      }
    },
  },
  created() {
    this.getDoneList();
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
      font-size: 50px;
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
