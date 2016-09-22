let carModule = function () {
    class Car {
        constructor(brand, model, year, pricePerDay, extras) {
            this.brand = brand;
            this.model = model;
            this.year = year;
            this.pricePerDay = pricePerDay;
            this.id = getId();
            this.extras = extras || {};
            this.isHired = false;
        }

        get brand() {
            return this._brand;
        }
        set brand(value) {
            this._brand = value;
        }

        get model() {
            return this._model;
        }
        set model(value) {
            this._model = value;
        }

        get year() {
            return this._year;
        }
        set year(value) {
            this._year = value;
        }

        get pricePerDay() {
            return this._pricePerDay;
        }
        set pricePerDay(value) {
            this._pricePerDay = value;
        }
    }

    let getId = function getId() {
        let lastId = 0;
        return function() {
            return ++lastId;
        };
    }();

    function createCar(brand, model, year, pricePerDay) {
        return new Car(brand, model, year, pricePerDay);
    }

    return {
        createCar
    }
}();

export {carModule};