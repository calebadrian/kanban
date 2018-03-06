<template>
    <div class="task">
        <h6>{{task.description}}</h6>
        <form @submit.prevent="createComment">
                <input type="text" v-model="comment.body" placeholder="body">
                <button type="submit">Submit Comment</button>
        </form>
        <div v-for="comment in activeComments">
            <comment :comment="comment"></comment>
        </div>
    </div>
</template>

<script>
    import Comment from './Comment'
    export default {
        name: 'Task',
        props: ['task'],
        data() {
            return {
                comment: {
                    body: ''
                }
            }
        },
        mounted(){
            this.$store.dispatch('getComments', this.task)
        },
        computed: {
            activeComments(){
                return this.$store.state.activeComments[this.task._id] || []
            }
        },
        methods: {
            createComment(){
                this.comment.taskId = this.task._id
                this.comment.creatorId = this.$store.state.user._id
                this.comment.listId = this.task.listId
                this.comment.boardId = this.task.boardId
                console.log(this.comment)
                this.$store.dispatch('addComment', this.comment)
            }
        },
        components: {
            Comment
        }
    }
</script>

<style>

</style>