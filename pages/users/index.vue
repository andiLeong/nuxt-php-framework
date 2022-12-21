<template>

    <AppContainer>
        <div class="mx-auto max-w-8xl mt-5 mb-10">
            <h1>user index page</h1>
<!--            <div v-if="users">-->
<!--                <div v-for="user in users.data">-->
<!--                    <div>-->
<!--                        {{ user.id }}-->
<!--                        <Nuxt-link :to="{name: 'users-id', params:{id:user.id}}"> {{ user.name }}</Nuxt-link>-->
<!--                    </div>-->
<!--                </div>-->
<!--            </div>-->

<!--            <div v-else class="text-red-800 text-2xl">-->
<!--                loading ..-->
<!--            </div>-->

            <div v-if="users" class="px-4 sm:px-6 lg:px-8">
                <div class="sm:flex sm:items-center">
                    <div class="sm:flex-auto">
                        <h1 class="text-xl font-semibold text-gray-900">Users</h1>
                        <p class="mt-2 text-sm text-gray-700">A list of all the users in your account including their name, title, email and role.</p>
                    </div>
                    <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                        <button type="button" class="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto">Add user</button>
                    </div>
                </div>
                <div class="mt-8 flex flex-col">
                    <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">

                        <AppTable
                            :tableHead="th"
                            :items="users.data"
                            :columns="columns"
                        >

                        </AppTable>
                    </div>
                </div>
            </div>


        </div>
    </AppContainer>
</template>

<script setup>

const config = useRuntimeConfig()

const th = ['name','username','email','location','avatar','id'];
const columns = ['name','username','email','location','avatar','id'];

// const { data: users ,error } = await useFetch('http://localhost:8080/user')
// const {data: users , error} = useLazyFetch('http://localhost:8000/user');

const {data: users , error} = useLazyFetch('user', {baseURL: config.public.baseURL})

console.log(error)
console.log(config.public.baseURL)
</script>

<style scoped>

</style>