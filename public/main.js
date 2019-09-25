import {SigninComponent} from './components/Signin/Signin.js';
import {ProfileComponent} from './components/Profile/Profile.js';
import {AboutComponent} from './components/About/About.js';
import {PosterComponent} from './components/Poster/Poster.js';

const AjaxModule = globalThis.AjaxModule;

const application = document.getElementById('application');

function createSignup() {
	application.innerHTML = '';
	const form = document.createElement('form');

	const emailInput = document.createElement('input');
	emailInput.type = 'email';
	emailInput.name = 'email';
	emailInput.placeholder = 'Емайл';

	const passwordInput = document.createElement('input');
	passwordInput.type = 'password';
	passwordInput.name = 'password';
	passwordInput.placeholder = 'Пароль';

	const ageInput = document.createElement('input');
	ageInput.type = 'number';
	ageInput.name = 'age';
	ageInput.placeholder = 'Возраст';

	const submitBtn = document.createElement('input');
	submitBtn.type = 'submit';
	submitBtn.value = 'Зарегистрироваться!';

	form.appendChild(emailInput);
	form.appendChild(passwordInput);
	form.appendChild(ageInput);
	form.appendChild(submitBtn);

	form.addEventListener('submit', function(e) {
		e.preventDefault();

		const email = form.elements['email'].value;
		const age = parseInt(form.elements['age'].value);
		const password = form.elements['password'].value;

		AjaxModule.doPost({
			url: '/signup',
			body: {email, age, password},
			callback: function (status, responseText) {
				if (status === 201) {
					createProfile();
					return;
				}
				const {error} = JSON.parse(responseText);
				alert(error);
			}
		});
	});

	const back = document.createElement('a');
	back.href = '/about';
	back.textContent = 'Назад';
	back.dataset.section = 'about';

	application.innerHTML = '';
	application.appendChild(form);
	application.appendChild(back);
}

function createSignin() {
	const signin = new SigninComponent(application);
	signin.render(createProfile);
}

function createProfile() {
	application.innerHTML = '';
	AjaxModule.doGet({
		url: '/profile',
		body: null,
		callback: function (status, responseText) {
			if (status === 200) {
				try {
					const responseBody = JSON.parse(responseText);
					const profile = new ProfileComponent(application);
					profile.data = responseBody;
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

const functions = {
	signup: createSignup,
	signin: createSignin,
	profile: createProfile,
	about: createAbout,
	poster: createPoster,
};

application.addEventListener('click', function (evt) {
	const {target} = evt;
	if (target instanceof HTMLAnchorElement) {
		evt.preventDefault();
		functions[target.dataset.section]();
	}
});

createPoster();

