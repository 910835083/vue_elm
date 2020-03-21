import Vue from 'vue'
import Vuex from 'vuex'
import { reqLogout, reqUserInfo, reqAdderss, reqFoodCategorys, reqShops } from '../api/index'
import { RESET_USER_INFO, RECEIVE_USER_INFO, RECEIVE_ADDERSS, RECEIVE_CATEGORYS, RECEIVE_SHOPS } from '../store/type'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        latitude: 40.10038,
        longitude: 116.36867,
        adderss: [],
        categorys: [],
        shops: [],
        userInfo: {},
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
    },
    modules: {},
    getters: {

    }
})