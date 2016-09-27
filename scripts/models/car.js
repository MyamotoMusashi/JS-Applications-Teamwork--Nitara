let carModule = function () {
    class Car {
        constructor(brand, model, fuel, pricePerDay, extras, img) {
            this.brand = brand;
            this.model = model;
            this.fuel = fuel;
            this.pricePerDay = pricePerDay;
            this.extras = extras || [];
            this.img = img;
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
            this._pricePerDay = value;
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
        get gears() {
            return this._gears;
        }
        set gears(value) {
            this._gears = value;
        }

        get seats() {
            return this._seats;
        }
        set seats(value) {
            this._seats = value;
        }

        get insurance() {
            return this._insurance;
        }
        set insurance(value) {
            this._insurance = value;
        }

        get img() {
            return this._img;
        }

        set img(value) {
            this._img = value;
        }
    }

    function createCar(brand, model, fuel, pricePerDay, img) {
        return new Car(brand, model, fuel, pricePerDay, img);
    }

    return {
        createCar
    };
}();

export {carModule};