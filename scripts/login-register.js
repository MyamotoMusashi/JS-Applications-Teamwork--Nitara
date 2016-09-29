import 'jquery';
import 'cryptoJS';
import 'jquery-validation';
import { userModule } from 'user';
import { users } from 'db';
import {formValid} from 'formValidation';

const USERNAME_STORAGE_KEY = 'username-key';
const AUTHKEY_STORAGE_KEY = 'authkey-key';

let isShowedLogForm = false,
    isShowedRegForm = false;

let $loginBtn = $('#login'),
    $registerBtn = $('#register');

$loginBtn.on('click', function() {
    showHideLogin();
});

$('#form-container').on('click', '#sign-in-btn', function() {
    getLoggedUserData()
        .then(showLoggedUser)
        .then(attachLogoutEvent);
});

$('#login-form').on('click', '#register', function() {
    showHideRegister()
        .then(attachRegisterEvent)
        .then(console.log)
        .catch(console.log);
});

function showHideLogin() {
    let url = "../templates/login.handlebars";

    if (isShowedLogForm) {
        $('#form-container').html('');
        isShowedLogForm = false;
    } else {
        $.get(url, function(data) {
            $('#form-container').html(data);
            isShowedLogForm = true;
            isShowedRegForm = false;
        });
    }

    $('#register').toggleClass('hidden');
}

function showHideRegister() {
    return new Promise((resolve, reject) => {
        let url = "../templates/register.handlebars";

        if (isShowedRegForm) {
            $('#form-container').html('');
            isShowedRegForm = false;
        } else {
            $.get(url, function(data) {
                $('#form-container').html(data);
                isShowedRegForm = true;
                resolve();
            });
        }
    });
}

function getLoggedUserData() {
    return new Promise((resolve, reject) => {
        let email = $('#inputEmail').val(),
            inputPass = $('#inputPassword').val();

        let hashPasword = CryptoJS.SHA1(inputPass).toString();

        users.loginUser(email, hashPasword)
            .then(function(user) {
                localStorage.setItem(USERNAME_STORAGE_KEY, user.name);
                localStorage.setItem(AUTHKEY_STORAGE_KEY, user.authKey);
                resolve(user);
            })
            .catch(err => console.log('Invalid email or password!'));
    });
}

function attachRegisterEvent() {
    $('#register-btn').on('click', function() {
        return new Promise((resolve, reject) => {
            if (!formValid.validate()) {
                return;
            }

            let email = $('#register-form #inputEmail').val(),
                pass = $('#register-form #inputPassword').val(),
                firstname = $('#register-form #firstName').val(),
                lastname = $('#register-form #lastName').val();


            if (!pass.length || pass.length < 8) {
                throw new Error('password must have minimum 8 symbols!');
            }

            let hashPasword = CryptoJS.SHA1(pass).toString();
            let user = userModule.createUser(firstname, lastname, hashPasword, email);
            users.registerUser(user)
                .catch(err => console.log(err))
                .then(console.log);

            resolve('Successfully registred user!');
        });
    });
}

function showLoggedUser(user) {
    return new Promise((resolve, reject) => {
        let $container = $('#logged-user'),
            $loginContainer = $('#login-container'),
            html;


        $.get('../templates/logged-user.handlebars', function(data) {
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

function attachLogoutEvent($element) {
    return new Promise((resolve, reject) => {
        $element.on('click', '#logout-user', function() {
            localStorage.removeItem(USERNAME_STORAGE_KEY);
            localStorage.removeItem(AUTHKEY_STORAGE_KEY);
            showLoggin();
            resolve();
        });
    });
}