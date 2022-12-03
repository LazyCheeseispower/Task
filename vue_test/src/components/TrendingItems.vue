<template>
  <div class="trending-items">
    <a href=":;" v-for="(item, id) in itemsData" :key="id">
      <div class="trending-item">
        <div class="trending-number">{{ item.id }}</div>
        <div class="trending-text">{{ item.title }}</div>
        <img
          v-show="item.isNew"
          class="trending-mark"
          src="https://i0.hdslb.com/bfs/feed-admin/4d579fb61f9655316582db193118bba3a721eec0.png@28h"
        />
        <img
          v-show="item.isHot"
          class="trending-mark"
          src="https://i0.hdslb.com/bfs/feed-admin/e9e7a2d8497d4063421b685e72680bf1cfb99a0d.png@28h"
        />
      </div>
    </a>
  </div>
</template>

<script>
export default {
  name: "TrendingItems",
  props:["itemsData"],

};
</script>

<style>
</style>