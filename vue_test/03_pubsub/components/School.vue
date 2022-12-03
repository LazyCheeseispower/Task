<template>
  <div class="demo">
    <h2>学校名称{{ name }}</h2>
    <h2>学校地址{{ address }}</h2>
    <button @click="showName">点我显示学校名</button>
  </div>
</template>

<script>
import pubsub from "pubsub-js"
export default {
  name: "SchoolInfo",
  data() {
    return {
      name: "大学",
      address: "北京",
    };
  },
  methods: {
    showName() {
      alert(this.name);
    },
  },
  mounted(){
  //  this.pubId =  pubsub.subscribe('hello',function(msgName,data){
  //     console.log("订阅成功",data);
  //   })
  this.pubId =  pubsub.subscribe('hello',(msgName,data)=>{
       console.log("订阅成功",data);
     })
  },
  beforeDestroy(){
    pubsub.unsubscribe(this.pubId)
  }
};
</script>

<style>
.demo {
  background-color: aqua;
}
</style>