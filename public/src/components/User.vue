<template>
    <div class="user">
        <h3>{{user.name}}</h3>
        <h3>{{user.email}}</h3>
        <button @click="logout">Logout</button>
        <form @submit.prevent="createBoard">
            <input type="text" v-model="board.name" placeholder="name">
            <input type="text" v-model="board.description" placeholder="description">
            <button type="submit">Submit</button>
        </form>
        <div v-for="board in boards">
            <board :board="board"></board>
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