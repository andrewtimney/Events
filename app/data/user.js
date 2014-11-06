define(['jquery'], function($){



    return {
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
                success : deferred.resolve,
                error : deferred.reject
            });
            return deferred.promise();
        },
        current: function(){
            var currentUser = Parse.User.current();
            if (currentUser) {
                return currentUser;
            }
            return null;
        },
        logout: function(){
            Parse.User.logOut();
        }
    };
})
