<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item,index) in levelList" :key="item.path">
        <span v-if="item.redirect==='noRedirect'||index===levelList.length-1" class="no-redirect">{{ item.meta.title }}</span>
        <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script lang="ts">
import {defineComponent, ref, watch} from 'vue'
import {useRouter, useRoute} from "vue-router";
import qs from 'qs'

export default defineComponent({
  name: "Breadcrumb",
  setup() {
    const router = useRouter()
    const route = useRoute()
    const levelList = ref([])

    const getBreadcrumb = () => {
      // @ts-ignore
      let matched = route.matched.filter(item => item.meta && item.meta.title)
      const first = matched[0]
      if (!isDashboard(first)) {
        // @ts-ignore
        matched = [{ path: '/dashboard', meta: { title: 'Dashboard' }}].concat(matched)
      }
      // @ts-ignore
      levelList.value = matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false)
    }
    const isDashboard = (match:any) => {
      const name = match && match.name
      if (!name) {
        return false
      }
      return name.trim().toLocaleLowerCase() === 'Dashboard'.toLocaleLowerCase()
    }
    const handleLink = (item:any) => {
      const { redirect } = item
      if (redirect) {
        router.push(redirect)
        return
      }
      let path = item.path
      const { params } = route
      if (params) {
        path += `?${qs.stringify(params)}`
      }
      router.push(path)
    }
    watch(route, (val)=> {
      if (val.path.startsWith('/redirect/')) {
        return
      }
      getBreadcrumb()
    }, {immediate: true})

    return {
      levelList,
      handleLink
    }
  }
})
</script>

<style lang="sass" scoped>
.app-breadcrumb.el-breadcrumb
  display: inline-block
  font-size: 14px
  line-height: 50px
  margin-left: 8px

  .no-redirect
    color: #97a8be
    cursor: text

</style>
