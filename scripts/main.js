import 'login-register';
import {grid} from 'grid-plugin';

let isGridShowed = false;

$('#show-available-cars').on('click', function() {
    let $target = $(this).children();
    if (isGridShowed) {
        grid.hideGrid();
        $target.html('Show available cars');
        isGridShowed = false;
    } else {
        grid.showGrid();
        $target.html('Hide gallery');
        isGridShowed = true;
    }
    
});