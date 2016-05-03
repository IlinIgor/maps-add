<!doctype html>
<html lang="ru">
<head>
    <meta charset="utf-8">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/maps-add.css">
    <link rel="stylesheet" href="css/jquery-ui.css">
    <script src="js/jquery-1.11.3.min.js"></script>
    <script src="js/jquery-ui.js"></script>
    <script src="//api-maps.yandex.ru/2.1/?lang=ru_RU&load=SuggestView&onload=onLoad"></script>
    <script src="//api-maps.yandex.ru/2.1/?lang=ru_RU" type="text/javascript"></script>
    <script src="js/maps-add-param.js" type="text/javascript"></script>
    <script src="js/maps-add-yandex.js" type="text/javascript"></script>
    <script src="js/script.js" type="text/javascript"></script>
    <title>maps-add</title>
</head>
<body>
<div class="content">
<div class="header">MAPS-ADD API</div>
<div class="text">
    Плагин предназначен для работы с гугл и яндекс картой, добавлением и отображением одной метки на ней.
</div>
<div class="text center margin-top">
    <a href="index2.php">Яндекс</a>
    <a href="index.php">Google</a>
</div>
<div class="subhead">
    ПРИМЕРЫ
</div>
<div class="clearfix">
    <div class="float-left width-50">
        <div class="text">
            Пользователь
        </div>
        <div>
            <div id="maps-user" class="maps"></div>
        </div>
    <pre><code>
$('#maps-user').mapsAdd({
    'latMaps' : '45.02999845755917',
    'lngMaps' : '38.91300964097593',
    'latMarker' : '45.02999845755917',
    'lngMarker' : '38.91300964097593',
    'markerTitle' :'Начало моей самостоятельной жизни',
    'zooms': 16,
    'markerContent' : 'Проспект Чекистов 24',
    'iconImageHref': 'img/maps-add.png'
});</code></pre>
    </div>
    <div class="float-right width-50">
        <div class="text">
            Администратор
        </div>
        <div>
            <div id="maps-admin" class="maps"></div>
        </div>
<pre><code>
$('#maps-admin').mapsAdd({
    'latMaps' : '45.02999845755917',
    'lngMaps' : '38.91300964097593',
    'latMarker' : '45.02999845755917',
    'lngMarker' : '38.91300964097593',
    'markerTitle' :'Начало моей самостоятельной жизни',
    'zooms': 16,
    'markerContent' : 'Проспект Чекистов 24',
    'markerFixed' : false,
    'markerShow' : true,
    'MapsShowCenter' : true,
    'zoomsSave' : true,
    'iconImageHref': 'img/maps-add.png'
});</code></pre>
    </div>
</div>
<div class="text">
    Отображение области и поиск по карте.
</div>
<div class="clearfix">
    <div class="float-left width-50">
        <div class="text">
            Пользователь
        </div>
        <div>
            <input type="text" data-search="maps-us-user" class="search-text" mame=""/>
            <input id="input-us-user" type="button" class="search-button" name="" value="Найти"/>
            <div id="us-user" data-kart="maps-us-user" class="maps"></div>
        </div>
    <pre><code>
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
});</code></pre>
    </div>
    <div class="float-right width-50">
        <div class="text">
            Администратор
        </div>
        <div>
            <input type="text" data-search="maps-us-admin" class="search-text" mame=""/>
            <input id="input-us-admin" type="button" class="search-button" name="" value="Найти"/>
            <div id="us-admin" data-kart="maps-us-admin" class="maps"></div>
        </div>
<pre><code>
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
});</code></pre>
    </div>
</div>
<div class="text">
    Наличие методов позволяет изменять параметры по любому действию.
</div>
<div>
    <input type="text" data-search="maps-us2" class="search-text" mame=""/>
    <input id="input-us2" type="button" class="search-button" name="" value="Найти"/>
    <div class="radio-button">
        <div class="clearfix radio-block">
            <input type="radio" id="marker" name="map" class="float-left" checked="checked">
            <label class="float-left radio-maps" for="marker">Указать метку</label>
        </div>
        <div class="clearfix radio-block">
            <input type="radio" id="circle" name="map" class="float-left">
            <label class="float-left radio-maps" for="circle">Указать область</label>
        </div>
        <div id="circle-radius">
            <div class="clearfix radio-block">
                <label for="radius" class="float-left radius-maps">Радиус </label>
                <input type="text" id="radius" class="input-bar color-black float-left">
            </div>
            <div id="slider-range" class="slider-bar"></div>
        </div>
    </div>
    <div id="us2" data-kart="maps-us2" class="maps"></div>
</div>
    <pre><code>
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
});</code></pre>
<div class="subhead">
    СПРАВОЧНИК
</div>
<div class="text">
    Входные переменные
</div>
    <pre><code>
'latMaps' : '45.03926740000001',---------Широта центра карты
'lngMaps' : '38.98722099999998',---------Долгота центра карты
'zooms' : 12,----------------------------Зум карты
'zoomsSave' : false,---------------------Отражать/скрывать текстовое поле со значением зума
'scrollwheel' : false,-------------------Позволять/Не позволять менять масштаб карты прокруткой колеса при
наведенном курсоре на карту
'draggable' : true,----------------------Позволять/Не позволять изменять положение карты
'fullscreenControl' : false,-------------Отражать/скрывать на панели инструментов карты кнопку позволяющую
раскрыть карту на весь экран
'MapsCenter' : false,--------------------Координаты карты всегда равны/не равны координатам метки или области
'MapsShowCenter' : false,----------------Отображать/Не отображать координаты центра карты
'latMarker' : '45.03926740000001',-------Широта центра метки или области
'lngMarker' : '38.98722099999998',-------Долгота центра метки или области
'markerFixed' : true,--------------------Позволять/Не позволять перемещать метку или область
'markerShow' : false,--------------------Отображать/Не отображать координаты центра метки или области
'nameMapsLat' : 'maps-lat',--------------Наименование (name) текстового поля широты карты
'nameMapsLng' : 'maps-lng',--------------Наименование (name) текстового поля долготы карты
'nameMarkerLat' : 'marker-lat',----------Наименование (name) текстового поля широты метки или области
'nameMarkerLng' : 'marker-lng',----------Наименование (name) текстового поля долготы метки или области
'nameZoomMaps' : 'zoom-maps',------------Наименование (name) текстового поля зума карты
'markerTitle' : '',----------------------Текст, появляющийся при наведении на метку
'markerContent' : false,-----------------Текст, появляющийся при клике на метку или область
'iconImageHref': '',---------------------Иконка метки. Если пусто, то выводится стандартная иконка
'iconImageSize': [32, 32],---------------Размеры иконки в px (работает только когда используется свое отображение
иконки)
'iconImageOffset': [16, 32],-------------Смещение иконки (работает только когда используется свое отображение
иконки)
'circleVisible' : false,-----------------Отображать/Скрывать область
'circleRadius' : 1000,-------------------Радиус области
'circleStrokeColor' : "#0000FF",---------Цвет обводки области
'circleStrokeOpacity' : 0.8,-------------Прозрачность обводки области
'circleStrokeWeight' : 2,----------------Толщина обводки области
'circleFillColor' : "#0000FF",-----------Фон области
'circleFillOpacity' : 0.4,---------------Прозрачность области
'circleMarker' : false,------------------Отображать/Не отображать область вместе с меткой
'searchHint' : true,---------------------Отображать/Не отображать подсказки при поиске
'searchColorError' : '1px solid #e48484',Цвет радиуса текстового поля при ошибке ввода запроса для поиска
(не обязательно)
'searchColor' : '1px solid #d8d8d8',-----Цвет радиуса текстового поля при успешном вводе запроса для поиска
(не обязательно)
'searchBorderError' : true---------------Включить/Выключить валидацию по текстовому полю поиска</code></pre>
<div class="text">
    Методы.
</div>
<pre><code>
$('id карты').mapsAdd('searchMaps');---------------------------Поиск по карте
$('id карты').mapsAdd('circleVisible',false/true);-------------Скрыть/показать область
$('id карты').mapsAdd('circleRadius',значение радиуса)--------Изменить радиус области
</code></pre>
<div class="text">
    Параметры data, подключение текстового поля поиска.
</div>
<pre><code>При добавлении к карте текстового поля для поиска необходимо добавить текстовое поле
и привязать его с помощью data. Для этого к блоку карты добавляем data параметр data-kart="maps-...",
а к текстовому полю добавляем data-search="maps-...".
</code></pre>
<div class="subhead">
    Ссылка на скачивание <a href="maps-add.zip">maps-add.zip</a>
</div>
</div>
</body>
</html>