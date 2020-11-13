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
        publish: ["github"],
        // releaseInfo: {
        //   releaseName: "",
        //   releaseNotes: "",
        //   releaseDate: "",
        // },
      },
      nodeIntegration: true,
    },
  },
  configureWebpack: {
    externals: {},
  },
};
