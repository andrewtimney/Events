define(['knockout', 'data/context', 'durandal/app', 'plugins/router'],
    function(ko, datacontext, app, router){

        var ctor = {
            displayName:'Login',
            username: ko.observable(),
            password: ko.observable(),
            login: function(){
                datacontext.user.login(this.username(), this.password())
                    .then(function(user){
                        router.navigate('Homess');
                    }, function(user, error){
                        app.trigger('app:error', 'Error Occurred', error.message);
                    });
            }
        };
        return ctor;
})