import { login } from './userController.js';
import { compile } from '../../utils/template.js';
import { users } from '../../db/db.js';

let content = $('#content'),
    formContainer = $('#form-container');

let PageController = function () {
    function showStartupPage() {
        return new Promise((resolve, reject) => {
            formContainer.html('');
            content.html('');
            let username = localStorage.getItem('username-key');
            if (username) {
                login.showLoggedUser({
                    name: username,
                    authKey: localStorage.getItem('authkey-key'),
                    adminRules: users.checkUserForAdminRules(localStorage.getItem('authkey-key'))
                });
            }

            $('#grid-btn').html('View free cars');

            compile.compileTemplate('order')
                .then((temp) => {
                    content.html(temp);
                });
        });
    }

    return {
        showStartupPage
    };
} ();

export {PageController};