define(['jquery'], function($){

    return {
        add: function(title, date, desc, location, photo){
            var deferred = $.Deferred();
            var Event = Parse.Object.extend("Event");
            var event = new Event();
            event.set("title", title);
            event.set("date", date);
            event.set("description", desc);
            event.set("location", location);
            event.set("photo", photo);
            event.save(null,{
                success: deferred.resolve,
                error: deferred.reject
            })
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
        }
    };

});