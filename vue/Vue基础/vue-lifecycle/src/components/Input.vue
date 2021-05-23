<template>
  <div>
    <input type="text" v-model="title">
    <button @click="addTitle">add</button>
  </div>
</template>

<script>
import event from '../utils/event'
export default {
  data () {
    return {
      title: ''
    }
  },
  methods: {
    addTitle () {
      // 调用父组件的事件
      this.$emit('add', this.title)
      // 调用自定义的事件
      event.$emit('onAddTitle', this.title)
      this.title = ''
    }
  }
}
</script>

<style>

</style>
