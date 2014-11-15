define(['jquery', 'knockout'], function($, ko){

    var ctor = {
        loggedIn: ko.observable(false),
        username: ko.observable(),
        add: function(username, email, password){
            var deferred = $.Deferred();
            var user = new Parse.User();
            user.set("username", username);
            user.set("password", password);
            user.set("email", email);
            user.signUp(null, {
                success : deferred.resolve,
                error : deferred.reject
            });
            return deferred.promise();
        },
        login: function(username, password){
            var deferred = $.Deferred();
            Parse.User.logIn(username, password, {
                success : function(){
                    this.username(username);
                    deferred.resolve.apply(this, arguments);
                }.bind(this),
                error: function(){
                    this.loggedIn(false);
                    deferred.reject();
                }.bind(ctor)
            });
            return deferred.promise();
        },
        current: function(){
            var currentUser = Parse.User.current();
            if (currentUser) {
                ctor.loggedIn(true);
                return currentUser;
            }
            return null;
        },
        logout: function(){
            Parse.User.logOut();
            this.loggedIn(false);
        }
    };

    return ctor;
})
