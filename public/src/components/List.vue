<template>
    <div class="list">
        <div class="card">
            <div class="card-body">
                <h4 class="title">{{list.name}}</h4>
                <p class="text-muted">Tasks: {{activeTasks.length}}</p>
                <div class="buttons">
                    <div class="dropdown wide" v-if="activeTasks.length >1">
                        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true"
                            aria-expanded="false">
                            S&#937;rt By
                        </button>
                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <p class="dropdown-item" @click=sortTasksHigh(list)>Priority: Highest to Lowest</p>
                            <p class="dropdown-item" @click=sortTasksLow(list)>Priority: Lowest to Highest</p>
                        </div>
                    </div>
                    <button @click="taskFormHidden = !taskFormHidden" class="btn btn-info wide">Add Task</button>
                </div>
                <form @submit.prevent="createTask(list)" v-if="!taskFormHidden">
                    <div class="form-group row">
                        <div class="col-sm-12">
                            <input type="text" v-model="task.description" placeholder="Task Name" class="form-control text-mar">
                        </div>
                        <div class="flex col-sm-12">
                            <div class="row">
                                <div class="col-sm-4">
                                    <input type="radio" id="high" value="high" v-model="task.priority" class="form-check-input">
                                    <label for="high">
                                        High Priority
                                    </label>
                                </div>
                                <div class="col-sm-4">
                                    <input type="radio" id="medium" value="medium" v-model="task.priority" class="form-check-input" checked>
                                    <label for="medium">
                                        Medium Priority
                                    </label>
                                </div>
                                <div class="col-sm-4">
                                    <input type="radio" id="low" value="low" v-model="task.priority" class="form-check-input">
                                    <label for="low">
                                        Low Priority
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button type="submit" class="btn btn-info create">Submit Task</button>
                </form>
                <div v-for="task in activeTasks">
                    <task :task="task"></task>
                </div>
                <button class="btn btn-link" @click="removeList(list)">Delete List</button>
            </div>
        </div>
    </div>
</template>

<script>
    import Task from './Task'
    import draggable from 'vuedraggable'
    export default {
        name: "List",
        props: ['list'],
        mounted() {
            this.$store.dispatch('getTasks', this._props.list)
        },
        data() {
            return {
                task: {
                    description: '',
                    priority: 'medium'
                },
                taskFormHidden: true,
            }
        },
        methods: {
            createTask(list) {
                this.taskFormHidden = !this.taskFormHidden
                this.task.creatorId = this.$store.state.user._id
                this.task.listId = list._id
                this.task.boardId = this.$store.state.activeBoard[0]._id
                this.$store.dispatch('addTask', this.task)
            },
            sortTasksHigh(list) {
                var map = ['high', 'medium', 'low']
                this.$store.dispatch('sortTasks', { list: list, map: map })
            },
            sortTasksLow(list) {
                var map = ['low', 'medium', 'high']
                this.$store.dispatch('sortTasks', { list: list, map: map })
            },
            removeList(list) {
                this.$store.dispatch('removeList', list)
            },
        },
        computed: {
            activeTasks() {
                return this.$store.state.activeTasks[this.list._id] || []
            }
        },
        components: {
            Task,
            draggable
        }
    }
</script>

<style scoped>
    .card {
        background-color: rgba(177, 192, 197, 0.6);
        box-shadow: 5px 5px 20px rgba(123, 115, 134, 0.75);
        border: rgb(167, 169, 180) solid .5px;
        margin-top: 5px;
        margin-bottom: 5px
    }

    .title {
        font-family: Cinzel;
        color: indigo;
        transition: linear .3s all;
        text-shadow: 3px 1px 3px rgba(150, 150, 150, 1);
    }

    .text-mar {
        margin-top: 5px
    }

    .dropdown-item {
        cursor: pointer;
    }

    .buttons {
        display: flex;
        flex-direction: row;
        justify-content: space-around
    }

    .wide {
        width: 100%
    }

    .btn {
        font-family: Cinzel
    }

    .flex {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }

    .btn-link {
        transition: linear .3s all;
        margin-top: 15px;
        margin-bottom: -15px;
        color: grey;
        width: 50%;
        overflow-wrap: break-word;
        white-space: normal;
        font-size: 75%
    }

    .btn-link:hover {
        transition: linear .3s all;
        color: rgb(253, 71, 71)
    }
</style>