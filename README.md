# 项目介绍

> 本项目主要采用 `Vue3.2` `Axios` `VueRouter` `TypeScript` `Vite` `Windicss` `NaiveUi` `Pinia`

# 项目启动

注意 nodejs 版本需要在 `12.x` 以上

```
glone ...
cd rabbitapi
npm i
npm run dev
```

# 开发

> 开发工具请使用 `VSCode`

> 安装插件 `Vue Volar Extention Pack` `ESLint`

> 配置 `VSCode` 默认格式化工具为 `Prettier` 并 开启 `format On Save`(保存时自动格式化文件)

> 全局组件: `window.$message` `window.$loadingBar` `window.$dialog` 使用详情请参考官网

> EventBus 本项目采用 `Mitt` 触发:`window.$emitter.emit(事件名,数据)` 监听:`window.$emitter(事件名,处理函数)`

# 代码提交

> 首次运行以下命令

```
npm install -g eslint@7.32.0
npm install -g  commitizen@4.2.4
```

> 代码提交 遵循 `Angular 规范` 使用 `git cz` 代替 `git commit`

> Angular 规范 https://www.jianshu.com/p/c7e40dab5b05
