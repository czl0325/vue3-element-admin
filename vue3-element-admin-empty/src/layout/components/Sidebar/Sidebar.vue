<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu
        :default-active="activeMenu"
        background-color="#304156"
        text-color="#bfcbd9"
        unique-opened
        active-text-color="#409EFF"
        :collapse-transition="false"
        mode="vertical"
    >
      <sidebar-item v-for="route in permission_routes" :key="route.path" :item="route" :base-path="route.path" />
    </el-menu>
  </el-scrollbar>
</template>

<script lang="ts">
import {defineComponent, computed} from 'vue'
import {useRoute} from "vue-router";
import SidebarItem from "@/layout/components/Sidebar/SidebarItem.vue";
import {useStore} from 'vuex'

export default defineComponent({
  name: "Sidebar",
  components: {
    SidebarItem
  },
  setup() {
    const store = useStore()
    const get_routers = async () => {
      const accessRoutes = await store.dispatch('permission/generateRoutes', ['admin'])
    }
    get_routers()
    const permission_routes = computed(() => store.getters.permission_routes)
    const activeMenu = computed(() => {
      const route = useRoute()
      const { meta, path } = route
      // @ts-ignore
      if (meta.activeMenu) {
        // @ts-ignore
        return meta.activeMenu
      }
      return path
    })
    return {
      permission_routes,
      activeMenu
    }
  }
})
</script>

<style scoped>

</style>
