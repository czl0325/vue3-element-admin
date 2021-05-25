<template>
  <div style="min-height: 50px;border-bottom: 1px solid #f8f8f8;">
    <el-tabs type="card" closable @tab-click="tabClick" @tab-remove="tabRemove">
      <el-tab-pane v-for="tab in visibleView" :name="tab.path" :key="tab.path" :label="tab.title"></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref, computed, watch} from 'vue'
import {useStore} from "vuex";
import {useRoute, useRouter} from "vue-router";

export default defineComponent({
  name: "TagView",
  setup() {
    const store = useStore()
    const route = useRoute()
    const visibleView = computed(() => store.getters.visitedViews)
    const tabClick = () => {

    }
    const tabRemove = () => {

    }
    watch(route, (val) => {
      const { name } = val
      if (name) {
        store.dispatch('tagView/addView', route)
      }
    }, {immediate: true})
    return {
      visibleView,
      tabClick,
      tabRemove
    }
  }
})
</script>

<style scoped>

</style>
