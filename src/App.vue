<template>
  <div id="app">
    <div class="drag-nav">
      <b>{{ appName }}</b>
      <i>Powered by 小黑</i>
    </div>
    <div class="nav">
      <router-link draggable="false" to="/">Todo</router-link> |
      <router-link draggable="false" to="/done">Done</router-link>
    </div>
    <div class="main scrollbar scrollbar-y">
      <router-view />
    </div>
  </div>
</template>

<script>
import pkg from "../package.json";

export default {
  data() {
    return {
      appName: pkg.name,
    };
  },
};
</script>

<style lang="scss" scoped>
#app {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: rgba($color: #000000, $alpha: 0.6);
  border-radius: 5px;
  .drag-nav {
    -webkit-app-region: drag;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 20px;
    padding: 0 20px;
    box-sizing: border-box;
    font-size: 12px;
    b,
    i {
      color: rgba($color: #ffffff, $alpha: 0.3);
    }
  }
  .nav {
    padding: 0 20px;
    color: #cccccc;
    user-select: none;
    a {
      font-weight: bold;
      color: #cccccc;
      text-decoration: none;
      &.router-link-exact-active {
        font-size: 20px;
        color: #ffffff;
      }
    }
    a:hover {
      color: rgba($color: #ffffff, $alpha: 0.6);
    }
  }
  .main {
    flex: 1;
    margin-top: 10px;
    overflow-y: auto;
  }
  .main:hover::-webkit-scrollbar-thumb {
    display: block;
  }
}
</style>
