define(['knockout', 'data/context', 'durandal/app', 'plugins/router', 'viewmodels/baseevent', 'services/geocoding'],
    function(ko, datacontext, app, router, baseevent, geocoder){

        var ctor = {
            viewUrl: 'views/addevent',
            event: null,
            activate: function(id){
                datacontext.category.getAll()
                    .then(function(categories){
                        this.categories(categories);
                    }.bind(this));
                datacontext.event.get(id)
                    .then(function(event){
                        this.event = event;
                        this.title(event.get('title'));
                        this.description(event.get('description'));
                        this.location(event.get('location'));
                        this.photo(event.get('photo'));
                        var category = event.get('category');
                        if(category) {
                            category.fetch({
                                success: function (category) {
                                    ko.utils.arrayFirst(this.categories(), function (cat) {
                                        if (cat.id === category.id) {
                                            this.selectedCategory(cat);
                                            return true;
                                        }
                                        return false;
                                    }.bind(this))
                                }.bind(this)
                            });
                        }
                        this.date(moment(event.get('date')).format("DD/MM/YYYY"));
                        if(this.location()){
                            this.findingAddress(true);
                            geocoder.reverse(this.location().latitude, this.location().longitude)
                                .then(function(result){
                                    if(result['display_name']) {
                                        this.displayLocation(result.display_name);
                                    }
                                    this.findingAddress(false);
                                }.bind(this));
                        }
                    }.bind(this),
                    function(obj, error){
                        app.trigger('app:error', 'Error Occurred', error.message);
                    });
            },
            save: function(){
                this.errors = ko.validation.group(this);
                this.errors.showAllMessages();
                if(this.errors().length <= 0) {
                    this.event.set('title', this.title());
                    this.event.set('date', moment(this.date(), 'DD/MM/YYYY').toDate());
                   
                    this.event.set('description', this.description());
                     if(this.location()) {
                        var latlng = this.location().getLatLng();
                        var point = new Parse.GeoPoint({latitude: latlng.lat, longitude: latlng.lng});
                        this.event.set("location", point);
                    }
                    this.event.set('photo', this.photo());
                    this.event.set('category', this.selectedCategory());
                    datacontext.event.edit(this.event)
                        .then(function () {
                            app.trigger('app:success', 'Event Updated', 'Yes');
                            router.navigate('home');
                        });
                }
            }
        };
        ctor.errors = ko.validation.group(ctor);
        ko.utils.extend(ctor, new baseevent());

        return ctor;
    });
