import 'jquery';
import 'jquery-validation';

let formValid = (function () {
    function check() {
        let isValid = false;

        $("#register-form").validate({
            rules: {
                firstname: {
                    required: true,
                    minlength: 3
                },
                lastname: {
                    required: true,
                    minlength: 3
                },
                email: {
                    required: true,
                    email: true
                },
                password: {
                    required: true,
                    minlength: 8
                }
            },
            messages: {
                firstname: {
                    required: "Please enter your firstname",
                    minlength: "Your firstname must be at least 3 characters long"
                },
                lastname: {
                    required: "Please enter your lastname",
                    minlength: "Your lastname must be at least 3 characters long"
                },
                password: {
                    required: "Please provide a password",
                    minlength: "Your password must be at least 8 characters long"
                },
                email: "Please enter a valid email address"
            }
        });

        if ($("#register-form").valid()) {
            isValid = true;
        }

        return isValid;
    }

    return {
        validate: check
    }
})();

export {formValid};
