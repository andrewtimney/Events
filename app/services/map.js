define(['durandal/system', 'jquery', 'OSMGeocoder'], function (system, $, osmgeocoder) {

    var glasgowLatLon = [55.8642370, -4.25180599],
        zoomLevel = 12,
        osmUrl = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
        osmAttrib = '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors';

    //https://github.com/k4r573n/leaflet-control-osm-geocoder

    var defaults = {
        maxZoom: 20,
        zoomControl: true,
        attributionControl: false
        //attribution: osmAttrib
    };

    return {
        load: function (elements, options, geocoderOptions) {
            if (elements instanceof $) {
                var maps = [];
                elements.each(function (i, el) {
                    var map = createMap(el, options, geocoderOptions);
                    maps.push(map);
                });
                return maps;
            } else {
                if (elements instanceof String || elements instanceof Object)
                    return createMap(elements, options, geocoderOptions);
                return createMap('map', options, geocoderOptions);
            }
        }
    };

    function createMap(el, options, geocoderOptions) {
        var opt = {};
        $.extend(opt, defaults, options);
        var zoom = zoomLevel;
        if (opt.zoomLevel)
            zoom = opt.zoomLevel;

        var map = L.map(el, opt).setView(glasgowLatLon, zoom);
        L.tileLayer(osmUrl, opt).addTo(map);

        var osmGeocoder = new L.Control.OSMGeocoder(geocoderOptions);
        map.addControl(osmGeocoder);

        if ('disableAll' in opt)
        {
            map.dragging.disable();
            map.touchZoom.disable();
            map.doubleClickZoom.disable();
            map.scrollWheelZoom.disable();
            map.boxZoom.disable();
            map.keyboard.disable();
        }
        return map;
    }

});