import {MenuComponent} from '/components/Menu/Menu.js';

export class SigninComponent {
    constructor(parent = document.body) {
		this._parent = parent;
		this._data = {};
    }

    getData() {
        return this._data;
    }

    setData(dataToSet = {}) {
        this._data = {...dataToSet};
	}

    render(callback = noop) {
        const menu = new MenuComponent(this._parent);
		menu.render();
		
        const form = document.createElement('form');

		const emailInput = document.createElement('input');
		emailInput.type = 'email';
		emailInput.placeholder = 'Введите Ваш email';
	
		const passwordInput = document.createElement('input');
		passwordInput.type = 'password';
		passwordInput.placeholder = 'Введите Ваш пароль';
	
		const submitBtn = document.createElement('input');
		submitBtn.type = 'submit';
		submitBtn.value = 'Войти';
	
		form.appendChild(emailInput);
		form.appendChild(passwordInput);
		form.appendChild(submitBtn);
		form.addEventListener('submit', function(e) {
			e.preventDefault();
	
			const email = emailInput.value.trim();
			const password = passwordInput.value.trim();
	
			AjaxModule.doPost({
				url: '/signin',
				body: {email, password},
				callback: function (status, response) {
					if (status === 200) {
						callback();
					} else {
						const {error} = JSON.parse(response);
						alert(error);
					}
				}
			});
		});
		this._parent.append(form);
	}
}