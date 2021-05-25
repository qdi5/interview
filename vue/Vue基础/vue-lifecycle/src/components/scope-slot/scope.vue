<template>
  <div class="scope">
    <slot :user="slotProp"></slot>
  </div>
</template>

<script>
export default {
  data () {
    return {
      slotProp: {
        name: '刘德华'
      }
    }
  }
}
</script>

<style>

</style>
