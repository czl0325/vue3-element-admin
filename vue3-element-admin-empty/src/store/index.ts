import { createStore } from 'vuex'
import getters from "@/store/getters.ts";
import VueXAlong from 'vuex-along';

const modulesFiles = require.context('./modules', true, /\.(js|ts)$/)
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  if (moduleName) {
    // @ts-ignore
    modules[moduleName] = value.default
  }
  return modules
}, {})
console.log(modules)
export default createStore({
  modules,
  getters,
  // plugins: [VueXAlong({
  //   name: 'Vue3Admin',
  //   local: { list: ['user', 'tagView', 'permission', 'settings'], isFilter: true },
  //   session: { list: [] }
  // })]
})
