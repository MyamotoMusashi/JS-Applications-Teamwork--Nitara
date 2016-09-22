import 'jquery';
import {userModule} from 'user';
import {users} from 'db';

let isShowedLogForm = false,
    isShowedRegForm = false;

let $loginBtn = $('#login'),
    $registerBtn = $('#register');

$loginBtn.on('click', function () {
    showHideLogin();
});

$('#form-container').on('click', '#sign-in-btn', function () {
            getLoggedUserData()
                .then(showLoggedUser)
                .then(attachLogoutEvent);
});

$('#login-form').on('click', '#register', function() {
    showHideRegister()
        .then(attachRegisterEvent);
});

function showHideLogin() {
    let url = "../templates/login-template";

    if (isShowedLogForm) {
        $('#form-container').html('');
        isShowedLogForm = false;
    } else {
        $.get(url, function (data) {
            $('#form-container').html(data);
            isShowedLogForm = true;
        });
    }
    
    $('#register').toggleClass('hidden');
}

function showHideRegister() {
    return new Promise((resolve, reject) => {
        let url = "../templates/register-template";

        if (isShowedRegForm) {
            $('#form-container').html('');
            isShowedRegForm = false;
        } else {
            $.get(url, function (data) {
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
            pass = $('#inputPassword').val();

        let logged = users.loginUser(email, pass);
        
        if (logged) {
            resolve(logged);
            console.log('resolved');
        } else {
            let errorMsg = 'Invalid email or password!';
            reject(errorMsg);
        }
    });
}

function attachRegisterEvent() {
    $('#register-btn').on('click', function () {
        return new Promise((resolve, reject) => {
            let email = $('#register-form #inputEmail').val(),
                pass = $('#register-form #inputPassword').val(),
                firstname = $('#register-form #firstName').val(),
                lastname = $('#register-form #lastName').val();

            let user = userModule.createUser(firstname, lastname, pass, email);
            users.registerUser(user);

            resolve();
        });
    });
}

function showLoggedUser(user) {
    return new Promise((resolve, reject) => {
        let $container = $('#logged-user'),
            $loginContainer = $('#login-container'),
            html;


        $.get('../templates/logged-user-template', function (data) {
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
        $element.on('click', '#logout-user', function () {
        showLoggin();
        resolve();
        });
    });
}