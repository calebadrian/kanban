import vue from "vue"
import vuex from "vuex"
import axios from "axios"
import router from "../router"

var api = axios.create({
    baseURL: "//localhost:3000/api/",
    timeout: 5000,
    withCredentials: true
})

var auth = axios.create({
    baseURL: "//localhost:3000/auth/",
    timeout: 5000,
    withCredentials: true
})

vue.use(vuex)

export default new vuex.Store({
    state: {
        user: {},
        boards: [],
        activeBoard: {}
    },
    mutations: {
        setUser(state, payload){
            state.user = payload
        },
        setBoards(state, payload){
            state.boards = payload
        }
    },
    actions: {
        authenticate({commit, dispatch}){
            auth
                .get('authenticate')
                    .then(res => {
                        commit('setUser', res.data)
                        router.push({name: 'Home'})
                    })
                    .catch(err => {
                        console.log('Invalid Username or Password')
                        router.push({name: 'Login'})
                    })
        },
        login({commit, dispatch}, payload){
            auth
                .post('login', payload)
                    .then(res => {
                        commit('setUser', res.data)
                        router.push({name: 'Home'})
                    })
                    .catch(err => {
                        console.log('Invalid Username or Password')
                        router.push({name: 'Login'})
                    })
        },
        createUser({commit, dispatch}, payload){
            auth
                .post('register', payload)
                    .then(res => {
                        alert("user was created successfully")
                        router.push({name: 'Login'})
                    })
                    .catch(err => {
                        console.log("Invalid username or password")
                        router.push({name: 'Login'})
                    })
        },
        logout({commit, dispatch}){
            auth
                .delete('logout')
                .then(res => {
                    router.push({name: 'Login'})
                })
                .catch(err => {
                    console.error(err)
                })
        },
        getBoards({commit, dispatch}){
            api
                .get('boards')
                .then(res => {
                    commit('setBoards', res.data)
                })
                .catch(err => {
                    console.error(err)
                })
        },
        addBoard({commit, dispatch}, payload){
            api
                .post('boards', payload)
                .then(res => {
                    dispatch('getBoards')
                })
                .catch(err => {
                    console.error(err)
                })
        },
        removeBoard({commit, dispatch}, payload){
            api
                .delete('boards/' + payload._id)
                .then(res => {
                    dispatch('getBoards')
                })
                .catch(err => {
                    console.error(err)
                })
        }
    }
})