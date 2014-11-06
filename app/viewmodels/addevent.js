define(['knockout', 'data/context', 'durandal/app'], function(ko, datacontext, app){

    var ctor = {
        title: ko.observable(),
        date: ko.observable(),
        description: ko.observable(),
        location: ko.observable(),
        photo: ko.observable(),
        save: function(){
            datacontext.event.add(
                this.title(),
                new Date(Date.parse(this.date())),
                this.description(),
                this.location(),
                this.photo()
            )
                .then(function(event){
                    app.trigger('app:error', 'New Event', 'Yay, a new event was added!');
                },
                function(error){
                    app.trigger('app:error', 'Error Occurred', error.message);
                })
        }
    };

    return ctor;
});