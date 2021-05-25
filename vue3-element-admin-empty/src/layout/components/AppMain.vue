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
import {defineComponent, computed} from 'vue'
import {useStore} from "vuex";
import {useRoute} from "vue-router";

export default defineComponent({
  name: "AppMain",
  setup() {
    const store = useStore()
    const route = useRoute()
    const cachedViews = computed(() => store.getters.cachedViews)
    const key = computed(() => route.path)
    return {
      key,
      cachedViews
    }
  }
})
</script>

<style scoped>

</style>
