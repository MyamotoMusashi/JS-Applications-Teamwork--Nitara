import 'jquery';

let isShowedLogForm = false;

let $loginBtn = $('#login');
$loginBtn.on('click', function() {
    let url = "../templates/login-template";
    $.get(url, function(data) {
        if (isShowedLogForm) {
            $('#form-container').html('');
            isShowedLogForm = false;
        } else {
            $('#form-container').html(data);
            isShowedLogForm = true;
        }
        $('#register').toggleClass('hidden');
    });
});

let isShowedRegForm = false;

let $registerBtn = $('#register');
$registerBtn.on('click', function() {
    let url = "../templates/register-template";
    $.get(url, function(data) {
        if (isShowedRegForm) {
            $('#form-container').html('');
            isShowedRegForm = false;
            $('#register').toggleClass('hidden');
        } else {
            $('#form-container').html(data);
            isShowedRegForm = true;
        }
    });
});