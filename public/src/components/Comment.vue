<template>
    <div class="comment">
        <p>{{comment.body}}</p>
        <button class="btn-danger" @click="removeComment(comment)">Delete Comment</button>
        <p>{{userForComment.name}}</p>
    </div>
</template>

<script>
    export default {
        name: 'Comment',
        props: ['comment'],
        mounted(){
            this.$store.dispatch('getUserForComment', this.comment)
        },
        data() {
            return {

            }
        },
        methods: {
            removeComment(comment){
                this.$store.dispatch('removeComment', comment)
            }
        },
        computed: {
            userForComment(){
                return this.$store.state.userForComment
            }
        }
    }
</script>

<style>

</style>