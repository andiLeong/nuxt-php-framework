<template>

    <AppContainer>

        <div class="mt-10 mx-auto max-w-sm md:py-5 py-2">

            <form @submit.prevent="login" class="space-y-6 my-5 px-5">

                <div>
                    <label for="email" class="justify-self-start text-sm font-medium text-gray-700">Email</label>
                    <div class="mt-1">
                        <input
                            class="rounded p-1 border border-gray-400 w-full"
                            type="email"
                            id="email"
                            autocomplete="off"
                            placeholder="xxx@gmaio.com"
                            @input="resetError"
                            v-model="email"
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
                            placeholder="xxxxxxxxx"
                            @input="resetError"
                            v-model="password"
                        >
                    </div>
                </div>

                <div class="mt-10">
                    <button
                        class="w-full py-1 text-white rounded"
                        :class="loading ? 'cursor-not-allowed bg-gray-400' : 'bg-sky-500'"
                        :disabled="loading"
                    >
                        Login
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

const email = ref(null)
const password = ref(null)

const loading = ref(false)
const errors = ref(null)
const validationErrors = ref([])

const {setUser} = useAuth()

function login() {

    resetError()
    loading.value = true

    axios.post('/login', {
            password: password.value,
            email: email.value,
        })
        .then( ({data}) => {
            console.log(data);
            setUser(data)
            window.location.pathname = '/'
        })
        .catch(({response}) => {
            if (response) {
                if (response.status === 400 && response.data.hasOwnProperty('errors')) {
                    let error = response.data.errors;
                    validationErrors.value = Object.keys(error).map(err => error[err][0]);
                } else if (response.status === 403 && response.data.hasOwnProperty('message')) {
                    errors.value = response.data.message
                } else {
                    errors.value = 'Something went wrong. please try again later!'
                }
            }
        })
        .finally(function () {
            loading.value = false
        });
}

function resetError() {
    validationErrors.value = []
    errors.value = null
}

</script>

<style scoped>

</style>