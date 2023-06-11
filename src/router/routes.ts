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
        component: () => import('layouts/ClassDetailsLayout.vue'),
        children: [
          {
            path: '',
            name: 'classDetails',
            component: () => import('pages/ClassDetails.vue'),
            props: true,
          },
          {
            path: 'recitations',
            name: 'classRecitations',
            component: () =>
              import('pages/class-recitations/ClassRecitations.vue'),
            props: true,
          },
        ],
      },
      {
        path: '/classes/:classId/recitations/:recitationId',
        name: 'recitationDetails',
        component: () =>
          import('pages/recitation-details/RecitationDetails.vue'),
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
