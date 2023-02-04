<script setup>
import { inject, onBeforeMount, reactive } from 'vue'
import { usePointsStore } from '@/stores/points'
import PointForm from '@/components/PointForm.vue'
import PointList from '@/components/PointList.vue'

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
    <div v-if="pointsStore.state.points">
        <div class="flex flex-col">
            <div class="flex space-x-6 items-center mb-4">
                <h1 class="text-6xl align-middle">Points</h1>
                <button @click="createPoint">
                    <font-awesome-icon icon="fa-solid fa-circle-plus" class="fa-3x hover:text-green-500"/>
                </button>
            </div>
            <PointList @row-clicked="selectPoint" :points="pointsStore.state.points" :options="{selectable: true}"></PointList>
        </div>
    </div>
    <div v-else>
        Loading
    </div>
</template>
