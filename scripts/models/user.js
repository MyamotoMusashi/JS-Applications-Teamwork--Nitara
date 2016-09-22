import {UserValidator as validator} from 'userValidator';

let userModule = (function () {

    class User {
        constructor(firstname, lastname, password, email) {
            this.firstname = firstname;
            this.lastname = lastname;
            this.password = password;
            this.email = email;
            this.leasedCars = [];
            this.id = getId();
            //this.age = age;
            //this.driverLicense = driverLicense;
            //this.address = address;
        }

        get firstname() {
            return this._firstname;
        }

        set firstname(value) {
            validator.validateName(value, 'User firstname param');
            this._firstname = value;
        }

        get lastname() {
            return this._lastname;
        }

        set lastname(value) {
            validator.validateName(value, 'User lastname param');
            this._lastname = value;
        }

        get password() {
            return this._password;
        }

        set password(value) {
            validator.validatePassword(value);

            this._password = value;
        }

        addCar(carToAdd) {
            if (!carToAdd.isHired) {
                this.leasedCars.push(carToAdd);
                carToAdd.isHired = true;
            } else {
                throw new Error('This car is already hired!');
            }
        }

        releaseCar(carId) {
            let index = this.getCarById(carId);

            if(index >= 0) {
                this.leasedCars.splice(index, 1);
            }
        }   

        getCarById(id) {
            let carIndex = -1;

            this.leasedCars.find(function (value, index) {
                if (value.id === id) {
                    carIndex = index;
                }
            });

            return carIndex;
        }
    }

    let getId = function getId() {
        let lastId = 0;
        return function () {
            return ++lastId;
        };
    } ();

    function createUser(firstname, lastname, password, email) {
        return new User(firstname, lastname, password, email);
    }

    return {
        createUser
    }
} ());

export {userModule};