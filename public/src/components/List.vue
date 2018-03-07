<template>
    <div class="list">
        <h4>{{list.name}}</h4>
        <h5>{{activeTasks.length}}</h5>
        <button class="btn-danger" @click="removeList(list)">Remove {{list.name}}</button>
        <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true"
                aria-expanded="false">
                Sort By
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <p class="dropdown-item" @click=sortTasksHigh(list)>Priority: Highest to Lowest</p>
                <p class="dropdown-item" @click=sortTasksLow(list)>Priority: Lowest to Highest</p>
            </div>
        </div>
        <button @click="taskFormHidden = !taskFormHidden">Add Task</button>
        <form @submit.prevent="createTask(list)" v-if="!taskFormHidden">
            <div class="form-group row">
                <div class="col-sm-12">
                    <input type="text" v-model="task.description" placeholder="description">
                </div>
                <div class="col-sm-12">
                    <input type="radio" id="high" value="high" v-model="task.priority">
                    <label for="high">
                        High Priority
                    </label>
                </div>
                <div class="col-sm-12">
                    <input type="radio" id="medium" value="medium" v-model="task.priority" checked>
                    <label for="medium">
                        Medium Priority
                    </label>
                </div>
                <div class="col-sm-12">
                    <input type="radio" id="low" value="low" v-model="task.priority">
                    <label for="low">
                        Low Priority
                    </label>
                </div>
            </div>
            <button type="submit">Submit Task</button>
        </form>
        <div v-for="task in activeTasks">
            <task :task="task"></task>
        </div>
    </div>
</template>

<script>
    import Task from './Task'
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
                    priority: ''
                },
                taskFormHidden: true
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
                this.$store.dispatch('sortTasks', {list: list, map: map})
            },
            sortTasksLow(list) {
                var map = ['low', 'medium', 'high']
                this.$store.dispatch('sortTasks', {list: list, map: map})
            },
            removeList(list){
                this.$store.dispatch('removeList', list)
            }
        },
        computed: {
            activeTasks() {
                return this.$store.state.activeTasks[this.list._id] || []
            }
        },
        components: {
            Task
        }
    }
</script>

<style>
</style>