import vue from "vue"
import vuex from "vuex"
import axios from "axios"
import router from "../router"

var production = !window.location.host.includes('localhost')
var baseUrl = production ? '//omeganize.herokuapp.com/' : '//localhost:3000/'

var api = axios.create({
    baseURL: baseUrl + "api/",
    timeout: 5000,
    withCredentials: true
})

var auth = axios.create({
    baseURL: baseUrl + "auth/",
    timeout: 5000,
    withCredentials: true
})

vue.use(vuex)

export default new vuex.Store({
    state: {
        user: {},
        foundUser: {},
        boards: [],
        activeBoard: {},
        activeLists: [],
        activeTasks: [],
        activeComments: [],
        movingTask: {},
        userForComment: {}
    },
    mutations: {
        setUser(state, payload) {
            state.user = payload
        },
        setFoundUser(state, payload) {
            state.foundUser = payload
        },
        setBoards(state, payload) {
            state.boards = payload
        },
        setActiveBoard(state, payload) {
            state.activeBoard = payload
        },
        setActiveLists(state, payload) {
            state.activeLists = payload
        },
        setActiveTasks(state, payload) {
            vue.set(state.activeTasks, payload.listId, payload.activeTasks || [])
        },
        setActiveComments(state, payload) {
            vue.set(state.activeComments, payload.taskId, payload.activeComments || [])
        },
        setMovingTask(state, payload) {
            state.movingTask = payload
        },
        setUserForComment(state, payload) {
            state.userForComment = payload
        }
    },
    actions: {
        authenticate({ commit, dispatch }) {
            auth
                .get('authenticate')
                .then(res => {
                    commit('setUser', res.data)
                    router.push({ name: 'Home' })
                })
                .catch(err => {
                    console.log('Invalid Username or Password')
                    router.push({ name: 'Login' })
                })
        },
        authenticateProfile({ commit, dispatch }) {
            auth
                .get('authenticate')
                .then(res => {
                    commit('setUser', res.data)
                    router.push({ name: 'Profile' })
                })
                .catch(err => {
                    console.log('Invalid Username or Password')
                    router.push({ name: 'Login' })
                })
        },
        authenticateBoard({ commit, dispatch }) {
            auth
                .get('authenticate')
                .then(res => {
                    commit('setUser', res.data)
                    router.push({ name: 'Board' })
                })
                .catch(err => {
                    console.log('Invalid Username or Password')
                    router.push({ name: 'Login' })
                })
        },
        login({ commit, dispatch }, payload) {
            auth
                .post('login', payload)
                .then(res => {
                    commit('setUser', res.data)
                    router.push({ name: 'Home' })
                })
                .catch(err => {
                    console.log('Invalid Username or Password')
                    router.push({ name: 'Login' })
                })
        },
        createUser({ commit, dispatch }, payload) {
            auth
                .post('register', payload)
                .then(res => {
                    router.push({ name: 'Home' })
                })
                .catch(err => {
                    console.log("Invalid username or password")
                    router.push({ name: 'Login' })
                })
        },
        logout({ commit, dispatch }) {
            auth
                .delete('logout')
                .then(res => {
                    router.push({ name: 'Login' })
                })
                .catch(err => {
                    console.error(err)
                })
        },
        getBoards({ commit, dispatch, state }) {
            api
                .get('boards')
                .then(res => {
                    var myBoards = []
                    for (var i = 0; i < res.data.length; i++) {
                        var board = res.data[i]
                        if (board.creatorId == state.user._id) {
                            myBoards.push(board)
                            continue
                        }
                        for (var j = 0; j < board.collabs.length; j++) {
                            var collab = board.collabs[i]
                            if (collab == state.user._id) {
                                myBoards.push(board)
                            }
                        }
                    }
                    commit('setBoards', myBoards)
                })
                .catch(err => {
                    console.error(err)
                })
        },
        addBoard({ commit, dispatch }, payload) {
            api
                .post('boards', payload)
                .then(res => {
                    dispatch('getBoards')
                })
                .catch(err => {
                    console.error(err)
                })
        },
        setBoard({ commit, dispatch }, payload) {
            api
                .put('boards/' + payload._id, payload)
                .then(res => {
                    dispatch('getBoards')
                })
                .catch(err => {
                    console.error(err)
                })
        },
        removeBoard({ commit, dispatch }, payload) {
            api
                .delete('boards/' + payload._id)
                .then(res => {
                    dispatch('getBoards')
                })
                .catch(err => {
                    console.error(err)
                })
        },
        setActiveBoard({ commit, dispatch }, payload) {
            commit('setActiveBoard', payload)
        },
        getBoardById({ commit, dispatch }, payload) {
            api
                .get('boards/' + payload)
                .then(res => {
                    commit('setActiveBoard', res.data)
                })
                .catch(err => {
                    console.error(err)
                })
        },
        getLists({ commit, dispatch }, payload) {
            api
                .get('boards/' + payload + '/lists')
                .then(res => {
                    commit('setActiveLists', res.data)
                })
                .catch(err => {
                    console.error(err)
                })
        },
        addList({ commit, dispatch }, payload) {
            api
                .post('boards/' + payload.boardId + '/lists/', payload)
                .then(res => {
                    dispatch('getLists', payload.boardId)
                })
                .catch(err => {
                    console.error(err)
                })
        },
        editList({ commit, dispatch }, payload) {
            api
                .put('boards/' + payload.boardId + '/lists/' + payload._id, payload)
                .then(res => {
                    dispatch('getLists', payload.boardId)
                })
                .catch(err => {
                    console.error(err)
                })
        },
        removeList({ commit, dispatch }, payload) {
            api
                .delete('boards/' + payload.boardId + '/lists/' + payload._id)
                .then(res => {
                    dispatch('getLists', payload.boardId)
                })
                .catch(err => {
                    console.error(err)
                })
        },
        getTasks({ commit, dispatch }, payload) {
            api
                .get('boards/' + payload.boardId + '/lists/' + payload._id + '/tasks')
                .then(res => {
                    commit('setActiveTasks', { listId: payload._id, activeTasks: res.data })
                })
                .catch(err => {
                    console.error(err)
                })
        },
        addTask({ commit, dispatch }, payload) {
            api
                .post('boards/' + payload.boardId + '/lists/' + payload.listId + '/tasks', payload)
                .then(res => {
                    dispatch('getTasksAfterAdd', payload)
                    commit('setMovingTask', res.data)
                })
                .catch(err => {
                    console.error(err)
                })
        },
        removeTask({ commit, dispatch }, payload) {
            api
                .delete('boards/' + payload.boardId + '/lists/' + payload.listId + '/tasks/' + payload._id)
                .then(res => {
                    dispatch('getTasks', { boardId: payload.boardId, _id: payload.listId })
                })
                .catch(err => {
                    console.error(err)
                })
        },
        getTasksAfterAdd({ commit, dispatch }, payload) {
            api
                .get('boards/' + payload.boardId + '/lists/' + payload.listId + '/tasks')
                .then(res => {
                    commit('setActiveTasks', { listId: payload.listId, activeTasks: res.data })
                })
                .catch(err => {
                    console.error(err)
                })
        },
        getComments({ commit, dispatch }, payload) {
            api
                .get('boards/' + payload.boardId + '/lists/' + payload.listId + '/tasks/' + payload._id + '/comments')
                .then(res => {
                    commit('setActiveComments', { taskId: payload._id, activeComments: res.data })
                })
                .catch(err => {
                    console.error(err)
                })
        },
        addComment({ commit, dispatch }, payload) {
            api
                .post('boards/' + payload.boardId + '/lists/' + payload.listId + '/tasks/' + payload.taskId + '/comments', payload)
                .then(res => {
                    dispatch('getCommentsAfterAdd', res.data)
                })
                .catch(err => {
                    console.error(err)
                })
        },
        removeComment({ commit, dispatch }, payload) {
            api
                .delete('boards/' + payload.boardId + '/lists/' + payload.listId + '/tasks/' + payload.taskId + '/comments/' + payload._id)
                .then(res => {
                    dispatch('getComments', { boardId: payload.boardId, listId: payload.listId, _id: payload.taskId })
                })
                .catch(err => {
                    console.error(err)
                })
        },
        getCommentsAfterAdd({ commit, dispatch }, payload) {
            api
                .get('boards/' + payload.boardId + '/lists/' + payload.listId + '/tasks/' + payload.taskId + '/comments')
                .then(res => {
                    commit('setActiveComments', { taskId: payload.taskId, activeComments: res.data })
                })
                .catch(err => {
                    console.error(err)
                })
        },
        setTask({ commit, state, dispatch }, payload) {
            var temp = payload.task
            payload.task.listId = payload.list._id
            api
                .put('boards/' + payload.list.boardId + '/lists/' + payload.list._id + '/tasks/' + payload.task._id, payload.task)
                .then(res => {
                    for (var i = 0; i < state.activeLists.length; i++) {
                        var list = state.activeLists[i]
                        dispatch('getTasks', list)
                            .then(res => {
                                if (res == undefined) {
                                    res = {
                                        data: []
                                    }
                                }
                                commit('setActiveTasks', { listId: list._id, activeTasks: res.data })
                            })
                            .catch(err => {
                                console.error(err)
                            })
                    }
                })
                .catch(err => {
                    console.error(err)
                })
        },
        setTaskName({ commit, dispatch }, payload) {
            api
                .put('boards/' + payload.boardId + '/lists/' + payload.listId + '/tasks/' + payload._id, payload)
                .then(res => {
                    dispatch('getTasks', { boardId: payload.boardId, _id: payload.listId })
                })
                .catch(err => {
                    console.error(err)
                })
        },
        sortTasks({ commit, dispatch }, payload) {
            api
                .get('boards/' + payload.list.boardId + '/lists/' + payload.list._id + '/tasks')
                .then(res => {
                    var newActiveTasks = payload.map.map(elem => {
                        return res.data.find(obj => {
                            return obj._id === elem
                        })
                    })
                    for (var i = 0; i < newActiveTasks.length; i++) {
                        if (newActiveTasks[i] == undefined) {
                            newActiveTasks.splice(i, 1)
                        }
                    }
                    commit('setActiveTasks', { listId: payload.list._id, activeTasks: newActiveTasks })
                })
        },
        getUserForComment({ commit, dispatch }, payload) {
            api
                .get('users/' + payload.creatorId)
                .then(res => {
                    commit('setUserForComment', res.data)
                })
                .catch(err => {
                    console.error(err)
                })
        },
        addToFriends({ commit, dispatch }, payload) {
            api
                .put('users/' + payload.user._id, payload.userToAdd)
                .then(res => {
                    commit('setUser', res.data)
                })
                .catch(err => {
                    console.error(err)
                })
        },
        removeFromFriends({ commit, dispatch }, payload) {
            api
                .put('users/' + payload.user._id + '/friends', payload.friend)
                .then(res => {
                    commit('setUser', res.data)
                })
                .catch(err => {
                    console.error(err)
                })
        },
        findByEmail({ commit, dispatch }, payload) {
            api
                .get('users')
                .then(res => {
                    var user = {}
                    for (var i = 0; i < res.data.length; i++) {
                        if (res.data[i].email == payload.email) {
                            user = res.data[i]
                        }
                    }
                    commit('setFoundUser', user)
                })
                .catch(err => {
                    console.error(err)
                })
        },
        setName({ commit, dispatch }, payload) {
            api.put('users/' + payload._id + '/name', payload)
                .then(res => {
                    commit('setUser', res.data)

                })
                .catch(err => {
                    console.error(err)
                })
        },
        sortTasksCreated({ commit, dispatch }, payload) {
            api
                .get('boards/' + payload.list.boardId + '/lists/' + payload.list._id + '/tasks')
                .then(res => {
                    if (payload.rev) {
                        res.data.reverse()
                        commit('setActiveTasks', { listId: payload.list._id, activeTasks: res.data })
                    } else {
                        commit('setActiveTasks', { listId: payload.list._id, activeTasks: res.data })
                    }
                })
                .catch(err => {
                    console.error(err)
                })
        },
        addCollab({ commit, dispatch }, payload) {
            api
                .put('boards/' + payload.boardId + '/collabs', payload.friend)
                .then(res => {
                    commit('setActiveBoard', res.data)
                })
                .catch(err => {
                    console.error(err)
                })
        }
    }
})