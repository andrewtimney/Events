define(['knockout', 'data/context', 'durandal/app', 'plugins/router'],
    function(ko, datacontext, app, router){
        var ctor = {
            displayName: 'Signup',
            username: ko.observable(),
            email: ko.observable(),
            password: ko.observable(),
            confirmpassword: ko.observable(),
            signup: function(){
                datacontext.user.add(this.username(), this.email(), this.password())
                    .then(function(){
                        app.trigger('app:error', 'New User', 'You have registered successfully, you can now login');
                        router.navigate('login');
                    },
                function(user, error){
                    app.trigger('app:error', 'Error Occurred', error.message);
                });
            }
        };
        return ctor;
    });