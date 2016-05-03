$(function(){
    /*Первый пример*/
    $('#maps-user').mapsAdd({
        'latMaps' : '45.02999845755917',
        'lngMaps' : '38.91300964097593',
        'latMarker' : '45.02999845755917',
        'lngMarker' : '38.91300964097593',
        'markerTitle' : 'Место старта моей самостоятельной жизни',
        'zooms': 16,
        'markerContent' : 'Проспект Чекистов 24',
        'iconImageHref': 'img/maps-add.png'
    });
    $('#maps-admin').mapsAdd({
        'latMaps' : '45.02999845755917',
        'lngMaps' : '38.91300964097593',
        'latMarker' : '45.02999845755917',
        'lngMarker' : '38.91300964097593',
        'markerTitle' : 'Место старта моей самостоятельной жизни',
        'zooms': 16,
        'markerContent' : 'Проспект Чекистов 24',
        'markerFixed' : false,
        'markerShow' : true,
        'MapsShowCenter' : true,
        'zoomsSave' : true,
        'iconImageHref': 'img/maps-add.png'
    });
    /*Второй пример*/
    $('#us-user').mapsAdd({
        'latMaps' : '45.03648863034182',
        'lngMaps' : '38.91429706767484',
        'latMarker' : '45.03673124102103',
        'lngMarker' : '38.920219385179735',
        'zooms': 14,
        'markerFixed' : true,
        'mapsShowCenter' : false,
        'searchHint' : true,
        'circleVisible' : true,
        'circleStrokeColor' : "#3498db",
        'circleFillColor' : "#3498db",
        'markerContent' : 'Область, где я когда либо работал',
        'circleRadius' : 300,
        'scrollwheel' : false,
        'draggable' : true
    });
    $('#us-admin').mapsAdd({
        'latMaps' : '45.03648863034182',
        'lngMaps' : '38.91429706767484',
        'latMarker' : '45.03673124102103',
        'lngMarker' : '38.920219385179735',
        'zooms': 14,
        'MapsShowCenter' : true,
        'markerFixed' : false,
        'markerShow' : true,
        'searchHint' : true,
        'circleVisible' : true,
        'circleRadius' : 300,
        'zoomsSave' : true,
        'circleStrokeColor' : "#3498db",
        'circleFillColor' : "#3498db",
        'markerContent' : 'Область, где я когда либо работал',
        'scrollwheel' : false,
        'draggable' : true,
        'fullscreenControl' : false
    });
    $('#input-us-user').click(function(){
        $('#us-user').mapsAdd('searchMaps');
    });
    $('#input-us-admin').click(function(){
        $('#us-admin').mapsAdd('searchMaps');
    });
    $('#us2').mapsAdd({
        'zooms': 14,
        'MapsCenterPosition' : false,
        'markerFixed' : false,
        'markerShow' : true,
        'nameMapsLat' : 'lat',
        'nameMapsLng' : 'lng',
        'circleMarker' : false,
        'searchHint' : true,
        'iconImageHref': ''
    });
    $('#input-us2').click(function(){
        $('#us2').mapsAdd('searchMaps');
    });
    $('#circle-radius').slideUp();
    $('#marker').click(function(){
        $('#us2').mapsAdd('circleVisible',false);
        $('#circle-radius').slideUp();
    });
    $('#circle').click(function(){
        $('#us2').mapsAdd('circleVisible',true);
        $('#circle-radius').slideDown();
    });
    $( "#radius" ).val(1000);
    $( "#slider-range" ).slider({
        range: "min",
        value: 1000,
        min: 50,
        max: 7000,
        slide: function( event, ui ) {
            $( "#radius" ).val(  ui.value );
            $('#us2').mapsAdd('circleRadius',ui.value);
        }
    });
});