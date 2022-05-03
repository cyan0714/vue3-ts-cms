const userPage = () => import('@/views/main/system/user/userPage.vue')
export default {
  path: '/main/system/user',
  name: 'userPage',
  component: userPage,
  children: []
}
