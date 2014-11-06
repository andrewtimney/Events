define(['knockout', 'data/context', 'plugins/router'],
    function(ko, datacontext, router){
        return {
            displayName: 'Home',
            username: ko.observable(),
            events: ko.observableArray(),
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
            },
            addEvent: function(){
                router.navigate('add');
            }
        };
    });