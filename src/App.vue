<template>
  <div id="app">
    <router-view/>
    <Footer v-show="$route.meta.showFoot" />
  </div>
</template>
<script>
import Footer from './components/Footer/Footer.vue'
export default {
  components : {
    Footer
  }
}
</script>
<style lang="stylus" scoped>
#app
  width 100%
  height 100%
  background #f5f5f5
</style>
