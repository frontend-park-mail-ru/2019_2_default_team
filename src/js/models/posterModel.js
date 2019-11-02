import api from "../modules/api";

export class PosterModel {
    constructor(eventBus){
        this._eventBus = eventBus;

        this._eventBus.subscribeToEvent('loadPage', this._loadPage.bind(this))
    }

    _loadPage(id){
        api.getPageFilms(id).then(response => {
            if (response.ok) {
                response.json().then(data => {
                    this._eventBus.triggerEvent('loadSuccess', data);
                });
            } else {
                response.json().then(data => {
                    this._eventBus.triggerEvent('loadFailed', data);
                })
            }
        })
            .catch(error => {
                console.error(error);
            })
    }
}