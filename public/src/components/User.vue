<template>
    <div class="user">
        <nav class="navbar navbar-expand-lg navbar-dark">
            <div>
                <a class="navbar-brand" href="#/">
                    <img src="../assets/Omeganize_logo1.jpg" class="logo">
                </a>
            </div>
            <div class="navbar-nav mr-auto">
                <h3 class="nav-link">My &#937;meganize B&#937;ards</h3>
            </div>
            <router-link :to="{name: 'Profile', params: {userId: user._id}}" class="title d-flex">
                <div>
                    <img :src="user.avatar + user.name" width="50" height="50" class="d-inline-block align-top" alt="">
                </div>
                <div>
                    <h6 class="nav-link name">{{user.name}}</h6>
                </div>
            </router-link>
            <div>
                <button @click="logout" class="btn btn-info">L&#937;g&#937;ut</button>
            </div>
            <div>
                &nbsp;
                <img src="../assets/Omeganize_logo4.jpg" width="40" height="35">
            </div>
        </nav>
        <div class="container-fluid">
            <div class="row">
                <div class="col-sm-12 boards">
                    <button @click="form = !form" class="btn colorful">+ Create B&#937;ard</button>
                    <div droppable="true" v-on:drop.capture="removeBoard" ondragover="event.preventDefault()">
                        <i class="fas fa-3x fa-trash"></i>
                    </div>
                </div>
                <div v-if="form == true" class="col-sm-12">
                    <form @submit.prevent="createBoard" class="form-group">
                        <h3 class="myBoards">New B&#937;ard</h3>
                        <input type="text" v-model="board.name" placeholder="Name" class="form-control">
                        <textarea type="text" v-model="board.description" placeholder="Description" class="form-control"></textarea>
                        <button type="submit" class="btn btn-info create" @click="form = !form">Create</button>
                    </form>
                </div>
                <div class="col-sm-3" v-for="board in boards">
                    <board :board="board"></board>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    import Board from './Board'

    export default {
        name: 'User',
        mounted() {
            this.$store.dispatch('getBoards')
        },
        data() {
            return {
                form: false,
                board: {
                    name: '',
                    description: ''
                }
            }
        },
        methods: {
            createBoard(event) {
                this.board.creatorId = this.$store.state.user._id
                this.$store.dispatch('addBoard', this.board)
                this.resetFields()
            },
            logout() {
                this.$store.dispatch('logout')
            },
            removeBoard(event) {
                var board = JSON.parse(event.dataTransfer.getData('text/javascript'))
                this.$store.dispatch('removeBoard', board)
            },
            resetFields() {
                Object.assign(this.$data, this.$options.data.call(this));
            }
        },
        components: {
            Board
        },
        computed: {
            user() {
                return this.$store.state.user
            },
            boards() {
                return this.$store.state.boards
            }
        }
    }

</script>


<style scoped>
    .user {
        background-color: #ffffff;
        background-image: url("https://www.transparenttextures.com/patterns/rocky-wall.png");
        min-height: 100vh
    }

    .card {
        background-color: rgba(177, 192, 197, 0.6);
        box-shadow: 5px 5px 20px rgba(123, 115, 134, 0.75);
        border: rgb(167, 169, 180) solid .5px;
        margin-top: 5px;
        margin-bottom: 15px;
    }


    nav {
        display: flex;
        flex-direction: row;
        align-items: center
    }

    .navbar {
        background-color: black;
        font-family: Cinzel;
        height: 15vh
    }

    .nav-link {
        color: #36afc2 !important;
        margin-top: 1%;
        text-shadow: 2px 1px 10px rgb(109, 107, 107);
    }

    .navbar-brand {
        color: #36afc2 !important;
    }

    .name {
        margin-top: 15%
    }

    .btn {
        font-family: Cinzel
    }

    .myBoards {
        font-family: Cinzel
    }

    .logo {
        height: 15vh
    }

    .boards {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin-top: 5px;
        margin-bottom: 5px
    }

    .form-group {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center
    }

    .form-control {
        width: 50%;
        margin: 5px
    }

    .create {
        width: 20%
    }

    .colorful {
        background: linear-gradient(left, #7b76fe, #f355fa) !important;
        color: ivory
    }
</style>