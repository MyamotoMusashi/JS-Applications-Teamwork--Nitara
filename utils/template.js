import 'jquery';

const compileTemplate = function () {
    function compileTemplate(templateName, data) {
        return new Promise((resolve, reject) => {
            if (data) {

            } else {
                $.get(`../templates/${templateName}.handlebars`, (template) => {
                resolve(template);
            });
            }
        });
    }

    return {
        compileTemplate
    };
}();

export { compileTemplate as compile };