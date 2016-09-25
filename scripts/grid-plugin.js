import {cars} from '../db/db.js';

var grid = (function () {
    function build(carsArr) {
        var availableCars = carsArr || [0, 3, 2, 1, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            i, j, carDetails, gridNavigationButton, carDetailsWrapper, gridNavigationElement, totalPagesCount, notDisplayedCarDetailsCount,
            currentCar, currentPageCarDetailsCount, gridParent, gridPreview,
            carDetailsPerPageCount = 4,
            gridNavigation = document.createElement("ul");

        totalPagesCount = availableCars.length / carDetailsPerPageCount;
        notDisplayedCarDetailsCount = availableCars.length;
        currentCar = 0;
        for (i = 0; i < totalPagesCount; i += 1) {
            gridNavigationButton = document.createElement("button");
            gridNavigationButton.innerHTML = `${i}`;

            carDetailsWrapper = document.createElement("div");
            carDetailsWrapper.innerHTML = `<div class="container-fluid"><div class="row"></div></div>`

            if (notDisplayedCarDetailsCount >= carDetailsPerPageCount) {
                currentPageCarDetailsCount = carDetailsPerPageCount;
                notDisplayedCarDetailsCount = notDisplayedCarDetailsCount - currentPageCarDetailsCount;
            }
            else {
                currentPageCarDetailsCount = notDisplayedCarDetailsCount;
            }
            for (j = 0; j < currentPageCarDetailsCount; j += 1) {
                carDetails = document.createElement("div");
                carDetails.className = "col-xl-6";
                carDetails.innerHTML =

                    `<div class="container-fluid">
                           <div class="row">
                                <div class="col-xl-12">
                                    <h3>${availableCars[currentCar].Brand} : ${availableCars[currentCar].Model}</h3>
                                </div>
                            </div> 
                            <div class="row">
                               <div class="col-xl-7">
                                   <img class="img-responive" src="${availableCars[currentCar].Image || "imgs/cars/Skoda-Fabia-1.4.jpg"}" alt="">
                               </div>
                               <div class="col-xl-5">
                                   <div class="container-fluid">
                                       <div class="row">
                                           <div class="col-xl-5">брой места: </div>
                                           <div class="col-xl-7">${availableCars[currentCar].Seats || 0}</div>
                                       </div>
                                       <div class="row">
                                           <div class="col-xl-5">гориво: </div>
                                           <div class="col-xl-7">${availableCars[currentCar].Fuel || 0}</div>
                                       </div>
                                       <div class="row">
                                           <div class="col-xl-5">скорости: </div>
                                           <div class="col-xl-7">${availableCars[currentCar].gear || 0}</div>
                                       </div>
                                       <div class="row">
                                           <div class="col-xl-5">разход: </div>
                                           <div class="col-xl-7">${availableCars[currentCar].fuelConsumption || 0}</div>
                                       </div>
                                       <div class="row">
                                           <div class="col-xl-5">екстри: </div>
                                           <div class="col-xl-7">${availableCars[currentCar].extras || 0}</div>
                                       </div>
                                       <div class="row">
                                           <div class="col-xl-5">застраховки: </div>
                                           <div class="col-xl-7">${availableCars[currentCar].insurance || 0} </div>
                                       </div>
                                   </div>
                               </div>
                           </div>
                       </div>`;
                carDetailsWrapper.children[0].children[0].appendChild(carDetails);
                currentCar++;
            }

            gridNavigationElement = document.createElement("div");
            gridNavigationElement.appendChild(gridNavigationButton);
            gridNavigationElement.appendChild(carDetailsWrapper);
            gridNavigationElement.style.display = "inline-block";
            gridNavigationElement.children[1].style.display = "none";

            gridNavigation.appendChild(gridNavigationElement);
        }

        gridPreview = document.createElement("div");
        gridPreviewInitialLoad();

        gridNavigation.style.display = "inline-block";
        gridNavigation.addEventListener("click", function (ev) {
            gridPreview.innerHTML = ev.target.parentElement.children[1].innerHTML;
            showChildren(gridPreview.children);
        })

        function gridPreviewInitialLoad() {
            gridPreview.innerHTML = gridNavigation.firstChild.children[1].innerHTML;
            showChildren(gridPreview.children);
        }

        function showChildren(children) {
            for (var i = 0; i < children.length; i += 1) {
                children[i].style.display = "";
            }
        }

        gridParent = document.querySelector("#grid-container");
        gridParent.appendChild(gridPreview);
        gridParent.appendChild(gridNavigation);
    }

    function showAvailableCars() {
        cars.getAllFreeCars()
            .then(build);
    }

    function hideGrid() {
        $('#grid-container').html('');
    }

    return {
        showAvailableCars,
        hideGrid
    };
} ());

export { grid }
