import {SigninComponent} from './components/Signin/Signin.js';
import {SignupComponent} from './components/Signup/Signup.js';
import {ProfileComponent} from './components/Profile/Profile.js';
import {AboutComponent} from './components/About/About.js';
import {PosterComponent} from './components/Poster/Poster.js';
import {FilmpageComponent} from "./components/Filmpage/Filmpage.js";

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
	AjaxModule.doGet({
		url: '/api/profile',
		body: null,
		callback: function (status, responseText) {
			if (status === 200) {
				try {
					const responseBody = JSON.parse(responseText);
					const profile = new ProfileComponent(application);
					profile.setData(responseBody);
					profile.render();
				}
				catch (err) {
					console.log(err);
					return;
				}
			} else {
				createSignin();
			}
		}
	});
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
	const filmpage = new FilmpageComponent(application);
	filmpage.render();
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

