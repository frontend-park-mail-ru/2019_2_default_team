const pathsWithId = [
    '/profile',
    '/poster',
    '/films'
];

export class Router {
    constructor (root) {
        this.root = root;
        this.routes = new Map();

        this.currentRoute = null;

        window.onpopstate = _ => {
            if (window.location.pathname) {
                this.route({ path: window.location.pathname, addToHistory: false });
            }
        };

    }

    /**
     * To path with data
     * @param {String} path
     * @param {Object} data
     */
    redirect (path, data = {}) {
        this.route({ path, data, addToHistory: true });
    }

    /**
     * Add controller to path
     * @param {String} path
     * @param {Controller} controller
     */
    add (path, controller) {
        this.routes.set(path, controller);
    }

    route ({ path, data = {}, addToHistory = true } = {}) {
        const currentController = this.routes.get(this._getRoutePath(this.currentRoute));
        if (currentController) {
            currentController.close();
        }

        if (addToHistory) {
            window.history.pushState(null, null, path);
        }

        const pathWithoutParameters = path.split('?')[0];
        console.log(pathWithoutParameters);
        const routePath = this._getRoutePath(pathWithoutParameters);

        if (this.routes.has(routePath)) {
            const controller = this.routes.get(routePath);

            if (pathsWithId.find(el => el === routePath)) {
                let id = this._extractIdFromPath(path);
                data = { id, ...data };
            }
            console.log('router-> render(data)', data);
            this.currentRoute = path;
            controller.openWithData(data);

        } else {
            if (this.routes.has(pathWithoutParameters)) {
                const controller = this.routes.get(pathWithoutParameters);
                console.log('router-> render(data)', data);
                this.currentRoute = path;
                controller.openWithData(data);
            }
            //Error 404
        }
    }

    /**
     * Route
     * @param pathWithoutParameters
     * @returns {string}
     * @private
     */
    _getRoutePath (pathWithoutParameters) {
        if (pathWithoutParameters) {
            return '/' + pathWithoutParameters.split('/')[1];
        }
    }

    static _normalizePath (path) {
        return path.charAt(path.length - 1) === '/' && path !== '/' ? path.slice(0, path.length - 1) : path;
    }

    start () {
        window.addEventListener('click', (ev) => {
            if (ev.target.tagName === 'A') {
                ev.preventDefault();
                this.route({ path: Router._normalizePath(ev.target.pathname), addToHistory: true });
            }
        }, true);

        this.route({ path: Router._normalizePath(window.location.pathname), addToHistory: true });
    }

    _extractIdFromPath (path) {
        return path.split('/').pop();
    }
}