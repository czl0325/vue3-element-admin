interface RouteModel {
  readonly path: string;
  readonly meta: object;
}

// 固定首页路由
export const homeRoute: RouteModel = {
  path: "/",
  meta: {
    title: "首页",
    icon: "el-icon-s-home",
    showLink: true,
    savedPosition: false,
  },
};
