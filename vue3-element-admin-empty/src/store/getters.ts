const getters = {
  permission_routes: (state:any) => state.permission.routes,
  token: (state:any) => state.user.token,
  roles: (state:any) => state.user.roles,
  visitedViews: (state:any) => state.tagView.visitedViews,
  cachedViews: (state:any) => state.tagView.cachedViews
}
export default getters;
