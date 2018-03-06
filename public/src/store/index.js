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
        activeBoard: {},
        activeLists: [],
        activeTasks: []
    },
    mutations: {
        setUser(state, payload){
            state.user = payload
        },
        setBoards(state, payload){
            state.boards = payload
        },
        setActiveBoard(state, payload){
            state.activeBoard = payload
        },
        setActiveLists(state, payload){
            state.activeLists = payload
        },
        setActiveTasks(state, payload){
            vue.set(state.activeTasks, payload.listId, payload.activeTasks || [])
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
        },
        setActiveBoard({commit, dispatch}, payload){
            commit('setActiveBoard', payload)
        },
        getBoardById({commit, dispatch}, payload){
            api
                .get('boards/' + payload)
                .then(res => {
                    commit('setActiveBoard', res.data)
                })
                .catch(err => {
                    console.error(err)
                })
        },
        getLists({commit, dispatch}, payload){
            api
                .get('boards/' + payload + '/lists')
                .then(res => {
                    commit('setActiveLists', res.data)
                })
                .catch(err => {
                    console.error(err)
                })
        },
        addList({commit, dispatch}, payload){
            api
                .post('boards/' + payload.boardId + '/lists/', payload)
                .then(res => {
                    dispatch('getLists', payload.boardId)
                })
                .catch(err => {
                    console.error(err)
                })
        },
        getTasks({commit, dispatch}, payload){
            api
                .get('boards/' + payload.boardId + '/lists/' + payload._id + '/tasks')
                .then(res => {
                    commit('setActiveTasks', {listId: payload._id, activeTasks: res.data})
                })
                .catch(err => {
                    console.error(err)
                })
        },
        addTask({commit, dispatch}, payload){
            api
                .post('boards/' + payload.boardId + '/lists/' + payload.listId + '/tasks', payload)
                .then(res => {
                    dispatch('getTasksAfterAdd', payload)
                })
                .catch(err => {
                    console.error(err)
                })
        },
        getTasksAfterAdd({commit, dispatch}, payload){
            api
                .get('boards/' + payload.boardId + '/lists/' + payload.listId + '/tasks')
                .then(res => {
                    commit('setActiveTasks', {listId: payload.listId, activeTasks: res.data})
                })
                .catch(err => {
                    console.error(err)
                })
        }

    }
})