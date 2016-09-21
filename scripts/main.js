import 'jquery';

let $loginBtn = $('#login');
$loginBtn.on('click', function() {
    $('#form-container').toggleClass('invissible');
    this.toggleClass('invissible');
});