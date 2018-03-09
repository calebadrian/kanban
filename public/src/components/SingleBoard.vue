<template>
    <div class="singleBoard">
        <nav class="navbar navbar-expand-lg navbar-dark">
            <div>
                <a class="navbar-brand" href="#/">
                    <img src="../assets/Omeganize_logo1.jpg" class="logo">
                </a>
            </div>
            <div class="navbar-nav mr-auto">
                <h3 class="nav-link" v-if="activeBoard[0]">{{activeBoard[0].name}}</h3>
            </div>
            <router-link :to="{name: 'Profile', params: {userId: user._id}}" class="title d-flex">
                <div>
                    <img :src="user.avatar + user.name" width="50" height="50" class="d-inline-block align-top" alt="">
                </div>
                <div>
                    <h6 class="nav-link name">{{user.name}}</h6>
                </div>
            </router-link>
            <div>
                <button @click="logout" class="btn btn-info">L&#937;g&#937;ut</button>
            </div>
            <div>
                &nbsp;
                <img src="../assets/Omeganize_logo4.jpg" width="40" height="35">
            </div>
        </nav>
        <div class="container-fluid">
            <div class="row">
                <div class="col-sm-12 lists">
                    <button @click="form = !form" class="btn colorful">+ Create List</button>
                    <div class="d-flex">
                        <div class="dropdown wide">
                            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true"
                                aria-expanded="false">
                                Add Collaborator
                            </button>
                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <div v-for="friend in user.friends">
                                    <p class="dropdown-item" @click="addCollab(friend)">{{friend.name}}</p>
                                </div>
                            </div>
                        </div>
                        <button @click="deets = !deets" class="btn colorful">B&#937;ard Details</button>
                    </div>
                </div>
                <div v-if="form == true" class="col-sm-12">
                    <form @submit.prevent="createList" class="form-group">
                        <h3 class="newList">New List</h3>
                        <input type="text" v-model="list.name" placeholder="List Name" class="form-control">
                        <button type="submit" @click="form = !form" class="btn btn-info create">Submit List</button>
                    </form>
                </div>
                <div class="col-sm-12 flex">
                    <div class="row">
                        <div v-if="deets == true" class="card">
                            <div class="card-body">
                                <h5>{{activeBoard[0].description}}</h5>
                            </div>
                        </div>
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
                form: false,
                deets: false,
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
                this.resetFields()
            },
            logout() {
                this.$store.dispatch('logout')
            },
            resetFields() {
                Object.assign(this.$data, this.$options.data.call(this));
            },
            addCollab(friend){
                this.$store.dispatch('addCollab', {boardId: this.$store.state.activeBoard[0]._id, friend: friend})
            }
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
    .singleBoard {
        background-color: #ffffff;
        background-image: url("https://www.transparenttextures.com/patterns/rocky-wall.png");
        min-height: 100vh
    }

    .navbar {
        background-color: black;
        font-family: Cinzel;
        height: 15vh
    }

    .nav-link {
        color: #36afc2 !important;
        margin-top: 1%;
        text-shadow: 2px 1px 10px rgb(109, 107, 107);
    }

    .navbar-brand {
        color: #36afc2 !important;
    }

    .logo {
        height: 15vh
    }

    .flex {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center
    }

    .lists {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin-top: 5px;
        margin-bottom: 5px
    }

    .name {
        margin-top: 15%
    }

    .card {
        background-color: rgba(177, 192, 197, 0.6);
        box-shadow: 5px 5px 20px rgba(123, 115, 134, 0.75);
        border: rgb(167, 169, 180) solid .5px;
        margin-top: 5px;
        margin-bottom: 15px;
    }

    .btn {
        font-family: Cinzel
    }

    .form-group {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center
    }

    .newList {
        font-family: Cinzel
    }

    .form-control {
        width: 50%;
        margin: 5px
    }

    .create {
        width: 20%
    }

    .colorful {
        background: linear-gradient(left, #7b76fe, #f355fa) !important;
        color: ivory
    }
</style>