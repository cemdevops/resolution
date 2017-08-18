// http://bl.ocks.org/oriolbx
// http://bl.ocks.org/javisantana
// http://bl.ocks.org/michellechandra/90d59f022ad7e9fd0e5d legenda

// theme: 1--> demografia, 2-->raca e emigração, 3--> religião, 4-->educação, 5-->Renda e trabalho

/*
Constants and global parameters read from config.json can be found in queries.js file
*/

// Mariela: Event triggered by clicking in base/thematic map button
$("#option_basemap_thematic").click(function () {
    if ($("#option_basemap_thematic").val() == 'COM MAPA BASE'){
        // Show the base map and/or thematic map
        addBaseMap('osm');

        // Change the background image and button description
        $("#option_basemap_thematic").attr('value', 'SEM MAPA BASE');
        $("#option_basemap_thematic").attr('title','Click aqui para visualizar o mapa temático sem o mapa base!');
        $("#option_basemap_thematic").removeClass("base-map");
        $("#option_basemap_thematic").addClass("thematic-map");

    } else{
        // Show only the thematic map
        removeBaseMap(layerMapaBaseSel);

        // Change the background image and the button text
        $("#option_basemap_thematic").attr('value', 'COM MAPA BASE');
        $("#option_basemap_thematic").attr('title','Click aqui para visualizar o mapa temático com o mapa base!');
        // $("#option_basemap_thematic").toggleClass("base-map thematic-map"); // add 'base-map', remove 'thematic-map'
        $("#option_basemap_thematic").removeClass("thematic-map");
        $("#option_basemap_thematic").addClass("base-map");
    }
});

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Initial Map's properties definitions
var map = L.map("map", {
    center: [-23.60, -46.55], // center map in this position
    zoom: ZOOM_INITIAL_LEVEL, // initial zoom level
    maxZoom: ZOOM_MAX_LEVEL, // maximum zoom level
    minZoom: ZOOM_MIN_LEVEL // minimum zoom level
});

// Create additional Control placeholders
function addControlPlaceholders(map) {
	var corners = map._controlCorners,
        l = 'leaflet-',
        container = map._controlContainer;

    function createCorner(vSide, hSide) {
        var className = l + vSide + ' ' + l + hSide;

        corners[vSide + hSide] = L.DomUtil.create('div', className, container);
    }

    createCorner('verticalcenter', 'left');
    createCorner('verticalcenter', 'right');
    createCorner('verticalcustom', 'left');
    createCorner('verticalcustom', 'right');
}
addControlPlaceholders(map);
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Mariela: Specify the zoom control
map.zoomControl.setPosition('verticalcustomleft');
// André - 20170512: inclusão de escala (km) no mapa
L.control.scale({metric: true, imperial: false, position: 'verticalcustomleft' }).addTo(map);


// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// OpenStreetMap
// url para o tile server + copyright - OpenStreetMap
var urlOSM = "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
// copyright para as imagens
var copyOSM = "&copy; <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a>";
// definição dos layers (URL xyz + copyright)
var layerOSM = L.tileLayer(urlOSM, {attribution: copyOSM});
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// CartoDB
// url para o tile server - Carto (Positron) + OpenStreetMap
// var urlPositron = "http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png";
var urlPositronNoLabels = "http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png";
// url para o tile server - Carto (DarkMatter) + OpenStreetMap
var urlDarkMatter = "http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png";
// copyright para as imagens
var copyCarto = "&copy; <a href='https://carto.com/attributions'>CARTO</a>";
// definição dos layers (URL xyz + copyright)
// var layerPositron = L.tileLayer(urlPositron, {attribution: copyOSM});
var layerPositron = L.tileLayer(urlPositronNoLabels, {attribution: copyOSM});
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
var layerDarkMatter = L.tileLayer(urlDarkMatter, {attribution: copyOSM});

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Google Maps
// url para o tile server + copyright - OpenStreetMap
var urlGoogle = "http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}";
// copyright para as imagens
var copyGoogle = "&copy; <a href='http://maps.google.com'>Google Maps</a>";
// definição dos layers (URL xyz + copyright)
var layerGoogle = L.tileLayer(urlGoogle, {attribution: copyGoogle});
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// Mariela: inicalizamos o portal usando o mapa base de OSM
layerOSM.addTo(map);

// Mariela: definição da variável para armazenar o mapa base usado
var layerMapaBaseSel = 'osm';

// Mariela: CONTROLE DOS BASEMAPS
removeBaseMap(layerMapaBaseSel);
addBaseMap('osm');

// Mariela: Add base map according the type of map chosen
function addBaseMap(typeOfBaseMapChosen) {

    if (typeOfBaseMapChosen=="osm") {
            map.addLayer(layerOSM);
            layerMapaBaseSel = 'osm';

        } else if (typeOfBaseMapChosen=="google_maps") {
            map.addLayer(layerGoogle);
            layerMapaBaseSel = 'google_maps';

        } else if (typeOfBaseMapChosen=="carto_positron") {
            map.addLayer(layerPositron);
            layerMapaBaseSel = 'carto_positron';

        } else if (typeOfBaseMapChosen=="carto_darkmatter") {
            map.addLayer(layerDarkMatter);
            layerMapaBaseSel = 'carto_darkmatter';
        }
}

// Mariela: Remove the existing base map
function removeBaseMap(typeOfBaseMapChosen) {

    if (typeOfBaseMapChosen=="osm") {
            map.removeLayer(layerOSM);

        } else if (typeOfBaseMapChosen=="google_maps") {
            map.removeLayer(layerGoogle);

        } else if (typeOfBaseMapChosen=="carto_positron") {
            map.removeLayer(layerPositron);

        } else if (typeOfBaseMapChosen=="carto_darkmatter") {
            map.removeLayer(layerDarkMatter);
        }
}

// +++++++++++++++++++++++++++++++++++++++++THEMATIC LAYER++++++++++++++++++++++++++++++++++++++++++++

// Manages the layers for each theme dropdownlist
cartodb.createLayer(map,{
        user_name: "cemdevops",
        type: "cartodb",
        sublayers: []
    })
    .addTo(map)
    .done(function(layer){
        // colocando ordem de sobreposição dos layers
        layer.setZIndex(1);

        $("#option_basemap_thematic").click(function () {
          showThematicLayer(layer);
          console.log("changing... base map thematic");
        });

        $("#option_variables").change(function(){
          showThematicLayer(layer);
          console.log("changing variables");
        });

        $("#option_theme").change(function(){
          console.log("changing theme");
          // Clear all transport active layers
          layer.getSubLayers().forEach(function(sublayer){sublayer.remove()});
          // Check if layer's legend. Remove if exists
          takeOutLegend();
        })
    });

/*
 * Function to take out the legend of screen
 */
function takeOutLegend(){
  // Check if layer's legend. Remove if exists
  if ($("div.cartodb-legend.choropleth").length) {
    $('div.cartodb-legend.choropleth').remove();
  }
}

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
/*
 * Function to show thematic layer
 */
function showThematicLayer(layer){
  // Clear all transport active layers
  layer.getSubLayers().forEach(function(sublayer){sublayer.remove()});

  // get Variable code. For example, p3_001, p11_001 . codVariable == op
  //var op = $(this).val(); //$(this).attr("value");
  var el = document.getElementById("option_variables");
  var op = el.options[el.selectedIndex].value;

  // get selected Theme
  var e = document.getElementById("option_theme");
  var theme = e.options[e.selectedIndex].value;
  console.log(theme +'-'+ op);

  // Check if layer's legend. Remove if exists
  takeOutLegend();

  // if option is valid, tooltip and legend will be build
  if(op != 'selecione') {
    // get button value
    var buttonVal = document.getElementById("option_basemap_thematic").value;
    // If button value is 'Mapa base' is because the basemap isn't visible
    var opacity = buttonVal == 'COM MAPA BASE' ? polygonOpacityWithoutBaseMap : polygonOpacityWithBaseMap;

    // get all data configuration of current layer, based on theme and variable (op)
    var currentLayerData = getCurrentLayerData (theme, op);
    // get data class method values for current method (quantile or jenks).
    var arrayDataClassBreaks =  currentLayerData[currentDataClassificationMethod];

    // Create sublayer - thematic
    layer.createSubLayer(getQueryAndCssToCreateLayer(op, currentLayerData.tableName, arrayDataClassBreaks, noValueClassColor, quantiles_colors_hex, opacity,currentLayerData.showEdge));

    // Get data of current layer on screen
    var sublayer = layer.getSubLayer(0);

    // Set table column (on carto dataset) to be retrieved and showed in legend
    sublayer.setInteractivity(currentLayerData.colTableToLegend + ',' + op);


    // 20170331: 'featureOver' event function. Show values in legend (inside colored cells)
    sublayer.on('featureOver', function(e,latlng,pos,data) {
        // get value from carto dataset (tooltip)
        valor = data[op];
        // Clear legend content
        for (i=1; i < 8; i++) {
            document.getElementById("celula"+i).innerHTML = "";
        }
        document.getElementById("nodata").innerHTML = "";

        // Fill district value in legend
        document.getElementById("bairro").innerHTML = data[currentLayerData.colTableToLegend];
        // Fill legend cell with data set value
        if (valor >= 0 && valor <= arrayDataClassBreaks[6]) {
            document.getElementById("celula" + getClassBreaksCel (valor, arrayDataClassBreaks)).innerHTML = valor;
        } else {
            document.getElementById("nodata").innerHTML = noDataMessage;
        }
    }); // sublayer.on
    // ... Clóvis/André 20170331

    sublayer.on('featureOut', function(e,latlng,pos,data) {
        // Clear legend content
        for (i=1; i < 8; i++) {
            document.getElementById("celula"+i).innerHTML = "";
        }
        document.getElementById("nodata").innerHTML = "";
    }); // sublayer.on

    // Create tooltip to get information related to mouse location (mouse hover), just to be presented in legend
    var toolTip = createInfoboxTooltip(layer,sublayer,currentLayerData.colTableToLegend);
    $('body').append(toolTip.render().el);

    // var to define if data classification method choice (quantile or jenks) will be enabled in legend
    var bolEnableDataMethod = true;
    // Build legend. 20170331: creation of class=quartile-cem. 20170623: legend str composition in separated function. Units included.
    var legenda = getStrLegend (currentLayerData.title, currentLayerData.polygonArea, currentLayerData.minLegendValue, currentLayerData.maxLegendValue, bolEnableDataMethod, opacity, currentDataClassificationMethod);

    // add legend to map
    $('body').append(legenda);

    // Clóvis - 20170626: change event - selection between quantile and natural break (jenks)...
    $("input[type=radio][name=radioDataMethod]").change (function () {
      // Update current data classification method
      // sublayer.setCartoCSS(getQueryAndCssToCreateLayer(op, currentLayerData.tableName, arrayDataClassBreaks = currentLayerData[currentDataClassificationMethod = this.value], quantiles_colors_hex, opacity, currentLayerData.showEdge).cartocss);
      // get current data classification method (quantile or jenks)
      currentDataClassificationMethod = this.value;
      // get array of data classification method breaks
      arrayDataClassBreaks =  currentLayerData[currentDataClassificationMethod];
      // get carto query and CSS
      var layerConf = getQueryAndCssToCreateLayer(op, currentLayerData.tableName, arrayDataClassBreaks, noValueClassColor, quantiles_colors_hex, opacity, currentLayerData.showEdge);
      // set carto CSS of current layer
      sublayer.setCartoCSS(layerConf.cartocss);
    });
    // ... Clóvis - 20170626: change event - selection between quantile and natural break (jenks)
  }
}

/*
 * Function to define the legend cell where the value from carto dataset will be presented
 */
function getClassBreaksCel (valor, arrayDataClassBreaks) {
    if (valor <= arrayDataClassBreaks[0]) {
        // document.getElementById("celula1").innerHTML = valor;
        return (1)
    } else if (valor <= arrayDataClassBreaks[1]) {
        return (2)
    } else if (valor <= arrayDataClassBreaks[2]) {
        return (3)
    } else if (valor <= arrayDataClassBreaks[3]) {
        return (4)
    } else if (valor <= arrayDataClassBreaks[4]) {
        return (5)
    } else if (valor <= arrayDataClassBreaks[5]) {
        return (6)
    } else if (valor <= arrayDataClassBreaks[6]) {
        return (7)
    }
}

/*
 * Function to create a infobox tooltip
 * Show the polygon informations as Infobox or Tooltip (mouse hover)
 */
function createInfoboxTooltip(layer, sublayer, colName){
    return layer.leafletMap.viz.addOverlay({
        // Clóvis/André 20170331: type modified from tooltip to infobox
        type: 'infobox',
        layer: sublayer,
        // Clovis/Andre 20170331: template modified to hidden - workaround
        //template: "<div class='cartodb-tooltip-content-wrapper'><h4>{{nom_ba}}</h4><p>{{"+op+"}}</p></div>",
        template: "<div style='Visibility:hidden'></div>",
        width: 200,
        position: 'bottom|right',
        fields: [{ colName: colName}]
    });
}

/**
 * Function to create legend string.
 * Return the HTML used to put legend on screen
 */
function getStrLegend (strTitle, strUnit, strMinValue, strMaxValue, bolEnableMethod, opacity, strClassMethod) {
    var textColorForDarkBackground = opacity == 1 ? 'white': 'black';
    var strLegend = "<div class='cartodb-legend choropleth cartodb-legend-container' style='border-radius: 6px;'> " +
          "  <div id=\"title_legend\">LEGENDA</div><br>" +
          "  <div class='legend-title' title='Variável escolhida'>" + strTitle + "</div>" +
          "  <div> (" + strUnit + ")</div> <br>" +
          "  <div id ='bairro' class='legend-title' style='height:20px' title='Bairro'> </div>" +
          "  <ul>" +
          "      <li class='min'>" + strMinValue + "</li>" +
          "      <li class='max'>" + strMaxValue + "</li>" +
          "      <li class='graph count_441'>" +
          "        <div class='colors'>" +
          "          <div class='quartile-cem' id='celula1' style='background:rgba(255, 255, 178," + opacity + ");color:black;'></div>" +
          "          <div class='quartile-cem' id='celula2' style='background:rgba(254, 217, 118," + opacity + ");color:black;'></div>" +
          "          <div class='quartile-cem' id='celula3' style='background:rgba(254, 178, 76," + opacity + ");color:black;'></div>" +
          "          <div class='quartile-cem' id='celula4' style='background:rgba(253, 141, 60," + opacity + ");color:black;'></div>" +
          "          <div class='quartile-cem' id='celula5' style='background:rgba(252, 78, 42," + opacity + ");color:black;'></div>" +
          "          <div class='quartile-cem' id='celula6' style='background:rgba(227, 26, 28," + opacity + ");color: " + textColorForDarkBackground + ";'></div>" +
          "          <div class='quartile-cem' id='celula7' style='background:rgba(177, 0, 38," + opacity + ");color: " + textColorForDarkBackground + ";'></div>" +
          "        </div>" +
          "      </li>" +
          "  </ul>" +
          "  <div style='padding: 7px 0px 0px 0px;'>" +
          "     <div class='cell-cem-no-value' id='celula8' style='background:" + noValueClassColor + ";opacity:" + opacity + "'></div>" +
          "     <div class='cell-cem-no-value-text' id='nodata' style='width:43%; padding: 0px 0px 0px 5px;color:black;text-align:left'></div>" +
          "     <div class='cell-cem-no-value' id='celula9' style='background:#93887E;opacity:" + opacity + "'></div>" +
          "     <div class='cell-cem-no-value-text' id='nodata1' style='padding: 0px 0px 0px 5px;color:gray;font-size: 10px;text-align:left'>Região Metropolitana</div>" +
          "  </div>";

    // Clóvis - 20170623: Optional selection between Natural Breaks and Quantils...
    if (bolEnableMethod) {
        strLegend = strLegend + " <br> <div id='containerOptionsDataMethod'>" +
          "    <form id='selectDataMethod'>" +
          "       <fieldset>" +
          "         <legend><b>Método de classificação de dados:</b></legend>" +
          "         <div class='radio'>" +
          "           <label><input type='radio' name='radioDataMethod' id='radioQuantil' value='quantiles' ";
        if (strClassMethod == "quantiles") {
            strLegend = strLegend + " checked";
        }
        strLegend = strLegend + ">Quantile</label>" +
          "         </div>" +
          "         <div class='radio'>" +
          "           <label><input type='radio' name='radioDataMethod' value='jenks' ";
        if (strClassMethod == "jenks") {
            strLegend = strLegend + " checked";
        }
        strLegend = strLegend + ">Jenks Natural Breaks</label>" +
          "         </div>" +
          "       </fieldset>" +
          "    </form>" +
          "  </div>";
     }
    // ... Clóvis - 20170623: Optional selection between Natural Breaks and Quantils...

     strLegend = strLegend + "</div>";
     return (strLegend);
}

// ++++++++++++++++++++++++++ TRANSPORTS (RAILS AND METRO) LAYER ++++++++++++++++++++++++++
// array (carto configuration) used to show/hide rails and metro line
var transportes = {
    "metro_linha": {
        sql: "SELECT * FROM resolution_metro_linhas",
        cartocss: "#resolution_metro_linhas{line-color: #fff; line-opacity: 0.5;} " +
            "#resolution_metro_linhas [ linha = 'Azul'     ] { line-color: #0153A0; } " + // linha 1-Azul
            "#resolution_metro_linhas [ linha = 'Verde'    ] { line-color: #008061; } " + // linha 2-Verde
            "#resolution_metro_linhas [ linha = 'Vermelha' ] { line-color: #EE3E34; } " + // linha 3-Vermelha
            "#resolution_metro_linhas [ linha = 'Amarela'  ] { line-color: #FED304; } " + // linha 4-Amarela
            "#resolution_metro_linhas [ linha = 'Lilas'    ] { line-color: #A54499; } " + // linha 5-Lilás
            "[zoom=9] {line-width: 0.0;} " +
            "[zoom=10] {line-width: 2.6;} " +
            "[zoom=11] {line-width: 2.4;} " +
            "[zoom=12] {line-width: 2.2;} " +
            "[zoom=13] {line-width: 2.0;} " +
            "[zoom=14] {line-width: 1.8;} " +
            "[zoom=15] {line-width: 1.6;} " +
            "[zoom=16] {line-width: 1.4;} " +
            "[zoom=17] {line-width: 1.2;} " +
            "[zoom=18] {line-width: 1.0;} " +
            "[zoom=19] {line-width: 0.0;} "
    },
    "trem_linha": {
        sql: "SELECT * FROM resolution_trem_linhas",
        cartocss: "#resolution_trem_linhas{line-color: #fff; line-opacity: 0.5;}" +
            "#resolution_trem_linhas [ id = 2 ] { line-color: #9E1766; }" + // Linha 7 - Rubi
            "#resolution_trem_linhas [ id = 3 ] { line-color: #9E9E93; }" + // Linha 8 - Diamante
            "#resolution_trem_linhas [ id = 4 ] { line-color: #00A78E; }" + // Linha 9 - Esmeralda
            "#resolution_trem_linhas [ id = 5 ] { line-color: #007C8F; }" + // Linha 10 - Turquesa
            "#resolution_trem_linhas [ id = 6 ] { line-color: #F04D22; }" + // Linha 11 - Coral
            "#resolution_trem_linhas [ id = 7 ] { line-color: #083E89; }" + // Linha 12 - Safira
            "[zoom=9] {line-width: 0.0;} " +
            "[zoom=10] {line-width: 2.6;} " +
            "[zoom=11] {line-width: 2.4;} " +
            "[zoom=12] {line-width: 2.2;} " +
            "[zoom=13] {line-width: 2.0;} " +
            "[zoom=14] {line-width: 1.8;} " +
            "[zoom=15] {line-width: 1.6;} " +
            "[zoom=16] {line-width: 1.4;} " +
            "[zoom=17] {line-width: 1.2;} " +
            "[zoom=18] {line-width: 1.0;} " +
            "[zoom=19] {line-width: 0.0;} "
    }
};

// checckboxs controls to show/hide rails and metro line
cartodb.createLayer(map,{
        user_name: "cemdevops",
        type: "cartodb",
        sublayers: []
    })
    .addTo(map)
    .done(function(layer){
        // set layer in order of overlap
        layer.setZIndex(1);
        // throw this function after checckboxs click
        $("input[name='transporte']").change(function(){
            // first, we must remove all active transport layer
            layer.getSubLayers().forEach(function(sublayer){sublayer.remove()});
            // add sublayer to the map
            $.each($("input[name='transporte']:checked"), function(){
                layer.createSubLayer(transportes[$(this).attr("id")]);
            });
        });
    });

// ++++++++++++++++++++++++++++++++++++++ PLACES LAYER ++++++++++++++++++++++++++++++++++++++
// array (carto configuration) used to show/hide places names
var places = {
    "rmsp": {
        sql: "SELECT * FROM resolution_places_osm_rmsp  WHERE type='city' OR type='town'",
        cartocss: "#resolution_places_osm_rmsp::labels {text-name: [name]; text-face-name: 'Lato Bold'; text-size: 12;" +
                                                "text-label-position-tolerance: 0; text-fill: #000; text-halo-fill: #fff; " +
                                                "text-halo-radius: 1.5; text-dy: 0; text-allow-overlap: false; " +
                                                "text-placement: point; text-placement-type: dummy;}"
    }
};

/*
 * Function to add the places layer
 */
cartodb.createLayer(map,{
        user_name: "cemdevops",
        type: "cartodb",
        sublayers: []
    })
.addTo(map) // add the layer to our map which already contains 0 sublayers
.done(function(placesLayer){
    var placesSublayer = null;
    var zoomControleLabel = ZOOM_INITIAL_LEVEL;
    // control places names (show/hide)
    map.on('zoomend', function (e) {
        if (placesLayer.getSubLayerCount()>0) {
            // get zoom level
            zoomControleLabel = map.getZoom();
            if (zoomControleLabel < 13) {
                placesSublayer.setSQL("SELECT * FROM resolution_places_osm_rmsp WHERE type='city' OR type='town'");
            } else  {
                placesSublayer.setSQL("SELECT * FROM resolution_places_osm_rmsp");
            }
        }
    });

    // Put the places layer on anothers layers
    placesLayer.setZIndex(1);
    // used to show/hide places names
    $("#option_basemap_thematic").click(function () {
        placesSublayer = showPlacesLayer(placesLayer,placesSublayer);
    });
    // used to show/hide places names
    $("#option_theme").change(function(){
        placesSublayer = showPlacesLayer(placesLayer,placesSublayer);
    });
    // used to show/hide places names
    $("#option_variables").change(function(){
        placesSublayer = showPlacesLayer(placesLayer,placesSublayer);
    });
});

/*
 * Function to show the places layer
 */
function showPlacesLayer(placesLayer,placesSublayer){
    // get button value
    var buttonVal = document.getElementById("option_basemap_thematic").value;
    // get variable value chosen
    var variableSel = document.getElementById("option_variables").value;

    // Clean the places layer
    placesLayer.getSubLayers().forEach(function(placesSublayer){placesSublayer.remove()});

    if (variableSel != 'selecione' && variableSel != '' && buttonVal == 'COM MAPA BASE'){
        // create and add a new sublayer to map
        placesLayer.createSubLayer(places["rmsp"]);
        // this line is used to show places layer while the zoom is working
        placesSublayer = placesLayer.getSubLayer(0);
    }

    return placesSublayer;
}
// PLACES LAYER

// +++++++++++++++++++++++++++++++++++++ WATER LAYER +++++++++++++++++++++++++++++++++++++
cartodb.createLayer(map,{
        user_name: "cemdevops",
        type: "cartodb",
        sublayers: []
    })
    .addTo(map)
    .done(function(layer){
        // set layer in order of overlap
        layer.setZIndex(-1);
        // add layer to the map
        layer.createSubLayer({
            sql: "SELECT * FROM resolution_cem_aguas_2",
            cartocss: "#resolution_cem_aguas_2{polygon-fill:#526475; line-color:#526475}"
        });
    });
// WATER LAYER


// +++++++++++++++++++++++++++++++++++++ RMSP +++++++++++++++++++++++++++++++++++++
// metropolitan region of São Paulo
// testing layer
cartodb.createLayer(map,{
        user_name: "viniciusmaeda", // alter to CEM account
        type: "cartodb",
        sublayers: []
    })
    .addTo(map)
    .done(function(layer){
        // set layer in order of overlap
        layer.setZIndex(-2);
        // add layer to the map
        layer.createSubLayer({
            sql: "SELECT * FROM sc2010_rmsp_cem_r_merge",
            cartocss: "#sc2010_rmsp_cem_r_merge{polygon-fill:#93887e; line-color:#93887e}"
        });
    });

    
