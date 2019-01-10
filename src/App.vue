<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  import Cookies from 'js-cookie'

  export default {
    name: 'App',
    beforeCreate() {
      if(Cookies.get('name')){
        this.$router.push('/home');
      }else{
        this.$router.push('/login');
      }

    }
  }
</script>

<style lang="less">
  #app {

  }
</style>
