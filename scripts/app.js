/// <reference path="../typings/index.d.ts" />

import { login } from './userController.js';
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
    .on('/logginng-user', () => {
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
        compile.compileTemplate('add-car')
            .then((temp) => {
                content.html(temp);
            });
    })
    .resolve();

$header.on('click', '#logout-user', () => {
    login.logoutUser()
            .then(() => {
                router.navigate('/home');
            });
});