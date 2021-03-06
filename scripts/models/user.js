import {UserValidator as validator} from './userValidations.js';

let userModule = (function () {

    class User {
        constructor(firstname, lastname, password, email) {
            this.firstname = firstname;
            this.lastname = lastname;
            this.password = password;
            this.email = email;
        }

        get firstname() {
            return this._firstname;
        }

        set firstname(value) {
            validator.validateName(value, 'User firstname param');
            this._firstname = value;
        }

        get lastname() {
            return this._lastname;
        }

        set lastname(value) {
            validator.validateName(value, 'User lastname param');
            this._lastname = value;
        }

        get password() {
            return this._password;
        }

        set password(value) {
            validator.validatePassword(value);

            this._password = value;
        }
    }

    function createUser(firstname, lastname, password, email) {
        return new User(firstname, lastname, password, email);
    }

    return {
        createUser
    }
} ());

export {userModule};