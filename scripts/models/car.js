let carModule = function () {
    class Car {
        constructor(brand, model, year, pricePerDay, extras) {
            this.brand = brand;
            this.model = model;
            this.year = year;
            this.pricePerDay = pricePerDay;
            this.id = getId();
            this.extras = extras || {};
            this.pictures = [];
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
        set gears() {
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

        getPictures() {
            return this.pictures.slice(0);
        }

        addPictures(...picturesArr) {
            if (Array.isArray(picturesArr[0])) {
                picturesArr = picturesArr[0];
            }

            let lastPictureId = 0;
            if (this.pictures.length) {
                lastPictureId = this.pictures.length;
            }

            picturesArr.forEach(function(pictureSrc) {
                this.pictures.push({
                    id: lastPictureId,
                    src: pictureSrc
                });

                lastPictureId += 1;
            });
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