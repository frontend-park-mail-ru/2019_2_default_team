import Network from './network';

/**
 * API object
 * @class
 * @type {Api}
 */
export default class Api {

    /**
     * API Login
     * POST /sessions/
     * @static
     * @param {string} email
     * @param {string} password
     * @returns {Promise<Response>}
     */
    static login({email, password}) {
        return Network.doPost('/session', {
            email,
            password,
        });
    }

    /**
     * API Check auth
     * GET /sessions/
     * @static
     * @returns {Promise<Response>}
     */
    static authCheck() {
        return Network.doGet('/session');
    }

    /**
     * API Logout
     * delete /sessions/
     * @static
     * @returns {Promise<Response>}
     */
    static logout() {
        return Network.doDelete('/session/');
    }

    /**
     * API Registration
     * POST /users/
     * @static
     * @param {string} email
     * @param {string} password
     * @param {string} username
     * @returns {Promise<Response>}
     */
    static register({email, password, nickname}) {
        return Network.doPost('/profile', {
            email,
            password,
            nickname,
        });
    }

    /**
     * API Edit avatar
     * POST /images/
     * @static
     * @param {string} avatar - новое изображение
     * @param {string} userID
     * @returns {Promise<Response>}
     */
    static editAvatar({avatar}) {
        const formData = new FormData();
        formData.append('file', avatar.avatar);
        return Network.doPostFormData('/users/images/', formData);
    }

    /**
     * API Edit profile
     * PUT /users/
     * @static
     * @param {string} email
     * @param {string} description
     * @returns {Promise<Response>}
     */
    static editProfile({username, description}) {
        return Network.doPut('/users/', {
            username,
            description,
        });
    }

    /**
     * API Get profile info
     * GET /users/
     * @static
     * @returns {Promise<Response>}
     */
    static getProfileInfo(userID) {
        return Network.doGet(`/profile/${userID}`);
    }

    /**
     * API Get another user info
     * GET /users/{user_id}
     * @static
     * @returns {Promise<Response>}
     */
    static getAnotherUserInfo({userID}) {
        return Network.doGet(`/users/${userID}/`);
    }

    /**
     * API Get film info
     * GET /films/{film_id}/
     * @static
     * @param {number} filmID
     * @returns {Promise<Response>}
     */
    static getFilmInfo(filmID) {
        return Network.doGet(`/film/${filmID}` );
    }

    /**
     * API Get all films
     * GET /films
     * @returns {Promise<Response>}
     */
    static getAllFilms(){
        return Network.doGet(`/allfilms`);
    }

    /**
     * API Add new film
     * POST /films/
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
        return Network.doPost('/films/', {
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
