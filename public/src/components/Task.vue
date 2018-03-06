<template>
    <div class="task">
        <h6>{{task.description}}</h6>
    </div>
</template>

<script>
    export default {
        name: 'Task',
        props: ['task', 'list'],
    }
</script>

<style>

</style>