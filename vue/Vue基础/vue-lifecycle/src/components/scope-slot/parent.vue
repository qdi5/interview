<template>
  <div class="parent">
    <scope>
      <template v-slot="xxx">
        <div>
          作用域插槽
          {{ xxx.user.name}}
        </div>
      </template>
    </scope>
  </div>
</template>

<script>
import scope from './scope.vue'
export default {
  components: { scope }
}
</script>

<style>

</style>
