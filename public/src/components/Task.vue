<template>
    <div class="task">
        <div class="card">
            <div class="card-body">
                <div class="flex">
                    <h5 class="title">{{task.description}}</h5>
                    <h6>Priority: {{task.priority}}</h6>
                </div>
                <div class="flex">
                    <button @click="commentFormHidden = !commentFormHidden" class="btn btn-info">Add Comment</button>
                    <form @submit.prevent="createComment" v-if="!commentFormHidden">
                        <input type="text" v-model="comment.body" placeholder="body">
                        <button type="submit" class="btn btn-info">Submit Comment</button>
                    </form>
                    <button data-toggle="modal" data-target='#exampleModal' class="btn btn-secondary">View Task</button>
                </div>
                <div class="dropdown">
                    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true"
                        aria-expanded="false">
                        Move To
                    </button>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <div v-for="list in activeLists">
                            <p class="dropdown-item point" @click=moveTask(list)>{{list.name}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
<<<<<<< HEAD
        <div class="modal fade settings-modal color-black" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
=======
        <button data-toggle="modal" :data-target="'#' + task._id">{{activeComments.length}} comments</button>
        <div class="modal fade settings-modal color-black" :id="task._id" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
>>>>>>> 8773aa9ebe0203690f9bf02af6fd75c42c472be3
            aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
<<<<<<< HEAD
                        <h5 class="modal-title" id="exampleModalLabel">{{task.description}}</h5>
=======
                        <h5 class="modal-title" id="exampleModalLabel">Comments for: {{task.description}}</h5>
>>>>>>> 8773aa9ebe0203690f9bf02af6fd75c42c472be3
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body text-center">
                        <form @submit.prevent="createComment">
                            <div class="form-group">
                                <input type="text" v-model="comment.body" placeholder="body">
                                <button class="btn-success" type="submit">Submit Comment</button>
                            </div>
                        </form>
                        <div v-for="comment in activeComments">
                            <comment :comment="comment"></comment>
                        </div>
                        <button class="btn btn-link" @click="removeTask(task)">Remove {{task.description}}</button>
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

<style scoped>
    .point {
        cursor: pointer
    }

    .card {
        background-color: rgba(140, 193, 211, 0.3);
        box-shadow: inset 0px 0px 5px rgba(50, 50, 50, 1);
        border: rgb(167, 169, 180) solid .5px;
        margin-top: 5px;
    }

    .flex {
        display: flex;
        flex-direction: row;
        justify-content: space-between
    }

    .dropdown {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        margin-top: 5px
    }

    .title {
        font-family: Cinzel;
        color: indigo;
        transition: linear .3s all;
        text-shadow: 3px 1px 3px rgba(150, 150, 150, 1);
    }

    .modal-content {
        display: flex;
        flex-direction: column;
    }

    .btn-link {
        transition: linear .3s all;
        margin-top: 15px;
        margin-bottom: -15px;
        color: grey;
        width: 100%;
        overflow-wrap: break-word;
        white-space: normal;
    }

    .btn-link:hover {
        transition: linear .3s all;
        color: rgb(253, 71, 71);
    }
</style>