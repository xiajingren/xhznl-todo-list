# xhznl-todo-list

:sparkles:一个使用 electron + vue + electron-builder 开发的跨平台 todo-list 桌面应用

## 相关技术

[electron 9.x](https://github.com/electron/electron)

[vue 2.x](https://github.com/vuejs/vue)

[vue-cli-plugin-electron-builder](https://github.com/nklayman/vue-cli-plugin-electron-builder)

[electron-builder](https://github.com/electron-userland/electron-builder)

[lowdb](https://github.com/typicode/lowdb)

[exceljs](https://github.com/exceljs/exceljs)

[dayjs](https://github.com/iamkun/dayjs)

[Vue.Draggable](https://github.com/SortableJS/Vue.Draggable)

......

## 功能预览

todo list：
![1.png](/resources/1.png)
done list：
![2.png](/resources/2.png)
基本操作：
![3.gif](/resources/3.gif)
数据导出：
![4.gif](/resources/4.gif)
鼠标穿透：
![5.gif](/resources/5.gif)

## 步骤

```
npm install
npm run electron:serve

npm run electron:build
```

## 规划

- [x] todo/done 基本功能
- [x] 本地数据库存储
- [x] 软件自动更新
- [x] 数据导出为 excel
- [x] 开机启动
- [x] 鼠标穿透
- [ ] 窗口贴边自动收起
- [ ] ......
