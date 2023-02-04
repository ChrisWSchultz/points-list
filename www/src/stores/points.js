import { ref, inject } from 'vue'
import { defineStore } from 'pinia'

export const usePointsStore = defineStore('points', () => {
  const api = inject('api')

  const points = ref([])

  function get() {
    points.value = []

    api.points.all().then((response) => {
      points.value = response.data
    })
  }

  return { points, get }
})
