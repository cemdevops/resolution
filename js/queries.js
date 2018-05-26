
// Zoom level from which the edges of the census tract of weighting areas will be displayed
var ZOOM_EDGES_PRESENTATION = 13;
// Initial, Min and Max zoom level
var ZOOM_INITIAL_LEVEL = 10;
var ZOOM_MIN_LEVEL = 9;
var ZOOM_MAX_LEVEL = 18;
var LEGEND_NUM_BUCKETS = 7;
// Initial data class method
var currentDataClassificationMethod = "quantiles";
// Opacity of polygons: value range from 0 to 1
var polygonOpacityWithoutBaseMap = 1;
var polygonOpacityWithBaseMap = 0.4;

// Clóvis - 20170630: The variables will also be read from a config json file, i.e, this values are optionally configurable

var quantiles_colors_hex = ["#FFFFB2","#FED976","#FEB24C","#FD8D3C","#FC4E2A","#E31A1C","#B10026"];
var quantiles_colors_rgb = ["255, 255, 178","254, 217, 118","254, 178, 76","253, 141, 60","252, 78, 42","227, 26, 28","177, 0, 38"];
var noValueClassColor = "#A9A9A9";
var noDataMessage = "Sem dados válidos";

// Variable to hold current language. Initial value is portuguese (pt)
var globalCurrentLanguage = "pt-br";

// Variable to hold current language tokens.
var globalLangTokens = {};

// Variable to store key e value language.
var globalLangKey = new Array ();
var globalLangVal = new Array ();

// Store selected prior language
var auxglobalCurrentLanguage;

var bol_RMSP_in = false;
var bol_Choropleth_in = false;
var codcem_Choropleth_in = 0;

// theme: 1--> demografia, 2-->raca e emigração, 3--> religião, 4-->educação, 5-->Renda e trabalho
// Column names for each theme
//var colsNameArray = ['nom_ba','nom_ba','nom_ba','nom_mu','nom_ba'];
// Tables names for each theme
//var tablesNamesArray = ['resolution_sc2010_cem_rmsp_erase','resolution_sc2010_cem_rmsp_erase','resolution_sc2010_cem_rmsp_erase','ap2010_rmsp_cem_r','resolution_sc2010_cem_rmsp_erase'];
// types of polygons
//var typesOfPolygons = ['Áreas de Ponderação','Setores Censitários'];

// Clóvis - 20170630: Function to get parameters from config.json file
$.getJSON(
    "json/config.json",
    function(result) {
        if (result.initialLanguage) {
            globalCurrentLanguage = result.initialLanguage;
        }
        if (result.zoomInitialLevel) {
            ZOOM_INITIAL_LEVEL = result.zoomInitialLevel;
        }
        if (result.zoomMaxLevel) {
            ZOOM_MAX_LEVEL = result.zoomMaxLevel;
        }
        if (result.zoomMinLevel) {
            ZOOM_MIN_LEVEL = result.zoomMinLevel;
        }
        if (result.zoomEdgePresentation) {
            ZOOM_EDGES_PRESENTATION = result.zoomEdgePresentation;
        }
        if (result.mapLegendNumBuckets) {
            LEGEND_NUM_BUCKETS = result.mapLegendNumBuckets;
        }
        if (result.quantilColorHex) {
            quantiles_colors_hex = result.classColorHex;
        }
        if (result.quantilColorRgb) {
            quantiles_colors_rgb = result.classColorRgb;
        }
        if (result.classColorNoValue) {
            noValueClassColor = result.classColorNoValue;
        }
        // Clóvis - retirar!
        if (result.noDataMessage) {
            noDataMessage = result.noDataMessage;
        }
        if (result.initialDataClassificationMethod) {
            currentDataClassificationMethod = result.initialDataClassificationMethod;
        }
        if (result.polygonOpacityWithoutBaseMap) {
            polygonOpacityWithoutBaseMap = result.polygonOpacityWithoutBaseMap;
        }
        if (result.polygonOpacityWithBaseMap) {
            polygonOpacityWithBaseMap = result.polygonOpacityWithBaseMap;
        }
    }
);

// Clóvis - 20180227: Function to get languages
$.getJSON(
    "json/config.json",
    function(result) {
        $.each(result, function(key,val) {
            if (key.substring (0,9) == "language-") {
                globalLangKey.push(key.substring (9,key.length));
                globalLangVal.push(val);
                if (key.substring (9,key.length) != result.initialLanguage) {
                    $("#option_language").text(val);
                    $("#option_language").attr("href", "javascript:changeLanguage ('" + key.substring (9,key.length) + "');");
                }
            }
        });
    }
);

/*
 * Function to get a query and CSS to create a layer in Carto
 */
function getQueryAndCssToCreateLayer(op, tableName, polygonCodName, colTableToLegend,dataClassBreaksValues, withoutValueClassColor, dataClassColors, opacity, showEdge){
    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    var sqlString = "SELECT cartodb_id,the_geom_webmercator,the_geom," +polygonCodName+","+ op + ","+
        (polygonCodName == 'codsc_cem' ? "nom_mu," + colTableToLegend: colTableToLegend) +
        " FROM " + tableName;
    /*if (tableName == "logradouros_ap") {
        sqlString = "SELECT * FROM " + tableName;
    } else {
        sqlString = " SELECT * FROM logradouros_sc_40000" +
            " UNION " +
            "SELECT * FROM logradouros_sc40000_80000" +
            " UNION " +
            "SELECT * FROM logradouros_sc80000_";

    }*/

    var cartocssString = "#" + tableName + "{polygon-fill: #FC4E2A;polygon-opacity: " + opacity + ";line-color: #476b6b;line-opacity: 1;}";

    if (showEdge == 2) {
        cartocssString += "[zoom<" + ZOOM_EDGES_PRESENTATION + "] {line-width: 0;} [zoom>=" + ZOOM_EDGES_PRESENTATION + "] {line-width: 0.5;} ";
    } else {
        cartocssString += "#" + tableName + "{line-width: " + showEdge + ";} ";
    }

    for (var i = dataClassColors.length - 1; i >= 0; i--) {
        cartocssString += "#" + tableName + "[ " + op + " <= " + dataClassBreaksValues[i] + " ] { polygon-fill:" + dataClassColors[i] + " ; } ";
    }
    // Use noValue after other to avoid this color overwriting
    cartocssString += "#" + tableName + "[ " + op + " < 0" + " ] { polygon-fill:" + withoutValueClassColor + " ; } ";

    var objectTemp = {sql: sqlString, cartocss:cartocssString};
    return objectTemp;
}

/*
 * Function to get all values configured for some layer / variable
 * It takes values from themes and variables JSON files.
 */
function getCurrentLayerData (idTheme, variable){
    var jsonFiltered = null;
    var objRet = {};

    // Must be executed in a synchronous way
    // async will be disabled until the end of this function
    $.ajaxSetup({
        async: false
    });

    // Get themes JSON File.
    // The file name must be 'json/themes-' followed by the language string
    // So it will be easy to add new language files
    var strJSONFile = "json/themes.json"; // -" + globalCurrentLanguage + "
    var strAux = "";

    // get values from themes JSON file
    $.getJSON(
        strJSONFile,
        function(result) {
            jsonFiltered = result.Themes.filter(function(n){
                return n.idTheme==idTheme;
            });

            objRet.idTheme = jsonFiltered[0].idTheme;
            objRet.codTheme = jsonFiltered[0].codTheme;
            objRet.cartoAccountWithBaseMap = jsonFiltered[0].withBaseMap.cartoAccount;
            objRet.tableNameWithBaseMap = jsonFiltered[0].withBaseMap.tableName;
            objRet.cartoAccountWithoutBaseMap = jsonFiltered[0].withoutBaseMap.cartoAccount;
            objRet.tableNameWithoutBaseMap = jsonFiltered[0].withoutBaseMap.tableName;
            objRet.cartoAccountRawDataBase = jsonFiltered[0].dataBaseForGraph.cartoAccount;
            objRet.tableNameRawDataBase = jsonFiltered[0].dataBaseForGraph.tableName;
            objRet.codcemWithoutBaseMap = jsonFiltered[0].withoutBaseMap.codcem;
            objRet.codcemWithBaseMap = jsonFiltered[0].withBaseMap.codcem;
            strAux = "theme-" + globalCurrentLanguage;
            if (jsonFiltered[0] [strAux]) {
                objRet.theme = jsonFiltered[0] [strAux];
            } else {
                // default pt-br
                objRet.theme = jsonFiltered[0] ["theme-pt-br"];
            }

            strAux = "description-" + globalCurrentLanguage;
            if (jsonFiltered[0] [strAux]) {
                objRet.themeDescription = jsonFiltered[0] [strAux];
            } else {
                // default pt-br
                objRet.themeDescription = jsonFiltered[0] ["description-pt-br"];
            }

            strAux = "polygonArea-" + globalCurrentLanguage;
            if (jsonFiltered[0] [strAux]) {
                objRet.polygonArea = jsonFiltered[0] [strAux];
            } else {
                // default pt-br
                objRet.polygonArea = jsonFiltered[0] ["polygonArea-pt-br"];
            }

            //objRet.tableName = jsonFiltered[0].tableName;
            objRet.showEdge = jsonFiltered[0].showEdge;
            objRet.colTableToLegend = jsonFiltered[0].colTableToLegend;
        }
    );

    // get values from variables JSON file
    // The file name must be 'json/variables-' followed by the language string
    // So it will be easy to add new language files
    strJSONFile = "json/variables.json";

    $.getJSON(
        strJSONFile,
        function(result) {
            jsonFiltered = result.Variables.filter(function(n){
                return n.idTheme==idTheme && n.codVariable==variable;
            });

            objRet.codVariable = jsonFiltered[0].codVariable;
            objRet.graphVariable = (jsonFiltered[0].graphVariables.length > 0 ? jsonFiltered[0].graphVariables[0] : '');

            /*for (var i=0; i<jsonFiltered[0].graphVariables.length; i++) {
                objRet.graphVariables.push(jsonFiltered[0].graphVariables[0]);
            }*/

            strAux = "variable-" + globalCurrentLanguage;
            if (jsonFiltered[0][strAux]) {
                objRet.title = jsonFiltered[0][strAux];
            } else {
                // default pt-br
                objRet.title = jsonFiltered[0]["variable-pt-br"];
            }

            strAux = "description-" + globalCurrentLanguage;
            if (jsonFiltered[0][strAux]) {
                objRet.varDescription = jsonFiltered[0][strAux];
            } else {
                // default pt-br
                objRet.varDescription = jsonFiltered[0]["description-pt-br"];
            }

            strAux = "descriptiveNote-" + globalCurrentLanguage;
            if (jsonFiltered[0][strAux]) {
                objRet.descriptiveNote = jsonFiltered[0][strAux];
            } else {
                // default pt-br
                objRet.descriptiveNote = jsonFiltered[0]["descriptiveNote-pt-br"];
            }

            strAux = "linkTitle-" + globalCurrentLanguage;
            if (jsonFiltered[0][strAux]) {
                objRet.linkText = jsonFiltered[0][strAux];
            } else {
                // default pt-br
                objRet.linkText = jsonFiltered[0]["linkText-pt-br"];
            }

            objRet.linkHRef = jsonFiltered[0].linkHRef;
            objRet.quantiles = jsonFiltered[0].quantiles;
            objRet.jenks = jsonFiltered[0].jenks;
            objRet.minLegendValue = jsonFiltered[0].minLegendValue;
            objRet.maxLegendValue = jsonFiltered[0].maxLegendValue;
        }
    );

    // enagle async again (default mode)
    $.ajaxSetup({
        async: true
    });

    return (objRet);
}

function getVariableData(idTheme, variable){
    var jsonFiltered = null;
    var objRet = {};

    // Must be executed in a synchronous way
    // async will be disabled until the end of this function
    $.ajaxSetup({
        async: false
    });

    var strAux = ""
    // get values from variables JSON file
    // The file name must be 'json/variables-' followed by the language string
    // So it will be easy to add new language files
    var strJSONFile = "json/graph.json";

    $.getJSON(
        strJSONFile,
        function(result) {
            jsonFiltered = result.Variables.filter(function(n){
                return n.idTheme==idTheme && n.codVariable==variable;
            });

            strAux = "variable-" + globalCurrentLanguage;
            if (jsonFiltered[0][strAux]) {
                objRet.title = jsonFiltered[0][strAux];
            } else {
                // default pt-br
                objRet.title = jsonFiltered[0]["variable-pt-br"];
            }

            strAux = "description-" + globalCurrentLanguage;
            if (objRet.varDescription = jsonFiltered[0][strAux]) {
                objRet.varDescription = jsonFiltered[0][strAux];
            } else {
                // default pt-br
                objRet.varDescription = jsonFiltered[0]["description-pt-br"];
            }
        }
    );

    // enagle async again (default mode)
    $.ajaxSetup({
        async: true
    });

    return (objRet);
}

// Function to load language tokens
// Next step: put it in a JSON file, and if possible put all tokens in just one file.
//            Current tokens are spread in themes and variable files, and also in this function
function getLanguageTokens () {
    // Load defalt language (pt-br)

    // Must be executed in a synchronous way
    // async will be disabled until the end of this function
    $.ajaxSetup({
        async: false
    });

    $.getJSON (
        "json/languageTokens.json",
        function(result) {
            if (result ["CEMString-" + globalCurrentLanguage]) {
                globalLangTokens.CEMString = result ["CEMString-" + globalCurrentLanguage];
            } else {
                globalLangTokens.CEMString = result ["CEMString-pt-br"];
            }

            if (result ["CEMLogoFilePath-" + globalCurrentLanguage]) {
                globalLangTokens.CEMLogoFilePath = result ["CEMLogoFilePath-" + globalCurrentLanguage];
            } else {
                globalLangTokens.CEMLogoFilePath = result ["CEMLogoFilePath-pt-br"];
            }

            if (result ["projectInformationTitle-" + globalCurrentLanguage]) {
                globalLangTokens.projectInformationTitle = result ["projectInformationTitle-" + globalCurrentLanguage];
            } else {
                globalLangTokens.projectInformationTitle = result ["projectInformationTitle-pt-br"];
            }

            if (result ["projectInfoDataTarget-" + globalCurrentLanguage]) {
                globalLangTokens.projectInfoDataTarget = result ["projectInfoDataTarget-" + globalCurrentLanguage];
            } else {
                globalLangTokens.projectInfoDataTarget = result ["projectInfoDataTarget-pt-br"];
            }

            if (result ["graphsTitle-" + globalCurrentLanguage]) {
                globalLangTokens.graphsTitle = result ["graphsTitle-" + globalCurrentLanguage];
            } else {
                globalLangTokens.graphsTitle = result ["graphsTitle-pt-br"];
            }

            if (result ["downloadLayersTitle-" + globalCurrentLanguage]) {
                globalLangTokens.downloadLayersTitle = result ["downloadLayersTitle-" + globalCurrentLanguage];
            } else {
                globalLangTokens.downloadLayersTitle = result ["downloadLayersTitle-pt-br"];
            }

            if (result ["downloadMapImageTitle-" + globalCurrentLanguage]) {
                globalLangTokens.downloadMapImageTitle = result ["downloadMapImageTitle-" + globalCurrentLanguage];
            } else {
                globalLangTokens.downloadMapImageTitle = result ["downloadMapImageTitle-pt-br"];
            }

            if (result ["facebookTitle-" + globalCurrentLanguage]) {
                globalLangTokens.facebookTitle = result ["facebookTitle-" + globalCurrentLanguage];
            } else {
                globalLangTokens.facebookTitle = result ["facebookTitle-pt-br"];
            }

            if (result ["twiterTitle-" + globalCurrentLanguage]) {
                globalLangTokens.twiterTitle = result ["twiterTitle-" + globalCurrentLanguage];
            } else {
                globalLangTokens.twiterTitle = result ["twiterTitle-pt-br"];
            }

            if (result ["linkedinTitle-" + globalCurrentLanguage]) {
                globalLangTokens.linkedinTitle = result ["linkedinTitle-" + globalCurrentLanguage];
            } else {
                globalLangTokens.linkedinTitle = result ["linkedinTitle-pt-br"];
            }

            if (result ["emailTitle-" + globalCurrentLanguage]) {
                globalLangTokens.emailTitle = result ["emailTitle-" + globalCurrentLanguage];
            } else {
                globalLangTokens.emailTitle = result ["emailTitle-pt-br"];
            }

            if (result ["languageString-" + globalCurrentLanguage]) {
                globalLangTokens.languageString = result ["languageString-" + globalCurrentLanguage];
            } else {
                globalLangTokens.languageString = result ["languageString-pt-br"];
            }

            if (result ["languageTitle-" + globalCurrentLanguage]) {
                globalLangTokens.languageTitle = result ["languageTitle-" + globalCurrentLanguage];
            } else {
                globalLangTokens.languageTitle = result ["languageTitle-pt-br"];
            }

            if (result ["themesAndVariablesTitle-" + globalCurrentLanguage]) {
                globalLangTokens.themesAndVariablesTitle = result ["themesAndVariablesTitle-" + globalCurrentLanguage];
            } else {
                globalLangTokens.themesAndVariablesTitle = result ["themesAndVariablesTitle-pt-br"];
            }

            if (result ["themeString-" + globalCurrentLanguage]) {
                globalLangTokens.themeString = result ["themeString-" + globalCurrentLanguage];
            } else {
                globalLangTokens.themeString = result ["themeString-pt-br"];
            }

            if (result ["themeDescString-" + globalCurrentLanguage]) {
                globalLangTokens.themeDescString = result ["themeDescString-" + globalCurrentLanguage];
            } else {
                globalLangTokens.themeDescString = result ["themeDescString-pt-br"];
            }

            if (result ["themeBaseYearString-" + globalCurrentLanguage]) {
                globalLangTokens.themeBaseYearString = result ["themeBaseYearString-" + globalCurrentLanguage];
            } else {
                globalLangTokens.themeBaseYearString = result ["themeBaseYearString-pt-br"];
            }

            if (result ["variableString-" + globalCurrentLanguage]) {
                globalLangTokens.variableString = result ["variableString-" + globalCurrentLanguage];
            } else {
                globalLangTokens.variableString = result ["variableString-pt-br"];
            }

            if (result ["variableDescString-" + globalCurrentLanguage]) {
                globalLangTokens.variableDescString = result ["variableDescString-" + globalCurrentLanguage];
            } else {
                globalLangTokens.variableDescString = result ["variableDescString-pt-br"];
            }

            if (result ["variableOptionSelectString-" + globalCurrentLanguage]) {
                globalLangTokens.variableOptionSelectString = result ["variableOptionSelectString-" + globalCurrentLanguage];
            } else {
                globalLangTokens.variableOptionSelectString = result ["variableOptionSelectString-pt-br"];
            }

            if (result ["variableOptionSelectDescription-" + globalCurrentLanguage]) {
                globalLangTokens.variableOptionSelectDescription = result ["variableOptionSelectDescription-" + globalCurrentLanguage];
            } else {
                globalLangTokens.variableOptionSelectDescription = result ["variableOptionSelectDescription-pt-br"];
            }

            if (result ["subwayString-" + globalCurrentLanguage]) {
                globalLangTokens.subwayString = result ["subwayString-" + globalCurrentLanguage];
            } else {
                globalLangTokens.subwayString = result ["subwayString-pt-br"];
            }

            if (result ["trainString-" + globalCurrentLanguage]) {
                globalLangTokens.trainString = result ["trainString-" + globalCurrentLanguage];
            } else {
                globalLangTokens.trainString = result ["trainString-pt-br"];
            }

            if (result ["graphString-" + globalCurrentLanguage]) {
                globalLangTokens.graphString = result ["graphString-" + globalCurrentLanguage];
            } else {
                globalLangTokens.graphString = result ["graphString-pt-br"];
            }

            if (result ["legendTitle-" + globalCurrentLanguage]) {
                globalLangTokens.legendTitle = result ["legendTitle-" + globalCurrentLanguage];
            } else {
                globalLangTokens.legendTitle = result ["legendTitle-pt-br"];
            }

            if (result ["noDataMessage-" + globalCurrentLanguage]) {
                globalLangTokens.noDataMessage = result ["noDataMessage-" + globalCurrentLanguage];
            } else {
                globalLangTokens.noDataMessage = result ["noDataMessage-pt-br"];
            }

            if (result ["nonUrbanAreaString-" + globalCurrentLanguage]) {
                globalLangTokens.nonUrbanAreaString = result ["nonUrbanAreaString-" + globalCurrentLanguage];
            } else {
                globalLangTokens.nonUrbanAreaString = result ["nonUrbanAreaString-pt-br"];
            }

            if (result ["boundaryRMSPString-" + globalCurrentLanguage]) {
                globalLangTokens.boundaryRMSPString = result ["boundaryRMSPString-" + globalCurrentLanguage];
            } else {
                globalLangTokens.boundaryRMSPString = result ["boundaryRMSPString-pt-br"];
            }

            if (result ["dataClassificationString-" + globalCurrentLanguage]) {
                globalLangTokens.dataClassificationString = result ["dataClassificationString-" + globalCurrentLanguage];
            } else {
                globalLangTokens.dataClassificationString = result ["dataClassificationString-pt-br"];
            }

            if (result ["withBaseMapString-" + globalCurrentLanguage]) {
                globalLangTokens.withBaseMapString = result ["withBaseMapString-" + globalCurrentLanguage];
            } else {
                globalLangTokens.withBaseMapString = result ["withBaseMapString-pt-br"];
            }

            if (result ["withBaseMapTitle-" + globalCurrentLanguage]) {
                globalLangTokens.withBaseMapTitle = result ["withBaseMapTitle-" + globalCurrentLanguage];
            } else {
                globalLangTokens.withBaseMapTitle = result ["withBaseMapTitle-pt-br"];
            }

            if (result ["withoutBaseMapString-" + globalCurrentLanguage]) {
                globalLangTokens.withoutBaseMapString = result ["withoutBaseMapString-" + globalCurrentLanguage];
            } else {
                globalLangTokens.withoutBaseMapString = result ["withoutBaseMapString-pt-br"];
            }

            if (result ["withoutBaseMapTitle-" + globalCurrentLanguage]) {
                globalLangTokens.withoutBaseMapTitle = result ["withoutBaseMapTitle-" + globalCurrentLanguage];
            } else {
                globalLangTokens.withoutBaseMapTitle = result ["withoutBaseMapTitle-pt-br"];
            }

            if (result ["tokenStringClose-" + globalCurrentLanguage]) {
                globalLangTokens.tokenStringClose = result ["tokenStringClose-" + globalCurrentLanguage];
            } else {
                globalLangTokens.tokenStringClose = result ["tokenStringClose-pt-br"];
            }

            if (result ["tokenStringMaps-" + globalCurrentLanguage]) {
                globalLangTokens.tokenStringMaps = result ["tokenStringMaps-" + globalCurrentLanguage];
            } else {
                globalLangTokens.tokenStringMaps = result ["tokenStringMaps-pt-br"];
            }

            if (result ["tokenStringExport-" + globalCurrentLanguage]) {
                globalLangTokens.tokenStringExport = result ["tokenStringExport-" + globalCurrentLanguage];
            } else {
                globalLangTokens.tokenStringExport = result ["tokenStringExport-pt-br"];
            }

            if (result ["tokenStringFile-" + globalCurrentLanguage]) {
                globalLangTokens.tokenStringFile = result ["tokenStringFile-" + globalCurrentLanguage];
            } else {
                globalLangTokens.tokenStringFile = result ["tokenStringFile-pt-br"];
            }

            if (result ["tokenStringType-" + globalCurrentLanguage]) {
                globalLangTokens.tokenStringType = result ["tokenStringType-" + globalCurrentLanguage];
            } else {
                globalLangTokens.tokenStringType = result ["tokenStringType-pt-br"];
            }

            if (result ["tokenStringImage-" + globalCurrentLanguage]) {
                globalLangTokens.tokenStringImage = result ["tokenStringImage-" + globalCurrentLanguage];
            } else {
                globalLangTokens.tokenStringImage = result ["tokenStringImage-pt-br"];
            }
            if (result ["labelQuantileString-" + globalCurrentLanguage]) {
                globalLangTokens.labelQuantileString = result ["labelQuantileString-" + globalCurrentLanguage];
            } else {
                globalLangTokens.labelQuantileString = result ["labelQuantileString-pt-br"];
            }
            if (result ["labelJenksString-" + globalCurrentLanguage]) {
                globalLangTokens.labelJenksString = result ["labelJenksString-" + globalCurrentLanguage];
            } else {
                globalLangTokens.labelJenksString = result ["labelJenksString-pt-br"];
            }
            if (result ["variableNameString-" + globalCurrentLanguage]) {
                globalLangTokens.variableNameString = result ["variableNameString-" + globalCurrentLanguage];
            } else {
                globalLangTokens.variableNameString = result ["variableNameString-pt-br"];
            }
            if (result ["variableModalTitleString-" + globalCurrentLanguage]) {
                globalLangTokens.variableModalTitleString = result ["variableModalTitleString-" + globalCurrentLanguage];
            } else {
                globalLangTokens.variableModalTitleString = result ["variableModalTitleString-pt-br"];
            }
            if (result ["variableLabelString-" + globalCurrentLanguage]) {
                globalLangTokens.variableLabelString = result ["variableLabelString-" + globalCurrentLanguage];
            } else {
                globalLangTokens.variableLabelString = result ["variableLabelString-pt-br"];
            }
            if (result ["linkLabelString-" + globalCurrentLanguage]) {
                globalLangTokens.linkLabelString = result ["linkLabelString-" + globalCurrentLanguage];
            } else {
                globalLangTokens.linkLabelString = result ["linkLabelString-pt-br"];
            }
        }
    );

    $.ajaxSetup({
        async: true
    });
}
