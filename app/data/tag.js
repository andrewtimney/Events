define(['jquery'], function($){

    return {
      add: function(name){
          var deferred = $.Deferred();
          var Tag = Parse.Object.extend("Tag");
          var tag = new Tag();
          tag.set("name", name);
          tag.setACL(new Parse.ACL(Parse.User.current()));
          tag.save(null,{
              success: deferred.resolve,
              error: deferred.reject
          })
          return deferred.promise();
      },
        getAll: function(){
            var deferred = $.Deferred();
            var Tag = Parse.Object.extend("Tag");
            var query = new Parse.Query(Tag);
            query.find({
                success: deferred.resolve,
                error: deferred.reject
            });
            return deferred.promise();
        },
        remove: function(tag){
            var deferred = $.Deferred();
            tag.destroy({
                success: deferred.resolve,
                error: deferred.reject
            });
            return deferred.promise();
        }
    };

});