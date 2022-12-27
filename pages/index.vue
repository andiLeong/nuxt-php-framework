<template>
    <h1>hello world</h1>

    <h1 class="text-3xl font-bold underline">
        Hello world!
    </h1>


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