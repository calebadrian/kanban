<template>
    <div class="user">
        <nav class="navbar navbar-expand-lg navbar-dark">
            <a class="navbar-brand" href="#">
                <img src="../assets/Omeganize_logo4.jpg" width="35" height="30" class="d-inline-block align-top" alt=""> &#937;meganize
            </a>
            <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                    <img :src="user.avatar" width="60" height="50" class="d-inline-block align-top" alt="">
                </li>
                <li class="nav-item active">
                    <a class="nav-link">{{user.name}}</a>
                </li>
            </ul>
            <button @click="logout" class="btn btn-info">Logout</button>
        </nav>
        <div class="container-fluid">
            <div class="row">
                <div class="col-sm-12 boards">
                    <h2 class="myBoards">My Boards&nbsp;&nbsp;</h2>
                    <button @click="form = !form" class="btn btn-info">+ Create Board</button>
                </div>
                <div v-if="form == true" class="col-sm-12">
                    <form @submit.prevent="createBoard" class="form-group">
                        <h3 class="myBoards">New Board</h3>
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
    
    .navbar {
        background-color: black;
        font-family: Cinzel;
        height: 15vh
    }

    .nav-link {
        color: #36afc2 !important;
    }

    .navbar-brand {
        color: #36afc2 !important;
    }

    .btn {
        font-family: Cinzel
    }

    .myBoards {
        font-family: Cinzel
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