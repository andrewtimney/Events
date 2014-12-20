define(['jquery'], function($){

    return {
      add: function(name){
          var deferred = $.Deferred();
          var Category = Parse.Object.extend("Category");
          var category = new Category();
          category.set("name", name);
          category.setACL(new Parse.ACL(Parse.User.current()));
          category.save(null,{
              success: deferred.resolve,
              error: deferred.reject
          })
          return deferred.promise();
      },
        getAll: function(){
            var deferred = $.Deferred();
            var Category = Parse.Object.extend("Category");
            var query = new Parse.Query(Category);
            query.find({
                success: deferred.resolve,
                error: deferred.reject
            });
            return deferred.promise();
        },
        remove: function(category){
            var deferred = $.Deferred();
            category.destroy({
                success: deferred.resolve,
                error: deferred.reject
            });
            return deferred.promise();
        }
    };

});