define(['knockout', 'viewmodels/findLocation', 'plugins/dialog',  'plugins/router', 'services/geocoding'],
    function (ko, FindLocation, dialog, router, geocoder) {

        var findLocation = new FindLocation();
        var findingAddress = ko.observable(false);
        findLocation.findingAddress = findingAddress;

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
            this.findingAddress = findingAddress;
            this.findLocationDialog = function () {
                dialog.show(findLocation);
            };
            this.cancel = function () {
                router.navigate('home');
            };
            this.detached = function(){
              this.reset();
            };
            this.reset = function () {
                this.title(null);
                this.date(null);
                this.description(null);
                this.location(null);
                this.photo(null);
                this.findingAddress(false);
                this.displayLocation(null);
                //this.errors.showAllMessages(false);
                this.errors = ko.validation.group(this);
                this.errors.showAllMessages(false);
            };
        };

    });

