
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/Index.vue')
      },

      {
        path: 'estados',
        name: 'estado-list',
        component: () => import('pages/estado/list'),
      },

      {
        path: 'cidades',
        name: 'cidade-list',
        component: () => import('pages/cidade/list'),
      },

      {
        path: 'clientes',
        name: 'cliente-list',
        component: () => import('pages/cliente/list'),
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
