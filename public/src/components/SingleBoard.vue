<template>
    <div class="singleBoard">
        <div class="container-fluid">
            <div class="row">
                <div class="col-sm-12">
                    <div v-if="activeBoard[0]">
                        <h4>{{activeBoard[0].name}}</h4>
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
            }
        },
        computed: {
            activeBoard() {
                return this.$store.state.activeBoard
            },
            activeLists() {
                return this.$store.state.activeLists
            },
            user(){
                return this.$store.state.user
            }
        },
        components: {
            List
        }

    }
</script>

<style>
</style>