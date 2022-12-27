<template>

    <NuxtLayout>
        <NuxtLoadingIndicator :height=2 color="#0ea5e9"/>
        <NuxtPage/>
    </NuxtLayout>
</template>

<script setup>
import axios from "axios";

const config = useRuntimeConfig()
axios.defaults.baseURL = config.public.baseURL;


console.log('ini app.vue ')
if (process.client) {
    let user = localStorage.getItem('user')
    if (user !== null) {
        useState('user', () => JSON.parse(user))
    }
}


</script>

<style scoped>

</style>