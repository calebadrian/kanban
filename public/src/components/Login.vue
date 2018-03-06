<template>
    <div class="login">
            <img src="../assets/Omeganize_logo2.jpg" class="logo">

        <form v-if="showLogin == true" @submit.prevent="login()" class="form-group">
            <input type="text" v-model="user.email" placeholder="email" class="form-control">
            <input type="password" v-model="user.password" placeholder="password" class="form-control">
            <button type="submit" class="btn btn-info">Submit</button>
        </form>

        <form v-if="showLogin == false" @submit.prevent="createUser()" class="form-group">
            <input type="text" v-model="newUser.name" placeholder="username" class="form-control">
            <input type="text" v-model="newUser.email" placeholder="email" class="form-control">
            <input type="password" v-model="newUser.password" placeholder="password" class="form-control">
            <button type="submit" @click="showLogin = true" class="btn btn-info">Submit</button>
        </form>

        <div class="bg-1">
            <button @click="showLogin = false" class="btn btn-link">Create User</button>
            <button @click="showLogin = true" class="btn btn-link">Login</button>
        </div>

    </div>
</template>

<script>
    export default {
        name: 'Login',
        data() {
            return {
                showLogin: true,
                user: {
                    email: '',
                    password: ''
                },
                newUser: {
                    name: '',
                    email: '',
                    password: ''
                }
            }
        },
        methods: {
            login() {
                this.$store.dispatch('login', this.user)
            },
            createUser() {
                this.$store.dispatch('createUser', this.newUser)
            }
        }
    }

</script>


<style scoped>
    .login {
        background-image: url('../assets/bg-1.jpg');
        background-size: cover;
        height: 100vh
    }

    .logo {
        opacity: .7;
        border-radius: 30px;
        margin: 15px;

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

    .bg-1 {
        background-color: rgba(218, 216, 216, 0.596);
        display: flex;
        flex-direction: row;
        justify-content: space-around
    }

    .btn-link {
        color: indigo;
        font-weight: 700
    }

    .btn-info {
        width: 25%
    }
</style>