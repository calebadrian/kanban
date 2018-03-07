<template>
    <div class="user">
        <nav class="navbar navbar-expand-lg navbar-dark">
            <div>
                <a class="navbar-brand" href="#/">
                    <img src="../assets/Omeganize_logo1.jpg" class="logo">
                </a>
            </div>
            <div class="navbar-nav mr-auto">
                <h3 class="nav-link">My &#937;meganize B&#937;ards</h3>
            </div>
            <div>
                <img :src="user.avatar + user.name" width="50" height="50" class="d-inline-block align-top" alt="">
            </div>
            <div>
                <h6 class="nav-link name">{{user.name}}</h6>
            </div>
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
                <div class="col-sm-12 boards">
                    <!-- <h2 class="myBoards">My Boards&nbsp;&nbsp;</h2> -->
                    <button @click="form = !form" class="btn btn-info">+ Create B&#937;ard</button>
                </div>
                <div v-if="form == true" class="col-sm-12">
                    <form @submit.prevent="createBoard" class="form-group">
                        <h3 class="myBoards">New B&#937;ard</h3>
                        <input type="text" v-model="board.name" placeholder="Name" class="form-control">
                        <textarea type="text" v-model="board.description" placeholder="Description" class="form-control"></textarea>
                        <button type="submit" class="btn btn-info create" @click="form = !form">Create</button>
                    </form>
                </div> 
                <div class="col-sm-3" v-for="board in boards">
                    <board :board="board"></board>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Board from './Board'

    export default {
        name: 'User',
        mounted() {
            this.$store.dispatch('getBoards')
        },
        data() {
            return {
                form: false,
                board: {
                    name: '',
                    description: ''
                }
            }
        },
        methods: {
            createBoard() {
                this.board.creatorId = this.$store.state.user._id
                this.$store.dispatch('addBoard', this.board)
            },
            logout() {
                this.$store.dispatch('logout')
            },
        },
        components: {
            Board
        },
        computed: {
            user() {
                return this.$store.state.user
            },
            boards() {
                return this.$store.state.boards
            }
        }
    }

</script>


<style scoped>
    nav {
        display: flex;
        flex-direction: row;
        align-items: center
    }

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

    .btn {
        font-family: Cinzel
    }

    .myBoards {
        font-family: Cinzel
    }

    .logo {
        height: 15vh
    }

    .boards {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        margin-top: 5px;
        margin-bottom: 5px
    }

    .form-group {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center
    }

    .form-control {
        width: 50%;
        margin: 5px
    }

    .create {
        width: 20%
    }
</style>