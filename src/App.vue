<template>
  <div class="app">
    <router-view />
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App'
})
</script>


<style>
  .app{
    font-family: 'Montserrat', sans-serif;
  }
</style>