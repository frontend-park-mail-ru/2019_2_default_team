/**
 *  Router
 *  @class
 *  @type Router
 */

export default class Router {

    /** Router constru  ctor
     * @constructor
     * @param {Element} root
     */

    constructor(root) {
        this.root = root;
        this.routes = new Map();
        this.currentPath = null;
    }

    /**
     * Router start
     * @listens onclick
     * @listens onpopstate
     */
    start() {
        window.addEventListener('popstate', () => {
            this.route(window.location.pathname, window.location.search);
        });
        this.root.addEventListener('click', (event) => {
            if (event.target.tagName === 'A' && event.target.hostname === location.hostname) {
                event.preventDefault();
                this.route(event.target.pathname, event.target.search);
            }
        });
        this.route(window.location.pathname, window.location.search);
    }

    /**
     * Return to start page
     */
    startPage() {
        this.route("/");
    }

    /**
     * Add route
     * @method
     * @param {string} path
     * @param {View} view
     * @param {Object} data
     */
    add(path, view, data = {}) {
        this.routes.set(path, {view: view, data: data});
    }

    /**
     * Route
     * @method
     * @param {string} path
     * @param {string} searchParams
     */
    route(path, searchParams = '') {
        if (this.currentPath === path + searchParams) {
            return;
        }

        const currentData = this.routes.get(this.currentPath);
        if (currentData) {
            currentData.view.close();
            currentData.view.hide();
        }

        if (window.location.href !== path + searchParams) {
            window.history.pushState(null, null, path + searchParams);
        }

        const route = this.routes.get(path);
        route.data = {};
        if (searchParams !== '') {
            const urlSearchRarams = new URLSearchParams(searchParams);
            urlSearchRarams.forEach((value, name) => {
                route.data[name] = value;
            });
        }

        this.currentPath = path + searchParams;
        route.view.render(route.data);
    }
}