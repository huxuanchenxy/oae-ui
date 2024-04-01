import { createStore } from 'vuex'
const store = createStore({
    state() {
        return {
            dynamicRoutes: []
        }
    },
    mutations: {
        setDynamicRoutes(state) {
            state.dynamicRoutes = [];
        },


    }
})
export default store