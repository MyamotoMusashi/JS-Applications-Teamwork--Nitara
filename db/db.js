import {userModule} from 'user';
import {carModule} from 'car';

const API_KEY = 'iohp9okes3xh165v';
const el = new Everlive(API_KEY);
let usersData = el.data('User');

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
        let registredUsers = getUsersFromDB();
        
        if (registredUsers.result) {
            if (registredUsers.find( user => user.Email === userToAdd.email)) {
                throw new Error('This email is already used!');
            }
        }

        let userForDB = {
            Firstname: userToAdd.firstname,
            Lastname: userToAdd.lastname,
            PasswordHash: userToAdd.password,
            Email: userToAdd.email,
            Auth_Key: generateAuthKey(userToAdd.email)
        };

        console.log(userForDB.PasswordHash);
        console.log(userToAdd.password);

        usersData.create(userForDB)
            .then((data) => console.log(data));
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
    let availableCars = [];

    function getAllCars() {
        return availableCars.slice(0);
    }

    function getAllFreeCars() {
        let cars = [];

        availableCars.forEach(function(car) {
            if (!car.isHired) {
                cars.push(deepCopyCar(car));
            }
        });

        return cars;
    }

    function addCar(car) {
        this.availableCars.push(car);
    }

    function deepCopyCar(car) {
        return JSON.parse(JSON.stringify(car));
    }

    return {
        getAllCars,
        getAllFreeCars,
        addCar
    };
}();

//users.registerUser(person);

export {users, cars};