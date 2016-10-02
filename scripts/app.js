/// <reference path="../typings/index.d.ts" />

import { login } from './controllers/userController.js';
import { carControler } from './controllers/carController.js';
import { compile } from '../utils/template.js';
import { cars } from '../db/db.js';
import { grid } from './test.js';

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
        formContainer.html('');
        content.html('');

        $('#grid-btn').html('View free cars');

        compile.compileTemplate('order')
            .then((temp) => {
                content.html(temp);
            });
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
        console.log(param);
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