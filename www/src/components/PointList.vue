<script setup>
import { computed } from 'vue'

const emit = defineEmits(['rowClicked'])

const props = defineProps({
    points: {
        type: Array,
        default: () => { return [] }
    },
    options: {
        type: Object,
        default: () => { return { selectable: false, } }
    }
})

function selectRow(row) {
    if(selectable) emit('rowClicked', row)
}

const selectable = computed(() => {
    return !!props.options.selectable
})

</script>

<template>
    <slot name="header">
        <div class="grid grid-cols-3 bg-gray-300">
            <div class="font-medium px-2 py-0.5">Name</div>
            <div class="font-medium px-2 py-0.5">X</div>
            <div class="font-medium px-2 py-0.5">Y</div>
        </div>
    </slot>
    <slot name="body">
        <div v-for="point in props.points" @click="selectRow(point)"
             class="grid grid-cols-3 border-t-[1px] border-x-[1px] last:border-b-[1px] border-gray-300"
             :class="[{'hover:bg-gray-100 cursor-pointer': selectable}]">
            <div class="px-2 py-0.5">{{ point.name }}</div>
            <div class="px-2 py-0.5">{{ point.x }}</div>
            <div class="px-2 py-0.5">{{ point.y }}</div>
        </div>
    </slot>
</template>

<style scoped>
</style>
