<template>
    <AppContainer>

        <div class="mx-auto max-w-4xl mt-20 text-gray-700">
            <p>
                This is demo a simple crud operation project
            </p>
            <p>
                 Using my own <a href="https://github.com/andiLeong/framework" class="text-sky-500">php framework </a>as backend
            </p>
            <p>
                 Built with nuxt
            </p>
        </div>
        <client-only>
            <p v-if="user">
                welcome {{ user.name }}
            </p>
        </client-only>
    </AppContainer>
</template>

<script setup>

const user = useState('user')
</script>