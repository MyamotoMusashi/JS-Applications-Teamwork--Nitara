let orderModule = function() {

    let orderState = {
        free  : 0,
        reserved : 1,
        hired : 2,
    }

    class Order {
        constructor(pickUpPlace, deliveryPlace, startDate, endDate,car,user,postDate,id) {
            this.pickUpPlace = pickUpPlace;
            this.deliveryPlace = deliveryPlace;
            this.startDate = startDate;
            this.endDate = endDate;
            this.car = car;
            this.user = user;
            this._state = orderState.free
        }
    }

    function createOrder(pickUpPlace, deliveryPlace, startDate, endDate,car,user) {
        return new Order(pickUpPlace, deliveryPlace, startDate, endDate,car,user);
    }

    return {
        createOrder
    };
}();

export {orderModule};