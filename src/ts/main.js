import {SigninComponent} from '../components/Signin/Signin.js';
import {SignupComponent} from '../components/Signup/Signup.js';
import {ProfileComponent} from '../components/Profile/Profile.js';
import {AboutComponent} from '../components/About/About.js';
import {PosterComponent} from '../components/Poster/Poster.js';
import {FilmpageComponent} from "../components/Filmpage/Filmpage.js";

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
	AjaxModule.doPromiseGet({
		url: '/api/profile',
		body: null
	})
		.then(function (obj) {
			const { responseText } = obj;
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
		})
		.catch(function (obj) {
			if (obj instanceof Error) {
				console.error(obj);
				return;
			}
			else {
				alert("Хэй, я вас не звал! Идите на страницу авторизации.");
			}
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
			if(status === 200) {
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
	const { target } = evt;
	if (target instanceof HTMLAnchorElement) {
		evt.preventDefault();
		routerMap[target.dataset.section]();
	}
});

createPoster();