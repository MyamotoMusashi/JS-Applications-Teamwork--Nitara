import {cars} from '../db/db.js';

var grid = (function () {
    function showGrid(pageNumber) {
            let $gridContainer = $('<div id="grid-container"></div>');
            let showedCarsInGrid = 12;
            pageNumber = pageNumber || 0;

            Promise.all([cars.getAllFreeCars(), $.get('../templates/cars-gallery.handlebars')])
                    .then(([cars, data]) => {
                        let carsLen = cars.length;

                        cars = cars.splice(showedCarsInGrid * pageNumber, showedCarsInGrid);
                        let template = Handlebars.compile(data);
                        console.log(cars)
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
                    });
                    
                
    }

    $('#grid-container').on('click', '#btn-page', function() {
        let pageIndex = $(this).attr('data-index') - 1;
        showGrid(pageIndex);
    });

    function hideGrid() {
        $('#grid-container').html('');
    }

    return {
        showGrid,
        hideGrid
    };
} ());

export { grid }
