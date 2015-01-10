requirejs.config({
    paths: {
        'text': '../lib/require/text',
        'durandal':'../lib/durandal/js',
        'plugins' : '../lib/durandal/js/plugins',
        'transitions' : '../lib/durandal/js/transitions',
        'knockout': '../lib/knockout/knockout-3.2.0',
        'bootstrap': '../lib/bootstrap/js/bootstrap',
        'jquery': '../lib/jquery/jquery-1.9.1',
        'knockout-validation': '../lib/knockout/knockout.validation',
        'OSMGeocoder': '../lib/Control.OSMGeocoder'
    },
    shim: {
        'bootstrap': {
            deps: ['jquery'],
            exports: 'jQuery'
       },
        'knockout-validation':{
            deps: ['knockout'],
            exports: 'ko'
        },
        'OSMGeocoder':{
            exports: 'L'
        }
    }
});

define(['durandal/system', 'durandal/app', 'durandal/viewLocator', 'knockout-validation', 'knockout'],
    function (system, app, viewLocator, knockoutValidation, ko) {
    //>>excludeStart("build", true);
    system.debug(true);
    //>>excludeEnd("build");

    app.title = 'Durandal Starter Kit';

    app.configurePlugins({
        router:true,
        dialog: true
    });

    ko.validation.rules['date'] = {
        validator: function (val) {
            return moment(val, 'DD/MM/YYYY').isValid()
        },
        message: 'A valid date is required (dd/mm/yyyy)'
    };

    ko.validation.registerExtenders();

    app.start().then(function() {
        //Replace 'viewmodels' in the moduleId with 'views' to locate the view.
        //Look for partial views in a 'views' folder in the root.
        viewLocator.useConvention();

        //Show the app by setting the root view model for our application with a transition.
        app.setRoot('viewmodels/shell', 'entrance');
    });
});