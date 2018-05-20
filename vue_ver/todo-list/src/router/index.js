import Vue from 'vue'
import Router from 'vue-router'
import todos from '@/components/todos'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'todos',
      component: todos
    }
  ]
})
