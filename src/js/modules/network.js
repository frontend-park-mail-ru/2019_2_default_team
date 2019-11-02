const serverUrl = 'localhost:3000';

/**
 * New Network obj
 * @class
 * @type {Network}
 */

export default class Network {

    /**
     * Get request
     * @static
     * @param {string} path
     * @returns {Promise<Response>}
     */

    static doGet(path = '/') {
        return fetch(Network.getServerUrl() + path, {
            method: 'GET',
            mode: 'cors',
            credentials: 'include',
        });
    }

    /**
     * Post request
     * @static
     * @param {string} path
     * @param {Object} body
     * @param {string} host
     * @returns {Promise<Response>}
     */

    static doPost(path = '/', body  = {}, host = Network.getServerUrl()) {
        return fetch(host + path, {
            method: "POST",
            mode: 'cors',
            credentials: "include",
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            }
        });
    }

    /**
     * DELETE request
     * @param path
     * @returns {Promise<Response>}
     */

    static doDelete(path = '/') {
        return fetch(Network.getServerUrl() + path, {
            method: "DELETE",
            mode: "cors",
            credentials: "include",
        });
    }

    /**
     * PUT request
     * @static
     * @param {string} path
     * @param {Object} body
     * @return {Promise<Response>}
     */

    static doPut(path = '/', body = {}) {
        return fetch(Network.getServerUrl() + path, {
            method: "PUT",
            mode: "cors",
            credentials: "include",
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
        });
    }

    /**
     *  Post formData
     *  @param {string} path
     *  @static
     *  @param {Object} formData
     *  @returns {Promise<Response>}
     */

    static doPostFormData(path = '/', formData) {
        return fetch(Network.getServerUrl() + path, {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            body: formData,
        });
    }

    /**
     * PUT form-data request
     * @param {string} path
     * @param {Object} formData
     * @returns {Promise<Response>}
     */
    static doPutFormData(path = '/', formData) {
        return fetch(Network.getServerUrl() + path, {
            method: 'PUT',
            mode: 'cors',
            credentials: 'include',
            body: formData,
        });
    }

    /**
     * Server URL
     * @returns {string}
     */

    static getServerUrl() {
        return serverUrl
    }
}