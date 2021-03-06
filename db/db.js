import {userModule} from '../scripts/models/user.js';
import {carModule} from '../scripts/models/car.js';
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
        return new Promise((resolve, reject) => {
            usersData.getById(userId.toString())
                .then((data) => {
                    resolve(data);
                }, (err) => {
                    reject(JSON.stringify(err));
                });
        });
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
                                    authKey: user.Auth_Key
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

    function checkUserForAdminRules(userAuthKey) {
        let adminKeys = {
            'some@email.com50*^)91@00403(#)^9*@!7!^32830^#248@6%99!!2&*)4': true,
            'saw4o@abv.bg465^8!523656$@5#$(4**#875)5^)%89#8^*87)3914!2838': true,
            'veselin@abv.bg1%61%(2((!2^)%^51051(#@@*8@6(!1(0%)!29#&!)#7$2': true,
            'veselin93@abv.bg89)344@3*$##3#1@&885581^)8(0@$7^*!@93$5@7593': true,
            'emil@gmail.com%4&**%)7&*%!54!13$%)9&40!28)0590%1@$!2(72&5#4^': true,
            };

            if (adminKeys[userAuthKey]) {
                return true;
            }

            return false;
    }

    return {
        getUserById,
        registerUser,
        loginUser,
        checkUserForAdminRules
    };
} ());

let cars = function () {
    function getCarById(carId) {
        return new Promise((resolve, reject) => {
            carsData.getById(carId.toString())
                .then((data) => {
                    resolve(data);
                }, (err) => {
                    reject(JSON.stringify(err));
                });
        });
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

    function getAllOrders() {
        return new Promise((resolve, reject) => {
            ordersData.get()
                .then(function (ordersFromDB) {
                    resolve(ordersFromDB);
                }, function (error) {
                    reject(JSON.stringify(error));
                });
        });
    }

    function addOrder(order) {
        return new Promise((resolve, reject) => {
            Promise.all([cars.getCarById(order.carId), users.getUserById(order.userId)])
                    .then(([car, user])=> {
                        let orderedCar = car.result,
                            customer = user.result;

                            if (orderedCar.IsHired) {
                                reject('This car is already hired!');
                                return;
                            }

                            ordersData.create({
                                State: order.state,
                                UserID: order.userId,
                                CarID: order.carId,
                                EndDate: order.endDate,
                                StartDate: order.startDate,
                                DeliveryPlace: order.deliveryPlace,
                                PickUpPlace: order.pickUpPlace
                            },(data) => {
                                console.log(data);
                                resolve(data);
                            }, (err) => {
                                reject(err);
                            });

                    });
        });
    }

    return {
        getOrderById,
        getAllOrders,
        addOrder
    };
} ());

export {users, cars, orders};