<template>
    <div class="singleBoard">
        <div v-if="activeBoard[0]">
            <h4>{{activeBoard[0].name}}</h4>
            <h5>{{activeBoard[0].description}}</h5>
        </div>
    </div>
</template>

<script>
    export default {
        name: "SingleBoard",
        mounted() {
            this.$store.dispatch('getBoardById', this.$route.params.boardId)
            this.$store.dispatch('getLists', this.$route.params.boardId)
        },
        data() {
            return {

            }
        },
        computed: {
            activeBoard() {
                return this.$store.state.activeBoard
            }
        }

    }
</script>

<style>
</style>