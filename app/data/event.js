define(['jquery'], function($){

    return {

        add: function(title, date, desc, location, photo, category, location){
            var deferred = $.Deferred();
            var Event = Parse.Object.extend("Event");
            var event = new Event();
            event.set("title", title);
            event.set("date", date);
            event.set("description", desc);
            event.set("photo", photo);

            if(location) {
                var point = new Parse.GeoPoint({latitude: location.lat, longitude: location.lng});
                event.set("location", point);
            }
            console.log(location);
            if(category){
                event.set("category", category);
            }
            event.setACL(new Parse.ACL(Parse.User.current()));
            event.save(null,{
                success: deferred.resolve,
                error: deferred.reject
            });
            return deferred.promise();
        },

        edit: function(event){
            var deferred = $.Deferred();
            event.save(null, {
                success: deferred.resolve,
                error: deferred.reject
            });
            return deferred.promise();
        },

        getAll: function(){
            var deferred = $.Deferred();
            var Event = Parse.Object.extend("Event");
            var query = new Parse.Query(Event);
            query.find({
                success: deferred.resolve,
                error: deferred.reject
            });
            return deferred.promise();
        },

        remove: function(event){
            var deferred = $.Deferred();
            event.destroy({
                success: deferred.resolve,
                error: deferred.reject
            });
            return deferred.promise();
        },

        get: function(id){
            var deferred = $.Deferred();
            var Event = Parse.Object.extend("Event");
            var query = new Parse.Query(Event);
            query.get(id, {
                success: deferred.resolve,
                error: deferred.reject
            });
            return deferred.promise();
        }
    };

});