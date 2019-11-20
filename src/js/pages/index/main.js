import {SigninComponent} from '../../views/Login/Login.js';
import {SignupComponent} from '../../views/Register/Register.js';
import {ProfileComponent} from '../../views/Profile/Profile.js';
import {AboutComponent} from '../../views/About/About.js';
import {PosterComponent} from '../../views/Poster/Poster.js';
import {FilmpageComponent} from "../../views/Filmpage/Filmpage.js";

const AjaxModule = globalThis.AjaxModule;

const application = document.getElementById('application');

function createSignup() {
    const signup = new SignupComponent(application);
    signup.render(createProfile);
}

function createSignin() {
    const signin = new SigninComponent(application);
    signin.render(createProfile);
}

function createProfile() {

    //  fetch срабатывает не когда загружено все тело ответа (xhr), а когда пришли только заголовки.
    fetch('/api/profile', {
        method: 'GET',
        credentials: 'include',
    })
    //  в объекте response есть множество методов, возвращающие тело ответа,
    //  когда оно дойдет, которые могут сразу его распарсить
        .then(response => {
            console.log("response: ");
            console.dir(response);
            if (response.status >= 300) {
                throw Error(`Неверный статус: ${response.status}`);
            }
            return response.json();
        })
        .then(json => {
            console.log("json: ");
            console.dir(json);
            const profile = new ProfileComponent(application);
            profile.setData(json);
            profile.render();
        })
        .catch(err => {
            console.log("err: ");
            console.dir(err);
            console.error(err);
            createSignin();
        })
}

function createAbout() {
    const about = new AboutComponent(application);
    about.render();
}

function createPoster() {
    const poster = new PosterComponent(application);
    poster.render();
}

function signout() {
    AjaxModule.doGet({
        url: '/api/signout',
        body: null,
        callback: createSignin
    });
}

function createFilmpage() {
    AjaxModule.doGet({
        url: '/api/layout',
        body: null,
        callback: (status, response) => {
            if (status === 200) {
                try {
                    const responseBody = JSON.parse(response);
                    const filmpage = new FilmpageComponent(application);
                    filmpage.setData(responseBody);
                    filmpage.render();
                } catch (e) {
                    console.log("ERROR::createFilmpage")
                    console.log(e)
                }
            }
        }
    })
}

const routerMap = {
    signup: createSignup,
    signin: createSignin,
    profile: createProfile,
    about: createAbout,
    poster: createPoster,
    signout: signout,
    film: createFilmpage
};

application.addEventListener('click', function (evt) {
    const {target} = evt;
    if (target instanceof HTMLAnchorElement) {
        evt.preventDefault();
        routerMap[target.dataset.section]();
    }
});

createPoster();