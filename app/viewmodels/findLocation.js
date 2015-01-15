define(['services/map', 'knockout', 'plugins/dialog', 'services/geocoding'],
    function(map, ko, dialog, geocoder){

        var ctor = function(){

            this.mapObj = null;
            this.marker = ko.observable();
            this.displayLocation = ko.observable();

            this.activate = function(){
                if(this.marker()){
                    this.marker().addTo(this.mapObj);
                }
            };

            this.compositionComplete = function(){
                this.mapObj = map.load('map', null, { callback: this.geocoderCallback });
                this.mapObj.on('contextmenu', function(result){
                    if(this.marker()){
                        this.mapObj.removeLayer(this.marker());
                    }
                    this.marker(L.marker(result.latlng).addTo(this.mapObj));
                }.bind(this));
            };

            this.save = function(){
                dialog.close(this);
                if(this.marker()) {
                    var latlng = this.marker().getLatLng();
                    geocoder.reverse(latlng.lat, latlng.lng)
                        .then(function(result){
                            if(result['display_name']) {
                                this.displayLocation(result.display_name);
                            }
                        }.bind(this));
                }
            };

            this.cancel = function(){
                dialog.close(this);
            };

        };

        return ctor;

    });