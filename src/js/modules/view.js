import Validation from '../modules/validate';

export class View {
    constructor (root, template, globalEventBus) {
        this._root = root;
        this._globalEventBus = globalEventBus;
        this._template = template;
        this.isViewClosed = true;
    }

    static _addInputError (input, error, msg = '') {
        if (input) {
            input.classList.add('input_invalid');
        }
        if (error) {
            error.classList.add('error_active');
            error.innerHTML = msg;
        }
    };

    static _validateObligatoryInputs (inputs = {}) {
        let wasfail = false;
        if (inputs) {
            inputs.forEach(input => {
                let error = input.nextElementSibling;
                if (Validation.isEmptyField(input.value)) {
                    this._addInputError(input, error, 'Обязательное поле');
                    wasfail = true;
                } else {
                    this._removeInputError(input, error);
                }
            });
        }
        return wasfail;
    }

    static _removeInputError (input, error) {
        if (input) {
            input.classList.remove('input_invalid');
        }
        if (error) {
            error.classList.remove('error_active');
            error.innerHTML = '';
        }
    }

    render (data) {
        this._root.innerHTML = this._template(data);
        this.isViewClosed = false;

        this.onRender();
    }

    onRender () {

    }

    hide() {
        this._root.innerHTML = '';
        this.isViewClosed = true;
    }

    merge (data) {
        this._data = { ...this._data, ...data };
    }
}
