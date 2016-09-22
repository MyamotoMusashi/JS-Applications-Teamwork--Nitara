import 'jquery';
import {userModul} from 'user';
import {carModule} from 'car';
import {users} from 'db';

let isShowedLogForm = false;

let $loginBtn = $('#login');
$loginBtn.on('click', function () {
    let url = "../templates/login-template";
    $.get(url, function (data) {
        if (isShowedLogForm) {
            $('#form-container').html('');
            isShowedLogForm = false;
        } else {
            $('#form-container').html(data);
            isShowedLogForm = true;

            // if login form is shown, attach event to sign in button.
            attachedSignEvent();
        }
        $('#register').toggleClass('hidden');
    });
});

let isShowedRegForm = false;

let $registerBtn = $('#register');
$registerBtn.on('click', function () {
    let url = "../templates/register-template";
    $.get(url, function (data) {
        if (isShowedRegForm) {
            $('#form-container').html('');
            isShowedRegForm = false;
            $('#register').toggleClass('hidden');
        } else {
            $('#form-container').html(data);
            isShowedRegForm = true;

            // if register form is shown, attach event to register button.
            attachRegisterEvent();
        }
    });
});

// Attach click event for sign in button and gets data from input fields.
function attachedSignEvent() {
    $('#sign-in-btn').on('click', function () {
        let email = $('#inputEmail').val(),
            pass = $('#inputPassword').val();

        let logged = users.loginUser(email, pass);

        showLoggedUser(logged);

    });
}

// Attach click event for register button and register user with data from input fields.
function attachRegisterEvent() {
    $('#register-btn').on('click', function () {
        let email = $('#register-form #inputEmail').val(),
            pass = $('#register-form #inputPassword').val(),
            firstname = $('#register-form #firstName').val(),
            lastname = $('#register-form #lastName').val();

        let user = userModul.createUser(firstname, lastname, pass, email);
        users.registerUser(user);
    });
}

function showLoggedUser(user) {
    let $container = $('#logged-user'),
        $loginContainer = $('#login-container'),
        html;
    console.log(user);
    $.get('../templates/logged-user-template', function(data){
        let template = Handlebars.compile(data);
        html = template(user);
        console.log(html);
        $container.html(html).toggleClass('hidden');
    });

    $loginContainer.css('display', 'none');
}