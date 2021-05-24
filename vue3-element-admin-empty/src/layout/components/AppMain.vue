<template>
  <section class="app-main">
    <router-view :key="key" v-slot="{ Component }">
      <transition name="fade-transform" mode="out-in">
        <keep-alive :include="cachedViews">
          <component :is="Component"/>
        </keep-alive>
      </transition>
    </router-view>
  </section>
</template>

<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "AppMain",
  setup() {

    return {}
  }
})
</script>

<style scoped>

</style>
