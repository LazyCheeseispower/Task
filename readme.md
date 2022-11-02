# 22-11-2 日报
## 学习
### 学习内容
#### 一些知识点
- ctrl + ` 开启 vscode 的终端
- vue.runtime.xxx.js 是没有模板编译器的，不能 使用 template ，这种情况使用 render ：h => h(App)

#### vue.config.js配置文件
- 使用 vue inspect > output.js 可以查看 Vue 的默认配置
- 使用 vue.config.js 可以对脚手架进行个性化定制

#### 组件标签
- 使用 id 获得的是组件的 DOM 元素
- 使用 ref 获得的是子组件的实例对象，注意的是，获得该标签 (this.$refs.xxx) 就是一个 component 实例对象
- 使用 ref 可以在 html 标签上，获取 DOM 元素

#### 配置项 props 
- 功能：让组件接收外部传过来的数据
- (1)传递数据
- <demo name="xxx"/>
- (2)接收数据
- 数组 
- props:["name"]  简单接受
- props:{ 
    name:{
        type:String,
        required:true,
        default:"老王"
    }
- } 接受同时对数据限制 还能+默认值的指定 default + 必要性的限制 required

- props 是只读的，vue 底层会监测你对 props 的修改,如果发生了修改，就会发出警告，若业务需求确实需要修改，那么请复制 props 的内容到 data 中一份，然后去修改 data 中的数据 
#### mixin 混合
- 优先级低于原有数据，生命周期函数都会存在优先级依然低
- 使用方法：
- 1.定义混合 maxin.js 文件
- 2.使用混入 
-            全局混入： Vue.mixin(xxx)
-            局部混入:  mixins[]

#### plugins 插件
- plugins.js 中去定义一个对象 包含的参数 install= function(Vue){}
- 使用方法：
- import plugins from "plugins.js"
- Vue.us(plugins)
### 一些技巧
- 如何引入第三方库，下面为其中一种方法
- 1.npm 安装 ： 
-   npm install dayjs --save
- 2.main.js引入挂载到全局 ：
-   import dayjs from "dayjs"
-   Vue.prototype.$dayjs = dayjs;
- 3.按需在组件中调用 ：
-   console.log(this.$dayJs().format('YYYY-MM-DD')) // 2022-05-07


### 学习问题
- vc 指的是哪个需要清晰
