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
    </div>
</template>

<script>
    export default {
        name: 'Profile',
        data() {
            return {

            }
        },
        computed: {
            user() {
                return this.$store.state.user
            }
        },
        methods: {
            logout() {
                this.$store.dispatch('logout')
            },
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