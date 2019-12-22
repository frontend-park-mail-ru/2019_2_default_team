const pathsWithId = [
    '/profile',
    '/poster',
    '/film'
];

export class Router {
    constructor (root) {
        this.root = root;
        this.routes = new Map();

        this.currentRoute = null;
        // window.location.search: если мы венулись
        // то в window.location.search наши параметры лежат, которые нам нужны для поиска
        window.onpopstate = _ => {
            if (window.location.pathname) {
                this.route({ path: `${window.location.pathname}${window.location.search}`, addToHistory: false });
            }
        };

    }

    /**
     * Переход на страницу path с нужными даннами data для неё
     * @param {String} path
     * @param prevState
     * @param {Object} data
     */
    redirect ( path, data = {}, prevState = {}) {
        this.route({ path, data, prevState, addToHistory: true });
    }

    /**
     * Добавление на path нужный controller
     * @param {String} path
     * @param {Controller} controller
     */
    add (path, controller) {
        this.routes.set(path, controller);
    }

    route ({ path, data = {}, prevState = {}, addToHistory = true } = {}) {
        // Добаввляем в историю перед переходом
        if (addToHistory) {
            window.history.pushState(prevState, null, path);
        }

        // Получаем текущий контроллер и закрываем его
        let currentController = this.routes.get(this._getRoutePath(this.currentRoute));
        if (currentController) {
            currentController.close();
        }

        //получаем корневой путь
        const routePath = this._getRoutePath(path);
        if (this.routes.has(routePath)) {
            // получаем назначенного контроллера
            const controller = this.routes.get(routePath);

            //Роутинг для /<root>/{id}
            if (pathsWithId.find(el => el === routePath)) {
                let id = this._extractIdFromPath(path);
                data = { id, ...data };
            }

            this.currentRoute = path;
            // переход на страницу
            controller.openWithData(data);
        } else {
            //Error 404 Page Not Found
        }
    }

    /**
     * Получает первичный маршрут для роутинга
     * @param path
     * @returns {string|null}
     * @private
     */
    _getRoutePath (path) {
        if (path) {
            return '/' + (path.split('&')[0]).split('/')[1];
        }
    }

    start () {
        // вешаем обработчик на переход по ссылкам
        window.addEventListener('click', (ev) => {
            if (ev.target.tagName === 'A') {
                ev.preventDefault();

                if (ev.target.pathname === '/') {
                    localStorage.removeItem('role');
                }

                this.route({ path: ev.target.pathname, addToHistory: true });
            }
        }, true);

        window.addEventListener('offline', ev => {
            console.log('OFFLINE');
            this.redirect({ path: '/offline' });
        });

        window.addEventListener('online', ev => {
            console.log('ONLINE');
            window.history.back();
        });

        // при перезагрузке страницы у нас уже есть история и страница в истории,
        // поэтому мы её повторно не должны записывать в историю, но если нет то запишем
        if (window.history.length == 0) {
            this.route({ path: window.location.pathname, addToHistory: true });
        } else {
            // window.location.search: если мы перезагрузилистраницу,
            // то в window.location.search наши параметры лежат, которые нам нужны для поиска
            this.route({ path: `${window.location.pathname}${window.location.search}`, addToHistory: false });
        }
    }

    _extractIdFromPath (path) {
        return path.split('/').pop();
    }

    back () {
        window.history.back();
    }
}
