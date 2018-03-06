<template>
    <div class="board">
        <h4><router-link :to="{name: 'Board', params: {boardId: board._id}}">{{board.name}}</router-link></h4>
        <h4>{{board.description}}</h4>
        <button @click="removeBoard(board)">Remove {{board.name}}</button>
    </div>
</template>

<script>

    export default {
        name: 'Board',
        props: ['board'],
        data() {
            return {

            }
        },
        methods: {
            removeBoard(board){
                this.$store.dispatch('removeBoard', board)
            },
            setActiveBoard(board){
                this.$store.dispatch('setActiveBoard', board)
            }
        },
        components: {

        }
    }

</script>


<style scoped>
</style>