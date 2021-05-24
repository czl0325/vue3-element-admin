module.exports = {
  title: '管理后台',

  /**
   * @type {boolean} true | false
   * @description 是否显示设置
   */
  showSettings: true,

  /**
   * @type {boolean} true | false
   * @description 是否显示面包屑导航
   */
  tagsView: true,

  /**
   * @type {boolean} true | false
   * @description 头部是否固定
   */
  fixedHeader: false,

  /**
   * @type {boolean} true | false
   * @description sidebar的logo
   */
  sidebarLogo: false,

  /**
   * @type {string | array} 'production' | ['production', 'development']
   * @description Need show err logs component.
   * The default is only used in the production env
   * If you want to also use it in dev, you can pass ['production', 'development']
   */
  errorLog: 'production'
}
