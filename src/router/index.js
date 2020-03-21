import Vue from 'vue'
import VueRouter from 'vue-router'
const MSite = () =>
    import ('../pages/MSite/MSite.vue')
const Order = () =>
    import ('../pages/Order/Order.vue')
const Profile = () =>
    import ('../pages/Profile/Profile.vue')
const Search = () =>
    import ('../pages/Search/Search.vue')
    // import MSite from '../pages/MSite/MSite.vue'
    // import Order from '../pages/Order/Order.vue'
    // import Profile from '../pages/Profile/Profile.vue'
    // import Search from '../pages/Search/Search.vue'
import Login from '../pages/Login/Login.vue'
import Shop from '../pages/Shop/Shop.vue'
import ShopGoods from '../pages/Shop/ShopGoods/ShopGoods.vue'
import ShopRead from '../pages/Shop/ShopRead/ShopRead.vue'
import ShopInfo from '../pages/Shop/ShopInfo/ShopInfo.vue'
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
        path: '/shop',
        component: Shop,
        meta: {
            showFoot: false
        },
        children: [{
                path: '/shop/goods',
                name: 'shopgoods',
                component: ShopGoods,
            },
            {
                path: '/shop/read',
                name: 'shopread',
                component: ShopRead,
            },
            {
                path: '/shop/info',
                name: 'shopinfo',
                component: ShopInfo,
            },
            {
                path: '',
                redirect: '/shop/goods'
            }
        ]
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