<template>
    <div class="board" draggable="true" v-on:dragstart="moving">
        <div class="card">
            <div class="card-body">
                <div class="d-flex justify-content-center">
                    <h4 class="title">
                        <router-link :to="{name: 'Board', params: {boardId: board._id}}" class="title">{{board.name}}</router-link>
                    </h4>
                    <i class="fas fa-edit" @click="form = !form"></i>
                </div>
                <div v-if="form == true" class="col-sm-12">
                    <form @submit.prevent="editBoard(board)" class="form-group">
                        <input type="text" v-model="board.name" placeholder="Name" class="form-control">
                        <button type="submit" class="btn btn-info create" @click="form = !form">Edit</button>
                    </form>
                </div>
                <h6>{{board.description}}</h6>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        name: 'Board',
        props: ['board'],
        data() {
            return {
                form: false,
            }
        },
        methods: {
            setActiveBoard(board) {
                this.$store.dispatch('setActiveBoard', board)
            },
            editBoard(board){
                this.$store.dispatch('setBoard', board)
            },
            moving(event) {
                event.dataTransfer.setData('text/javascript', JSON.stringify(this.board))
            }
        },
        components: {

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
        margin-left: 3px
    }

    .title:hover {
        transition: linear .3s all;
        color:rgb(40, 142, 158);
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
        font-family: Cinzel
    }

    .btn-info {
        width: 40%;
        margin: 5px
    }

    .btn-link {
        transition: linear .3s all;
        margin-top: 15px;
        margin-bottom: -15px;
        color: grey;
        width: 75%;
        overflow-wrap: break-word;
        white-space: normal;
        font-size: 75%
    }

    .btn-link:hover {
        transition: linear .3s all;
        color: rgb(253, 71, 71);
    }
</style>