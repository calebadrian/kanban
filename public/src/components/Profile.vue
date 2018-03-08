<template>
    <div class="profile">
        <nav class="navbar navbar-expand-lg navbar-dark">
            <div>
                <a class="navbar-brand" href="#/">
                    <img src="../assets/Omeganize_logo1.jpg" class="logo">
                </a>
            </div>
            <div class="navbar-nav mr-auto">
                <h3 class="nav-link">My Pr&#937;file</h3>
            </div>
            <div>
                <img :src="user.avatar + user.name" width="50" height="50" class="d-inline-block align-top" alt="">
            </div>
            <div>
                <h6 class="nav-link name">{{user.name}}</h6>
            </div>
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
                <div class="col-sm-4">
                    <div class="card">
                        <div class="card-body">
                            <img :src="user.avatar + user.name">
                            <h3 class="title">{{user.name}}</h3>
                        </div>
                    </div>
                </div>
                <div class="col-sm-8">
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="card">
                                <div class="card-body flex cinzel">
                                    <h4>Username: {{user.name}}</h4>
                                    <h4>Email: {{user.email}}</h4>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <div class="card">
                                <div class="card-body">
                                    <h3 class="title">Y&#937;ur Friends</h3>
                                    <h5 v-if="user.friends.length == 0" class="cinzel text-muted">Y&#937;u Have N&#937; Friends</h5>
                                    <div v-for="friend in user.friends">
                                        <div class="flex3">
                                            <img :src="friend.avatar + friend.name" class="friend">
                                            <div class="flex2">
                                                <h3 class="cinzel">{{friend.name}}</h3>
                                                <i class="fas fa-minus-circle" @click="removeFromFriends(friend, user)"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="title">Add a Friend</h4>
                                    <form @submit.prevent="searchByEmail" class="form-group">
                                        <input type="text" v-model="userFind.email" placeholder="User's Email" class="form-control">
                                        <button type="submit" class="btn btn-info create find">Find User</button>
                                    </form>
                                    <div v-if="foundUser.name">
                                        <button class="btn btn-success" @click="addToFriends(foundUser, user)">Add {{foundUser.name}} to Friends</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
    export default {
        name: 'Profile',
        data() {
            return {
                userFind: {
                    email: ''
                }
            }
        },
        computed: {
            user() {
                return this.$store.state.user
            },
            users() {
                return this.$store.state.users
            },
            foundUser() {
                return this.$store.state.foundUser
            }
        },
        methods: {
            logout() {
                this.$store.dispatch('logout')
            },
            searchByEmail() {
                this.$store.dispatch('findByEmail', this.userFind)
                this.resetFields()
            },
            addToFriends(userToAdd, user) {
                for (var i = 0; i < user.friends.length; i++) {
                    var friend = user.friends[i]
                    if (friend._id == userToAdd._id) {
                        alert(userToAdd.name + " is already your friend!")
                        return
                    }
                }
                this.$store.dispatch('addToFriends', { user: user, userToAdd: userToAdd })
            },
            removeFromFriends(friend, user) {
                this.$store.dispatch('removeFromFriends', { user: user, friend: friend })
            },
            resetFields() {
                Object.assign(this.$data, this.$options.data.call(this));
            }
        }
    }
</script>

<style scoped>
    .profile {
        background-color: #ffffff;
        background-image: url("https://www.transparenttextures.com/patterns/rocky-wall.png");
        min-height: 100vh
    }

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
        margin-top: 2%
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

    .logo {
        height: 15vh;
    }

    .name {
        margin-top: 15%
    }

    .find {
        margin: 5px;
        width: 50%
    }

    .flex {
        display: flex;
        flex-direction: column;
        align-items: baseline
    }

    .flex2 {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        margin-top: 5%
    }

    .flex3 {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center
    }

    .cinzel {
        font-family: Cinzel
    }

    .fa-minus-circle {
        font-size: x-small;
        opacity: .4;
        transition: linear .3s all
    }

    .fa-minus-circle:hover {
        opacity: 1;
        transition: linear .3s all;
        cursor: pointer;
        color: rgb(253, 71, 71)
    }

    .friend {
        height: 7vh
    }
</style>