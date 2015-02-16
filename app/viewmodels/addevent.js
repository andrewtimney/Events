define(['knockout', 'data/context', 'durandal/app', 'plugins/router', 'plugins/dialog', 'viewmodels/findLocation',
        'viewmodels/baseevent'],
    function (ko, datacontext, app, router, dialog, FindLocation, baseevent) {

        var findLocation = new FindLocation();

        function ctorFun() {
            this.activate = function () {
                datacontext.category.getAll()
                    .then(this.loadCategories.bind(this));
            };
            this.loadCategories = function (categories) {
                this.categories(categories);
            };
            this.save = function () {
                console.log(this);
                this.errors.showAllMessages();
                if (this.isValid()) {
                    datacontext.event.add(
                        this.title(),
                        moment(this.date(), 'DD/MM/YYYY').toDate(),
                        this.description(),
                        this.photo(),
                        this.selectedCategory(),
                        this.location() ? this.location().getLatLng() : null
                    )
                        .then(function (event) {
                            app.trigger('app:success', 'New Event', 'Yay, a new event was added!');
                            router.navigate('home');
                        },
                        function (error) {
                            app.trigger('app:error', 'Error Occurred', error.message);
                        })
                }
            };
            this.findLocation = function () {
                dialog.show(findLocation);
            };
            this.cancel = function () {
                router.navigate('home');
            };
            this.reset = function () {
                this.title(null);
                this.date(null);
                this.description(null);
                this.location(null);
                this.photo(null);
                this.errors.showAllMessages(false);
            };
            this.deactivate = function () {
                this.reset();
            };
            this.errors = ko.validation.group(this);
        };
        ctorFun.prototype = new baseevent();

        return ctorFun;

        //var ctor = {
        //
        //    activate: function () {
        //        datacontext.category.getAll()
        //            .then(this.loadCategories.bind(this));
        //    },
        //
        //    loadCategories: function (categories) {
        //        this.categories(categories);
        //    },
        //
        //    save: function () {
        //        this.errors.showAllMessages();
        //        if (this.isValid()) {
        //            datacontext.event.add(
        //                this.title(),
        //                moment(this.date(), 'DD/MM/YYYY').toDate(),
        //                this.description(),
        //                this.photo(),
        //                this.selectedCategory(),
        //                this.location() ? this.location().getLatLng() : null
        //            )
        //                .then(function (event) {
        //                    app.trigger('app:success', 'New Event', 'Yay, a new event was added!');
        //                    router.navigate('home');
        //                },
        //                function (error) {
        //                    app.trigger('app:error', 'Error Occurred', error.message);
        //                })
        //        }
        //    },
        //
        //    findLocation: function () {
        //        dialog.show(findLocation);
        //    },
        //
        //    cancel: function () {
        //        router.navigate('home');
        //    },
        //
        //    reset: function () {
        //        this.title(null);
        //        this.date(null);
        //        this.description(null);
        //        this.location(null);
        //        this.photo(null);
        //        this.errors.showAllMessages(false);
        //    },
        //
        //    deactivate: function () {
        //        this.reset();
        //    }
        //
        //};
        //ctor.errors = ko.validation.group(ctor);
        //return ctor;
    });