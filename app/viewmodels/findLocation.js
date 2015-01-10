define(['services/map', 'knockout', 'plugins/dialog'],
    function(map, ko, dialog){

        var ctor = {

            mapObj: null,
            marker: ko.observable(),

            activate: function(){
            },

            compositionComplete: function(){
                this.mapObj = map.load('map', null, { callback: this.geocoderCallback });
                this.mapObj.on('contextmenu', function(result){
                    if(this.marker()){
                        this.mapObj.removeLayer(this.marker());
                    }
                    this.marker(L.marker(result.latlng).addTo(this.mapObj));
                }.bind(this));
            },

            geocoderCallback: function(){
                console.log('geo');
            },

            save: function(){

            },

            cancel: function(){
                dialog.close(this);
            }

        };
        return ctor;

    });