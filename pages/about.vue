<template>
    <h3>about</h3>

    <client-only>
        <p v-if="user">
            welcome {{ user.name }}
        </p>
        {{ user }}
    </client-only>
</template>

<script setup>



const user = useState('user')

</script>

<style scoped>

</style>