<template>
  <div>
    <h1>当前数值为：{{ sum }}</h1>
    <h1>十倍数值为：{{ $store.getters.bigSum }}</h1>
    <h1>下方人数总计{{personList.length}}</h1>
    <select v-model.number="number">
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </select>
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
    <button @click="incrementOdd">当前求和为奇数再加</button>
    <button @click="incrementWait">等一等再加</button>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Count",
  data() {
    return {
      number: 1,
    };
  },
  computed: {
    ...mapState({ sum: "sum" ,personList:"personList"}),
  },
  methods: {
    increment() {
      this.$store.commit("JIA", this.number);
    },
    decrement() {
      this.$store.commit("JIAN", this.number);
    },
    incrementOdd() {
      this.$store.dispatch("jiaOdd", this.number);
    },
    incrementWait() {
      this.$store.dispatch("jiaWait", this.number);
    },
  },
};
</script>
<style>
button {
  margin-left: 5px;
}
</style>
