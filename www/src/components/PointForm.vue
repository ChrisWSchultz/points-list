<script setup>
import { inject, onBeforeMount, reactive, defineProps, defineEmits, computed } from 'vue'
import '@shoelace-style/shoelace/dist/components/input/input.js'
import '@shoelace-style/shoelace/dist/components/button/button.js'
import { usePointsStore } from '@/stores/points'

const api = inject('api')

const emit = defineEmits(['close'])

const pointsStore = usePointsStore()

const props = defineProps({
    data: {
        type: Object,
        default: {}
    }
})

const point = reactive({
    id: null,
    name: null,
    x: null,
    y: null,
})

const isEdited = computed(() => {
    if(props.data.id) {
        return point.name && point.x && point.y && (point.name !== props.data.name || point.x !== props.data.x || point.x !== props.data.x)
    }
    return point.name && point.x && point.y
})

function handleClose() {
    emit('close')
}

function handleReset() {
    console.log('reset')
}

function handleDelete() {
    console.log('delete')
}

function handleSave() {
    console.log('save')
}

onBeforeMount(() => {
    if(props.data?.id) {
        point.id = props.data.id
        point.name = props.data.name
        point.x = props.data.x
        point.y = props.data.y
    }
})
</script>

<template>
    <div class="flex space-x-4 justify-end">
        <sl-button variant="default" @click="handleReset" :disabled="!isEdited">Reset</sl-button>
        <sl-button variant="danger" @click="handleDelete">Delete</sl-button>
    </div>
    <div class="flex flex-col mb-6">
        <sl-input label="Name" v-model="point.name"></sl-input>
        <div class="flex space-x-4 w-full">
            <sl-input label="X" v-model="point.x" type="number" class="w-full"></sl-input>
            <sl-input label="Y" v-model="point.y" type="number" class="w-full"></sl-input>
        </div>
    </div>
    <div class="flex space-x-4 justify-end">
        <sl-button @click="handleClose">Cancel</sl-button>
        <sl-button variant="success" @click="handleSave" :disabled="!isEdited">Save</sl-button>
    </div>
</template>

<style scoped>
</style>
