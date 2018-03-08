<template>
    <div class="profile">
        <nav class="navbar navbar-expand-lg navbar-dark">
            <div>
                <a class="navbar-brand" href="#/">
                    <img src="../assets/Omeganize_logo1.jpg" class="logo">
                </a>
            </div>
            <div class="navbar-nav mr-auto">

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
        <img :src="user.avatar + user.name">
        <h3>{{user.name}}</h3>
        <div v-for="friend in user.friends">
            <h3>{{friend.name}}</h3>
        </div>
        <div v-for="userToAdd in users">
            <div v-if="userToAdd._id != user._id">
                <button class="btn-success" @click="addToFriends(userToAdd, user)">Add {{userToAdd.name}} to Friends</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Profile',
        mounted() {
            this.$store.dispatch('getUsers')
        },
        data() {
            return {

            }
        },
        computed: {
            user() {
                return this.$store.state.user
            },
            users() {
                return this.$store.state.users
            }
        },
        methods: {
            logout() {
                this.$store.dispatch('logout')
            },
            addToFriends(userToAdd, user){
                this.$store.dispatch('addFriend', {user: user, userToAdd: userToAdd})
            }
        }
    }
</script>

<style scoped>
    .navbar {
        background-color: black;
        font-family: Cinzel;
        height: 15vh
    }

    .nav-link {
        color: #36afc2 !important;
        margin-top: 1%;
        text-shadow: 2px 1px 10px rgb(150, 150, 150);
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
</style>