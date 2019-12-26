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
        return Network.doPost('/sessionservice', {
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
        return Network.doGet('/sessionservice');
    }

    /**
     * API Logout
     * delete /sessions/
     * @static
     * @returns {Promise<Response>}
     */
    static logout() {
        return Network.doDelete('/sessionservice');
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
    static register({email, password, nickname, first_name, last_name, genre = {}}) {
        return Network.doPost('/profile', {
            email,
            password,
            nickname,
            first_name,
            last_name,
            genre,
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
     * @param {string} Firstname
     * @param {string} Surname
     * @param {string} Password
     * @returns {Promise<Response>}
     */
    static editProfile(profile) {
        console.log("PROFILE");
        console.log(profile);
        return Network.doPut('/profile', profile);
    }

    /**
     * API Get profile info
     * GET /users/
     * @static
     * @returns {Promise<Response>}
     */
    static getProfileInfo() {
        return Network.doGet(`/profile`);
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

    // TODO: Дописать описание
    static getFilmComments(filmName) {
        return Network.doGet(`/commentByFilm/${filmName}`);
    }

    //TODO: Дописать описание
    static sendComment(data) {
        return Network.doPost(`/commentservice`, data);
    }

    /**
     * API Get all films
     * GET /allfilms
     * @returns {Promise<Response>}
     */
    static getAllFilms(){
        return Network.doGet(`/allfilms`);
    }

    /**
     * API Get all films for today
     * GET /allfilms&today
     * @returns {Promise<Response>}
     */
    static getFilmsForToday(){
        return Network.doGet(`/allfilms/today`)
    }

    /**
     * API Get all upcoming films
     * GET /allfilms&upcoming
     * @returns {Promise<Response>}
     */
    static getFilmsUpcoming(){
        return Network.doGet(`/allfilms/soon`)
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
     * API Get all sessions for a film
     * GET /films/${filmID}/sessions
     * @static
     * @param {number}filmID
     * @returns {Promise<Response>}
     */
    static getSessions(filmID){
        return Network.doGet(`/get_movie_sessions_times_for_today/${filmID}`);
    }

    /**
     * API Get all seats for a movie session
     * GET /get_seats/${ms_id}
     * @static
     * @param {number} msID - movie session id
     * @returns {Promise<Response>}
     */
    static getSeats(msID) {
        return Network.doGet(`/get_seats/${msID}`);
    }

    // TODO: Сделать описание
    static bookSeat(data) {
        return Network.doPost('/ticket', data);
    }

    /**
     * API Search films
     * GET `/film?title=${title}`
     * @param {string} title
     * @returns {Promise<Response>}
     */
    static searchFilm(title){
        return Network.doGet(`/allfilms?title=${title}`);
    }

    // TODO: Сделать описание
    static getRecommendations(genre) {
        return Network.doGet(`/films_recommended?genre=${genre}`);
    }

    // TODO: Сделать описание
    static voteForFilm(data) {
        return Network.doPost('/film_vote', data);
    }

    /**
     * API Get films with favorite genres
     * GET /allfilms/genre
     * @static
     * @returns {Promise<Response>}
     */
    static getFavFilms() {
        return Network.doGet('/allfilms/lovely');
    }

    /**
     * API Get top films
     * GET /allfilms/top
     * @static
     * @returns {Promise<Response>}
     */
    static getTop(){
        return Network.doGet('/allfilms/top');
    }
    //TODO Description
    static  wideSearch({genre, actors, ratingmin, country, year_min, year_max, date, time_min, time_max, price_min, price_max}){
        return Network.doGet(`/search?genre=${genre}&actor=${actors}&ratingmin=${ratingmin}&country=${country}&start_year=${year_min}&last_year=${year_max}&date=${date}&time_min=${time_min}&time_max=${time_max}&min_price=${price_min}&max_price=${price_max}`);
    }
}
