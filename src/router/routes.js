
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/',name:'home',props:true, component: () => import('pages/IndexPage.vue') },
      { path:'/trailer',name:'trailer',props:true,component:()=>import('pages/trailer.vue')},
      { path:'/detail',name:'detail',props:true,component:()=>import('pages/detail.vue')},
      { path:'/moreDetail',name:'moreDetail',component:()=>import('pages/moreDetail.vue')},
      { path:'/searchResult',name:'searchResult',props:true,component:()=>import('pages/searchResult.vue')},
      { path:'/showSelected',name:'showSelected',props:true,component:()=>import('pages/showSelected.vue')},
      { path:'/showSelectedActor',name:'showSelectedActor',props:true,component:()=>import('pages/showSelectedActor.vue')},
      { path:'/awards',name:'awards',props:true,component:()=>import('pages/awards.vue')},
      { path:'/movieAwards',name:'movieAwards',props:true,component:()=>import('pages/movieAwards.vue')}
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
