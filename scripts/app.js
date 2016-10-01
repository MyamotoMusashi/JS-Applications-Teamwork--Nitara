/// <reference path="../typings/index.d.ts" />

import { login } from './controllers/userController.js';
import { carControler } from './controllers/carController.js';
import { compile } from '../utils/template.js';
import { cars } from '../db/db.js';
import { grid } from './test.js';

window.onload = function () {
    window.location = '#/home';
} ();

const router = new Navigo(null, false),
    content = $('#content'),
    formContainer = $('#form-container'),
    $header = $('#header');

let isGridShowed = false;

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
        
            grid.createGridContainer()
                .then(grid.showGrid)
                .then(() => {
            $('#grid-btn').html('Hide gallery');
        });
        
        
    })
    .resolve();

$header.on('click', '#logout-user', () => {
    login.logoutUser()
        .then(() => {
            router.navigate('/home');
        });
});

content.on('click', '#hide-grid', () => {
        $('#grid-btn').html('View free cars');
        router.navigate('/home');
});

content.on('click', '#btn-page', function () {
    let pageIndex = $(this).attr('data-index') - 1;
    showGrid(pageIndex);
});
