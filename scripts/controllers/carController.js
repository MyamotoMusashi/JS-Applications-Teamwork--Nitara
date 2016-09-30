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
                imgLink = $form.find('#link').val(),
                price = $form.find('#price').val();

            let extras = getExtras();

            let car = carModule.createCar(brand, model, year, seats, fuel, imgLink, extras, price);

            resolve(car);
        });
    }

    function getExtras() {
        let $form = $('#add-new-car'),
            extrasToAdd = {
                insuarance: $("input[value='insuarance']").is(':checked'),
                leather: $("input[value='leather']").is(':checked'),
                automatic: $("input[value='authomatic']").is(':checked'),
                gps: $("input[value='gps']").is(':checked'),
                clima: $("input[value='air-condition']").is(':checked'),
                quatro: $("input[value='quatro']").is(':checked'),
                fuelConsumation: $form.find('#consumation').val()
            };

        return extrasToAdd;
    }

    return {
        createCar: CreateCarByMainDetails
    };
} ();

export { carControler };