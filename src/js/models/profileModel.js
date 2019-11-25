import Api  from '../modules/api';
import Net from '../modules/network';
import { PROFILE } from '../modules/events';

export class ProfileModel {
    setGlobalEventBus (globalEventBus) {
        this._globalEventBus = globalEventBus;

        this._globalEventBus.subscribeToEvent(PROFILE.loadProfile, this._onLoadProfile.bind(this));
        this._globalEventBus.subscribeToEvent(PROFILE.saveProfile, this._onSaveProfile.bind(this));
        this._globalEventBus.subscribeToEvent(PROFILE.saveAvatar, this._onSaveAvatar.bind(this));
    }

    _onLoadProfile () {
        console.log("LOAD PROFILE");
        Api.getProfileInfo(1)
            .then(res => {
                if (res.ok) {
                    res.json().then(data => {
                        data.profile.path_to_img = `${Net.getServerUrl()}/${data.profile.path_to_img}`;
                        this._globalEventBus.triggerEvent(PROFILE.loadProfileSuccess, data);
                    });
                } else {
                    this._globalEventBus.triggerEvent(PROFILE.loadProfileFailed);
                }
            })
            .catch(error => {
                console.error(error);
                //УБРАТЬ ПОСЛЕ КОНЕКТА К БЕКУ!!!!
                this._globalEventBus.triggerEvent(PROFILE.loadProfileSuccess, {});
            });
    }

    _onSaveProfile (profile, role) {
    }

    _onResponse (res) {
        if (res.ok) {
            this._globalEventBus.triggerEvent(PROFILE.saveProfileSuccess);
        } else {
            res.json().then(data => this._globalEventBus.triggerEvent(PROFILE.saveProfileFailed, data));
        }
    }

    _onSaveAvatar (avatar) {
        Api.editAvatar({ avatar })
            .then(res => {
                if (res.ok) {
                    this._globalEventBus.triggerEvent(PROFILE.saveAvatarSuccess);
                } else {
                    res.json().then(data => {
                        this._globalEventBus.triggerEvent(PROFILE.saveAvatarFailed, data);
                    });
                }
            })
            .catch(err => {
                console.error(err);
            });
    }
}

export default new ProfileModel();
