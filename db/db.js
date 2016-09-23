import {userModule} from 'user';
import {carModule} from 'car';

let person = userModule.createUser('Pave', 'Angelov', '7c222fb2927d828af22f592134e8932480637c0d', 'some@email.com');

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
    let loggedUsers = [],
        registredUsers = [];
    
    function checkIfUserExist(email, password) {
        let user = registredUsers
            .find(user => user.email === email && user.password === password);

        return user;
    }

    function registerUser(userToAdd) {
        if (registredUsers.find( user => user.email === userToAdd.email)) {
            throw new Error('This email is already used!');
        }

        userToAdd.authKey= generateAuthKey(userToAdd.email);
        
        registredUsers.push(userToAdd);
    }

    function loginUser(email, password) {
        let user = checkIfUserExist(email, password);

        if (user) {
            return {
                name: `${user.firstname} ${user.lastname}`,
                authKey: user.authKey
            };
        } else {
            return null;
        }
    }

    function listUsers() {
        let users = [];
        registredUsers.forEach(function(user) {
            users.push({
                name: `${user.firstname} ${user.lastname}`,
                email: user.email
            });
        });
        return users;
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

users.registerUser(person);

export {users, cars};