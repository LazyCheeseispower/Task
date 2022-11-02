<template>
  <div>
    <img src="./assets/logo.png" alt="logo">
    <School></School>
    <Student name="Lazy" :age="23"/>
    <ShowTime></ShowTime>
  </div>
</template>

<script>
import School from "./components/School.vue";
import Student from "./components/Student.vue";
import ShowTime from "./components/ShowTime.vue";
export default {
  name: "App",
  components: {
    School,
    Student,
    ShowTime
  },
};
</script>

