<template>
    <div class="singleBoard">
        <nav class="navbar navbar-expand-lg navbar-dark">
            <div>
                <a class="navbar-brand" href="/#/">
                    <img src="../assets/Omeganize_logo4.jpg" width="35" height="30" class="d-inline-block align-top" alt=""> &#937;meganize
                </a>
            </div>
            <div class="navbar-nav mr-auto">
                <h3 class="nav-link" v-if="activeBoard[0]">{{activeBoard[0].name}}</h3>
            </div>
            <div>
                <img :src="user.avatar + user.name" width="50" height="50" class="d-inline-block align-top" alt="">
            </div>
            <div>
                <h6 class="nav-link name">{{user.name}}</h6>
            </div>
            <div>
                <button @click="logout" class="btn btn-info">Logout</button>
            </div>
        </nav>
        <div class="container-fluid">
            <div class="row">
                <div class="col-sm-12">
                    <div v-if="activeBoard[0]">
                        <h5>{{activeBoard[0].description}}</h5>
                        <form @submit.prevent="createList">
                            <input type="text" v-model="list.name" placeholder="name">
                            <button type="submit">Submit List</button>
                        </form>
                    </div>
                </div>
                <div class="col-sm-3" v-for="list in activeLists">
                    <list :list="list"></list>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import List from './List'
    export default {
        name: "SingleBoard",
        mounted() {
            this.$store.dispatch('getBoardById', this.$route.params.boardId)
            this.$store.dispatch('getLists', this.$route.params.boardId)
        },
        data() {
            return {
                list: {
                    name: ''
                }
            }
        },
        methods: {
            createList() {
                this.list.creatorId = this.$store.state.user._id
                this.list.boardId = this.$store.state.activeBoard[0]._id
                this.$store.dispatch('addList', this.list)
            },
            logout() {
                this.$store.dispatch('logout')
            },
        },
        computed: {
            activeBoard() {
                return this.$store.state.activeBoard
            },
            activeLists() {
                return this.$store.state.activeLists
            },
            user() {
                return this.$store.state.user
            }
        },
        components: {
            List
        }

    }
</script>

<style scoped>
    .navbar {
        background-color: black;
        font-family: Cinzel;
        height: 15vh
    }

    .nav-link {
        color: #36afc2 !important;
        margin-top: 1%
    }

    .navbar-brand {
        color: #36afc2 !important;
    }

    .name {
        margin-top: 15%
    }
</style>