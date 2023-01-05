<template>

    <AppContainer>
        <div class="mx-auto max-w-8xl mt-5 mb-10">

            <div v-if="users" class="px-4 sm:px-6 lg:px-8">
                <div class="sm:flex sm:items-center">
                    <div class="sm:flex-auto">
                        <h1 class="text-xl font-semibold text-gray-900">Users</h1>
                        <p class="mt-2 text-sm text-gray-700">A list of all the users in your account including their
                            name, title, email and role.</p>
                    </div>
                    <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                        <button
                            @click.prevent="goToCreate"
                            type="button"
                            class="inline-flex items-center justify-center rounded-md border border-transparent bg-sky-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 sm:w-auto">
                            Add user
                        </button>
                    </div>
                </div>
                <div class="mt-8 flex flex-col">
                    <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">

                        <AppTable
                            :tableHead="th"
                            :items="users.data"
                            :columns="columns"
                            :actions="actions"
                            @edit="goToEdit"
                            @delete="destroy"
                        />

                        <div class="mt-10">
                            <AppPaginator :items="users" @goToPage="goingTo"/>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="error">
                <p>error has occured, please try again later!</p>
            </div>

        </div>
    </AppContainer>
</template>

<script setup>

import axios from "axios";

const {redirectToLogin} = useHandleTokenExpired()
const {getUser, isLoggedIn} = useAuth()
const config = useRuntimeConfig()

const route = useRoute();
const router = useRouter();
const page = ref(route.query.page ?? 1);
const th = ['id', 'avatar', 'name', 'username', 'email', 'location'];
const columns = [
    {name: 'id'},
    {name: 'avatar', type: 'image'},
    {name: 'name'},
    {name: 'username'},
    {name: 'email'},
    {name: 'location'},
];

const actions = [
    // {name: 'google', type: 'link', to: 'https://google.com', external: true},
    {name: 'view', type: 'link', to: '/users/{id}', external: false},
    // {name: 'view', type: 'link', to: '/users/{id}/post/{username}', external: false},
    {name: 'edit', type: 'button'},
    {name: 'delete', type: 'button'},
];

function goToEdit(item) {
    router.push({name: 'users-edit-id', params: {id: item.id}})
}

function goToCreate() {
    router.push({name: 'users-create'})
}

const {data: users, error} = useLazyFetch('user', {
    baseURL: config.public.baseURL,
    query: {page}
})

function goingTo(targetPage) {
    page.value = targetPage
    router.push({query: {page: targetPage}})
}

function destroy(user) {

    if (!isLoggedIn.value) {
        router.push({name: 'login'})
        return;
    }

    let {jwt_token: token} = getUser()

    axios.delete(`/user/${user.id}`, {
        headers: {Authorization: `Bearer ${token}`}
    })
        .then(({data}) => {
            console.log(data);
            window.location.pathname = '/users'
        })
        .catch(({response}) => {
            redirectToLogin(response.status)
        });
}


</script>

<style scoped>

</style>