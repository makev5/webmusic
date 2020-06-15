import Vue from 'vue'
import Router from 'vue-router'
import index from '../view/index.vue'
import discovery from '../view/discovery.vue'
import playlist from '../view/playlist.vue'
import music from '../view/music.vue'
import mv from '../view/mv.vue'
import result from '../view/result.vue'
import list from '../view/list.vue'
import mvDetail from '../view/mvDetail.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: index,
      children: [
        {
          path: '/discovery',
          component: discovery
        },
        {
          path: '',
          redirect: '/discovery'
        },
        {
          path: '/playlists',
          component: playlist
        },
        {
          path: '/music',
          component: music
        },
        {
          path: '/mvs',
          component: mv
        },
        {
          path: '/result',
          component: result
        },
        {
          path: '/playlist',
          component: list
        },
        {
          path: '/mv',
          component: mvDetail
        }
      ]
    }
  ],
  watch: {
    '$route': function(to,from){
  　　document.body.scrollTop = 0
      document.documentElement.scrollTop = 0;
    }
  }
})
