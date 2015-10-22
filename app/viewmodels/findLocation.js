define(['services/map', 'knockout', 'plugins/dialog', 'services/geocoding'],
    function(map, ko, dialog, geocoder){

        var ctor = function(){

            this.mapObj = null;
            this.marker = ko.observable();
            this.displayLocation = ko.observable();

            this.activate = function(){
                console.log('ss', this.mapObj);
            };

            this.compositionComplete = function(){
                this.mapObj = map.load('map', null, { callback: this.geocoderCallback });
                this.mapObj.on('contextmenu', function(result){
                    try{
                        if(this.marker()){
                            this.mapObj.removeLayer(this.marker());
                        }
                    }catch(er){
                        // Do nothing
                    }
                    this.marker(L.marker(result.latlng).addTo(this.mapObj));
                }.bind(this));
            };

            this.save = function(){
                dialog.close(this);
                if(this.marker()) {
                    this.setFindingAddress(true);
                    var latlng = this.marker().getLatLng();
                    geocoder.reverse(latlng.lat, latlng.lng)
                        .then(function(result){
                            if(result['display_name']) {
                                this.displayLocation(result.display_name);
                            }
                            console.log('Address',result);
                            this.setFindingAddress(false);
                        }.bind(this));
                }
            };

            this.cancel = function(){
                dialog.close(this);
            };
            
            this.setFindingAddress = function(value){
                if(this.findingAddress){
                    this.findingAddress(value);
                }
            }

        };

        return ctor;

    });