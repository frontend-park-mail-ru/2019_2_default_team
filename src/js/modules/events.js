
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

};

export const FILM = {
    getFilms: 'getFilms',
    getFilmsSuccess: 'getFilmsS',
    getFilmsFailed: 'getFilmsF',

    createFilm: 'createFilm',
    createFilmSuccess: 'createFilmS',
    createFilmFailed: 'createFilmF',

    getFilm: 'getFilm',
    getFilmSuccess: 'getFilmS',
    getFilmFailed: 'getFilmF',
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

export const CHAT = {
    sendMessage: 'sendMessage',
    openWebSocket: 'openws',
    receive: 'rec',
};
