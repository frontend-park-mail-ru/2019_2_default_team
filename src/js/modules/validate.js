const errEmailIsInvalid = 'Invalid email';
const errInvalidPasswordData =
    'Password must have: 8 symbols, 1 numeral, 1 upper case letter and 1 lowercase.';
const emailRegexExp = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
const passRegexExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.{8,})/;
const validImageSize = 15 * (1 << 20);
const errImageExtensionIsInvalid = 'Image extension is not valid';
const errImageSizeIsNotValid = 'Image size must be less than 15 MB';

export default class Validation {
    /**
     * Валидирует email.
     * @param email
     * @param withRegex - flag
     * @returns {string}  if not valid => false.
     */
    static validateEmail(email, withRegex = false) {
        if (!email || (withRegex && !Validation.validateEmailRegex(email))) {
            return errEmailIsInvalid;
        }
    }

    /**
     * Валидирует пароль.
     * @param password
     * @param withRegex - flag (если true - то пароль проверяется Regex на валидность)
     * @returns {string} если не валидный пароль, возвращает ошибку.
     */
    static validatePassword(password, withRegex = false) {
        if (!password || (withRegex && !Validation.validatePassRegex(password))) {
            return errInvalidPasswordData;
        }
    }

    /**
     * Validate email.
     * @param email
     * @returns {boolean}
     */
    static validateEmailRegex(email) {
        return emailRegexExp.test(String(email).toLowerCase());
    }

    /**
     * Validate, password must have: 8 symbols, 1 numeral, 1 upper case letter and 1 lowercase.
     * @param pass
     * @returns {boolean}
     */
    static validatePassRegex(pass) {
        return passRegexExp.test(String(pass));
    }

    /**
     * Empty check.
     * @param value
     * @returns {boolean}
     */
    static isEmptyField(value) {
        return value === '';
    }

    /**
     * Validate extension and size of image.
     * @param avatar
     * @returns {string}
     */
    static validateAvatar(avatar) {
        const validExtensions = new Set(['gif', 'png', 'bmp', 'jpeg', 'jpg']);
        const extension = avatar.name.substring(avatar.name.lastIndexOf('.') + 1).toLowerCase();
        if (!validExtensions.has(extension)) {
            return errImageExtensionIsInvalid;
        }

        if (avatar.size > validImageSize) {
            return errImageSizeIsNotValid;
        }
    }
}
