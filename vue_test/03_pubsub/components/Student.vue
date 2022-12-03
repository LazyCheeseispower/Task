<template>
  <div class="demo1">
    <h2>学生名称{{ name }}</h2>
    <h2>学生年龄{{ age }}</h2>
    <button @click="showName">点我显示学生名</button>
    <button @click="sendInfoSchool">点我给学校传数据</button>
  </div>
</template>

<script>
import pubsub from "pubsub-js"
export default {
  name: "StudentInfo",

  methods: {
    showName() {
      alert(this.name);
    },
    sendInfoSchool(){
      pubsub.publish('hello',666)
    }
  },
data(){
    return {
      name:'Lazy',
      age:23
    }
  }
};
</script>

<style>
.demo1 {
  background-color: rgb(255, 170, 0);
}
</style>