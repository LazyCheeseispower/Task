<template>
  <div class="demo">
    <h2>学生名称{{ name }}</h2>
    <h2>学生年龄{{ age }}</h2>
    <button @click="showName">点我显示学生名</button>
  </div>
</template>

<script>
export default {
  name: "Student",
  data() {
    return {
      name: "Lazy",
      age: 23,
    };
  },
  methods: {
    showName() {
      alert(this.name);
    },
  },
};
</script>

<style>
.demo {
  background-color: rgb(255, 170, 0);
}
</style>