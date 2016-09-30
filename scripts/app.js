/// <reference path="../typings/index.d.ts" />

import { login } from './controllers/userController.js';
import { carControler } from './controllers/carController.js';
import { compile } from '../utils/template.js';
import { cars } from '../db/db.js';
import { grid } from './grid-plugin.js';

window.onload = function () {
    window.location = '#/home';
} ();

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
    .on('/logging-user', () => {
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
    .on('/add-new-car', () => {
        carControler.createCar()
            .then(cars.addCar)
            .catch(console.log);
    })
    .on('/cars-gallery', () => {
        grid.showGrid();
        
        $('#grid-btn').html('Hide gallery');
    })
    .resolve();

$header.on('click', '#logout-user', () => {
    login.logoutUser()
        .then(() => {
            router.navigate('/home');
        });
});