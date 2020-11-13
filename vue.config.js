// vue.config.js

module.exports = {
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        appId: "xhznl-todo-list",
        productName: "xhznl-todo-list",
        copyright: "Copyright © 2020 xhznl",
        // directories: {
        //   output: "./dist", //输出文件路径
        // },
        win: {
          icon: "./public/logo.ico",
          target: "nsis",
        },
        nsis: {
          oneClick: false,
          allowToChangeInstallationDirectory: true,
          shortcutName: "xhznl-todo-list",
        },
        // publish: [
        //   {
        //     provider: "generic",
        //     url: "",
        //   },
        // ],
        // releaseInfo: {
        //   releaseName: "",
        //   releaseNotes: "新版本",
        //   releaseDate: "2020/11/10",
        // },
      },
      nodeIntegration: true,
    },
  },
  configureWebpack: {
    externals: {},
  },
};
