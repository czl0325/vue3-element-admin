const title = "后台管理系统"

const getPageTitle = (pageTitle:string) => {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}

export default getPageTitle;
