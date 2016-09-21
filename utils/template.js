function compileTemplate(template) {
    let temp = Handlebars.compile(template);
    console.log(temp);
}

export { compileTemplate as compile };