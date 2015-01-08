define(['knockout', 'data/context', 'plugins/router', 'plugins/dialog', 'viewmodels/addcategory', 'durandal/app'],
    function(ko, datacontext, router, dialog, addcategory, app){
        var ctor = function() {

            this.displayName = 'Home';
            this.username = ko.observable();
            this.events = ko.observableArray();
            this.categories = ko.observableArray();
            this.searchCriteria = ko.observable();

            this.filteredEvents = ko.computed(function(){
                if(this.searchCriteria()){
                    return ko.utils.arrayFilter(this.events(), function(event){
                        return event.get('title').toLowerCase().indexOf(this.searchCriteria().toLowerCase()) != -1;
                    }.bind(this));
                }
                return this.events();
            }, this);

            this.canActivate = function(){
                var currentUser = datacontext.user.current();
                if(currentUser != null){
                    this.username(currentUser.attributes.username);
                    return true;
                }
                else
                    return false;
            };

            this.activate = function(){
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

            };

            this.addEvent = function(){
                router.navigate('add');
            };

            this.deleteEvent = function(event){

                app.showMessage('Delete this event?', event.get('title'), ['Yes','No'])
                    .then(function(dialogResult){
                        if(dialogResult === 'Yes'){
                            datacontext.event.remove(event)
                                .then(function(){
                                    this.events.remove(event);
                                }.bind(this));
                        }
                    }.bind(this));

            };

            this.addCategory = function(){
                dialog.show(addcategory);
            };

        };
        return ctor;

    });