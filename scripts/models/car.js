import { CarValidator } from './carValidator.js';

let carModule = function () {
    class Car {
        constructor(brand, model, location, year, seats, fuel, img, extras, pricePerDay) {
            this.brand = brand;
            this.model = model;
            this.location = location;
            this.year = year;
            this.seats = seats;
            this.fuel = fuel;
            this.pricePerDay = pricePerDay;
            this.extras = extras || {};
            this.img = img;
            this.isHired = false;
        }

        get brand() {
            return this._brand;
        }
        set brand(value) {
            CarValidator.CheckStringLength(value, 'Car brand param');
            
            this._brand = value;
        }

        get model() {
            return this._model;
        }
        set model(value) {
            CarValidator.CheckStringLength(value, 'Car model param');
            
            this._model = value;
        }

        get location() {
            return this._location;
        }
        set location(value) {
            CarValidator.ValidateLocation(value);

            this._location = value;
        }

        get fuel() {
            return this._fuel;
        }
        set fuel(value) {
            this._fuel = value;
        }

        get pricePerDay() {
            return this._pricePerDay;
        }
        set pricePerDay(value) {
            CarValidator.CheckIfPositiveNumber(value, 'Car pricePerDay param');

            this._pricePerDay = value;
        }

        get year() {
            return this._year;
        }
        set year(value) {
            CarValidator.CheckYear(value);

            this._year = value;
        }

        get isHired() {
            return this._isHired;
        }
        set isHired(value) {
            if (typeof value !== 'boolean') {
                throw new Error('Car isHired param must be boolean!');
            }

            this._isHired = value;
        }

        get seats() {
            return this._seats;
        }
        set seats(value) {
            this._seats = value;
        }

        get img() {
            return this._img;
        }

        set img(value) {
            CarValidator.CheckStringLength(value, 'Car img param');
            
            this._img = value;
        }
    }

    function createCar(brand, model, location, year, seats, fuel, img, extrasObj, pricePerDay) {
        return new Car(brand, model, location, year, seats, fuel, img, extrasObj, pricePerDay);
    }

    return {
        createCar
    };
}();

export {carModule};