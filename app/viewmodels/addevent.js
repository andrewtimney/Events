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
                this.errors = ko.validation.group(this);
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
        };

        var obj = new ctorFun();

        ko.utils.extend(obj, new baseevent());

        return obj;
    });