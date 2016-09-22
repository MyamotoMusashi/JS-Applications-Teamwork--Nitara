let orderModule = function() {
    class Order {
        constructor(pickUpPlace, deliveryPlace, startDate, endDate) {
            this.pickUpPlace = pickUpPlace;
            this.deliveryPlace = deliveryPlace;
            this.startDate = startDate;
            this.endDate = endDate;
        }
    }

    function createOrder(pickUpPlace, deliveryPlace, startDate, endDate) {
        return new Order(pickUpPlace, deliveryPlace, startDate, endDate);
    }

    return {
        createOrder
    };
}();

export {orderModule};