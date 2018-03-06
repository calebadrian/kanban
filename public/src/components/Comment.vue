<template>
    <div class="comment">
        <p>{{comment.body}}</p>
    </div>
</template>

<script>
    export default {
        name: 'Comment',
        props: ['comment'],
        data() {
            return {

            }
        }
    }
</script>

<style>

</style>