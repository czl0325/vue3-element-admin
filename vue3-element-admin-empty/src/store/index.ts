import { createStore } from 'vuex'
import getters from "@/store/getters.ts";

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
export default createStore({
  modules,
  getters
})
