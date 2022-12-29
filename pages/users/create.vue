<template>

    <AppContainer>

        <div class="mt-10 mx-auto max-w-lg md:py-5 py-2">

            <form @submit.prevent="store" class="space-y-6 my-5 px-5">

                <div>
                    <label for="email" class="justify-self-start text-sm font-medium text-gray-700">Email</label>
                    <div class="mt-1">
                        <input
                            class="rounded p-1 border border-gray-400 w-full"
                            type="email"
                            id="email"
                            autocomplete="off"
                            @input="resetError"
                            v-model="user.email"
                            placeholder="User Email"
                        >
                    </div>
                </div>

                <div>
                    <label for="password" class="justify-self-start text-sm font-medium text-gray-700">Password</label>
                    <div class="mt-1">
                        <input
                            class="rounded p-1 border border-gray-400 w-full"
                            type="password"
                            id="password"
                            autocomplete="off"
                            @input="resetError"
                            v-model="user.password"
                            placeholder="xxxxxxxxxxxxxx"
                        >
                    </div>
                </div>

                <div>
                    <label for="username" class="justify-self-start text-sm font-medium text-gray-700">Username</label>
                    <div class="mt-1">
                        <input
                            class="rounded p-1 border border-gray-400 w-full"
                            type="text"
                            id="username"
                            autocomplete="off"
                            @input="resetError"
                            v-model="user.username"
                            placeholder="User Username"
                        >
                    </div>
                </div>

                <div>
                    <label for="name" class="justify-self-start text-sm font-medium text-gray-700">Name</label>
                    <div class="mt-1">
                        <input
                            class="rounded p-1 border border-gray-400 w-full"
                            type="text"
                            id="name"
                            autocomplete="off"
                            @input="resetError"
                            v-model="user.name"
                            placeholder="User Name"
                        >
                    </div>
                </div>

                <div>
                    <label for="location" class="justify-self-start text-sm font-medium text-gray-700">Location</label>
                    <div class="mt-1">
                        <input
                            class="rounded p-1 border border-gray-400 w-full"
                            type="text"
                            id="location"
                            autocomplete="off"
                            @input="resetError"
                            v-model="user.location"
                            placeholder="User Location"
                        >
                    </div>
                </div>

                <div>
                    <button
                        class="w-full py-1 text-white rounded"
                        :class="loading ? 'cursor-not-allowed bg-gray-400' : 'bg-sky-500'"
                        :disabled="loading"
                    >
                        Create
                    </button>
                </div>

                <div v-if="validationErrors.length">
                    <p
                        v-for="(err,index) in validationErrors"
                        :key="index"
                        class="text-sm italic text-red-500">
                        {{ err }}
                    </p>
                </div>

                <div v-if="errors">
                    <p class="text-sm italic text-red-500">
                        {{ errors }}
                    </p>
                </div>

            </form>
        </div>

    </AppContainer>
</template>

<script setup>

import axios from "axios";

definePageMeta({
    middleware: ['auth'],
})


const {getUser} = useAuth()
const config = useRuntimeConfig()
const router = useRouter();
const loading = ref(false)
const user = ref({
    name:null,
    username:null,
    email:null,
    password:null,
    location:null,
})

const errors = ref(null)
const validationErrors = ref([])

function resetError() {
    validationErrors.value = []
    errors.value = null
}

function store() {

    loading.value = true
    let {remember_token: token} = getUser()

    axios.post(`/user`,
        user.value,
        {
            headers: {Authorization: `Bearer ${token}`}
        }).then(({data}) => {
            console.log(data);
            router.push({name: 'users'});
        })
        .catch(({response}) => {
            if (response && response.status === 400 && response.data.hasOwnProperty('errors')) {
                let error = response.data.errors;
                validationErrors.value = Object.keys(error).map(err => error[err][0]);
            } else {
                errors.value = 'Something went wrong. please try again later!'
            }
        })
        .finally(function () {
            loading.value = false
        });
}


</script>

<style scoped>

</style>