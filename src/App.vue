<template>
  <div id="app">
    <div class="drag-nav">
      <b>{{ appName }}</b>
      <i>Powered by 小黑</i>
    </div>
    <div class="nav">
      <div class="link">
        <router-link draggable="false" to="/">Todo</router-link> |
        <router-link draggable="false" to="/done">Done</router-link>
      </div>
      <div class="tools">
        <transition-group name="fade" mode="out-in">
          <i
            class="iconfont icon-download"
            v-if="$route.path === '/done'"
            key="export"
          ></i>
        </transition-group>
      </div>
    </div>
    <div class="main scrollbar scrollbar-y">
      <transition name="fade-transform" mode="out-in">
        <keep-alive>
          <router-view />
        </keep-alive>
      </transition>
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
    display: flex;
    justify-content: space-between;
    height: 26px;
    padding: 0 20px;
    color: #cccccc;
    user-select: none;
    .link {
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
    .tools {
      display: flex;
      i {
        font-size: 20px;
        line-height: 26px;
        padding: 0 5px;
        cursor: pointer;
      }
    }
  }
  .main {
    flex: 1;
    margin: 10px 0;
    overflow-y: auto;
  }
  .main:hover::-webkit-scrollbar-thumb {
    display: block;
  }
}
</style>
