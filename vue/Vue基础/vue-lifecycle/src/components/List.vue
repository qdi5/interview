<template>
  <div>
    <ul>
      <child-component></child-component>
      <li v-for="item in list" :key="item.id">
        {{ item.title }}
        <button @click="deleteItem(item.id)">删除</button>
      </li>
    </ul>
  </div>
</template>

<script>
import ChildComponent from './ChildComponent'
import event from '../utils/event'
export default {
  name: 'List',
  props: {
    list: {
      type: Array,
      default () {
        return []
      }
    }
  },
  components: {
    ChildComponent
  },
  methods: {
    deleteItem (id) {
      this.$emit('delete', id)
    },
    addTitleHandler (title) {
      console.log('自定义事件触发： on add title', title)
    }
  },
  created () {
    console.log('list created')
  },
  mounted () {
    console.log('list mounted')
    event.$on('onAddTitle', this.addTitleHandler)
  },
  beforeUpdate () {
    console.log('list before update')
  },
  updated () {
    console.log('list updated')
  },
  beforeDestroy () {
    event.$off('onAddTitle', this.addTitleHandler)
    console.log('list before destroy')
  },
  destroyed () {
    console.log('list destroyed')
  }
}
</script>
