<template>
    <div class="login">
        <form v-if="showLogin == true" @submit.prevent="login()">
            <input type="text" v-model="user.email" placeholder="email">
            <input type="password" v-model="user.password" placeholder="password">
            <button type="submit">Submit</button>
        </form>

        <form v-if="showLogin == false" @submit.prevent="createUser()">
            <input type="text" v-model="newUser.name" placeholder="username">
            <input type="text" v-model="newUser.email" placeholder="email">
            <input type="password" v-model="newUser.password" placeholder="password">
            <button type="submit" @click="showLogin = true">Submit</button>
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
</style>