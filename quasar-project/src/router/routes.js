const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'popis_knjiga', component: () => import('pages/PopisKnjigaPage.vue') },
      { path: 'pretrazivanje', component: () => import('pages/TraziKnjiguPage.vue') },
      { path: 'o_nama', component: () => import('pages/ONamaPage.vue') },
      { path: 'rezervacije', component: () => import('pages/RezervacijePage.vue') }
    ]
  },
  
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
];

export default routes;

