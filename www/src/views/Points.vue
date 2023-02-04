<script setup>
import { inject, onBeforeMount, reactive } from 'vue'
import { usePointsStore } from '@/stores/points'
import PointForm from '@/components/PointForm.vue'

const dialogDefaults = {
    component: 'PointForm',
    options: {
        preventOverlayClose: true,
    },
    data: null,
}

const api = inject('api')
const openDialog = inject('openDialog')
const pointsStore = usePointsStore()

function selectPoint(point) {
    console.log('point', point)
    openDialog({
        ...dialogDefaults,
        name: 'editPoint',
        label: 'Point Detail',
        data: point,
    })
}

function createPoint() {
    openDialog({
        ...dialogDefaults,
        name: 'newPoint',
        label: 'Create A New Point',
    })
}

onBeforeMount(() => {
    pointsStore.get()
})
</script>

<template>
    <div v-if="pointsStore.points">
        <div class="flex flex-col">
            <div class="flex space-x-6 items-center mb-4">
                <h1 class="text-6xl align-middle">Points</h1>
                <button @click="createPoint">
                    <font-awesome-icon icon="fa-solid fa-circle-plus" class="fa-3x hover:text-green-500"/>
                </button>
            </div>
            <div class="grid grid-cols-3 bg-gray-300">
                <div class="font-medium px-2 py-0.5">Name</div>
                <div class="font-medium px-2 py-0.5">X</div>
                <div class="font-medium px-2 py-0.5">Y</div>
            </div>
            <div v-for="point in pointsStore.points" @click="selectPoint(point)" class="grid grid-cols-3 hover:bg-gray-100 cursor-pointer border-t-[1px] border-x-[1px] last:border-b-[1px] border-gray-300">
                <div class="px-2 py-0.5">{{ point.name }}</div>
                <div class="px-2 py-0.5">{{ point.x }}</div>
                <div class="px-2 py-0.5">{{ point.y }}</div>
            </div>
        </div>
    </div>
    <div v-else>
        Loading
    </div>
</template>
