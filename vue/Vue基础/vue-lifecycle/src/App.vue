<template>
  <div id="app">
    <h1>测试父子组件挂载、更新和销毁三个阶段，生命周期钩子执行顺序</h1>
    <p>测试挂载阶段</p>
    <Input @add="addHandler" />

    <List v-if="isShow" :list="list" @delete="deleteHandler"/>
    <button @click="isShow = false">销毁List</button>
  </div>
</template>

<script>
import Input from './components/Input.vue'
import List from './components/List.vue'

export default {
  name: 'App',
  components: {
    List,
    Input
  },
  data () {
    return {
      isShow: true,
      list: [
        {
          id: 'id-1',
          title: '标题1'
        },
        {
          id: 'id-2',
          title: '标题2'
        }
      ]
    }
  },
  methods: {
    addHandler (title) {
      console.log('触发父组件的自定义事件：add')
      this.list.push({
        id: `id-${Date.now()}`,
        title
      })
    },
    deleteHandler (id) {
      this.list = this.list.filter(item => item.id !== id)
    }
  },
  created () {
    console.log('app created')
  },
  mounted () {
    console.log('app mounted')
  },
  beforeUpdate () {
    console.log('app before update')
  },
  updated () {
    console.log('app updated')
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
