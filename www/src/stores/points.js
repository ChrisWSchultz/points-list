import { reactive, inject, computed, toRaw } from 'vue'
import { defineStore } from 'pinia'

import { round } from 'lodash'

export const usePointsStore = defineStore('points', () => {
    const api = inject('api')

    const state = reactive({points: []})

    const distances = computed(() => {
        return (id, x, y) => {
            const pointsRaw = toRaw(state.points)
            const pointDistanceMap = new Map()

            let closestDistance = null
            let farthestDistance = null

            pointsRaw.forEach((rawPoint) => {
                if(rawPoint.id !== id) {
                    let distance = getDistance(x, y, rawPoint.x, rawPoint.y)

                    if(!closestDistance) closestDistance = distance
                    if(!farthestDistance) farthestDistance = distance

                    if(distance < closestDistance) closestDistance = distance
                    if(distance > farthestDistance) farthestDistance = distance

                    if(pointDistanceMap.has(distance)) {
                        let d = pointDistanceMap.get(distance)
                        pointDistanceMap.set(distance, [...d, rawPoint])
                    }
                    else {
                        pointDistanceMap.set(distance, [rawPoint])
                    }
                }
            })

            return {closest: closestDistance, farthest: farthestDistance, map: pointDistanceMap}
        }
    })

    function get() {
        state.points = []

        api.points.all().then((response) => {
            state.points = [...response.data]
        })
    }

    function getDistance(x1, y1, x2, y2) {
        let y = x2 - x1;
        let x = y2 - y1;

        return round(Math.sqrt(x * x + y * y), 1);
    }

    return { state, get, distances }
})
