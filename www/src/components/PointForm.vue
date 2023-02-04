<script setup>
import { inject, onBeforeMount, ref, reactive, computed, watch } from 'vue'
import { usePointsStore } from '@/stores/points'
import PointList from '@/components/PointList.vue'
import '@shoelace-style/shoelace/dist/components/input/input.js'
import '@shoelace-style/shoelace/dist/components/button/button.js'

const api = inject('api')

const emit = defineEmits(['close'])

const pointsStore = usePointsStore()

const props = defineProps({
    data: {
        type: Object,
        default: () => { return {} }
    }
})

const saving = ref(false)
const error = ref(null)

const point = reactive({ id: null, name: null, x: null, y: null, })
const distances = reactive({closest: null, farthest: null, map: null})

const closestPoints = computed(() => {
    if(distances.map) return distances.map.get(distances.closest)
    return null
})

const farthestPoints = computed(() => {
    if(distances.map) return distances.map.get(distances.farthest)
    return null
})

const isChanged = computed(() => {
    if(props.data?.id) {
        return (point.name && point.x && point.y) && (point.name !== props.data.name || point.x !== props.data.x || point.y !== props.data.y)
    }
    return point.name && point.x && point.y
})

const isNew = computed(() => {
    return !props.data
})

watch(point, (newValue, oldValue) => {
    if(point.x && point.y) {
        getDistances(point.id, point.x, point.y)
    }
})

function getDistances(id, x, y) {
    const d = pointsStore.distances(id, x, y)
    distances.closest = d.closest
    distances.farthest = d.farthest
    distances.map = d.map
}

function syncAndClose() {
    pointsStore.get()
    emit('close')
}

function handleClose() {
    emit('close')
}

function handleReset() {
    console.log('reset')
    if(props.data?.id) {
        point.id = props.data.id
        point.name = props.data.name
        point.x = props.data.x
        point.y = props.data.y
    }
    else {
        point.id = null
        point.name = null
        point.x = null
        point.y = null
    }
}

function handleDelete() {
    console.log('delete')
    saving.value = true
    api.points
        .delete(props.data.id)
        .then((response) => {
            syncAndClose()
        })
        .catch((error) => {
            console.error(error)
        })
        .finally(() => {
            saving.value = false
        })
}

function handleSave() {
    console.log('save')
    if(props.data) {
        saving.value = true
        api.points
            .update(point.id, {id: point.id, name: point.name, x: point.x, y: point.y})
            .then((response) => {
                syncAndClose()
            })
            .catch((error) => {
                console.error(error)
            })
            .finally(() => {
                saving.value = false
            })
    }
    else {
        saving.value = true
        api.points
            .create({name: point.name, x: point.x, y: point.y})
            .then((response) => {
                syncAndClose()
            })
            .catch((error) => {
                console.error(error)
            })
            .finally(() => {
                saving.value = false
            })
    }
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
    <div v-if="!isNew" class="flex space-x-4 justify-end">
        <sl-button variant="default" @click="handleReset" :disabled="!isChanged">Reset</sl-button>
        <sl-button variant="danger" @click="handleDelete">Delete</sl-button>
    </div>
    <div class="flex flex-col mb-6">
        <sl-input label="Name" v-model="point.name"></sl-input>
        <div class="flex space-x-4 w-full">
            <sl-input label="X" v-model="point.x" type="number" class="w-full"></sl-input>
            <sl-input label="Y" v-model="point.y" type="number" class="w-full"></sl-input>
        </div>
    </div>
    <div v-if="distances.map">
        <div class="mb-6">
            <span>Nearest points at distance {{ distances.closest }}:</span>
            <PointList :points="closestPoints"></PointList>
        </div>
        <div class="mb-6">
            <span>Farthest points at distance {{ distances.farthest }}:</span>
            <PointList :points="farthestPoints"></PointList>
        </div>
    </div>
    <div class="flex space-x-4 justify-end">
        <sl-button @click="handleClose">Cancel</sl-button>
        <sl-button variant="success" @click="handleSave" :disabled="!isChanged">Save</sl-button>
    </div>
</template>

<style scoped>
</style>
