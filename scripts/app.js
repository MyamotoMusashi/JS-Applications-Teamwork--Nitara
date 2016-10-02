/// <reference path="../typings/index.d.ts" />

import { formValid } from './models/formValidation.js';
import { login, register } from './controllers/userController.js';
import { carControler } from './controllers/carController.js';
import { compile } from '../utils/template.js';
import { users, cars } from '../db/db.js';
import { grid } from './test.js';
import {PageController} from './controllers/pageController.js';

window.onload = function() {
    window.location = '#/home';
}();

const router = new Navigo(null, false),
    content = $('#content'),
    formContainer = $('#form-container'),
    $header = $('#header');

let isGridShowed = false;

router
    .on('/home', () => {
        PageController.showStartupPage();
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
            })
            .catch((err) => {
                console.log(err);
                router.navigate('/login');
            });
    })
    .on('/register', () => {
        compile.compileTemplate('register')
            .then((temp) => {
                formContainer.html(temp);
            });
    })
    .on('/registration', () => {
        register.registerUser()
            .then(() => router.navigate('/login'))
            .catch((err) => {
                console.log(err);
                router.navigate('/register');
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
            .catch(console.log)
            .then(() => {
                router.navigate('/home');
            });
    })
    .on('/cars-gallery', () => {
            grid.createGridContainer()
                .then(grid.showGrid)
    })
    .on('/quick-rent', () => {
        $.get('../templates/quick-rental-form.handlebars', (html) => {
            content.html(html);
        });
    })
    .on('/add-new-order', () => {
        $('#succes-submit').removeClass('hidden');

        setTimeout(function() {
            router.navigate('/home');
        }, 1500);
    })
    .on('/sortBy/:sortingType', (param) => {
        let pageIndex = $('#grid-container').attr('data-index') - 1;
        grid.showGrid(pageIndex, param.sortingType);
    })
    .resolve();

$header.on('click', '#logout-user', () => {
    login.logoutUser()
        .then(() => {
            router.navigate('/home');
        });
});

$header.on('click', '#register-btn', () => {
    if (formValid.validate()) {
        router.navigate('/registration');
    }
});

content.on('click', '#hide-grid', () => {
        router.navigate('/home');
});

content.on('click', '#btn-page', function () {
    let pageIndex = $(this).attr('data-index') - 1;
    showGrid(pageIndex);
});

content.on('click', '#show-available-cars', function () {
    router.navigate('/cars-gallery');
});