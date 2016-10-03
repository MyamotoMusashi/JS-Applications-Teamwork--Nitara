import {cars} from '../db/db.js';

var grid = (function () {

    let $containerFluid = $('.container-fluid');

    function showGrid(pageNumber, keySorted) {
        let $gridContainer = $('<div id="grid-container"></div>');

        let showedCarsInGrid = 12;
        pageNumber = pageNumber || 0;
        let sortedKey = keySorted || 'Brand';

        Promise.all([cars.getAllFreeCars(), $.get('../templates/grid-gallery.handlebars')])
            .then(([cars, data]) => {
                let carsLen = cars.length;

                function sortByKey(array, key) {
                    return array.sort(function (a, b) {
                        var x = a[key];
                        var y = b[key];
                        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
                    });
                }

                cars = sortByKey(cars, sortedKey);

                cars = cars.splice(showedCarsInGrid * pageNumber, showedCarsInGrid);
                let template = Handlebars.compile(data);
                let html = template(cars);
                $gridContainer.html(html);
                $('#grid-container').html('');
                $('#grid-container').append($gridContainer);
                return carsLen / showedCarsInGrid;
            })
            .then((length) => {
                let pageIndexes = [];
                for (let i = 0; i < length; i += 1) {
                    pageIndexes[i] = i + 1;
                }

                $.get('../templates/grid-navigation.handlebars', (data) => {
                    let template = Handlebars.compile(data);

                    let html = template(pageIndexes);
                    $('#page-navigator').html(html);
                });
            })
            .then(() => {
                $.get('../templates/grid-sorting.handlebars', (data) => {
                    let template = Handlebars.compile(data);
                    $("#pricePerDay").on('click', function () {
                        alert("success");
                    });

                    $('#grid-pagination').html(template);
                });
            });
    }

    $containerFluid.on('click', '#sortByPricePerDay', function () {
        let pageIndex = $('#grid-container').attr('data-index') - 1;
        showGrid(pageIndex, 'PricePerDay');
    });

    $containerFluid.on('click', '#sortBySeats', function () {
        let pageIndex = $('#grid-container').attr('data-index') - 1;
        showGrid(pageIndex, 'Seats');
    });

    $containerFluid.on('click', '#sortByFuel', function () {
        let pageIndex = $('#grid-container').attr('data-index') - 1;
        showGrid(pageIndex, 'Fuel');
    });

    $containerFluid.on('click', '#sortByGears', function () {
        let pageIndex = $('#grid-container').attr('data-index') - 1;
        showGrid(pageIndex, 'Gears');
    });

    $containerFluid.on('click', '#sortByYear', function () {
        let pageIndex = $('#grid-container').attr('data-index') - 1;
        showGrid(pageIndex, 'Year');
    });

    $('#grid-container').on('click', '#btn-page', function () {
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
}());

export {grid}