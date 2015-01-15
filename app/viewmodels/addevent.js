define(['knockout', 'data/context', 'durandal/app', 'plugins/router', 'plugins/dialog', 'viewmodels/findLocation'],
    function(ko, datacontext, app, router, dialog, FindLocation){

        var findLocation = new FindLocation();
        var ctor = {
            title: ko.observable().extend({
                required: {
                    message: 'Title is required',
                    params: true
                } }),
            date: ko.observable().extend({
                date: true,
                required: {
                    message: 'Date is required',
                    params: true
                }}),
            description: ko.observable().extend({
                required: {
                    message: 'Description is required',
                    params: true
                } }),
            location: findLocation.marker,
            displayLocation: findLocation.displayLocation,
            photo: ko.observable(),
            categories: ko.observableArray(),
            selectedCategory: ko.observable().extend({
                required: {
                    message: 'Category is required',
                    params: true
                } }),
            findingAddress: findLocation.findingAddress,

            activate: function(){
              datacontext.category.getAll()
                  .then(this.loadCategories.bind(this));
            },

            loadCategories: function(categories){
                this.categories(categories);
            },

            save: function(){
                this.errors.showAllMessages();
                if(this.isValid()){
                    datacontext.event.add(
                            this.title(),
                            moment(this.date(), 'DD/MM/YYYY').toDate(),
                            this.description(),
                            this.photo(),
                            this.selectedCategory(),
                            this.location() ? this.location().getLatLng() : null
                        )
                        .then(function(event){
                            app.trigger('app:success', 'New Event', 'Yay, a new event was added!');
                            router.navigate('home');
                        },
                        function(error){
                            app.trigger('app:error', 'Error Occurred', error.message);
                        })
                }
            },

            findLocation: function(){
                dialog.show(findLocation);
            },

            cancel: function(){
                this.reset();
                router.navigate('home');
            },

            reset: function(){
                this.title(null);
                this.date(null);
                this.description(null);
                this.location(null);
                this.photo(null);
                this.errors.showAllMessages(false);
            },

            deactivate: function(){
                this.reset();
            }

        };
        ctor.errors = ko.validation.group(ctor);
        return ctor;
    });