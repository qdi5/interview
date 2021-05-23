<template>
  <div>子组件哈</div>
</template>

<script>
export default {
  created () {
    console.log('子组件created')
  },
  mounted () {
    console.log('子组件mounted')
  },
  beforeUpdate () {
    console.log('子组件beforeUpdate')
  },
  updated () {
    console.log('子组件updated')
  },
  beforeDestroy () {
    console.log('子组件beforeDestroy')
  },
  destroyed () {
    console.log('子组件destroyed')
  }
}
</script>

<style>

</style>
