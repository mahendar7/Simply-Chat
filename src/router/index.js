import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Chat from '../components/Chat.vue'

import VueChatScroll from 'vue-chat-scroll';

Vue.use(VueRouter)
Vue.use(VueChatScroll)


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/chat',
    name: 'Chat',
    component: Chat,
    props: true,
    beforeEnter: (to, from, next) => {
      if (to.params.name) {
        next();
      } else {
        next({ name: 'Home' });
        // next({ path: '/' }); Can use Path Also
        // next(from); //To from URL,Can use this Also
      }
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
