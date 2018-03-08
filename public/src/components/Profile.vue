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
                            <h3 class="username">{{user.name}}</h3>
                        </div>
                    </div>
                </div>
                <div class="col-6">
                    <div class="card">
                        <div class="card-body flex">
                            <h4>Username: {{user.name}}</h4>
                            <h4>Email: {{user.email}}</h4>
                        </div>
                    </div>
                </div>
                <form @submit.prevent="searchByEmail" class="form-group">
                    <input type="text" v-model="userFind.email" placeholder="email" class="form-control">
                    <button type="submit" class="btn btn-info create" @click="form = !form">Find User</button>
                </form>
                <div v-for="friend in user.friends">
                    <h3>{{friend.name}}</h3>
                    <button class="btn-danger" @click="removeFromFriends(friend, user)">Remove {{friend.name}} from friends</button>
                </div>
                <div v-for="userToAdd in users">
                    <div v-if="userToAdd._id != user._id">
                        <button class="btn-success" @click="addToFriends(userToAdd, user)">Add {{userToAdd.name}} to Friends</button>
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

    .username {
        margin-top: 2%;
        font-family: Cinzel
    }

    .flex {
        display: flex;
        flex-direction: column;
        align-items: baseline
    }
</style>