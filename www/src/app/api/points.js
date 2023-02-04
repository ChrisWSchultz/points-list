import Resource from './resource'

export default class Points extends Resource {

    /**
     *  Get all points
     * @returns {*}
     */
    all() {
        return this.axios.get(`points/`)
    }

    /**
     * Get a point by id
     *
     * @param {object} id
     */
    get(id) {
        return this.axios.get(`points/${id}`)
    }

    /**
     * Create a point
     *
     * @param {object} data
     */
    create(data) {
        return this.axios.post(`points/`, data)
    }

    /**
     * Update a point by id
     *
     * @param {string|int} id
     * @param {object} data
     */
    update(id, data) {
        return this.axios.put(`points/${id}/`, data)
    }

    /**
     * Delete a point by id
     *
     * @param {string|int} id
     */
    delete(id) {
        return this.axios.delete(`points/${id}/`)
    }

}
