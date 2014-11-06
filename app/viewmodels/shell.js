define(['plugins/router', 'durandal/app', 'data/user', 'knockout'], function (router, app, user, ko) {
    var ctor =  {
        router: router,
        hasUser: ko.observable(false),
        username: ko.observable(),
        user: null,
        activate: function () {
            router.map([
                { route: '', title:'Welcome', moduleId: 'viewmodels/welcome', nav: false },
                { route: 'login', moduleId: 'viewmodels/login', nav: true },
                { route: 'signup', moduleId: 'viewmodels/signup', nav: true },
                { route: 'home', moduleId: 'viewmodels/home', nav: false },
                { route: 'add', moduleId: 'viewmodels/addevent', nav: false },
                { route: 'edit/:id', moduleId: 'viewmodels/editevent', nav: false }
            ]).buildNavigationModel();

            Parse.initialize("ARNwlSZzw0NMbXd1NlOU7Zy8zZ33D4qcGr7mQxWM", "MZiPsqFFxJoC9mgikwqYJgnaGi05grAYLuGxsPQv");

            app.on('app:error').then(function(title, message){
                toastr.error(message, title);
            });
            app.on('app:success').then(function(title, message){
                toastr.success(message, title);
            });

            var currentUser = user.current();
            if(currentUser != null){
                ctor.hasUser(true);
                ctor.username(currentUser.attributes.username);
                ctor.user = currentUser;
            }
            
            return router.activate();
        },
        logout: function(){
            user.logout();
            this.hasUser(false);
            this.username(null);
            router.navigate('');
        }
    };
    return ctor;
});