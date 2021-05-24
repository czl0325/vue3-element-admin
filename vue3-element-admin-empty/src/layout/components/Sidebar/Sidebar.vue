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

export default defineComponent({
  name: "Sidebar",
  components: {
    SidebarItem
  },
  setup() {
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
      activeMenu
    }
  }
})
</script>

<style scoped>

</style>
