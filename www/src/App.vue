<script setup>
import { ref, provide, reactive } from 'vue'
import DefaultLayout from './layout/Default.vue'
import PointForm from './components/PointForm.vue'
import '@shoelace-style/shoelace/dist/components/dialog/dialog.js'

const dialogs = {
    PointForm,
}

const isOpen = ref(false)
const dialogMeta = reactive({
    name: null,
    label: null,
    component: null,
    options: null,
    data: null,
})

function onDialogOpen(payload) {
    dialogMeta.name = payload.name
    dialogMeta.label = payload.label
    dialogMeta.component = payload.component
    dialogMeta.options = payload.options
    dialogMeta.data = payload.data

    isOpen.value = true
}

function requestDialogClose(event) {
    if(dialogMeta?.options.preventOverlayClose) {
        event.preventDefault()
        if(event?.detail.source !== 'overlay') {
            event.target.hide()
        }
    }
}
function onDialogClose(payload) {
    isOpen.value = false

    dialogMeta.name = null
    dialogMeta.label = null
    dialogMeta.component = null
    dialogMeta.options = null
    dialogMeta.data = null
}

provide('openDialog', onDialogOpen)

</script>

<template>
    <!-- Sheets & Dialogs -->
    <div v-if="isOpen">
        <sl-dialog :open="isOpen" :label="dialogMeta.label" @sl-request-close="requestDialogClose" @sl-after-hide="onDialogClose">
            <Component :is="dialogs[dialogMeta.component]" :data="dialogMeta.data" @close="onDialogClose"></Component>
        </sl-dialog>
    </div>

    <div class="w-full h-full px-8 pt-6">
        <Component :is="DefaultLayout"></Component>
    </div>
</template>

<style scoped>
</style>
