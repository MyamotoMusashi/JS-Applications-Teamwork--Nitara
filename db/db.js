import {userModul} from 'user';

let person = userModul.createUser('Pave', 'Angelov', '12345678', 'some@email.com');

let users = (function() {
    let loggedUsers = [],
        registredUsers = [person];
    
    // Check if user with this email and password exist.
    function checkIfUserExist(email, password) {
        let user = registredUsers
            .find(user => user.email === email && user.password === password);

        return user;
    }

    // Check if user with this email is logged.
    function checkIfLoggedUser(email, password) {
        let user = checkIfUserExist(email, password);
        if (!user) {
            return false;
        }
        
        return true;
    }

    // Register user if don`t exist.
    function registerUser(userToAdd) {
        if (registredUsers.find( user => user.email === userToAdd.email)) {
            throw new Error('This email is already used!');
        }
        
        registredUsers.push(userToAdd);
    }

    function loginUser(email, password) {
        let user = checkIfUserExist(email, password);

        if (user) {
            addLoggedUser(user);
            return {
                name: `${user.firstname} ${user.lastname}`,
                email: user.email
            };
        }
    }

    // Add user to logged users
    function addLoggedUser(user) {
        loggedUsers.push(user);
    }

    // Remove user from loggedUsers.
    function logoutUser(user) {
        let userIndex = -1;
        loggedUsers.forEach(function(us, index) {
            if (us.id === user.id) {
                userIndex = index;
            }
        });

        if (userIndex >= 0) {
            loggedUsers.splice(userIndex, 1);
        }
    }

    // List all registred users.
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
    }

}());

export {users};