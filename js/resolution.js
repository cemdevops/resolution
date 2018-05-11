// http://bl.ocks.org/oriolbx
// http://bl.ocks.org/javisantana
// http://bl.ocks.org/michellechandra/90d59f022ad7e9fd0e5d legenda

// theme: 1--> demografia, 2-->raca e emigração, 3--> religião, 4-->educação, 5-->Renda e trabalho

/*
Constants and global parameters read from config.json can be found in queries.js file
*/

// Mariela: Event triggered by clicking in base/thematic map button
$("#option_basemap_thematic").click(function () {
    if ($("#option_basemap_thematic").val() == globalLangTokens.withBaseMapString){
        // Show the base map and/or thematic map
        addBaseMap('osm');

        // Change the background image and button description
        $("#option_basemap_thematic").attr('value', globalLangTokens.withoutBaseMapString);
        $("#option_basemap_thematic").attr('title',globalLangTokens.withoutBaseMapTitle);
        $("#option_basemap_thematic").removeClass("base-map");
        $("#option_basemap_thematic").addClass("thematic-map");
        showRMSP(1, 0);


    } else{
        // Show only the thematic map
        removeBaseMap(layerMapaBaseSel);

        // Change the background image and the button text
        $("#option_basemap_thematic").attr('value', globalLangTokens.withBaseMapString);
        $("#option_basemap_thematic").attr('title',globalLangTokens.withBaseMapTitle);
        // $("#option_basemap_thematic").toggleClass("base-map thematic-map"); // add 'base-map', remove 'thematic-map'
        $("#option_basemap_thematic").removeClass("thematic-map");
        $("#option_basemap_thematic").addClass("base-map");
    }
});

// Change language tokens in page
function changeLanguage (strNewLanguage) {
    if (strNewLanguage != globalCurrentLanguage) {
        
        // Store prior language
        auxglobalCurrentLanguage = globalCurrentLanguage;
        
        // change language
        // Get new language tokens
        globalCurrentLanguage = strNewLanguage;

        // get current theme and variable
        var e = document.getElementById("option_theme");
        var theme = e.options[e.selectedIndex].value;
        var el = document.getElementById("option_variables");
        var op = el.options[el.selectedIndex].value
        if (op == globalLangTokens.variableOptionSelectString) {
            op = "";
        }

        // Load new tokens. Function in queries.js.
        getLanguageTokens ();

        // Change tokens in pages
        updateLanguageTokens ();

        // Change tokens in themes and variables window
        // Clear themes
        var selectControl = document.getElementById("option_theme");
        var option = null;
        // Remove elements of "variables" select control
        var numberOfVariables = selectControl.options.length;
        for (var i = 0; i<numberOfVariables; i++) {
            selectControl.remove(0);
        }
        // Populate themes
        populateThemes(theme);

        // Populate variables
        populateVariables (theme, op);

        // Change variable in legend
        if ($("div.cartodb-legend.choropleth").length) {
            // Legend is active. Change.
            var currentLayerData = getCurrentLayerData (theme, op);
            $("#legendVariableStr").text(currentLayerData.title);
            $("#legendVariableUnit").text("(" + currentLayerData.polygonArea + ")");
        }
            
        // Change language in element HTML
        $("#option_language").text(globalLangVal[globalLangKey.indexOf(auxglobalCurrentLanguage)]);	
        $("#option_language").attr("href", "javascript:changeLanguage ('" + auxglobalCurrentLanguage + "');");
    
    
    }
}

// Update language tokens and images in pages
function updateLanguageTokens () {
    $("#CEM-logo-img").attr('src', globalLangTokens.CEMLogoFilePath);

    $("#about-resolution").attr('title', globalLangTokens.projectInformationTitle);
    $("#about-resolution").attr('data-target', globalLangTokens.projectInfoDataTarget);
    $("#graphs").attr('title', globalLangTokens.graphsTitle);
    $("#download-layers").attr('title', globalLangTokens.downloadLayersTitle);
    $("#download-map-image").attr('title', globalLangTokens.downloadMapImageTitle);
    $("#facebook").attr('title', globalLangTokens.facebookTitle);
    $("#twitter").attr('title', globalLangTokens.twiterTitle);
    $("#linkedin").attr('title', globalLangTokens.linkedinTitle);
    $("#email").attr('title', globalLangTokens.emailTitle);
    $("#languagesDropDownString").text(globalLangTokens.languageString);
    $("#languagesDropDown").attr('title', globalLangTokens.languageTitle);

    $("#title_menu").text(globalLangTokens.themesAndVariablesTitle);
    $("#title_options_tema").text(globalLangTokens.themeString);
    $("#theme_description").text(globalLangTokens.themeDescString);
    $("#title_options_variavel").text(globalLangTokens.variableString);
    $("#variable_description").text(globalLangTokens.variableDescString);

    $("#metro_linha_label").text(globalLangTokens.subwayString);
    $("#trem_linha_label").text(globalLangTokens.trainString);

    $("#title_legend").text(globalLangTokens.legendTitle);
    $("#noValidData").text(globalLangTokens.noDataMessage);
    $("#nonUbanArea").text(globalLangTokens.nonUrbanAreaString);
    $("#dataClassification").text(globalLangTokens.dataClassificationString);

    $("#option_basemap_thematic").attr('value', globalLangTokens.withoutBaseMapString);
    $("#option_basemap_thematic").attr('title',globalLangTokens.withoutBaseMapTitle);


    // Download maps window
    $("#downloadLayersFilesTitle").text("Download " + globalLangTokens.tokenStringMaps);
    $("#downloadLayersFilesCloseButton").text(globalLangTokens.tokenStringClose);

    // Download image window
    $("#downloadMapImagePdfTitle").text(globalLangTokens.tokenStringExport + " " + globalLangTokens.tokenStringMaps);
    $("#downloadMapImagePdfLabel").text(globalLangTokens.tokenStringFile +  " " + globalLangTokens.tokenStringType);
    $("#downloadMapImagePdfImage").text(globalLangTokens.tokenStringImage + " (JPEG)");
    $("#downloadMapImagePdfCloseButton").text(globalLangTokens.tokenStringClose);
    $("#downloadMapImagePdfExportButton").text(globalLangTokens.tokenStringExport);

    $("#labelQuantileString").text(globalLangTokens.labelQuantileString);
    $("#labelJenksString").text(globalLangTokens.labelJenksString);
}

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
map.zoomControl.setPosition('topleft'); /*verticalcustomleft*/
// André - 20170512: inclusão de escala (km) no mapa
L.control.scale({metric: true, imperial: false, position: 'topleft' }).addTo(map); /*verticalcustomleft*/



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

// map.attributionControl.addAttribution('Dados do Censo 2010');

// Mariela: inicalizamos o portal usando o mapa base de OSM
layerOSM.addTo(map);
/*L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 18
}).addTo(map);*/

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
    // Show the RMSP limit
    showRMSP(1, 0);
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

    // Hide the RMSP limit
    showRMSP(-3, 1);
}
// +++++ create vizualization
// var url = 'http://documentation.carto.com/api/v2/viz/2b13c956-e7c1-11e2-806b-5404a6a683d5/viz.json';

/*cartodb.createVis('map', url)
    .done(function (vis, layers) {
        cartodb_logo: false
    });*/


// +++++++++++++++++++++++++++++++++++++++++THEMATIC LAYER++++++++++++++++++++++++++++++++++++++++++++
$("#option_variables").change(function () {
    var variable = this.value;
    var variableDescr = $("#option_variables option:selected").text();
    var theme = $("#option_theme").val();

    createLayerChoropletic(theme, variable, variableDescr);
    //createPlacesLayer();
});

$("#option_basemap_thematic").click(function () {
    var variable = $("#option_variables").val();
    var variableDescr = $("#option_variables option:selected").text();
    var theme = $("#option_theme").val();

    createLayerChoropletic(theme, variable, variableDescr);
    //createPlacesLayer();
});

function createLayerChoropletic(theme, variable, variableDescr){

    // get all data configuration of current layer, based on theme and variable (op)
    var currentLayerData = getCurrentLayerData (theme, variable);
    // get data class method values for current method (quantile or jenks).
    var cartoAccount =  "";
    var tableName =  "";
    var codcem = "";

    if ($("#option_basemap_thematic").val() == globalLangTokens.withoutBaseMapString) {
        //with base map (OSM)
        cartoAccount = currentLayerData.cartoAccountWithBaseMap;
        tableName =  currentLayerData.tableNameWithBaseMap;
        codcem = currentLayerData.codcemWithoutBaseMap;
    } else {
        //without base map
        cartoAccount = currentLayerData.cartoAccountWithoutBaseMap;
        tableName =  currentLayerData.tableNameWithoutBaseMap;
        codcem = currentLayerData.codcemWithBaseMap;
    }

    console.log("carto account: ",cartoAccount);
    console.log("table Name: ",tableName);

    cartodb.createLayer(map,{
        user_name: cartoAccount,
        type: "cartodb",
        sublayers: []
    })
        .addTo(map)
        .done(function(layer){
            // Clear all transport active layers
            /*layer.getSubLayers().forEach(function(sublayer){sublayer.remove()});*/


            $("#option_basemap_thematic").click(function () {
                //showThematicLayer(layer, tableName);
                // Clear all transport active layers
                layer.getSubLayers().forEach(function(sublayer){sublayer.remove()});
                console.log("changing... base map thematic");
            });

            $("#option_variables").change(function(){
                // Clear all transport active layers
                layer.getSubLayers().forEach(function(sublayer){sublayer.remove()});
                console.log("changing variables");
            });

            $("#option_theme").change(function(){
                console.log("changing theme");
                // Clear all transport active layers
                layer.getSubLayers().forEach(function(sublayer){sublayer.remove()});
                // Check if layer's legend. Remove if exists
                takeOutLegend();
            });

            // colocando ordem de sobreposição dos layers
            layer.setZIndex(1);
            showThematicLayer(layer, tableName, theme, variable, variableDescr, codcem);

        });
}

/*
 * Function to take out the legend of screen
 */
function takeOutLegend(){
  // Check if layer's legend. Remove if exists
  /*if ($("div.cartodb-legend.choropleth").length) {
    $('div.cartodb-legend.choropleth').remove();
  }*/

  if ($("div.leaflet-control-container.legend").length) {
      $("div.leaflet-control-container.legend").remove();
  }
}

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
/*
 * Function to show thematic layer
 */
var polygons = {}; // store all AP or SC polygons of a layer
var polygonsHighlighted = []; // store all highlighted polygons (one layer)

function showThematicLayer(layer, tableName, theme, variable, variableDescr, codcem){
    // Clear all transport active layers
    layer.getSubLayers().forEach(function(sublayer){sublayer.remove()});
    // Check if layer's legend. Remove if exists
    takeOutLegend();

    // if option is valid, tooltip and legend will be build
    if(variable != globalLangTokens.variableOptionSelectString) {
        // get button value
        var buttonVal = document.getElementById("option_basemap_thematic").value;
        // If button value is 'Mapa base' is because the basemap isn't visible
        var withBaseMap = false;
        var opacity = polygonOpacityWithBaseMap;
        if (buttonVal == globalLangTokens.withBaseMapString) {
            opacity = polygonOpacityWithoutBaseMap;
            withBaseMap = true;
        }

        // get all data configuration of current layer, based on theme and variable (variable)
        var currentLayerData = getCurrentLayerData (theme, variable);
        // get data class method values for current method (quantile or jenks).
        var arrayDataClassBreaks =  currentLayerData[currentDataClassificationMethod];

        // Create sublayer - thematic
        layer.createSubLayer(getQueryAndCssToCreateLayer(variable, tableName, arrayDataClassBreaks, noValueClassColor, quantiles_colors_hex, opacity,currentLayerData.showEdge));

        // Get data of current layer on screen
        var sublayer = layer.getSubLayer(0);

        var userStrTableGeo = currentLayerData.cartoAccountRawDataBase;
        var strTableGeo = currentLayerData.tableNameRawDataBase;
        console.log('strTableGeo:', strTableGeo);
        // Set table column (on carto dataset) to be retrieved and showed in legend
        var strInteractivity = codcem + ',' + (codcem === "codsc_cem" ? 'nom_mu,': '') + currentLayerData.colTableToLegend + ',' + variable;
        sublayer.setInteractivity(strInteractivity);

        //Create the places layer
        createPlacesLayer();

        var HIGHLIGHT_STYLE = {
            weight: 3,
            color: '#FFFFFF',
            opacity: 1,
            fillColor: '#FFFFFF',
            fillOpacity: 0.3
        };
        style = HIGHLIGHT_STYLE;

        var sql = new cartodb.SQL({user: userStrTableGeo, format: 'geojson'});
        strQuery = "select cartodb_id, " + codcem + ", the_geom from " + strTableGeo;
        console.log('user:', userStrTableGeo);
        sql.execute(strQuery).done(function(geojson) {
            var features = geojson.features;
            polygons = {};
            for(var i = 0; i < features.length; ++i) {
                var f = geojson.features[i];
                var key = f.properties[codcem];
                
                // generate geometry
                var geo = L.GeoJSON.geometryToLayer(features[i].geometry);
                geo.setStyle(style);

                var objGeo = {
                    "geo": geo,
                    "cartoId": key
                }

                // add to polygons
                polygons[key] = polygons[key] ||  [];
                polygons[key].push(objGeo);
            }
        });

        // 20170331: 'featureOver' event function. Show values in legend (inside colored cells)
        sublayer.on('featureOver', function(e,latlng,pos,data) {
            // get value from carto dataset (tooltip)
            valor = data[variable];
            // Clear legend content
            for (i=1; i < 8; i++) {
                document.getElementById("celula"+i).innerHTML = "";
            }

            // Fill district value in legend
            if (codcem == "codsc_cem" && data["nom_mu"] != data[currentLayerData.colTableToLegend]) {
                document.getElementById("bairro").innerHTML = data["nom_mu"] + " - " +
                                                              data[currentLayerData.colTableToLegend];
            } else {
                document.getElementById("bairro").innerHTML = data[currentLayerData.colTableToLegend];
            }
                
            // Fill legend cell with data set value
            if (valor >= 0 && valor <= arrayDataClassBreaks[6]) {
                document.getElementById("celula" + getClassBreaksCel (valor, arrayDataClassBreaks)).innerHTML = valor;
            }

            var pol = polygonsHighlighted;

            if (!pol || (pol.length == 1 && data[codcem] == pol[0].cartoId) || pol.length > 20) {
                if (pol.length > 20) {
                    console.log ("Too many layers: ", pol.length)
                }
            } else {
                for (i = 0; i < pol.length; i++) {
                    //console.log ("Vai remover layer (ADD): ", pol[i])
                    map.removeLayer(pol[i].geo);
                    if (isGraphVisible ()) {
                        highLightNodeOff (pol[i].cartoId);
                    }
                }
                polygonsHighlighted = [];

                pol = polygons[data[codcem]];

                if (pol) { // Verify if polygon exists
                    for(var i = 0; i < pol.length; ++i) {
                        //console.log ("Vai adicionar layer: ", pol[i], "-codcem: ",codcem, "-data: ", data);
                        map.addLayer(pol[i].geo);
                        if (isGraphVisible ()) {
                            highLightNodeOn (data [codcem]);
                        }
                        polygonsHighlighted.push(pol[i]);
                    }
                } else {
                    //console.log ("POL vazio. Data[codcem]= ", data[codcem])
                }
            }

        }); // sublayer.on
        // ... Clóvis/André 20170331

        sublayer.on('featureOut', function(e,latlng,pos,data) {
            // Clear legend content
            for (i=1; i < 8; i++) {
                document.getElementById("celula"+i).innerHTML = "";
            }

            var pol = polygonsHighlighted;
            
            if (pol.length > 0) {
                //console.log ("POL:", pol,"DATA:", valor, "e:", e)
                for (var i = 0; i < pol.length; ++i) {
                    //console.log ("Vai remover layer: ==> ", pol[i]);
                    map.removeLayer(pol[i].geo);
                    if (isGraphVisible ()) {
                        highLightNodeOff (pol[i].cartoId);
                    }
                }
                polygonsHighlighted = [];
            }

        }); // sublayer.on

        // Create tooltip to get information related to mouse location (mouse hover), just to be presented in legend
        var toolTip = createInfoboxTooltip(layer,sublayer,currentLayerData.colTableToLegend);
        $('body').append(toolTip.render().el);

        // var to define if data classification method choice (quantile or jenks) will be enabled in legend
        var bolEnableDataMethod = true;
        // Build legend. 20170331: creation of class=quartile-cem. 20170623: legend str composition in separated function. Units included.
        var legenda = getStrLegend (currentLayerData, currentLayerData.title, currentLayerData.polygonArea,
            currentLayerData.minLegendValue, currentLayerData.maxLegendValue, bolEnableDataMethod, opacity,
            currentDataClassificationMethod, withBaseMap);

        // add legend to map
        $('#map').append(legenda);

        // Clóvis - 20170626: change event - selection between quantile and natural break (jenks)...
        $("input[type=radio][name=radioDataMethod]").change (function () {
            // get current data classification method (quantile or jenks)
            currentDataClassificationMethod = this.value;
            // get array of data classification method breaks
            arrayDataClassBreaks =  currentLayerData[currentDataClassificationMethod];
            // get carto query and CSS
            var layerConf = getQueryAndCssToCreateLayer(variable, tableName, arrayDataClassBreaks, noValueClassColor,
                quantiles_colors_hex, opacity, currentLayerData.showEdge);
            // set carto CSS of current layer
            sublayer.setCartoCSS(layerConf.cartocss);
            // Update legend: data class breaks
            var strPercent = "";
            if (currentLayerData.minLegendValue.indexOf ("%") >= 0) {
                strPercent = "%";
            }
            document.getElementById("leg-r-1").innerHTML = currentLayerData.minLegendValue;
            for (var i=0; i < 7; i++) {
                document.getElementById("leg-r-" + (i + 2)).innerHTML = arrayDataClassBreaks [i] + strPercent;
            }
            if (currentDataClassificationMethod == "quantiles") {
                for (var i=1; i < 8; i++) {
                    document.getElementById("leg-l-"+i).innerHTML = i + "Q";
                }
            } else { // its jenks
                for (var i=1; i < 8; i++) {
                    document.getElementById("leg-l-"+i).innerHTML = "";
                }
            }
        });
        // ... Clóvis - 20170626: change event - selection between quantile and natural break (jenks)

        graphErase ();

        var xlabel = "variável x";
        var ylabel = variableDescr;
        console.log('ylable: ', ylabel)
        execScriptGraph (theme, variable, xlabel, ylabel, arrayDataClassBreaks, currentLayerData.colTableToLegend, strTableGeo);

    } else {
        graphErase ();
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
function getStrLegend (curLayerData, strTitle, strUnit, strMinValue, strMaxValue, bolEnableMethod, opacity, strClassMethod,
                       withBaseMap) {
    var textColorForDarkBackground = opacity == 1 ? 'white': 'black';
    var classMethod = strClassMethod == "quantiles" ? curLayerData.quantiles : curLayerData.jenks;
    if (strClassMethod == "quantiles") {
        arrayStrLeg1 = ["1Q","2Q","3Q","4Q","5Q","6Q","7Q"];
    } else {
        arrayStrLeg1 = ["","","","","","",""];
    }

    var strPercent = "";
    var strTypeOfValuesDescription = "Dados em números absolutos";

    if (strMinValue.indexOf ("%") >= 0) {
        strPercent = "%";
        strTypeOfValuesDescription = "Dados em percentuais";
    }
    var rmspDescriptionDiv = "<div class='cell-cem-no-value' id='celula9' style='background:#93887E;opacity:" + opacity + "'></div>";
    if (!withBaseMap) {
        rmspDescriptionDiv = "<div class='cell-line-no-value' id='celula10' ></div>";
    }

    var strLegend =
        "<div class='leaflet-control-container legend'>" +
        "<div class='leaflet-bottom leaflet-right' id='legendPanel'  style='bottom: 10px;left:15px' >" +
        "<div class='leaflet-control' style='cursor:default'>" +
        "<div id='legend' style='width: 328px;'>" +
        "<div class='card' style='word-wrap:normal;'>" +
        "<div class='card-header' id='headingLegend'>" +
        "<h6 class='mb-0 panel-title' style='font-size: 12px;font-weight:600'>"+
        "<a id='title_legend'  data-toggle='collapse' data-parent='#legend' href='#collapseLegend' +\n" +
        "        aria-expanded='true' aria-controls='collapseLegend'>"+
        globalLangTokens.legendTitle +
        "</a>"+
        "</h6>"+
        "</div>"+

        "<div id='collapseLegend' class='collapse show' aria-labelledby='headingLegend' data-parent='#legend'>"+
        "<div class='card-body bg-transparent' style='padding: .8rem;font-size:small;'>"+

        "    <div id='legend_window' class='cartodb-legend choropleth cartodb-legend-container'>" +

        "    <div class='legend-title' id='legendVariableStr' title='Variável escolhida' style='margin-bottom:2px;'>" + strTitle + "</div>" +
        "    <div id='legendVariableUnit'> (" + strUnit + ") </div>" +
        "    <div id ='bairro' class='legend-title' style='height:20px;margin-top:5px;margin-bottom:2px;' title='Municipio-distrito'> </div>" +
        "    <ul>" +
        "        <li>" +
        "            <div style='max-width:6%;min-width:6%;display:inline-block;font-size:10px;vertical-align:middle;'>" +
        "              <ul style='width:10px'>" +
        "                <li class='graph count_441' style='width:30px;border:white;'>" +
        "                  <div>" +
        "                    <div class='quartile-cem' id='leg-l-1' style='text-align:left'>" + arrayStrLeg1 [0] + "</div>" +
        "                  </div>" +
        "                  <div>" +
        "                    <div class='quartile-cem' id='leg-l-2' style='text-align:left'>" + arrayStrLeg1 [1] + "</div>" +
        "                  </div>" +
        "                  <div>" +
        "                    <div class='quartile-cem' id='leg-l-3' style='text-align:left'>" + arrayStrLeg1 [2] + "</div>" +
        "                  </div>" +
        "                  <div>" +
        "                    <div class='quartile-cem' id='leg-l-4' style='text-align:left'>" + arrayStrLeg1 [3] + "</div>" +
        "                  </div>" +
        "                  <div>" +
        "                    <div class='quartile-cem' id='leg-l-5' style='text-align:left'>" + arrayStrLeg1 [4] + "</div>" +
        "                  </div>" +
        "                  <div>" +
        "                    <div class='quartile-cem' id='leg-l-6' style='text-align:left'>" + arrayStrLeg1 [5] + "</div>" +
        "                  </div>" +
        "                  <div>" +
        "                    <div class='quartile-cem' id='leg-l-7' style='text-align:left'>" + arrayStrLeg1 [6] + "</div>" +
        "                  </div>" +
        "                </li>" +
        "              </ul>" +
        "            </div>" +
        "            <div style='max-width:18%;min-width:14%;display:inline-block;vertical-align:middle;text-align:center'>" +
        "              <ul>" +
        "                <li class='graph count_441' style='width:48px'>" +
        "                  <div class='colors'>" +
        "                    <div class='quartile-cem' id='celula1' style='background:rgba(255, 255, 178," + opacity + ");color:black;'></div>" +
        "                  </div>" +
        "                  <div class='colors'>" +
        "                    <div class='quartile-cem' id='celula2' style='background:rgba(254, 217, 118," + opacity + ");color:black;'></div>" +
        "                  </div>" +
        "                  <div class='colors'>" +
        "                    <div class='quartile-cem' id='celula3' style='background:rgba(254, 178, 76," + opacity + ");color:black;'></div>" +
        "                  </div>" +
        "                  <div class='colors'>" +
        "                    <div class='quartile-cem' id='celula4' style='background:rgba(253, 141, 60," + opacity + ");color:black;'></div>" +
        "                  </div>" +
        "                  <div class='colors'>" +
        "                    <div class='quartile-cem' id='celula5' style='background:rgba(252, 78, 42," + opacity + ");color:black;'></div>" +
        "                  </div>" +
        "                  <div class='colors'>" +
        "                    <div class='quartile-cem' id='celula6' style='background:rgba(227, 26, 28," + opacity + ");color: " + textColorForDarkBackground + ";'></div>" +
        "                  </div>" +
        "                  <div class='colors'>" +
        "                    <div class='quartile-cem' id='celula7' style='background:rgba(177, 0, 38," + opacity + ");color: " + textColorForDarkBackground + ";'></div>" +
        "                  </div>" +
        "                </li>" +
        "              </ul>" +
        "            </div>" +
        "            <div style='max-width:18%;min-width:14%;display:inline-block;vertical-align:middle;text-align:center'>" +
        "              <ul>" +
        "                <li class='graph count_441' style='width:48px;border:white'>" +
        "                  <div>" +
        "                    <div class='quartile-cem' id='leg-r-1' style='text-align:left'>" + strMinValue + "</div>" +
        "                  </div>" +
        "                  <div>" +
        "                    <div class='quartile-cem' id='leg-r-2' style='text-align:left'>" + classMethod [0] + strPercent + "</div>" +
        "                  </div>" +
        "                  <div>" +
        "                    <div class='quartile-cem' id='leg-r-3' style='text-align:left'>" + classMethod [1] + strPercent + "</div>" +
        "                  </div>" +
        "                  <div>" +
        "                    <div class='quartile-cem' id='leg-r-4' style='text-align:left'>" + classMethod [2] + strPercent + "</div>" +
        "                  </div>" +
        "                  <div>" +
        "                    <div class='quartile-cem' id='leg-r-5' style='text-align:left'>" + classMethod [3] + strPercent + "</div>" +
        "                  </div>" +
        "                  <div>" +
        "                    <div class='quartile-cem' id='leg-r-6' style='text-align:left'>" + classMethod [4] + strPercent + "</div>" +
        "                  </div>" +
        "                  <div>" +
        "                    <div class='quartile-cem' id='leg-r-7' style='text-align:left'>" + classMethod [5] + strPercent + "</div>" +
        "                  </div>" +
        "                  <div>" +
        "                    <div class='quartile-cem' id='leg-r-8' style='text-align:left'>" + classMethod [6] + strPercent + "</div>" +
        "                  </div>" +
        "                </li>" +
        "              </ul>" +
        "            </div>" +
        "            <div style='max-width: 100%;min-width: 38%;display:inline-block;padding-left:25px;vertical-align:middle;text-transform:none'>" +
        "              <div style='padding: 7px 0px 0px 0px;'>" +
        "                <div class='cell-cem-no-value' id='celula8' style='background:" + noValueClassColor + ";opacity:" + opacity + "'></div>" +
        "                <div class='cell-cem-no-value-text' id='noValidData' style='padding: 0px 0px 0px 5px;color:gray;font-size: 10px;text-align:left'>" + globalLangTokens.noDataMessage + "</div>" +
        "                <br>" +
                         rmspDescriptionDiv +
        "                <div class='cell-cem-no-value-text' id='nonUbanArea' style='padding: 0px 0px 0px 5px;color:gray;font-size: 10px;text-align:left;white-space:pre-wrap;'>" + globalLangTokens.nonUrbanAreaString + "</div>" +
        "              </div>" +
        "              <br><br>" +
        "              <div id='containerOptionsDataMethod'>" +
        "                <form id='selectDataMethod'>" +
        "                    <fieldset>" +
        "                      <legend style='font-size: 10px;'><b id='dataClassification' style='white-space:pre-wrap;'>" + globalLangTokens.dataClassificationString + "</b></legend>" +
        "                      <div class='radio'>" +
        "                        <label><input type='radio' name='radioDataMethod' id='radioQuantil' value='quantiles'";
    if (strClassMethod == "quantiles") {
        strLegend = strLegend + " checked";
    }
    strLegend = strLegend + ">&nbsp;<div id='labelQuantileString' style='float:right'>" + globalLangTokens.labelQuantileString + "</div></label>" +
        "                      </div>" +
        "                      <div class='radio'>" +
        "                        <label><input type='radio' name='radioDataMethod' value='jenks' style='font-size: 10px;'";
    if (strClassMethod == "jenks") {
        strLegend = strLegend + " checked";
    }
    strLegend = strLegend + ">&nbsp;<div id='labelJenksString' style='float:right'>" + globalLangTokens.labelJenksString + "</div></label>" +
        "                      </div>" +
        "                    </fieldset>" +
        "                </form>" +
        "              </div>" +
        "          </div>" +
        "        </li>" +
        "        <li style='text-transform:none'>" + strTypeOfValuesDescription +
        "        </li>" +
        "    </ul>";// +

    strLegend = strLegend + "</div>";
    strLegend = strLegend + "</div>" + "</div>" + "</div>" + "</div>" + "</div>" + "</div>" + "</div>";
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
        layer.setZIndex(2);
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

function createPlacesLayer() {
    /*
     * Function to add the places layer
     */
    cartodb.createLayer(map, {
        user_name: "cemdevops",
        type: "cartodb",
        sublayers: []
    })
        .addTo(map) // add the layer to our map which already contains 0 sublayers
        .done(function (placesLayer) {
            var placesSublayer = null;
            var zoomControleLabel = ZOOM_INITIAL_LEVEL;
            // control places names (show/hide)
            map.on('zoomend', function (e) {
                if (placesLayer.getSubLayerCount() > 0) {
                    // get zoom level
                    zoomControleLabel = map.getZoom();
                    if (zoomControleLabel < 13) {
                        placesSublayer.setSQL("SELECT * FROM resolution_places_osm_rmsp WHERE type='city' OR type='town'");
                    } else {
                        placesSublayer.setSQL("SELECT * FROM resolution_places_osm_rmsp");
                    }
                }
            });

            // Put the places layer on anothers layers
            placesLayer.setZIndex(2);
            // used to show/hide places names
            $("#option_basemap_thematic").click(function () {
                placesSublayer = showPlacesLayer(placesLayer, placesSublayer);
            });
            // used to show/hide places names
            $("#option_theme").change(function () {
                placesSublayer = showPlacesLayer(placesLayer, placesSublayer);
            });
            // used to show/hide places names
            $("#option_variables").change(function () {
                placesSublayer = showPlacesLayer(placesLayer, placesSublayer);
            });
        });

}
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

    if (variableSel != globalLangTokens.variableOptionSelectString && variableSel != '' && buttonVal == globalLangTokens.withBaseMapString){
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
        layer.setZIndex(-2);
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

function showRMSP(zindex, polygonOpacity){
    cartodb.createLayer(map,{
        user_name: "cemdevops",
        type: "cartodb",
        sublayers: []
    })
        .addTo(map)
        .done(function(layer){
            // set layer in order of overlap
            layer.setZIndex(zindex);/*1: with base map, -3: Without Base map*/
            // add layer to the map
            layer.createSubLayer({
                sql: "SELECT * FROM sc2010_rmsp_cem_r_merge",
                cartocss: "#sc2010_rmsp_cem_r_merge{line-width: 3; polygon-fill:#93887e; line-color:#93887e; polygon-opacity: " + polygonOpacity + ";}"
            });
        });
}
