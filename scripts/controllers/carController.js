/// <reference path="../../typings/index.d.ts" />

import 'jquery';
import { carModule } from '../models/car.js';

let carControler = function () {
    function CreateCarByMainDetails() {
        return new Promise((resolve, reject) => {
            let $form = $('#add-new-car'),
                brand = $form.find('#brand').val(),
                model = $form.find('#model').val(),
                year = $form.find('#year').val(),
                seats = $form.find('#seats').val(),
                fuel = $form.find('#fuel').val(),
                imgLink = $form.find('#link').val();

            let car = carModule.createCar(brand, model, year, seats, fuel, imgLink);

            addExtras(car);
            resolve(car);
        });
    }

    function addExtras(car) {
        let $form = $('#add-new-car'),
            extrasToAdd = {
                insuarance: $("input[value='insuarance']").is(':checked'),
                leather: $("input[value='leather']").is(':checked'),
                automatic: $("input[value='authomatic']").is(':checked'),
                gps: $("input[value='gps']").is(':checked'),
                clima: $("input[value='air-condition']").is(':checked'),
                quatro: $("input[value='quatro']").is(':checked')
            };

        car.extras = extrasToAdd;
    }

    return {
        createCar: CreateCarByMainDetails
    };
} ();

export { carControler };