<script>
import {defineComponent} from "vue";
import SvgIcon from '@/components/SvgIcon/index.vue'

export default defineComponent({
  name: 'MyMenuItem',
  functional: true,
  components: {
    SvgIcon
  },
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  render(props) {
    const { icon, title } = props
    const vnodes = []
    if (icon) {
      if (icon.includes('el-icon')) {
        vnodes.push(<i class={[icon]} />)
      } else {
        vnodes.push(<svg-icon icon-class={icon}/>)
      }
    }

    if (title) {
      vnodes.push(<span slot='title'>{(title)}</span>)
    }
    return vnodes
  }
})
</script>

<style scoped>

</style>
