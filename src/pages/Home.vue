<template>
  <div class="map-page-container">
    <el-amap class="map"></el-amap>
  </div>
</template>

<script>
  export default {
    name: 'Home',
    data: () => ({}),
  }
</script>
<style lang="less" scoped>
  .map-page-container {
    width: 100%;
    height: 500px;
    overflow: hidden;
    display: block;
  }
</style>

