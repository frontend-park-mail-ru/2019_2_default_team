import Network from "../modules/network";
import Api from "../modules/api";

export class ProfileModel {
    constructor(eventBus){
        this._eventBus = eventBus;

        this._eventBus.subscribeToEvent('loadProfile', this._onLoadProfile.bind(this));
        this._eventBus.subscribeToEvent('saveAvatar', this._onSaveAvatar.bind(this));
        this._eventBus.subscribeToEvent('saveProfile', this._onSaveProfile.bind(this));
    }

    _onLoadProfile () {
        Api.getProfileInfo()
            .then(res => {
                if (res.ok) {
                    res.json().then(data => {
                        data.profile.path_to_img= `${Network.getServerUrl()}/${data.profile.path_to_img}`;
                        this._eventBus.triggerEvent('loadProfileSuccess', data);
                    });
                } else {
                    this._eventBus.triggerEvent('loadProfileFailed');
                }
            })
            .catch(error => {
                console.error(error);
            });
    }

    _onSaveProfile (profile, role) {
            Api.editProfile(profile)
                .then(this._onResponse.bind(this))
                .catch(err => {
                    console.error(err);
                });
    }

    _onResponse (res) {
        if (res.ok) {
            this._eventBus.triggerEvent('saveProfileSuccess');
        } else {
            res.json().then(data => this._eventBus.triggerEvent('saveProfileFailed', data));
        }
    }

    _onSaveAvatar (avatar) {
        Api.editAvatar({ avatar })
            .then(res => {
                if (res.ok) {
                    this._eventBus.triggerEvent('saveAvatarSuccess');
                } else {
                    res.json().then(data => {
                        this._eventBus.triggerEvent('saveAvatarFailed', data);
                    });
                }
            })
            .catch(err => {
                console.error(err);
            });
    }
}