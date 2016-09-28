/// <reference path="../typings/index.d.ts" />

import { login } from './login-register.js';
import { compile } from '../utils/template.js';

const router = new Navigo(null, false),
        content = $('#content'),
        formContainer = $('#form-container'),
        $header = $('#header');

router
    .on('/home', () => {
        formContainer.html('');
        content.html('');
    })
    .on('/login', () => {
        compile.compileTemplate('login')
            .then((temp) => {
                formContainer.html(temp);
            });
    })
    .on('/loggin-user', () => {
        login.getLoggedUserData()
            .then(login.showLoggedUser)
            .then(() => {
                router.navigate('/home');
            });
    })
    .on('/register', () => {
        compile.compileTemplate('register')
            .then((temp) => {
                formContainer.html(temp);
            });
    })
    .on('/add-car', () => {
        console.log("Add car");
    })
    .resolve();

$header.on('click', '#sign-in-btn', () => {
    router.navigate('/loggin-user');
});

$header.on('click', '#logout-user', () => {
    login.logoutUser()
            .then(() => {
                router.navigate('/home');
            });
});