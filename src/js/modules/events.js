
export const AUTH = {
    checkAuth: 'checkAuth',
    checkAuthResponse: 'authR',

    signOut: 'signOut',
    signOutResponse: 'signOutR',

    signIn: 'signIn',
    signInSuccess: 'signInS',
    signInFailed: 'signInF',

    signUpCustomer: 'signUpCustomer',
    signUpSuccess: 'signUpS',
    signUpFailed: 'signUpF',

    logout: 'logout',
    logoutSuccess: 'logoutS',

};

export const FILM = {
    getFilms: 'getFilms',
    getFilmsSuccess: 'getFilmsS',
    getFilmsFailed: 'getFilmsF',

    wideSearch: 'wideSearch',
    wideSearchSuccess: 'wideSearchS',
    wideSearchFailed: 'wideSearchF',

    createFilm: 'createFilm',
    createFilmSuccess: 'createFilmS',
    createFilmFailed: 'createFilmF',

    getFilmsSearch: 'getFilmsSearch',
    getFilmsSearchSuccess: 'getFilmsSearchS',
    getFilmsSearchFailed: 'getFilmsSearchFailed',

    getFilm: 'getFilm',
    getFilmSuccess: 'getFilmS',
    getFilmFailed: 'getFilmF',

    getFavFilms: 'getFavFilms',
    getFavFilmsSuccess: 'getFavFilmsS',
    getFavFilmsFailed: 'getFavFilmsF',

    getTop: 'getTop',
    getTopSuccess: 'getTopS',
    getTopFailed: 'getTopF',

    getCinemas : 'getCinemas',
    getCinemasSuccess : 'getCinemasS',
    getCinemasFailed : 'getCinemasF',

    sendComment: 'sendComment',

    plusRating: 'plusRating',
    plusRatingSuccess: 'plusRatingSuccess'
};

export const PROFILE = {
    loadProfile: 'loadProfile',
    loadProfileSuccess: 'loadProfileS',
    loadProfileFailed: 'loadProfileF',

    saveButtonClicked: 'saveButtonC',

    saveProfile: 'saveProfile',
    saveProfileSuccess: 'saveProfileS',
    saveProfileFailed: 'saveProfileF',

    saveAvatar: 'saveAvatar',
    saveAvatarSuccess: 'saveAvatarS',
    saveAvatarFailed: 'saveAvatarF',
};

export const CINEMA = {
    getSessions: 'getSessions',
    getSessionsSuccess: 'getSessionsS',
    getSessionsFailed: 'getSessionsF',

    getType: 'getType',
    getTypeSuccess: 'getTypeS',
    getTypeFailed: 'getTypeF',
};

export const FILTER = {
    loadWithFilter: 'loadWithFilter',
    loadWithFilterSuccess: 'loadWithFilterS',
    loadTodayFilter: 'loadTodayFilter',
    loadTodayFilterSuccess: 'loadTodayFilterS',
    loadUpcomingFilter: 'loadUpcomingFilter',
    loadUpcomingFilterSuccess: 'loadUpcomingFilterS',
    search: 'search',
};

export const POPUP = {
    openPopup: 'openPopup',
    openPopupSuccess: 'openPopupSuccess',
    openPopupFailure: 'openPopupFailure',
    closePopup: 'closePopup',
    closePopupFailure: 'closePopupFailure',
    closePopupSuccess: 'closePopupSuccess',
    changePopupLayout: 'changePopupLayout',      // Переключение между режимами выбора места/времени
    changePopupLayoutSuccess: 'changePopupLayoutSuccess',
    changePopupLayoutFailure: 'changePopupLayoutFailure',
    popupBookTicket: 'popupBookTicket'
};

export const ACTIONS = {
    changeRequest: 'cr',
    goTo: 'goTo'
};
