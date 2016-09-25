import {userModule} from 'user';
import {carModule} from 'car';

const API_KEY = 'iohp9okes3xh165v';
const el = new Everlive(API_KEY);

let usersData = el.data('User'),
    carsData = el.data('Car');

function getUsersFromDB() {
    return new Promise((resolve, reject) => {
        usersData.get()
                     .then(function(usersFromDB) {
                         resolve(usersFromDB);
                     }, function(error) {
                         reject(JSON.stringify(error));
                     });
    }); 
}

function getUserById(userId) {
    let user = usersData.getById(userId.toString());

    return user;
}

function getCarsFromDB() {
    return new Promise((resolve, reject) => {
        carsData.get()
                     .then(function(carsFromDB) {
                         resolve(carsFromDB);
                     }, function(error) {
                         reject(JSON.stringify(error));
                     });
    }); 
}

var generateAuthKey = (function() {
  var chars = '1234567890)(*&^%$#@!)',
    length = 60;
  return function(username) {
    var authKey = username,
      index;
    while (authKey.length < length) {
      index = (Math.random() * chars.length) | 0;
      authKey += chars[index];
    }
    return authKey;
  };
}());

let users = (function() {
    function checkIfUserExist(email, password) {
        // let registredUsers = getUsersFromDB();

        // console.log(registredUsers);    
        
        let user = {};

        return user;
    }

    function registerUser(userToAdd) {
        return new Promise((resolve, reject) => {
            getUsersFromDB()
            .then(function(data) {
                let isExist = false;
                if (data.count) {
                    let usersArr = data.result;
                    console.log(usersArr);

                    usersArr.forEach(function(user) {
                        console.log(user);
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
                        Auth_Key: generateAuthKey(userToAdd.email)
                    });
                    resolve('Successfully registred user!');
                }
                
            });
        });
    }

    function loginUser(email, password) {
        return new Promise((resolve, reject) => {
            getUsersFromDB()
            .then(function(data) {
                let userToLog = null;
                if (data.count) {
                    let usersArr = data.result;
                    usersArr.forEach(function(user) {
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

    function listUsers() {
        let usersToReturn = [],
            registredUsers = getUsersFromDB();

        registredUsers.forEach(function(user) {
            usersToReturn.push({
                name: `${user.Firstname} ${user.Lastname}`,
                email: user.Email
            });
        });

        return usersToReturn;
    }

    return {
        registerUser,
        loginUser,
        listUsers
    };
}());

let cars = function() {
    function getAllFreeCars() {
        return new Promise((resolve, reject) => {
            getCarsFromDB()
                .then((data) => {
                    let carsArr = data.result;
                        console.log(carsArr);
                        resolve(carsArr);
                });
        })
        
    }

    function addCar(car) {
    }

    function deepCopyCar(car) {
        return JSON.parse(JSON.stringify(car));
    }

    return {
        getAllFreeCars,
        addCar
    };
}();

//users.registerUser(person);

export {users, cars};