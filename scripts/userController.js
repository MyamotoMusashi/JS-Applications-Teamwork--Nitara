import 'jquery';
import 'cryptoJS';
import { userModule } from 'user';
import { users } from 'db';

const USERNAME_STORAGE_KEY = 'username-key';
const AUTHKEY_STORAGE_KEY = 'authkey-key';

let login = (function() {
    
    function getLoggedUserData() {
        return new Promise((resolve, reject) => {
            let email = $('#inputEmail').val(),
                inputPass = $('#inputPassword').val();

            let hashPasword = CryptoJS.SHA1(inputPass).toString();

            users.loginUser(email, hashPasword)
                .then(function (user) {
                    localStorage.setItem(USERNAME_STORAGE_KEY, user.name);
                    localStorage.setItem(AUTHKEY_STORAGE_KEY, user.authKey);
                    resolve(user);
                })
                .catch(err => console.log('Invalid email or password!'));
        });
    }

    function showLoggedUser(user) {
        return new Promise((resolve, reject) => {
            let $container = $('#logged-user'),
                $loginContainer = $('#login-container'),
                html;


            $.get('../templates/logged-user.handlebars', function (data) {
                let template = Handlebars.compile(data);
                html = template(user);
                $container.html(html).css('display', 'block');
            });

            $loginContainer.css('display', 'none');
            resolve($container);
        });
    }

    function showLoggin() {
        let $loggedUserContainer = $('#logged-user'),
            $logginFormContainer = $('#login-container');

        $loggedUserContainer.hide();
        $logginFormContainer.css('display', 'flex');
    }

    function logoutUser($element) {
        return new Promise((resolve, reject) => {
                localStorage.removeItem(USERNAME_STORAGE_KEY);
                localStorage.removeItem(AUTHKEY_STORAGE_KEY);
                showLoggin();
                resolve();
        });
    }

    return {
        getLoggedUserData,
        showLoggedUser,
        logoutUser
    };
}());

export { login };