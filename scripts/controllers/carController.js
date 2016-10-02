/// <reference path="../../typings/index.d.ts" />

import 'jquery';
import { carModule } from '../models/car.js';

let carControler = function () {
    function CreateCarByMainDetails() {
        return new Promise((resolve, reject) => {
            let $form = $('#add-new-car'),
                brand = $form.find('#brand').val(),
                model = $form.find('#model').val(),
                location = $form.find('#location').val(),
                year = $form.find('#year').val(),
                seats = $form.find('#seats').val(),
                fuel = $form.find('#fuel').val(),
                imgLink = $form.find('#link').val(),
                price = $form.find('#price').val();

            let extras = getExtras();

            let car = carModule.createCar(brand, model, location, year, seats, fuel, imgLink, extras, price);

            resolve(car);
        });
    }

    function getExtras() {
        let $form = $('#add-new-car'),
            extrasToAdd = {
                Insuarance: $("input[value='insuarance']").is(':checked'),
                Leather: $("input[value='leather']").is(':checked'),
                Automatic: $("input[value='automatic']").is(':checked'),
                Gps: $("input[value='gps']").is(':checked'),
                Clima: $("input[value='air-condition']").is(':checked'),
                Quatro: $("input[value='quatro']").is(':checked'),
                FuelConsumation: $form.find('#consumation').val()
            };

        return extrasToAdd;
    }

    return {
        createCar: CreateCarByMainDetails
    };
} ();

export { carControler };