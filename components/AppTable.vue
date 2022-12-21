<template>

    <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
        <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table class="min-w-full divide-y divide-gray-300">
                <thead class="bg-gray-50">
                <tr>
                    <th v-for="(th,index) in tableHead" :key="index" scope="col"
                        class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        :class="index === 0 ? 'pl-4 pr-3 sm:pl-6' : '' "
                    >
                        {{ th }}
                    </th>
                    <!--                    <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">-->
                    <!--                        <span class="sr-only">Edit</span>-->
                    <!--                    </th>-->
                </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 bg-white">
                <tr v-if="items" v-for="(item,index) in items" :key="index">
                    <td v-for="(col,index) in columns"
                        :key="index"
                        class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                        :class="index === 0 ? 'pl-4 pr-3 font-medium text-gray-900 sm:pl-6' : '' "

                    >
                        {{ item[col] }}
                    </td>
                    <!--                    <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">-->
                    <!--                        <a href="#" class="text-indigo-600 hover:text-indigo-900"-->
                    <!--                        >Edit<span class="sr-only">, {{ person.name }}</span></a-->
                    <!--                        >-->
                    <!--                    </td>-->
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>

const props = defineProps(['tableHead', 'items', 'columns']);

</script>

<style scoped>

</style>