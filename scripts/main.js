import 'jquery';
import {userModul} from 'user';
import {carModule} from 'car';

let isShowed = false;

let $loginBtn = $('#login');
$loginBtn.on('click', function () {
    let url = "../templates/login-template";
    $.get(url, function (data) {
        if (isShowed) {
            $('#form-container').html('');
            isShowed = false;
        } else {
            $('#form-container').html(data);
            isShowed = true;
        }
        $('#register').toggleClass('hidden');
    });
});

let userOne = userModul.createUser('Pavel', 'Angelov', '12345678'),
    userTwo = userModul.createUser('Pavel', 'Angelov', '12345678'),
    car = carModule.createCar('Mazda', '6', 2004, 20);

userOne.addCar(car);
console.log(userOne);
