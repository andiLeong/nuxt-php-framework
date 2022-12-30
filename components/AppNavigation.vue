<template>

    <div class="bg-white border-b border-gray-300">
        <nav class="max-w-7xl mx-auto ">
            <ul class="flex items-center justify-center space-x-5 py-6 ">
                <li class="text-stone-500 text-xl capitalize">
                    <NuxtLink :to="{name:'index'}">home</NuxtLink>
                </li>
                <li class="text-stone-500 text-xl capitalize">
                    <NuxtLink :to="{name:'users'}">users</NuxtLink>
                </li>
                <client-only>
                    <li v-if="!isLoggedIn" class="text-stone-500 text-xl capitalize">
                        <NuxtLink :to="{name:'login'}">login</NuxtLink>
                    </li>
                    <li v-if="isLoggedIn" class="text-stone-500 text-xl capitalize">
                        <a href="#" @click.prevent="logout">logout</a>
                    </li>
                </client-only>
                <!--                <li class="text-stone-500 text-xl capitalize">-->
                <!--                    <NuxtLink :to="{name:'users-create'}">create</NuxtLink>-->
                <!--                </li>-->
                <!--                <li class="text-stone-500">-->
                <!--                    <NuxtLink :to="{name:'users-id' , params: {id:1}}">show user 1</NuxtLink>-->
                <!--                </li>-->
                <!--                <li class="text-stone-500">-->
                <!--                    <NuxtLink :to="{name:'users-edit-id' , params: {id:1}}">edit user 1</NuxtLink>-->
                <!--                </li>-->
            </ul>
        </nav>

    </div>
</template>

<script setup>

import {useAuth} from "../composables/useAuth";

const {isLoggedIn,removeUser} = useAuth()

function logout() {
    removeUser()
    window.location.pathname = '/'
}

</script>

<style>

a.router-link-active {
    font-weight: bold;
}

a.router-link-exact-active {
    color: #0ea5e9;
}
</style>