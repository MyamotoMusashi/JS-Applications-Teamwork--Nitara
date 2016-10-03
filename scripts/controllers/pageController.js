import { login } from './userController.js';
import { compile } from '../../utils/template.js';
import { users, cars } from '../../db/db.js';

let content = $('#content'),
    formContainer = $('#form-container');

let PageController = function () {
    function showStartupPage() {
        return new Promise((resolve, reject) => {
            logUser()
                .then(clearContent)
                .then(showGridButtons)
                .then(showStartupGrid);
        });
    }
    function logUser() {
        return new Promise((resolve, reject) => {
            let username = localStorage.getItem('username-key');
            if (username) {
                login.showLoggedUser({
                    name: username,
                    authKey: localStorage.getItem('authkey-key'),
                    adminRules: users.checkUserForAdminRules(localStorage.getItem('authkey-key'))
                });
            }
            resolve();
        });
    }

    function clearContent() {
        formContainer.html('');
        content.html('');
    }

    function showGridButtons() {
        return new Promise((resolve, reject) => {
            $('#grid-btn').html('View free cars');

            compile.compileTemplate('order')
                .then((temp) => {
                    content.html(temp);
                    resolve();
                });
        });
    }

    function showStartupGrid() {
        let $gridContainer = $('#content').find('#grid-container');

        if (!$gridContainer.length) {
            $gridContainer = $('<div id="grid-container"></div>');
        }

        let showedCarsInGrid = 12,
            sortingType = 'Brand';

        Promise.all([cars.getAllFreeCars(), $.get('../templates/grid-gallery.handlebars')])
            .then(([cars, data]) => {
                let carsLen = cars.length;
                cars = getRandomCars(cars, 3);

                cars = sortByKey(cars, sortingType);
                
                let template = Handlebars.compile(data);
                let html = template(cars);
                $gridContainer.html(html);
                $('#content').append($gridContainer);
            });
    }

    function getRandomCars(carsArr, numberOfCars) {
        numberOfCars = numberOfCars || 3;
        let randomCars = [];
        if (numberOfCars >= carsArr.length) {
            numberOfCars = carsArr.length / 2;
        }

        for (let i = 0; i < numberOfCars; i += 1) {
            let randomCarIndex = (Math.random() * carsArr.length) | 0;
            randomCars.push(carsArr.splice(randomCarIndex, 1)[0]);
        }

        return randomCars;
    }

    function sortByKey(array, key) {
        return array.sort(function (a, b) {
            var x = a[key];
            var y = b[key];
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
    }

    return {
        showStartupPage
    };
} ();

export {PageController};