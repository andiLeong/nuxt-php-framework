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
                        <template v-if="  !('type' in col) || col.type === 'text' ">
                            {{ item[col.name] }}
                        </template>
                        <template v-if="col.type === 'image'">
                            <img :src="item[col.name]" :alt="item[col.name]" class="h-10 w-10 rounded-full">
                        </template>
                    </td>

                    <td v-if="actions" v-for="(action,index) in actions"
                        :key="index"
                        class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                    >
                        <template v-if="action.type === 'button' ">
                            <button
                                @click="$emit(action.name,item)"
                                class="bg-sky-500 text-white px-3 py-1.5 rounded-md "
                            >
                                {{ action.name }}
                            </button>
                        </template>

                        <template v-if="action.type === 'link' ">
                            <template v-if="action.external">
                                <a :href="action.to" class="text-sky-600 hover:text-sky-900">{{ action.name }}</a>
                            </template>
                            <template v-else>
                                <NuxtLink
                                    :to="generateInternalLink(action.to,item)"
                                    class="text-sky-600 hover:text-sky-900"
                                >
                                    {{ action.name }}
                                </NuxtLink>
                            </template>
                        </template>
                    </td>

                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>

defineProps({
    tableHead: {
        type: Array,
        required: true
    },
    items: {
        type: Array,
        required: true
    },
    columns: {
        type: Array,
        required: true
    },
    actions: {
        type: Array,
        required: false
    },
});

function generateInternalLink(to, item) {

    let res = to.match(/{(\w|-)+}/g);
    if (res === null) {
        return to;
    }

    let segmentsValues = res.map((segment) => {
        segment = segment.replace('{', '').replace('}', '')
        if (segment in item) {
            return item[segment]
        }

        throw new Error('segment ' + segment + ' is not found inside the item');
    })

    let cnt = 0;
    return to.replace(/{(\w|-)+}/g, function ($0) {
        if (cnt === segmentsValues.length) cnt = 0;
        return segmentsValues[cnt++];
    });
}
</script>

<style scoped>

</style>