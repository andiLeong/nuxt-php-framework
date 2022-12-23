<template>

    <AppContainer>

        <div v-if="user" class="mt-10  mx-auto max-w-3xl md:py-5 py-2 border border-gray-300 rounded shadow-lg">
            <div class="md:py-4 py-2 md:px-7 px-4">
                <h2 class="text-gray-900 md:text-lg font-medium">User Information</h2>
                <p class="text-gray-500 text-sm">Personal details</p>
            </div>

            <div
                v-for="(user,index) in userInArray"
                :key="index"
                class="md:grid grid-cols-2 border-gray-300 py-4 md:px-7 px-4"
                :class=" index === 0 ? 'border-t' : 'md:border-t' "
            >
                <div>
                    <p class="text-gray-500 font-medium ">{{ user.key }}</p>
                </div>

                <div>
                    <template v-if="user.type === 'text'">
                        <p class="text-gray-700">{{ user.value }}</p>
                    </template>
                    <template v-if="user.type === 'image'">
                        <img :src="user.value" :alt="user.value" class="w-10 h-10 rounded-full border border-white">
                    </template>
                </div>
            </div>

        </div>

        <div v-if="error">
            Something went wrong please try again later
        </div>
    </AppContainer>
</template>

<script setup>

const config = useRuntimeConfig()
const route = useRoute();

const {data: user, error} = useLazyFetch(`user/${route.params.id}`, {
    baseURL: config.public.baseURL,
})

const userInArray = computed(() => {

    let keysToRender = ['avatar', 'name', 'email', 'username', 'location', 'created_at'];

    return keysToRender.map((key) => {
        return {
            'key': key,
            'value': user.value[key],
            'type': key === 'avatar' ? 'image' : 'text'
        }
    })
})

</script>

<style scoped>

</style>