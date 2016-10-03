/// <reference path="../typings/index.d.ts" />

import { formValid } from './models/formValidation.js';
import { login, register } from './controllers/userController.js';
import { carControler } from './controllers/carController.js';
import { compile } from '../utils/template.js';
import { users, cars,orders } from '../db/db.js';
import { grid } from './gridLoader.js';
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
    .on('/view-active-orders', () => {
        orders.getAllOrders()
        .then((orders) => {
            let promise = new Promise((resolve) => {
                let promises = [];
                for(var i = 0; i < orders.result.length; i+=1){
                    var p = (new Promise((resolve) => {let order = orders.result[i];
                        let promise2 = Promise.all([cars.getCarById(order.CarID),users.getUserById(order.UserID)])
                        .then((values) =>{
                            order.CarDetails = values[0].result;
                            order.UserDetails = values[1].result;
                        })
                        .then(() => resolve())
                    }))
                    promises.push(p)
                }

                Promise.all(promises).then(() => resolve(orders))
            })
            .then((orders) => {
                $.get('../templates/view-active-orders.handlebars', (template) =>{
                    let templateScript = Handlebars.compile(template),
                        html = templateScript(orders.result);
                    content.html(html);
                });
            })           
        })
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

content.on('click', '.btn-rent', function(){
    console.log("ivan");
})