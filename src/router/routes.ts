import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: () => import('pages/LoginPage.vue'),
    meta: {
      public: true,
    },
  },

  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'home',
        redirect: {
          name: 'classList',
        },
      },
      {
        path: '/classes',
        name: 'classList',
        component: () => import('pages/ClassList.vue'),
      },
      {
        path: '/classes/:classId',
        name: 'classDetails',
        component: () => import('pages/ClassDetails.vue'),
        props: true,
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
