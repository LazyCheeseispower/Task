<template>
  <div class="demo1">
    <h2>学生名称{{ name }}</h2>
    <h2>学生年龄{{ age }}</h2>
    <button @click="showName">点我显示学生名</button>
  </div>
</template>

<script>
export default {
  name: "StudentInfo",

  methods: {
    showName() {
      alert(this.name);
    },
  },
  props: {
    name: String,
    age: Number,
  },
};
</script>

<style>
.demo1 {
  background-color: rgb(255, 170, 0);
}
</style>