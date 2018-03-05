<template>
    <div class="board">
        <h4><router-link :to="{name: 'Board', params: 'board._id'}" @click="setActiveBoard(board)">{{board.name}}</router-link></h4>
        <h4>{{board.description}}</h4>
        <button @click="removeBoard(board)">Remove {{board.name}}</button>
    </div>
</template>

<script>

    export default {
        name: 'Board',
        props: ['board'],
        mounted(){
            this.$store.dispatch('getLists', this.$store.state.activeBoard)
        },
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