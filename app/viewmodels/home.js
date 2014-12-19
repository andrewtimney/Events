define(['knockout', 'data/context', 'plugins/router', 'plugins/dialog', 'viewmodels/addtag', 'durandal/app'],
    function(ko, datacontext, router, dialog, addtag, app){
        return {
            displayName: 'Home',
            username: ko.observable(),
            events: ko.observableArray(),
            tags: ko.observableArray(),
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

                datacontext.tag.getAll()
                    .then(function(tags){
                        this.tags(tags);
                    }.bind(this));

                app.on('app:newTag').then(function(tag){
                   alert(tag);
                });
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
            addTag: function(){
                dialog.show(addtag);
            }
        };
    });