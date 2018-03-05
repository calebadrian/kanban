<template>
    <div class="user">
        <div v-for="board in boards">
            <board></board>
        </div>
    </div>
</template>

<script>
    import Board from './Board'

    export default {
        name: 'User',
        mounted(){
            this.$store.dispatch('getBoards')
        },
        data() {
            return {

            }
        },
        methods: {
            createBoard(){
                this.$store.dispatch('addBoard', this.board)
            }
        },
        components: {
            Board
        }
    }

</script>


<style scoped>
</style>