define(['knockout', 'data/context', 'durandal/app', 'plugins/router'],
    function(ko, datacontext, app, router){

        var ctor = {
            viewUrl: 'views/addevent',
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
            event: null,
            categories: ko.observableArray(),
            selectedCategory: ko.observable().extend({
                required: {
                    message: 'Category is required',
                    params: true
                } }),
            activate: function(id){
                datacontext.category.getAll()
                    .then(function(categories){
                        this.categories(categories);
                    }.bind(this));
                datacontext.event.get(id)
                    .then(function(event){
                        this.event = event;
                        this.title(event.get('title'));
                        this.description(event.get('description'));
                        this.location(event.get('location'));
                        this.photo(event.get('photo'));
                        var category = event.get('category');
                        if(category) {
                            category.fetch({
                                success: function (category) {
                                    ko.utils.arrayFirst(this.categories(), function (cat) {
                                        if (cat.id === category.id) {
                                            this.selectedCategory(cat);
                                            return true;
                                        }
                                        return false;
                                    }.bind(this))
                                }.bind(this)
                            });
                        }
                        this.date(moment(event.get('date')).format("DD/MM/YYYY"));
                    }.bind(this),
                    function(obj, error){
                        app.trigger('app:error', 'Error Occurred', error.message);
                    });
            },
            save: function(){
                this.errors.showAllMessages();
                if(this.isValid()) {
                    this.event.set('title', this.title());
                    this.event.set('date', moment(this.date(), 'DD/MM/YYYY').toDate());
                    this.event.set('description', this.description());
                    this.event.set('location', this.location());
                    this.event.set('photo', this.photo());
                    this.event.set('category', this.selectedCategory());
                    datacontext.event.edit(this.event)
                        .then(function () {
                            app.trigger('app:success', 'Event Updated', 'Yes');
                            router.navigate('home');
                        });
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
            },
            deactivate: function(){
                this.reset();
            }
        };
        ctor.errors = ko.validation.group(ctor);
        return ctor;
    });
