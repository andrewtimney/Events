define(['knockout', 'data/context', 'durandal/app', 'plugins/router'],
    function(ko, datacontext, app, router){

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
            location: ko.observable(),
            photo: ko.observable(),
            categories: ko.observableArray(),
            selectedCategory: ko.observableArray().extend({
                required: {
                    message: 'Category is required',
                    params: true
                } }),
            activate: function(){
              datacontext.category.getAll()
                  .then(function(categories){
                        this.categories(categories);
                  }.bind(this));
            },
            save: function(){
                this.errors.showAllMessages();
                if(this.isValid()){
                datacontext.event.add(
                    this.title(),
                    new Date(Date.parse(this.date())),
                    this.description(),
                    this.location(),
                    this.photo()
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
            }
        };
        ctor.errors = ko.validation.group(ctor);
        return ctor;
    });