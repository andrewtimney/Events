define(['knockout', 'viewmodels/findLocation'], function (ko, FindLocation) {

    var findLocation = new FindLocation();

    return function () {
        this.title = ko.observable().extend({
            required: {
                message: 'Title is required',
                params: true
            }
        });
        this.date = ko.observable().extend({
            date: true,
            required: {
                message: 'Date is required',
                params: true
            }
        });
        this.description = ko.observable().extend({
            required: {
                message: 'Description is required',
                params: true
            }
        });
        this.location = findLocation.marker;
        this.displayLocation = findLocation.displayLocation;
        this.photo = ko.observable();
        this.categories = ko.observableArray(),
            this.selectedCategory = ko.observable().extend({
                required: {
                    message: 'Category is required',
                    params: true
                }
            });
        this.findingAddress = findLocation.findingAddress;
    };

});

