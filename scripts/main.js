import 'jquery';

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