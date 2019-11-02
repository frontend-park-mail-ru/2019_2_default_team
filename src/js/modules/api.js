import Network from './network';

/**
 * API object
 * @class
 * @type {Api}
 */
export default class Api {

    /**
     * API Login
     * POST /api/sessions/
     * @static
     * @param {string} email
     * @param {string} password
     * @returns {Promise<Response>}
     */
    static login({email, password}) {
        return Network.doPost('/api/sessions/', {
            email,
            password,
        });
    }

    /**
     * API Check auth
     * GET /api/sessions/
     * @static
     * @returns {Promise<Response>}
     */
    static authCheck() {
        return Network.doGet('/api/sessions/');
    }

    /**
     * API Logout
     * delete /api/sessions/
     * @static
     * @returns {Promise<Response>}
     */
    static logout() {
        return Network.doDelete('/api/sessions/');
    }

    /**
     * API Registration
     * POST /api/users/
     * @static
     * @param {string} email
     * @param {string} password
     * @param {string} username
     * @returns {Promise<Response>}
     */
    static register({email, password, username}) {
        return Network.doPost('/api/users/', {
            email,
            password,
            username,
        });
    }

    /**
     * API Edit avatar
     * POST /api/images/
     * @static
     * @param {string} avatar - новое изображение
     * @param {string} userID
     * @returns {Promise<Response>}
     */
    static editAvatar({avatar}) {
        const formData = new FormData();
        formData.append('file', avatar.avatar);
        return Network.doPostFormData('/api/users/images/', formData);
    }

    /**
     * API Edit profile
     * PUT /api/users/
     * @static
     * @param {string} email
     * @param {string} description
     * @returns {Promise<Response>}
     */
    static editProfile({username, description}) {
        return Network.doPut('/api/users/', {
            username,
            description,
        });
    }

    /**
     * API Get profile info
     * GET /api/users/
     * @static
     * @returns {Promise<Response>}
     */
    static getProfileInfo() {
        return Network.doGet('/api/users/');
    }

    /**
     * API Get another user info
     * GET /api/users/{user_id}
     * @static
     * @returns {Promise<Response>}
     */
    static getAnotherUserInfo({userID}) {
        return Network.doGet(`/api/users/${userID}/`);
    }

    /**
     * API Get film info
     * GET /api/films/{film_id}/
     * @static
     * @param {string} filmID
     * @returns {Promise<Response>}
     */
    static getFilmInfo({filmID}) {
        return Network.doGet(`/api/films/${filmID}/`);
    }

    /**
     * API Get all films for certain page
     * GET /api/films/{pageID}/
     * @param pageID
     * @returns {Promise<Response>}
     */
    static getPageFilms({pageID}){
        return Network.doGet(`/api/films/${pageID}/`);
    }

    /**
     * API Add new film
     * POST /api/films/
     * @static
     * @param {string} title
     * @param {string} description
     * @param {Array} genres
     * @param {string} date
     * @param {Array} actors
     * @param {Array} directors
     * @param {number} rating
     * @returns {Promise<Response>}
     */
    static addNewFilm({title, description, genres, date, actors, directors, rating}) {
        return Network.doPost('/api/films/', {
            title,
            description,
            genres,
            date,
            actors,
            directors,
            rating,
        });
    }

    /**
     * API Check session
     * @static
     * @returns {Promise<Response>}
     */
    static checkSession () {
        return Network.doGet({ url: '/auth' });
    }
}