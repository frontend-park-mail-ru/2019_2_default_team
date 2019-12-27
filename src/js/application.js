import {Router} from './modules/router';
import {EventBus} from './modules/eventbus';
import '../css/main.css';

import PosterModel from './models/posterModel'
import FilmModel from "./models/filmModel";
import LoginModel from './models/authModel';
import ProfileModel from './models/profileModel';
import PopupModel from "./models/popupModel";
import MenuModel from "./models/menuModel"
import SearchModel from "./models/searchModel"

import {AUTH, FILM, PROFILE, CINEMA, FILTER, POPUP, ACTIONS} from "./modules/events";

import {MenuController} from "./controllers/menuController";
import {PosterController} from "./controllers/posterController";
import {FilmpageController} from "./controllers/filmController";
import {AboutController} from "./controllers/aboutController";
import {LoginController} from "./controllers/loginController";
import {RegisterController} from "./controllers/registerController";
import {ProfileController} from "./controllers/profileController";
import {PopupController} from "./controllers/popupController";
import {LogoutController} from "./controllers/logoutController";
import {FilterController} from "./controllers/filterController";
import {SearchController} from "./controllers/searchController";


function renderHTML () {
    let metaViewport = document.createElement('meta');
    metaViewport.name = 'viewport';
    metaViewport.content = 'width=device-width, initial-scale=1';
    document.head.appendChild(metaViewport);

    const body = document.querySelector('body');
    body.classList.add('page');

    body.innerHTML = `
      <header class="header"></header>
      <div class="main-content"></div>
      <div id="mainLayer" class="main-content"></div>
      <div id="middleLayer" class="middle-layer"></div>
      <div id="popupLayer" class="frame-content"></div>
  `;
  }

document.addEventListener('DOMContentLoaded', () => {
   renderHTML();

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js')
            .then((reg) => {
                // регистрация сработала
                console.log('Registration succeeded. Scope is ' + reg.scope);
            }).catch((error) => {
            // регистрация прошла неудачно
            console.log('Registration failed with ' + error);
        });
    }
    const body = document.querySelector('.page');
    const header = document.querySelector('header');
    const content = document.querySelector('.main-content');
    const frame = document.querySelector('.frame-content');
    const globalEventBus = new EventBus([AUTH, PROFILE, FILM, CINEMA, FILTER, POPUP, ACTIONS].map(model => Object.values(model)).flat());
    const models = {
        poster: PosterModel,
        film: FilmModel,
        login: LoginModel,
        profile: ProfileModel,
        popup: PopupModel,
        menu: MenuModel,
        search: SearchModel,
    };
    Object.values(models).forEach(model => model.setGlobalEventBus(globalEventBus));

    const router = new Router(body);

    const menuController = new MenuController(header, globalEventBus, router);
    const posterController = new PosterController(content, globalEventBus, router);
    const filmController = new FilmpageController(content, globalEventBus, router);
    const aboutController = new AboutController(content,globalEventBus,router);
    const loginController = new LoginController(content, globalEventBus, router);
    const registerController = new RegisterController(content, globalEventBus, router);
    const profileController = new ProfileController(content, globalEventBus, router);
    const popupController = new PopupController(frame, globalEventBus, router);
    const logoutController = new LogoutController(content, globalEventBus, router);
    const filterController = new FilterController(content, globalEventBus, router);
    const searchController = new SearchController(content, globalEventBus, router);

    menuController.openWithData();
    router.add('/', posterController);
    router.add('/film', filmController);
    router.add('/about', aboutController);
    router.add('/login', loginController);
    router.add('/register', registerController);
    router.add('/profile', profileController);
    router.add('/filmoverlay', popupController);
    router.add('/search', searchController);
    router.add('/allfilms', posterController);
    router.start();

    globalEventBus.subscribeToEvent(ACTIONS.goTo, (info) => {
        router.redirect({ path: info.path, data: info.data });
    });

});
