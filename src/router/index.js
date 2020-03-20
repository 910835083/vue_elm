import Vue from 'vue'
import VueRouter from 'vue-router'
import MSite from '../pages/MSite/MSite.vue'
import Order from '../pages/Order/Order.vue'
import Profile from '../pages/Profile/Profile.vue'
import Search from '../pages/Search/Search.vue'
import Login from '../pages/Login/Login.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        redirect: '/msite'
    },
    {
        path: '/msite',
        name: 'MSite',
        component: MSite,
        meta: {
            showFoot: true
        }
    },
    {
        path: '/order',
        name: 'Order',
        component: Order,
        meta: {
            showFoot: true
        }
    },
    {
        path: '/search',
        name: 'Search',
        component: Search,
        meta: {
            showFoot: true
        }
    },
    {
        path: '/profile',
        name: 'Profile',
        component: Profile,
        meta: {
            showFoot: true
        }
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: {
            showFoot: false
        }
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/About.vue')
    }
]

const router = new VueRouter({
    routes
})

export default router