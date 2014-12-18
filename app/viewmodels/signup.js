define(['knockout', 'data/context', 'durandal/app', 'plugins/router'],
    function(ko, datacontext, app, router){
        var ctor = {
            displayName: 'Signup',
            username: ko.observable().extend({
                required: {
                    message: 'Username is required',
                    params: true
                } }),
            email: ko.observable().extend({ required: {
                message: 'Email is required',
                params: true
            } }),
            password: ko.observable().extend({ required: {
                message: 'Password is required',
                params: true
            } }),
            confirmpassword: ko.observable().extend({ required: {
                message: 'Confirm Password is required',
                params: true
            } }),
            signup: function(){
                this.errors.showAllMessages();
                if(this.isValid()){
                    datacontext.user.add(this.username(), this.email(), this.password())
                        .then(function(){
                            app.trigger('app:success', 'New User', 'You have registered successfully, you can now login');
                            router.navigate('login');
                        },
                    function(user, error){
                        app.trigger('app:error', 'Error Occurred', error.message);
                    });
                }
            }
        };
        ctor.errors = ko.validation.group(ctor);
        return ctor;
    });