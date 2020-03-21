import Vue from 'vue'
import Vuex from 'vuex'
import {
    reqShopRatings,
    reqShopGoods,
    reqShopInfo,
    reqLogout,
    reqUserInfo,
    reqAdderss,
    reqFoodCategorys,
    reqShops,
    reqSearchShop
} from '../api/index'
import {
    DECREMENT_FOOD_COUNT,
    INCREMENT_FOOD_COUNT,
    RECEIVE_GOODS,
    RECEIVE_RATINGS,
    RECEIVE_INFO,
    RESET_USER_INFO,
    RECEIVE_USER_INFO,
    RECEIVE_ADDERSS,
    RECEIVE_CATEGORYS,
    RECEIVE_SHOPS,
    CLEAR_CART,
    RECEIVE_SEARCH_SHOPS
} from '../store/type'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        latitude: 40.10038,
        longitude: 116.36867,
        adderss: [],
        categorys: [],
        shops: [],
        userInfo: {},
        goods: [],
        ratings: [],
        info: {},
        cartFoods: [],
        searchShops: [],
    },
    mutations: {
        [RECEIVE_ADDERSS](state, { adderss }) {
            state.adderss = adderss
        },
        [RECEIVE_CATEGORYS](state, { categorys }) {
            state.categorys = categorys
        },
        [RECEIVE_SHOPS](state, { shops }) {
            state.shops = shops
        },
        [RECEIVE_USER_INFO](state, { userInfo }) {
            state.userInfo = userInfo
        },
        [RESET_USER_INFO](state) {
            state.userInfo = {}
        },
        [RECEIVE_INFO](state, { info }) {
            state.info = info
        },

        [RECEIVE_RATINGS](state, { ratings }) {
            state.ratings = ratings
        },

        [RECEIVE_GOODS](state, { goods }) {
            state.goods = goods
        },
        [INCREMENT_FOOD_COUNT](state, { food }) {
            if (!food.count) {
                Vue.set(food, 'count', 1)
                state.cartFoods.push(food)
            } else {
                food.count++
            }
        },
        [DECREMENT_FOOD_COUNT](state, { food }) {
            if (food.count) {
                food.count--
                    if (food.count === 0) {
                        state.cartFoods.splice(state.cartFoods.indexOf(food), 1)
                    }
            }

        },
        [CLEAR_CART](state) {
            state.cartFoods.forEach(food => food.count = 0)
            state.cartFoods = []
        },
        [RECEIVE_SEARCH_SHOPS](state, { searchShops }) {
            state.searchShops = searchShops
        },
    },
    actions: {
        async getAdderss({ commit, state }) {
            const geohash = state.latitude + ',' + state.longitude
            const result = await reqAdderss(geohash)
            if (result.code === 0) {
                const adderss = result.data
                commit(RECEIVE_ADDERSS, { adderss })
            }
        },
        async getCategorys({ commit, state }) {
            const result = await reqFoodCategorys()
            if (result.code === 0) {
                const categorys = result.data
                commit(RECEIVE_CATEGORYS, { categorys })
            }
        },
        async getShops({ commit, state }) {
            const { longitude, latitude } = state
            const result = await reqShops(longitude, latitude)
            if (result.code === 0) {
                const shops = result.data
                commit(RECEIVE_SHOPS, { shops })
            }
        },
        recordUser({ commit }, userInfo) {
            commit(RECEIVE_USER_INFO, { userInfo })
        },
        async getUserInfo({ commit }) {
            const result = await reqUserInfo()
            if (result.code === 0) {
                const userInfo = result.data
                commit(RECEIVE_USER_INFO, { userInfo })
            }
        },
        async logout({ commit }) {
            const result = await reqUserInfo()
            if (result.code === 0) {
                commit(RESET_USER_INFO)
            }
        },
        async getShopInfo({ commit }) {
            const result = await reqShopInfo()
            if (result.code === 0) {
                const info = result.data
                commit(RECEIVE_INFO, { info })
            }
        },

        // 异步获取商家评价列表
        async getShopRatings({ commit }, callback) {
            const result = await reqShopRatings()
            if (result.code === 0) {
                const ratings = result.data
                commit(RECEIVE_RATINGS, { ratings })
                    // 数据更新了, 通知一下组件
                callback && callback()
            }
        },

        // 异步获取商家商品列表
        async getShopGoods({ commit }, callback) {
            const result = await reqShopGoods()
            if (result.code === 0) {
                const goods = result.data
                commit(RECEIVE_GOODS, { goods })
                    // 数据更新了, 通知一下组件
                callback && callback()
            }
        },

        updateFoodCount({ commit }, { isAdd, food }) {
            if (isAdd) {
                commit(INCREMENT_FOOD_COUNT, { food })
            } else {
                commit(DECREMENT_FOOD_COUNT, { food })
            }
        },
        clearCart({ commit }) {
            commit(CLEAR_CART)
        },
        async searchShops({ commit, state }, keyword) {

            const geohash = state.latitude + ',' + state.longitude
            const result = await reqSearchShop(geohash, keyword)
            if (result.code === 0) {
                const searchShops = result.data
                commit(RECEIVE_SEARCH_SHOPS, { searchShops })
            }
        },
    },
    modules: {},
    getters: {
        totalCount(state) {
            return state.cartFoods.reduce((preTotal, food) => preTotal + food.count, 0)
        },

        totalPrice(state) {
            return state.cartFoods.reduce((preTotal, food) => preTotal + food.count * food.price, 0)
        },

        positiveSize(state) {
            return state.ratings.reduce((preTotal, rating) => preTotal + (rating.rateType === 0 ? 1 : 0), 0)
        }
    }
})