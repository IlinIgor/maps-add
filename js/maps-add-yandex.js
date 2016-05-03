$(function(){
    var methods = {
        init : function(options) {
            var map;
            var mapProp;
            var $this;
            /*settings*/
            var settings = $.extend({},mapsSettings,options);
            /*settings*/
            var markerDraggable = true;
            if (settings.markerFixed == true) {
                markerDraggable = false;
            };
            if (settings.MapsCenter == true) {
                settings.latMaps = settings.latMarker;
                settings.lngMaps = settings.lngMarker;
            };
            $this = this;
            ymaps.ready(function (){
                if (settings.fullscreenControl == true) {
                    var fullscreen = ['zoomControl', 'typeSelector',  'fullscreenControl']
                } else {
                    var fullscreen = ['zoomControl', 'typeSelector']
                }
                mapProp = {
                    center: [settings.latMaps, settings.lngMaps],
                    zoom: settings.zooms,
                    controls: fullscreen
                };
                map = new ymaps.Map($this[0], mapProp);
                if (settings.MapsShowCenter == true) {
                    $this.parent().append('<input type="text" data-maps="lat-maps" mame="' + settings.nameMapsLat + '"/>');
                    $this.parent().append('<input type="text" data-maps="lng-maps" name="' + settings.nameMapsLng + '"/>');
                    $this.parent().children('[data-maps=lat-maps]').val(settings.latMaps);
                    $this.parent().children('[data-maps=lng-maps]').val(settings.lngMaps);
                    map.action.events.add('tick', function (e) {
                        var tick = e.get('tick');
                        $this.parent().children('[data-maps=lat-maps]').val(map.options.get('projection').fromGlobalPixels(tick.globalPixelCenter, tick.zoom)[0]);
                        $this.parent().children('[data-maps=lng-maps]').val(map.options.get('projection').fromGlobalPixels(tick.globalPixelCenter, tick.zoom)[1]);
                    });
                };
                if (settings.scrollwheel == false) {
                    map.behaviors.disable('scrollZoom');
                } else {
                    map.behaviors.enable('scrollZoom');
                };
                if (settings.zoomsSave == true) {
                    $this.parent().append('<input type="text" data-zoom="zoom-maps" mame="' + settings.nameZoomMaps + '"/>');
                    $this.parent().children('[data-zoom=zoom-maps]').val(settings.zooms);
                    map.events.add('boundschange', function(e) {
                        $this.parent().children('[data-zoom=zoom-maps]').val(e.get('newZoom'));
                    });
                };
                if (settings.iconImageHref == '') {
                    var icon = {iconLayout: 'default#image',draggable: markerDraggable}
                } else {
                    var icon = {iconLayout: 'default#image',iconImageHref: settings.iconImageHref,iconImageSize: settings.iconImageSize,iconImageOffset: [-settings.iconImageOffset[0],-settings.iconImageOffset[1]],draggable: markerDraggable}
                };
                var marker = new ymaps.Placemark([settings.latMarker,settings.lngMarker],{
                    hintContent: settings.markerTitle,
                    balloonContentBody: settings.markerContent
                }, icon);
                map.geoObjects.add(marker);
                /*circle*/
                var circle = new ymaps.Circle([
                    [settings.latMarker,settings.lngMarker],
                        settings.circleRadius
                    ], {
                    balloonContent: settings.markerContent,
                    hintContent: settings.markerTitle
                }, {
                    draggable: markerDraggable,
                    fillColor: settings.circleFillColor,
                    strokeColor: settings.circleStrokeColor,
                    strokeOpacity: settings.circleStrokeOpacity,
                    fillOpacity : settings.circleFillOpacity,
                    strokeWidth: settings.circleStrokeWeight
                });
                if (settings.circleVisible == true) {
                    if (settings.circleMarker == true) {
                        map.geoObjects.add(circle);
                    } else {
                        map.geoObjects.add(circle);
                        map.geoObjects.remove(marker);
                    }
                } else  {
                    map.geoObjects.remove(null);
                };
                if (settings.markerShow == true) {
                    $this.parent().append('<input type="text" data-marker="lat" mame="' + settings.nameMarkerLat + '"/>');
                    $this.parent().append('<input type="text" data-marker="lng" mame="' + settings.nameMarkerLng + '"/>');
                    $this.parent().children('[data-marker=lat]').val(settings.latMarker);
                    $this.parent().children('[data-marker=lng]').val(settings.lngMarker);
                }
                marker.events.add('dragend', function (e) {
                    var koordMaps = e.get('target').geometry.getCoordinates();
                    map.setCenter(koordMaps);
                    circle.geometry.setCoordinates(koordMaps);
                    $this.parent().children('[data-marker=lat]').val(koordMaps[0]);
                    $this.parent().children('[data-marker=lng]').val(koordMaps[1]);
                });
                circle.events.add('dragend', function (e) {
                    var koordMaps = e.get('target').geometry.getCoordinates();
                    map.setCenter(koordMaps);
                    marker.geometry.setCoordinates(koordMaps);
                    $this.parent().children('[data-marker=lat]').val(koordMaps[0]);
                    $this.parent().children('[data-marker=lng]').val(koordMaps[1]);
                });
                if ($this.is('[data-kart^=maps-]')) {
                    var attrMap = $this.attr('data-kart');
                    $('[data-search="' + attrMap + '"]').each(function(){
                        if (settings.searchHint == true) {
                            var input = this;
                            new ymaps.SuggestView(input);
                        }
                    });
                }
                $this.data("maps",map);
                $this.data("this",$this);
                $this.data("marker",marker);
                $this.data("circle",circle);
                $this.data("markerFixed",settings.markerFixed);
                $this.data("MapsShowCenter",settings.MapsShowCenter);
                $this.data("circleMarker",settings.circleMarker);
                $this.data("searchBorderError",settings.searchBorderError);
                $this.data("searchColorError",settings.searchColorError);
                $this.data("searchColor",settings.searchColor);
            });
        },
        circleRadius : function(options) {
            this.data("circle").geometry.setRadius(options);
        },
        circleVisible : function(options) {
            if (options == true) {
                if (this.data("circleMarker") == true) {
                    this.data("maps").geoObjects.add(this.data("circle"));
                } else {
                    this.data("maps").geoObjects.add(this.data("circle"));
                    this.data("maps").geoObjects.remove(this.data("marker"));
                }
            } else {
                this.data("maps").geoObjects.add(this.data("marker"));
                this.data("maps").geoObjects.remove(this.data("circle"));
            }
        },
        searchMaps : function(){
            var map = this.data("maps");
            var $this = this.data("this");
            var attrMap = $this.attr('data-kart');
            var marker = this.data("marker");
            var circle = this.data("circle");
            var markerFixed = this.data("markerFixed");
            var MapsShowCenter = this.data("MapsShowCenter");
            var searchBorderError = this.data("searchBorderError");
            var searchColorError = this.data("searchColorError");
            var searchColor = this.data("searchColor");
            var address = $('[data-search="' + attrMap + '"]').val();
            var myGeocoder = ymaps.geocode(address);
            myGeocoder.then(
                function (res) {
                    if (address.length > 0) {
                        $('[data-search="' + attrMap + '"]').css('border',searchColor);
                        map.setCenter(res.geoObjects.get(0).geometry.getCoordinates());
                        if (markerFixed == false) {
                            marker.geometry.setCoordinates(res.geoObjects.get(0).geometry.getCoordinates());
                            circle.geometry.setCoordinates(res.geoObjects.get(0).geometry.getCoordinates());
                            $this.parent().children('[data-marker=lat]').val(res.geoObjects.get(0).geometry.getCoordinates()[0]);
                            $this.parent().children('[data-marker=lng]').val(res.geoObjects.get(0).geometry.getCoordinates()[1]);
                        }
                        if (MapsShowCenter == true) {
                            $this.parent().children('[data-maps=lat-maps]').val(res.geoObjects.get(0).geometry.getCoordinates()[0]);
                            $this.parent().children('[data-maps=lng-maps]').val(res.geoObjects.get(0).geometry.getCoordinates()[1]);
                        }
                    } else {
                        if (searchBorderError == true) {
                            $('[data-search="' + attrMap + '"]').css('border',searchColorError);
                        }
                    }
                },
                function (err) {
                    console.log(err);
                }
            );
        }
    }
    $.fn.mapsAdd = function(method) {
        /*вызов метода*/
        if ( methods[method] ) {
            return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
            return methods.init.apply( this, arguments);
        } else {
            $.error( 'Метод с именем ' +  method + ' не существует для jQuery.tooltip' );
        }
    };
});