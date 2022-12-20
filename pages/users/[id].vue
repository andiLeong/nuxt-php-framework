<template>

    show single user page {{ $route.params.id}}

</template>

<script setup>

    const route = useRoute();

    console.log(route.params.id)
</script>

<style scoped>

</style>