<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
      <Uploader v-model="imgsList">
        <div>选择文件</div>
      </Uploader>
    </div>
    <router-view/>
  </div>
</template>
<script>
import Uploader from 'common/Uploader'
export default {
  data () {
    return {
      imgsList: []
    }
  },
  components: {
    Uploader
  }
}
</script>
<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
