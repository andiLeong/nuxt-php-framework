<template>

    <AppContainer>

        <div class="mt-10 mx-auto max-w-sm md:py-5 py-2">

            <form @submit.prevent="login" class="space-y-6 my-5 px-5">

                <div class="">
                    <label for="email" class="justify-self-start text-sm font-medium text-gray-700">Email</label>
                    <div class="mt-1">
                        <input
                            class="rounded p-1 border border-gray-400 w-full"
                            type="email"
                            id="email"
                            autocomplete="off"
                            placeholder="xxx@gmaio.com"
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

                <div v-if="errors">
                    <p> {{ errors }}</p>
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

function login() {

    loading.value = true
    // setTimeout( () => {
    //     loading.value = false
    // },2000)


    axios.post('/login')
        .then(function (response) {
            // handle success
            console.log(response);
        })
        .catch(error => {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            }
            console.log(error);
        })
        .finally(function () {
            // always executed
            loading.value = false
        });


}
</script>

<style scoped>

</style>