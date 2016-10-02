import {userModule} from 'user';
import {carModule} from 'car';
import {orderModule} from '../scripts/models/order.js';

const API_KEY = 'iohp9okes3xh165v';
const el = new Everlive(API_KEY);

let usersData = el.data('User'),
    carsData = el.data('Car'),
    ordersData = el.data('Order');


var generateAuthKey = (function () {
    var chars = '1234567890)(*&^%$#@!)',
        length = 60;
    return function (username) {
        var authKey = username,
            index;
        while (authKey.length < length) {
            index = (Math.random() * chars.length) | 0;
            authKey += chars[index];
        }
        return authKey;
    };
} ());

let users = (function () {
    function getUsersFromDB() {
        return new Promise((resolve, reject) => {
            usersData.get()
                .then(function (usersFromDB) {
                    resolve(usersFromDB);
                }, function (error) {
                    reject(JSON.stringify(error));
                });
        });
    }


    function getUserById(userId) {
        let user = usersData.getById(userId.toString());

        return user;
    }

    function registerUser(userToAdd) {
        return new Promise((resolve, reject) => {
            getUsersFromDB()
                .then(function (data) {
                    let isExist = false;
                    if (data.count) {
                        let usersArr = data.result;

                        usersArr.forEach(function (user) {
                            if (userToAdd.email === user.Email) {
                                isExist = true;
                                return;
                            }
                        });
                    }

                    if (isExist) {
                        reject('This email is already used!');
                    } else {
                        usersData.create({
                            Firstname: userToAdd.firstname,
                            Lastname: userToAdd.lastname,
                            PasswordHash: userToAdd.password,
                            Email: userToAdd.email,
                            Auth_Key: generateAuthKey(userToAdd.email),
                            AdminRules: false
                        });
                        resolve('Successfully registred user!');
                    }

                });
        });
    }

    function loginUser(email, password) {
        return new Promise((resolve, reject) => {
            getUsersFromDB()
                .then(function (data) {
                    let userToLog = null;
                    if (data.count) {
                        let usersArr = data.result;
                        usersArr.forEach(function (user) {
                            if (user.Email === email && user.PasswordHash === password) {
                                userToLog = {
                                    name: `${user.Firstname} ${user.Lastname}`,
                                    authKey: user.Auth_Key,
                                    adminRules: user.AdminRules
                                };
                            }
                        });
                        resolve(userToLog);
                    } else {
                        reject();
                    }
                });
        });
    }

    function listUsers() {
        let usersToReturn = [],
            registredUsers = getUsersFromDB();

        registredUsers.forEach(function (user) {
            usersToReturn.push({
                name: `${user.Firstname} ${user.Lastname}`,
                email: user.Email
            });
        });

        return usersToReturn;
    }

    return {
        getUserById,
        registerUser,
        loginUser,
        listUsers
    };
} ());

let cars = function () {
    function getCarById(carId) {
        let car = carsData.getById(carId.toString());

        return car;
    }

    function getCarsFromDB() {
        return new Promise((resolve, reject) => {
            carsData.get()
                .then(function (carsFromDB) {
                    resolve(carsFromDB);
                }, function (error) {
                    reject(JSON.stringify(error));
                });
        });
    }


    function getAllFreeCars() {
        return new Promise((resolve, reject) => {
            getCarsFromDB()
                .then((data) => {
                    let carsArr = data.result;
                    resolve(carsArr);
                });
        });
    }

    function addCar(car) {
        return new Promise((resolve, reject) => {
            carsData.create({
                Brand: car.brand,
                Model: car.model,
                Location: car.location,
                Year: car.year,
                Seats: car.seats,
                Fuel: car.fuel,
                Image: car.img,
                Extras: car.extras,
                PricePerDay: car.pricePerDay,
                IsHired: false
            });

            resolve('Successfully added car!');
        });
    }

    function changeCarStatus(carId, status, startEndDates) {

        // TODO

        // data.updateSingle({ Id: carId, 'Author': 'Harper Lee' },
        //     function (data) {
        //         alert(JSON.stringify(data));
        //     },
        //     function (error) {
        //         alert(JSON.stringify(error));
        //     });
    }

    function deepCopyCar(car) {
        return JSON.parse(JSON.stringify(car));
    }

    return {
        getCarById,
        getAllFreeCars,
        addCar
    };
} ();

let orders = (function () {
    function getOrderById(orderId) {
        let order = ordersData.getById(orderId.toString());

        return order;
    }

    return {
        getOrderById
    }
} ());

export {users, cars, orders};