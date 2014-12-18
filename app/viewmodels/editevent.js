define(['knockout', 'data/context', 'durandal/app'], function(ko, datacontext, app){

    return{
        viewUrl: 'views/addevent',
        title: ko.observable(),
        date: ko.observable(),
        description: ko.observable(),
        location: ko.observable(),
        photo: ko.observable(),
        activate: function(id){
            datacontext.event.get(id)
                .then(function(event){
                    this.title(event.get('title'));
                    this.description(event.get('description'));
                    this.location(event.get('location'));
                    this.photo(event.get('photo'));

                    this.date(moment(event.get('date')).format("DD/MM/YYYY"));
                }.bind(this),
                function(obj, error){
                    app.trigger('app:error', 'Error Occurred', error.message);
                });
        },
        save: function(){

        }
    };

})
