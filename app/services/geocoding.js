define(['jquery'], function($){

    return {

        url: 'http://nominatim.openstreetmap.org/reverse?format=json&lat={0}&lon={1}',
        reverse : function(lat, lon){
            return $.getJSON(this.url.format(lat, lon));
        }

    };

})