<template>
  <div id="root">
    <h1>{{msg}}</h1>
    <School/>
    <Student/>
  </div>
</template>

<script>
import School from "./components/School.vue";
import Student from "./components/Student.vue";

export default {
  name: "App",
  components: {
    Student,
    School,
    
  },
  data(){
    return {
      msg:'你好啊'
    }
  }
  
};
</script>

<style>

</style>