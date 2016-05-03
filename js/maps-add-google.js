$(function(){
    var methods = {
        init : function(options) {
            var map;
            var mapProp;
            var mapskart;
            var settings;
            var markerDraggable;
            var $this;
            var circle;
            /*settings*/
            settings = $.extend({},mapsSettings,options);
            /*settings*/
            markerDraggable = true;
            if (settings.markerFixed == true) {
                markerDraggable = false;
            };
            if (settings.MapsCenter == true) {
                settings.latMaps = settings.latMarker;
                settings.lngMaps = settings.lngMarker;
            };
            /*maps*/
            mapskart = new google.maps.LatLng(settings.latMaps,settings.lngMaps);
            mapProp = {
                scrollwheel: settings.scrollwheel,
                center: mapskart,
                zoom: settings.zooms,
                draggable: settings.draggable,
                fullscreenControl: settings.fullscreenControl
            };
            map = new google.maps.Map(this[0],mapProp);
            this.data("maps",map);
            $this = this;
            if (settings.MapsShowCenter == true) {
                this.parent().append('<input type="text" data-maps="lat-maps" mame="' + settings.nameMapsLat + '"/>');
                this.parent().append('<input type="text" data-maps="lng-maps" name="' + settings.nameMapsLng + '"/>');
                this.parent().children('[data-maps=lat-maps]').val(settings.latMaps);
                this.parent().children('[data-maps=lng-maps]').val(settings.lngMaps);
                map.addListener('center_changed',function(){
                    $this.parent().children('[data-maps=lat-maps]').val(this.center.lat());
                    $this.parent().children('[data-maps=lng-maps]').val(this.center.lng());
                });
            };
            if (settings.zoomsSave == true) {
                this.parent().append('<input type="text" data-zoom="zoom-maps" mame="' + settings.nameZoomMaps + '"/>');
                this.parent().children('[data-zoom=zoom-maps]').val(settings.zooms);
                map.addListener('zoom_changed', function() {
                    $this.parent().children('[data-zoom=zoom-maps]').val(this.zoom);
                });
            };
            /*marker*/
            if (settings.iconImageHref != '') {
                var image = {
                    url: settings.iconImageHref,
                    size: new google.maps.Size(settings.iconImageSize[0], settings.iconImageSize[1]),
                    origin: new google.maps.Point(0, 0),
                    anchor: new google.maps.Point(settings.iconImageOffset[0], settings.iconImageOffset[1])
                };
            } else {
                var image = '';
            }
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(settings.latMarker,settings.lngMarker),
                icon: image,
                draggable: markerDraggable,
                title: settings.markerTitle
            });
            marker.setMap(map);
            this.data("marker",marker);
            /*circle*/
            circle = new google.maps.Circle({
                center: new google.maps.LatLng(settings.latMarker,settings.lngMarker),
                radius: settings.circleRadius,
                strokeColor : settings.circleStrokeColor,
                strokeOpacity : settings.circleStrokeOpacity,
                strokeWeight : settings.circleStrokeWeight,
                fillColor : settings.circleFillColor,
                circleFillOpacity : settings.circleFillOpacity,
                draggable: markerDraggable
            });
            if (settings.circleVisible == true) {
                if (settings.circleMarker == true) {
                    circle.setMap(map);
                } else {
                    circle.setMap(map);
                    marker.setMap(null);
                }
            } else  {
                circle.setMap(null);
            };
            if (settings.markerShow == true) {
                $this.parent().append('<input type="text" data-marker="lat" mame="' + settings.nameMarkerLat + '"/>');
                $this.parent().append('<input type="text" data-marker="lng" mame="' + settings.nameMarkerLng + '"/>');
                $this.parent().children('[data-marker=lat]').val(settings.latMarker);
                $this.parent().children('[data-marker=lng]').val(settings.lngMarker);
            }
            google.maps.event.addListener(marker, "dragend", function() {
                map.setCenter(marker.getPosition());
                circle.setCenter(marker.getPosition());
                $this.parent().children('[data-marker=lat]').val(marker.getPosition().lat());
                $this.parent().children('[data-marker=lng]').val(marker.getPosition().lng());
            });
            google.maps.event.addListener(circle, 'dragend', function() {
                map.setCenter(circle.center);
                marker.setPosition(circle.center);
                $this.parent().children('[data-marker=lat]').val(circle.center.lat());
                $this.parent().children('[data-marker=lng]').val(circle.center.lng());
            });
            if (settings.markerContent != false) {
                var contentString = settings.markerContent;
                var infowindow = new google.maps.InfoWindow({
                    content: contentString
                });
                marker.addListener('click', function() {
                    infowindow.open(map, marker);
                });
                var infoWindowCircle = new google.maps.InfoWindow({
                    content: settings.markerContent

                });
                circle.addListener('click', function() {
                    infoWindowCircle.setPosition(circle.getCenter());
                    infoWindowCircle.open(map);
                });
            };

            this.data("circle",circle);
            /*search*/
            if (this.is('[data-kart^=maps-]')) {
                var attrMap = this.attr('data-kart');
                $('[data-search="' + attrMap + '"]').each(function(){
                    if (settings.searchHint == true) {
                        var infowindowsearch = new google.maps.InfoWindow();
                        var input = this;
                        var autocomplete = new google.maps.places.Autocomplete(input, mapskart);
                        google.maps.event.addListener(autocomplete, 'place_changed', function() {
                            infowindowsearch.close();
                        });
                    }
                });
            }
            this.data("markerFixed",settings.markerFixed);
            this.data("MapsShowCenter",settings.MapsShowCenter);
            this.data("searchBorderError",settings.searchBorderError);
            this.data("searchColorError",settings.searchColorError);
            this.data("searchColor",settings.searchColor);
            this.data("circleMarker",settings.circleMarker);
        },
        circleRadius : function(options) {
            this.data("circle").setRadius(options);
        },
        circleVisible : function(options) {
            if (options == true) {
                if (this.data("circleMarker") == true) {
                    this.data("circle").setMap(this.data("maps"));
                } else {
                    this.data("circle").setMap(this.data("maps"));
                    this.data("marker").setMap(null);
                }
            } else {
                this.data("marker").setMap(this.data("maps"));
                this.data("circle").setMap(null);
            }
        },
        searchMaps : function(){
            var map = this.data("maps");
            var searchColor = this.data("searchColor");
            var attrMap = this.attr('data-kart');
            var markerFixed = this.data("markerFixed");
            var marker = this.data("marker");
            var circle = this.data("circle");
            var MapsShowCenter = this.data("MapsShowCenter");
            var searchBorderError = this.data("searchBorderError");
            var searchColorError = this.data("searchColorError");
            var $this = this;
            var geocoder = new google.maps.Geocoder();
            var address = $('[data-search="' + attrMap + '"]').val();
            geocoder.geocode({
                'address': address
            }, geocodeResult);
            function geocodeResult(results, status) {
                if (status == 'OK' && results.length > 0) {
                    $('[data-search="' + attrMap + '"]').css('border',searchColor);
                    map.setCenter(results[0].geometry.location);
                    if (markerFixed == false) {
                        marker.setPosition(results[0].geometry.location);
                        circle.setCenter(results[0].geometry.location);
                        $this.parent().children('[data-marker=lat]').val(results[0].geometry.location.lat());
                        $this.parent().children('[data-marker=lng]').val(results[0].geometry.location.lng());
                    }
                    if (MapsShowCenter == true) {
                        $this.parent().children('[data-maps=lat-maps]').val(results[0].geometry.location.lat());
                        $this.parent().children('[data-maps=lng-maps]').val(results[0].geometry.location.lng());
                    }
                } else {
                    if (searchBorderError == true) {
                        $('[data-search="' + attrMap + '"]').css('border',searchColorError);
                    }
                }
            }
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