import { createApp } from 'vue'
import App from './App.vue'
// @ts-ignore
import router from '@/router'
// @ts-ignore
import store from './store'

import '@/styles/index.scss'
import 'common-resetcss/reset.min.css'

const app = createApp(App)

import { ElRow, ElCol, ElMenu, ElMenuItem, ElMenuItemGroup, ElSubmenu, ElTabs, ElTabPane, ElTable, ElTableColumn, ElButton, ElForm, ElFormItem, ElInput, ElUpload, ElIcon, ElSelect, ElOption, ElPagination, ElBreadcrumb, ElBreadcrumbItem, ElDropdown, ElDropdownItem, ElDropdownMenu, ElScrollbar } from 'element-plus'
const components = [ ElRow, ElCol, ElMenu, ElMenuItem, ElMenuItemGroup, ElSubmenu, ElTabs, ElTabPane, ElTable, ElTableColumn, ElButton, ElForm, ElFormItem, ElInput, ElUpload, ElIcon, ElSelect, ElOption, ElPagination, ElBreadcrumb, ElBreadcrumbItem, ElDropdown, ElDropdownItem, ElDropdownMenu, ElScrollbar ]
components.forEach(component => {
  // @ts-ignore
  app.component(component.name, component)
})
app.use(store).use(router).mount('#app')
