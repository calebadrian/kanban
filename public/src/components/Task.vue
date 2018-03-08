<template>
    <div class="task" draggable="true" v-on:dragstart="moving">
        <div class="card task-card">
            <div class="card-body">
                <div>
                    <div class="d-flex justify-content-center">
                        <h5 class="title">{{task.description}}</h5>
                        <i class="fas fa-edit" @click="form = !form"></i>
                    </div>
                    <div v-if="form == true" class="col-sm-12">
                        <form @submit.prevent="editTask(task)" class="form-group">
                            <input type="text" v-model="task.description" placeholder="Name" class="form-control">
                            <button type="submit" class="btn btn-info create" @click="form = !form">Edit</button>
                        </form>
                    </div>
                </div>
                <div class="flex">
                    <button data-toggle="modal" :data-target="'#' + task._id" class="btn btn-info">{{activeComments.length}}
                        <i class="far fa-comment"></i>
                    </button>
                    <h6 class="text-muted">Priority: {{task.priority}}</h6>
                </div>
            </div>
        </div>
        <div class="modal fade settings-modal color-black" :id="task._id" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">C&#937;mments f&#937;r: {{task.description}}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body text-center">
                        <form @submit.prevent="createComment">
                            <div class="form-group flex">
                                <input type="text" v-model="comment.body" placeholder="Add Comment" class="form-control">
                                <button class="btn btn-info" type="submit">Submit C&#937;mment</button>
                            </div>
                        </form>
                        <div class="card">
                            <div class="card-body" v-if="activeComments.length > 0">
                                <div v-for="comment in activeComments">
                                    <comment :comment="comment"></comment>
                                </div>
                            </div>
                        </div>
                        <button class="btn btn-link" @click="removeTask(task)" data-dismiss="modal">Rem&#937;ve {{task.description}}</button>
                    </div>
                </div>
            </div>
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
                },
                commentFormHidden: true,
                form: false
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
                this.resetFields()
            },
            moveTask(list) {
                this.$store.dispatch('setTask', { list: list, task: this.task })
            },
            removeTask(task) {
                this.$store.dispatch('removeTask', task)
            },
            editTask(task) {
                this.$store.dispatch('setTaskName', task)
            },
            moving(event) {
                event.dataTransfer.setData('text/javascript', JSON.stringify(this.task))
            },
            resetFields() {
                Object.assign(this.$data, this.$options.data.call(this));
            }
        },
        components: {
            Comment
        }
    }
</script>

<style scoped>
    .task-card:hover {
        cursor: -webkit-grab
    }

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
        justify-content: space-between;
        align-items: baseline
    }

    .title {
        font-family: Cinzel;
        color: rgb(202, 3, 119);
        transition: linear .3s all;
        text-shadow: 3px 1px 3px rgba(150, 150, 150, 1);
    }

    .modal-title {
        font-family: Cinzel;
        color: ivory;
        text-shadow: 2px 1px 10px rgb(150, 150, 150);
    }

    .modal-header {
        background: linear-gradient(left, #7b76fe, #f355fa) !important;
    }

    .modal-content {
        display: flex;
        flex-direction: column;
    }

    .fa-edit {
        opacity: .4;
        transition: linear .3s all;
        margin: 2px
    }

    .fa-edit:hover {
        opacity: 1;
        cursor: pointer;
        transition: linear .3s all
    }

    .btn {
        height: auto;
        font-family: Cinzel
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