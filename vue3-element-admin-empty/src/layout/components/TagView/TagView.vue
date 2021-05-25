<template>
  <div style="min-height: 50px;border-bottom: 1px solid #f8f8f8;">
    <el-tabs v-model="activePath" type="card" closable @tab-click="tabClick" @tab-remove="tabRemove">
      <el-tab-pane v-for="tab in visibleView" :name="tab.path" :key="tab.path" :label="tab.title"></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref, computed, watch} from 'vue'
import {useStore} from "vuex";
import {useRoute, useRouter} from "vue-router";
import path from "path";

export default defineComponent({
  name: "TagView",
  setup() {
    const store = useStore()
    const route = useRoute()
    const visibleView = computed(() => store.getters.visitedViews)
    const activePath = computed(() => route.path)
    const tabClick = (e) => {

    }
    const tabRemove = () => {

    }
    watch(route, (val) => {
      const { name } = val
      if (name) {
        store.dispatch('tagView/addView', route)
      }
    }, {immediate: true})
    const filterAffixTags = (routes, basePath = '/') => {
      let tags = []
      routes.forEach(route => {
        if (route.meta && route.meta.affix) {
          const tagPath = path.resolve(basePath, route.path)
          tags.push(route)
        }
        if (route.children) {
          const tempTags = filterAffixTags(route.children, route.path)
          if (tempTags.length >= 1) {
            tags = [...tags, ...tempTags]
          }
        }
      })
      return tags
    }
    const initTags = () => {
      const affixTags = filterAffixTags(store.getters.permission_routes)
      for (const tag of affixTags) {
        if (tag.name) {
          store.dispatch('tagView/addVisitedView', tag)
        }
      }
    }
    initTags()
    return {
      activePath,
      visibleView,
      tabClick,
      tabRemove
    }
  }
})
</script>

<style scoped>

</style>
