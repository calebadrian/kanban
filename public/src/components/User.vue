<template>
    <div class="user">
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <a class="navbar-brand" href="#">
                <img src="/assets/brand/bootstrap-solid.svg" width="30" height="30" class="d-inline-block align-top" alt=""> Bootstrap
            </a>
            <div class="collapse navbar-collapse" id="navbarText">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item active">
                        <a class="nav-link">{{user.name}}</a>
                    </li>
                </ul>
            </div>
            <button @click="logout">Logout</button>
        </nav>
        <div class="container-fluid">
            <div class="row">
                <div class="col-sm-12">
                    <form @submit.prevent="createBoard">
                        <input type="text" v-model="board.name" placeholder="name">
                        <input type="text" v-model="board.description" placeholder="description">
                        <button type="submit">Submit</button>
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
</style>