<template>
    <div class="board">
        <div class="card">
            <div class="card-body">
                <h4 class="title">
                    <router-link :to="{name: 'Board', params: {boardId: board._id}}" class="title">{{board.name}}</router-link>
                </h4>
                <h6>{{board.description}}</h6>
                <button @click="removeBoard(board)" class="btn btn-link">Remove {{board.name}}</button>
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

            }
        },
        methods: {
            removeBoard(board) {
                this.$store.dispatch('removeBoard', board)
            },
            setActiveBoard(board) {
                this.$store.dispatch('setActiveBoard', board)
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
        border: rgb(167, 169, 180) solid .5px
    }

    .title {
        font-family: Cinzel;
        color: indigo;
        transition: linear .3s all;
        text-shadow: 3px 1px 3px rgba(150, 150, 150, 1);
    }

    .title:hover {
        transition: linear .3s all;
        color:rgb(40, 142, 158);
    }

    .btn {
        font-family: Cinzel
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