import {cars} from '../db/db.js';

var grid = (function () {
    function createGridContainer() {
        return new Promise((resolve, reject) => {
            $.get('../templates/grid.handlebars', (html) => {
                $('#content').html(html);
                resolve();
            });
        });
    }

    function showGrid(pageNumber) {
        let $gridContainer = $('<div id="grid-container"></div>');
        let showedCarsInGrid = 12;
        pageNumber = pageNumber || 0;

        Promise.all([cars.getAllFreeCars(), $.get('../templates/grid-gallery.handlebars')])
                .then(([cars, data]) => {
                    let carsLen = cars.length;

                    cars = cars.splice(showedCarsInGrid * pageNumber, showedCarsInGrid);
                    let template = Handlebars.compile(data);
                    let html = template(cars);
                    $gridContainer.html(html);
                    $('#content').append($gridContainer);
                    return carsLen / showedCarsInGrid;
                })
                .then((length) => {
                    let pageIndexes = [];
                    for (let i = 0; i < length; i += 1) {
                        pageIndexes[i] = i + 1;
                    }

                    $.get('../templates/grid-navigation.handlebars',(data) => {
                        let template = Handlebars.compile(data);

                        let html = template(pageIndexes);
                        $('#page-navigator').html(html);
                    });
                })
                .then(() => {
                    $.get('../templates/grid-sorting.handlebars',(data) => {
                        let template = Handlebars.compile(data);

                        $('#grid-pagination').html(template);
                    });
                });
                    
                
    }

    function hideGrid() {
        $('#grid-container').html('');
    }

    return {
        createGridContainer,
        showGrid,
        hideGrid
    };
} ());

export { grid };
