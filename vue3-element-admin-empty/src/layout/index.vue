<template>
  <div>
    <breadcrumb />
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import Breadcrumb from '../components/Breadcrumb/index.vue'

export default defineComponent({
  name: "Layout",
  components: {
    Breadcrumb
  },
  setup() {

    return {}
  }
})
</script>

<style scoped>

</style>
