<template>
    <div class="comment">
        <div class="comment">
            <h5>{{userForComment.name}}:&nbsp;&nbsp;&nbsp;</h5>
            <p>{{comment.body}}</p>
        </div>
        <i class="fas fa-minus-circle" @click="removeComment(comment)"></i>
    </div>
</template>

<script>
    export default {
        name: 'Comment',
        props: ['comment'],
        mounted() {
            this.$store.dispatch('getUserForComment', this.comment)
        },
        data() {
            return {

            }
        },
        methods: {
            removeComment(comment) {
                this.$store.dispatch('removeComment', comment)
            }
        },
        computed: {
            userForComment() {
                return this.$store.state.userForComment
            }
        }
    }
</script>

<style scoped>
    .comment {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        font-family: Cinzel
    }

    i {
        opacity: .3;
        transition: linear .3s all
    }

    i:hover {
        opacity: 1;
        cursor: pointer;
        transition: linear .3s all;
        color: rgb(253, 71, 71)
    }
</style>