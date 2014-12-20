define(['knockout', 'data/context', 'plugins/router', 'plugins/dialog', 'viewmodels/addcategory', 'durandal/app'],
    function(ko, datacontext, router, dialog, addcategory, app){
        return {
            displayName: 'Home',
            username: ko.observable(),
            events: ko.observableArray(),
            categories: ko.observableArray(),
            canActivate: function(){
                var currentUser = datacontext.user.current();
                if(currentUser != null){
                    this.username(currentUser.attributes.username);
                    return true;
                }
                else
                    return false;
            },
            activate: function(){
                datacontext.event.getAll()
                    .then(function(events){
                        this.events(events);
                    }.bind(this));

                datacontext.category.getAll()
                    .then(function(categories){
                        this.categories(categories);
                    }.bind(this));

                app.on('app:newcategory').then(function(category){
                   this.categories.push(category)
                }.bind(this));
            },
            addEvent: function(){
                router.navigate('add');
            },
            deleteEvent: function(event){
                datacontext.event.remove(event)
                    .then(function(){
                        this.events.remove(event);
                    }.bind(this));
            },
            addCategory: function(){
                dialog.show(addcategory);
            }
        };
    });