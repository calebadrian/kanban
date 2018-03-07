<template>
    <div class="task">
        <h6>{{task.description}}</h6>
        <h6>{{task.priority}}</h6>
        <button class="btn-danger" @click="removeTask(task)">Remove {{task.description}}</button>
        <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true"
                aria-expanded="false">
                Move To
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <div v-for="list in activeLists">
                    <p class="dropdown-item" @click=moveTask(list)>{{list.name}}</p>
                </div>
            </div>
        </div>
        <button @click="commentFormHidden = !commentFormHidden">Add Comment</button>
        <form @submit.prevent="createComment" v-if="!commentFormHidden">
            <input type="text" v-model="comment.body" placeholder="body">
            <button type="submit">Submit Comment</button>
        </form>
        <button data-toggle="modal" data-target='#exampleModal'>{{activeComments.length}} comments</button>
        <div class="modal fade settings-modal color-black" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Settings</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body text-center">
                        <div v-for="comment in activeComments">
                            <comment :comment="comment"></comment>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- <div v-for="comment in activeComments">
            <comment :comment="comment"></comment>
        </div> -->
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
                },
                commentFormHidden: true
            }
        },
        mounted() {
            this.$store.dispatch('getComments', this.task)
        },
        computed: {
            activeComments() {
                return this.$store.state.activeComments[this.task._id] || []
            },
            activeLists() {
                return this.$store.state.activeLists
            }
        },
        methods: {
            createComment() {
                this.comment.taskId = this.task._id
                this.comment.creatorId = this.$store.state.user._id
                this.comment.listId = this.task.listId
                this.comment.boardId = this.task.boardId
                this.$store.dispatch('addComment', this.comment)
            },
            moveTask(list) {
                this.$store.dispatch('setTask', { list: list, task: this.task })
            },
            removeTask(task) {
                this.$store.dispatch('removeTask', task)
            }
        },
        components: {
            Comment
        }
    }
</script>

<style>
</style>