# 22-10-31 日报
## 学习
### 学习内容
#### 一些知识点
- MVVM 模型 :
- Model 是 data 中的数据
- View 视图，是模板代码
- ViewModel 视图模型，Vue 的实例

- 数据代理，通过一个对象操作另外一个对象的属性

- object.defineProperty() 和直接在对象内定义的不同在于 枚举/修改/删除(三个都可以代码修改) 面对对象的思想，对象上有 set(value) 和 get()


#### 一些待完善知识点
- methods 
- computed
- watch
- 绑定 class 和 style
- filters
#### 指令
- v-on ：onclick 绑定点击事件，简写为 @
- v-bind : 单向绑定  将 Vue 中的内容加载到页面上
- v-model ： 双向绑定  
- v-show ：会渲染 CSS 添加 display:none  (频繁时使用)
- v-if ：不会渲染在页面上 
- v-else-if
- v-for : 循环遍历 example:  v-for="(p,index) in persons :key="index" 这边的 key 值使用了 index 值
- v-text / v-html ：innerText / innerHTML (有提到 cookie ，增加一点点认知)
- v-cloak(没有值) : 实例创建完毕并接管容器后，会删除，可以和 CSS 的属性选择器 [] 一起使用解决页面显示的问题
- v-once(没有值) : 所在节点初次渲染后就将节点视为静态
- v-pre(没有值) : 所在节点跳过编译过程

#### 事件修饰符
- prevent : 阻止默认事件
- stop : 阻止事件冒泡
- once : 事件只触发一次
- capture : 使用事件的捕获模式
- self : 只有 event.target 是当前操作的元素才触发事件
- passive : 事件的默认行为立即执行

#### 键盘事件
- @keyup 未提供的可以通过 key 值绑定， ctrl / alt / shift / meta 在这种情况先按下其他键随后释放其他键，才会触发
- @keydown 回车enter 删除 delete 退出 esc 空格 space 换行 tap  


- Vue.set(target,propertyName/index,value) && vm.$set(target,propertyName/index,value) 给后添加的属性做响应式
- 数组的七个方法  pop()/push()/shift()/unshift()/sort()/reserve()/splice() 能够直接改变原数组，在 Vue 中对这七个方法做了包装能够直接监测
- 数组的其他方法可以用一个新变量去承接，也能够达到同样的效果

#### 生命周期


### 一些技巧
- 使用 label 标签包裹文字使文字与其他元素关联

### 学习问题
- 使用或者不使用 箭头函数 都是为了让 this 能够指向实例化的 Vue 对象，但是具体使用在自己写的代码里竟然没有
- 学到 Date.now() 可以利用第三方库封装的函数，将时间戳转换为具体时间，但是 computed 时间没有自己更新，用 watch 侦听？ 
- 那么问题来了， methods / computed / watch 都是在什么时候回调的
- 边学边忘