<template>
    <div class="login">
        <form v-if="showLogin == true" @submit.prevent="login">
            <input type="text" v-model="user.email" placeholder="email">
            <input type="password" v-model="user.password" placeholder="password">
            <button type="submit">Submit</button>
        </form>

        <form v-if="showLogin == false" @submit.prevent="createUser">
            <input type="text" v-model="user.name" placeholder="username">
            <input type="text" v-model="user.email" placeholder="email">
            <input type="password" v-model="user.password" placeholder="password">
            <input type="password" v-model="user.password" placeholder="password">
            <button type="submit" @click"showLogin = true">Submit</button>
        </form>

        <button @click="showLogin = false">Create User</button>
        <button @click="showLogin = true">Login</button>

    </div>
</template>

<script>
    export default {
        name: 'Login',
        data() {
            return {
                showlogin : true,
                user: {
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
                this.$store.dispatch('createUser', this.user)
            }
        }
    }

</script>


<style scoped>
</style>