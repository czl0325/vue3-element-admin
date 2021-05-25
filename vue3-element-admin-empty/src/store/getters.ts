const getters = {
  permission_routes: (state:any) => state.permission.routes,
  token: (state:any) => state.user.token,
  roles: (state:any) => state.user.roles
}
export default getters;
