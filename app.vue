<template>

    <NuxtLayout>
        <NuxtLoadingIndicator :height=2 color="#0ea5e9" />
        <NuxtPage/>
    </NuxtLayout>
</template>

<script setup>
import axios from "axios";

const config = useRuntimeConfig()
axios.defaults.baseURL = config.public.baseURL;


</script>

<style scoped>

</style>