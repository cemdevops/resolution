
// Zoom level from which the edges of the census tract of weighting areas will be displayed
var ZOOM_EDGES_PRESENTATION = 13;
// Initial, Min and Max zoom level
var ZOOM_INITIAL_LEVEL = 10;
var ZOOM_MIN_LEVEL = 10;
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

            var selectControl = document.getElementById("option_language");	

            var liElement= document.createElement ("li");
            liElement.class="dropdown-item";

            //console.log ("-> ", key.substring (0,5), " - ", val);

            if (key.substring (0,9) == "language-") {
                var aElement= document.createElement ("a");
                aElement.id = key;
                aElement.href =  "javascript:changeLanguage ('" + key.substring (9,key.length) + "');";
                aElement.innerHTML = val;
                liElement.appendChild(aElement);
                selectControl.appendChild(liElement);
                //<a id="language-pt" href="javascript:changeLanguage ('pt-br');"> Português</a>
            }
        });
    }
);

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

/*
 * Function to get a query and CSS to create a layer in Carto
 */
function getQueryAndCssToCreateLayer(op, tableName, dataClassBreaksValues, withoutValueClassColor, dataClassColors, opacity, showEdge){
  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  var sqlString = "SELECT * FROM " + tableName;
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
  //console.log(objectTemp.sql);
  //console.log(objectTemp.cartocss);
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
            
			objRet.tableName = jsonFiltered[0].tableName;
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

// Function to laod language tokens
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
        }
    );

    $.ajaxSetup({
        async: true
    });
}

// The structures below are no longer used
// Left here for historical and consultations purposes, for now

// ... Mariela - 20170629:
// DEMOGRAPHY
/*
var quantiles_demography = {
    "p3_001": [269,539,809,1079,1350,1671,3489],
    "p11_001": [150,300,450,600,750,931,3320],
    "p12_001": [152,305,458,610,764,957,1946],
    "p13_022": [9,18,28,37,47,57,115],
    "p13_036": [9,18,27,36,45,55,89],
    "p13_037": [9,19,28,38,47,61,135],
    "p13_038": [9,19,28,38,47,57,114],
    "p13_039": [10,20,30,40,50,61,96],
    "p13_201": [40,81,121,162,202,245,475],
    "p13_202": [34,69,103,138,172,209,442],
    "p13_203": [24,49,74,99,124,149,228],
    "p13_204": [79,158,237,316,395,488,2068],
    "p13_205": [103,207,311,415,519,640,1239],
    "p13_206": [44,88,132,176,220,265,445],
    "p13_207": [23,46,69,93,116,139,207],
    "p13_208": [12,25,38,51,64,80,167],
    "t_env": [12,25,38,51,64,80,167]
};

// RACE AND EMIGRATION
var quantiles_race_emigration = {
    "p3_002": [163,327,491,654,818,998,1834],
    "p3_003": [41,82,123,165,206,265,465],
    "p3_004": [30,60,91,122,161,216,480],
    "p3_005": [143,287,430,574,717,883,2131],
    "p3_006": [6,12,28,26,42,74,599],
    "de020": [5.9,7.2,8.3,9.5,10.9,12.8,21.9],
    "de023": [16.5,19.8,22.9,26.1,29.2,32.4,51.0],
    "de024": [2.1,2.8,3.5,4.3,5.2,6.2,18.8]
};

// RELIGION
var quantiles_religion = {
    "re027": [5.72,7.17,8.40,9.84,11.24,13.09,19.10],
    "re028": [0.00,1.30,1.38,1.38,2.13,3.16,3.16],
    "re029": [1.09,1.34,1.51,1.89,2.05,2.75,4.30],
    "re030": [48.62,51.99,55.23,58.39,61.26,64.41,82.70],
    "re031": [14.55,21.05,24.38,27.56,30.18,32.93,44.26],
    "re038": [11.97,18.14,21.80,25.09,27.95,30.38,41.79],
    "re047": [0.98,1.28,1.48,1.67,1.81,2.10,2.33],
    "re050": [2.79,3.45,4.05,4.63,5.32,6.26,31.05]
};

//EDUCATION (IN THIS CASE "AREAS DE PONDERAÇÃO" ARE USED INSTEAD OF "SETORES CENSITÁRIOS")
var quantiles_education = {
    "p1_001": [14372,20926,25481,28506,33739,40000,137423],
    "ins001": [6,7,8,9,10,12,15],
    "ins002": [6.1,6.7,7.2,7.9,9.1,10.9,14.1],
    "ins032": [4.8,5.5,5.8,5.9,8.4,11.1,18.6],
    "ins037": [17.1,19.4,21.6,24.0,27.7,30.5,38.3]
};

// INCOME (RENDA) AND EMPLOYMENT
var quantiles_employment = {    
    //"ren002": [19292.16,5449.51,3459.20,2607.73,2202.87,1939.82,1696.20],
    "ren002": [1696.20,1939.82,2202.87,2607.73,3459.20,5449.51,19292.16],
    "ren003": [1.11,1.52,2.05,2.59,3.78,6.32,15.86],
    "ren004": [3.40,4.13,5.00,6.51,8.27,13.9,37.83],
    "ren016": [9.15,14.05,19.00,23.18,27.72,32.47,49.63],
    "ren101": [12.97,20.38,26.06,29.64,32.29,35.12,42.57],
    "ren102": [26.43,30.91,34.90,38.36,41.78,45.63,57.29],
    "ren103": [2.79,4.18,6.24,9.36,12.62,16.16,23.88],
    "ren104": [2.00,3.58,5.95,8.31,13.53,22.15,32.64],
    "ren105": [1.94,2.84,4.63,7.60,13.10,25.15,42.66],
    "mt006" : [5.35,6.67,7.92,9.05,10.27,11.85,19.99],
    "mt008" : [88.17,89.76,91.00,92.19,93.44,94.82,98.21],
    "mt007" : [56.71,58.78,60.20,61.59,63.27,65.12,74.47]
};

// 20170703: Jenks arrays
var jenks_demography = {
    "p3_001": [150,337,356,589,741,1232,3489],
    "p11_001": [72,159,167,278,353,601,3320],
    "p12_001": [77,177,187,310,388,632,1725],
    "p13_022": [5,6,10,14,16,24,115],
    "p13_036": [5,5,10,14,16,24,89],
    "p13_037": [6,6,10,14,17,24,135],
    "p13_038": [6,6,10,14,17,25,114],
    "p13_039": [6,6,10,15,17,26,96],
    "p13_201": [32,32,53,75,88,130,475],
    "p13_202": [28,29,47,66,78,115,442],
    "p13_203": [21,21,35,49,57,82,228],
    "p13_204": [108,108,158,206,233,314,2068],
    "p13_205": [44,102,108,179,225,382,1239],
    "p13_206": [39,64,82,98,116,143,445],
    "p13_207": [25,25,43,60,69,93,190],
    "p13_208": [4,4,10,17,22,35,167],
    "t_env": [4,4,10,17,22,35,167]
};

// RACE AND EMIGRATION
var jenks_race_emigration = {
    "p3_002": [178,272,340,405,482,591,1834],
    "p3_003": [21,22,47,73,88,131,465],
    "p3_004": [3,3,10,19,26,55,480],
    "p3_005": [112,113,241,368,436,641,2131],
    "p3_006": [0,0,0,1,2,5,599],
    "de020": [7.12,7.19,9.11,10.72,11.64,14.92,21.93],
    "de023": [16.43,19.11,21.91,24.89,27.96,31.37,51.05],
    "de024": [1.26,2.11,2.7,3.51,4.49,5.62,18.85]
};

// RELIGION
var jenks_religion = {
    "re027": [4.74,5.83,5.97,8.2,10.03,14.2,19.1],
    "re028": [-999.99,-999.99,-999.99,-999.99,-999.99,1.3,3.16],
    "re029": [-999.99,-999.99,-999.99,-999.99,-999.99,0.93,4.3],
    "re030": [49.59,53.34,56.58,59.32,62.03,64.9,82.7],
    "re031": [13.24,19.71,23.26,26.1,29.29,32.12,44.26],
    "re038": [10.97,16.79,20.62,23.68,26.9,29.41,41.79],
    "re047": [-999.99,-999.99,-999.99,-999.99,-999.99,0.63,2.33],
    "re050": [2.04,2.77,3.28,4.37,4.65,5.07,31.05]
};

//EDUCATION (IN THIS CASE "AREAS DE PONDERAÇÃO" ARE USED INSTEAD OF "SETORES CENSITÁRIOS")
var jenks_education = {
    "p1_001": [21469,24530,30689,38256,40824,64354,137423],
    "ins001": [6.66,6.95,8.24,9.92,11.03,13.34,14.49],
    "ins002": [6.32,6.68,7.79,9.22,10.78,12.94,14.13],
    "ins032": [-999.99,-999.99,-999.99,-999.99,8.35,11.09,18.57],
    "ins037": [-999.99,-999.99,-999.99,-999.99,20.75,28.35,38.26]
};

// INCOME (RENDA) AND EMPLOYMENT
var jenks_employment = {    
    //"ren002": [19292.16,5449.51,3459.20,2607.73,2202.87,1939.82,1696.20],
    "ren002": [2193.51,2202.87,3411.15,5490.42,7301.48,12912.9,19292.2],
    "ren003": [1.28,1.3,2.13,3.97,5.65,10.82,15.86],
    "ren004": [4.3,4.32,6.69,10.77,14.32,25.32,37.83],
    "ren016": [5.32,9.1,9.46,18.23,24.14,37.16,49.63],
    "ren101": [4.78,10.45,15.98,29.58,30.83,32.32,42.57],
    "ren102": [19.68,27.22,27.58,35.56,40.2,48.74,57.29],
    "ren103": [-999.99,-999.99,1.54,3.5,5.62,20.88,23.88],
    "ren104": [-999.99,-999.99,1.78,3.97,7.93,17.87,32.64],
    "ren105": [-999.99,-999.99,-999.99,-999.99,2.21,8.38,42.66],
    "mt006" : [3.51,5.09,5.9,8.95,9.41,10.27,19.99],
    "mt008" : [88.84,90.15,91.3,92.45,93.75,95.14,98.21],
    "mt007" : [54.86,57.52,57.71,60.66,62.29,66.5,74.47]
};
*/

/*
 * Function to get Legenda data
 */
/*
function getLegendData(theme, op){
    var dados_legenda;
    // DEMOGRAFIA
    op == "p3_001"  ? dados_legenda = {titulo: "População", minimo: "0", maximo: "3489"} :
    op == "p11_001" ? dados_legenda = {titulo: "Homens residentes", minimo: "0", maximo: "3320"} :
    op == "p12_001" ? dados_legenda = {titulo: "Mulheres residentes", minimo: "0", maximo: "1946"} :
    op == "p13_022" ? dados_legenda = {titulo: "Faixa etárias - menor que 1 ano", minimo: "0", maximo: "115"} :
    op == "p13_036" ? dados_legenda = {titulo: "Faixa etárias - 2 anos", minimo: "0", maximo: "89"} :
    op == "p13_037" ? dados_legenda = {titulo: "Faixa etárias - 3 anos", minimo: "0", maximo: "135"} :
    op == "p13_038" ? dados_legenda = {titulo: "Faixa etárias - 4 anos", minimo: "0", maximo: "114"} :
    op == "p13_039" ? dados_legenda = {titulo: "Faixa etárias - 5 anos", minimo: "0", maximo: "96"} :
    op == "p13_201" ? dados_legenda = {titulo: "Faixa etárias - 6 a 10 anos", minimo: "0", maximo: "475"} :
    op == "p13_202" ? dados_legenda = {titulo: "Faixa etárias - 11 a 14 anos", minimo: "0", maximo: "442"} :
    op == "p13_203" ? dados_legenda = {titulo: "Faixa etárias - 15 a 17 anos", minimo: "0", maximo: "228"} :
    op == "p13_204" ? dados_legenda = {titulo: "Faixa etárias - 18 a 29 anos", minimo: "0", maximo: "2068"} :
    op == "p13_205" ? dados_legenda = {titulo: "Faixa etárias - 30 a 49 anos", minimo: "0", maximo: "1239"} :
    op == "p13_206" ? dados_legenda = {titulo: "Faixa etárias - 50 a 64 anos", minimo: "0", maximo: "445"} :
    op == "p13_207" ? dados_legenda = {titulo: "Faixa etárias - 65 a 79 anos", minimo: "0", maximo: "190"} :
    op == "p13_208" ? dados_legenda = {titulo: "Faixa etárias - acima 80 anos", minimo: "0", maximo: "167"} :
    op == "t_env"   ? dados_legenda = {titulo: "Taxa de envelhecimento", minimo: "0", maximo: "96.97"} :
                                      
    // RAÇA E IMIGRAÇÃO
    // verifica o layer ativo para definir os valores da legenda
    op == "p3_002"  ? dados_legenda = {titulo: "Cor/Raça - Branca", minimo: "0", maximo: "1834"} :
    op == "p3_003"  ? dados_legenda = {titulo: "Cor/Raça - Preta", minimo: "0", maximo: "465"} :
    op == "p3_004"  ? dados_legenda = {titulo: "Cor/Raça - Amarela", minimo: "0", maximo: "480"} :
    op == "p3_005"  ? dados_legenda = {titulo: "Cor/Raça - Parda", minimo: "0", maximo: "2131"} :
    op == "p3_006"  ? dados_legenda = {titulo: "Cor/Raça - Indígena", minimo: "0", maximo: "599"} :
    op == "de020"   ? dados_legenda = {titulo: "Residentes a menos de 3 anos (%)", minimo: "3.39%", maximo: "21.93%"} :
    op == "de023"   ? dados_legenda = {titulo: "Nascidas em outro Estado (%)", minimo: "5.65%", maximo: "51.05%"} :
    op == "de024"   ? dados_legenda = {titulo: "Nascidas no Nordeste e residentes < 10 anos (%)", minimo: "0%", maximo: "18.85%"} :
                                     
    // EDUCAÇÃO (NESTE CASO UTILIZA-SE ÁREAS DE PONDERAÇÃO AO INVÉS DOS SETORES CENSITÁRIOS)
    // verifica o layer ativo para definir os valores da legenda
    op == "p1_001" ? dados_legenda = {titulo: "Alfabetizadas com 5 ou mais anos de idade", minimo: "6794", maximo: "137423"} :
    op == "ins001" ? dados_legenda = {titulo: "Anos médios de estudo do chefe de domicílio", minimo: "4.7", maximo: "14.5"} :
    op == "ins002" ? dados_legenda = {titulo: "Anos médios de estudo de mulheres chefes", minimo: "4.6", maximo: "14.1"} :
    op == "ins032" ? dados_legenda = {titulo: "Pessoas de 7 a 14 anos de idade fora da escola (%)", minimo: "0%", maximo: "18.6%"} :
    op == "ins037" ? dados_legenda = {titulo: "Pessoas de 3 a 6 anos de idade que nunca frequentaram escola ou creche (%)", minimo: "0%", maximo: "38.7%"} :

    // RELIGIÃO
    // verifica o layer ativo para definir os valores da legenda
    op == "re027" ? dados_legenda = {titulo: "Percentual de pessoas que se declararam (apenas) sem religião", minimo: "0%", maximo: "19.1%"} :
    op == "re028" ? dados_legenda = {titulo: "Percentual de pessoas que se declararam agnósticos", minimo: "0%", maximo: "3.16%"} :
    op == "re029" ? dados_legenda = {titulo: "Percentual de pessoas que se declararam ateus", minimo: "0%", maximo: "4.3%"} :
    op == "re030" ? dados_legenda = {titulo: "Percentual de pessoas que se declararam católicos", minimo: "38.34%", maximo: "82.7%"} :
    op == "re031" ? dados_legenda = {titulo: "Percentual de pessoas que se declararam evangélicos", minimo: "3.99%", maximo: "44.26%"} :
    op == "re038" ? dados_legenda = {titulo: "Percentual de pessoas que se declararam evangélicos pentecostais", minimo: "2.22%", maximo: "41.79%"} :
    op == "re047" ? dados_legenda = {titulo: "Percentual de pessoas que se declararam com religião afro-brasileira", minimo: "0%", maximo: "2.33%"} :
    op == "re050" ? dados_legenda = {titulo: "Percentual de pessoas pertencentes a outros segmentos religiosos", minimo: "0%", maximo: "31.05%"} :

     // RENDA E TRABALHO
    // verifica o layer ativo para definir os valores da legenda
    op == "ren002" ? dados_legenda = {titulo: "Renda domiciliar total média", minimo: "1072", maximo: "19293"} :
    op == "ren003" ? dados_legenda = {titulo: "Renda domiciliar per capita em salários mínimos", minimo: "0.65", maximo: "15.86"} :
    op == "ren004" ? dados_legenda = {titulo: "Renda domiciliar total média em salários mínimos", minimo: "2.1", maximo: "37.83"} :
    op == "ren016" ? dados_legenda = {titulo: "Pessoas com renda per capita até meio salário mínimo (%)", minimo: "0%", maximo: "49.63%"} :
    op == "ren101" ? dados_legenda = {titulo: "Pessoas com renda per capita entre 0,5 e 1 salário mínimo (%)", minimo: "0%", maximo: "42.57%"} :
    op == "ren102" ? dados_legenda = {titulo: "Pessoas com renda per capita entre 1 e 3 salários mínimos (%)", minimo: "8.78%", maximo: "57.29%"} :
    op == "ren103" ? dados_legenda = {titulo: "Pessoas com renda per capita entre 3 e 5 salários mínimos (%)", minimo: "0%", maximo: "23.88%"} :
    op == "ren104" ? dados_legenda = {titulo: "Pessoas com renda per capita entre 5 e 10 salários mínimos (%)", minimo: "0%", maximo: "32.64%"} :
    op == "ren105" ? dados_legenda = {titulo: "Pessoas com renda per capita acima de 10 salários mínimos (%)", minimo: "0%", maximo: "42.66%"} :
    op == "mt006"  ? dados_legenda = {titulo: "Taxa de desocupação", minimo: "0%", maximo: "19.99%"} :
    op == "mt008"  ? dados_legenda = {titulo: "Taxa de ocupação", minimo: "80.01%", maximo: "98.21%"} :
    op == "mt007"  ? dados_legenda = {titulo: "Taxa de participação", minimo: "49.51%", maximo: "74.47%"} :
                     dados_legenda = null;

    return dados_legenda;
}
*/

/* 
 * Function to create a sublayer according the theme and variable chosen 
 */
/*
function createSubLayer(layer, theme, op, opacity){      
    console.log(opacity);
    //console.log(getQueryAndCSS(opacity)[op].cartocss);
    if (currentDataClassificationMethod == "quantiles") {
        theme == 1 ? layer.createSubLayer(getQueryAndCssToCreateLayer(op, tablesNamesArray[theme-1], quantiles_demography, quantiles_colors_hex, opacity)):
        theme == 2 ? layer.createSubLayer(getQueryAndCssToCreateLayer(op, tablesNamesArray[theme-1], quantiles_race_emigration, quantiles_colors_hex, opacity)):
        theme == 3 ? layer.createSubLayer(getQueryAndCssToCreateLayer(op, tablesNamesArray[theme-1], quantiles_religion, quantiles_colors_hex, opacity)):
        theme == 4 ? layer.createSubLayer(getQueryAndCssToCreateLayer(op, tablesNamesArray[theme-1], quantiles_education, quantiles_colors_hex, opacity)):
        theme == 5 ? layer.createSubLayer(getQueryAndCssToCreateLayer(op, tablesNamesArray[theme-1], quantiles_employment, quantiles_colors_hex, opacity)):
                 null;
    } else {
        theme == 1 ? layer.createSubLayer(getQueryAndCssToCreateLayer(op, tablesNamesArray[theme-1], jenks_demography, quantiles_colors_hex, opacity)):
        theme == 2 ? layer.createSubLayer(getQueryAndCssToCreateLayer(op, tablesNamesArray[theme-1], jenks_race_emigration, quantiles_colors_hex, opacity)):
        theme == 3 ? layer.createSubLayer(getQueryAndCssToCreateLayer(op, tablesNamesArray[theme-1], jenks_religion, quantiles_colors_hex, opacity)):
        theme == 4 ? layer.createSubLayer(getQueryAndCssToCreateLayer(op, tablesNamesArray[theme-1], jenks_education, quantiles_colors_hex, opacity)):
        theme == 5 ? layer.createSubLayer(getQueryAndCssToCreateLayer(op, tablesNamesArray[theme-1], jenks_employment, quantiles_colors_hex, opacity)):
                 null;
    }
}
*/
/* 
 * Function to get quantiles values according the theme and variabe chosen 
function getQuantilesValues(theme, op){
    theme == 1 ? vetor = quantiles_demography[op]:
    theme == 2 ? vetor = quantiles_race_emigration[op]:
    theme == 3 ? vetor = quantiles_religion[op]:
    theme == 4 ? vetor = quantiles_education[op]:
    theme == 5 ? vetor = quantiles_employment[op]:
                vetor = null;

    return vetor;
}
 */
