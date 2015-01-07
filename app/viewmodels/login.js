define(['knockout', 'data/context', 'durandal/app', 'plugins/router'],
    function(ko, datacontext, app, router){

        var ctor = {
            displayName:'Login',
            username: ko.observable().extend({
                required: {
                    message: 'Username is required',
                    params: true
                } }),
            password: ko.observable().extend({
                required: {
                    message: 'Password is required',
                    params: true
                } }),
            login: function(){
                this.errors.showAllMessages();
                if(this.isValid()){
                    datacontext.user.login(this.username(), this.password())
                        .then(function(user){
                            router.navigate('Home');
                        }, function(user, error){
                            app.trigger('app:error', 'Login Error', error.message);
                        });
                }
            }
        };
        ctor.errors = ko.validation.group(ctor);
        return ctor;
})