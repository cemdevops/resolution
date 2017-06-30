// Clóvis - 20160627: migrado do arquivo resolution.js para utilização neste módulo...
// Constante que guarda nível de zoom a partir do qual serão apresentadas
// bordas do setor censitário
const ZOOM_APRESENTACAO_BORDAS = 13;
// ... Clóvis - 20160627: migrado do arquivo resolution.js para utilização neste módulo.

// ... Mariela - 20170629:
// DEMOGRAPHY
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

var quantiles_colors_hex = ["#FFFFB2","#FED976","#FEB24C","#FD8D3C","#FC4E2A","#E31A1C","#B10026"];
var quantiles_colors_rgb = ["255, 255, 178","254, 217, 118","254, 178, 76","253, 141, 60","252, 78, 42","227, 26, 28","177, 0, 38"];
  

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
/*
 * Function to get a query and CSS to create a layer in Carto
 */
function getQueryAndCssToCreateLayer(op, tableName, quantilesValues, quantilesColors, opacity){
  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  var sqlString = "SELECT * FROM " + tableName;
  var cartocssString = "#" + tableName + "{polygon-fill: #FC4E2A;polygon-opacity: " + opacity + ";line-color: #476b6b;line-opacity: 1;} \
              [zoom<" + ZOOM_APRESENTACAO_BORDAS + "] {line-width: 0;} [zoom>=" + ZOOM_APRESENTACAO_BORDAS + "] {line-width: 0.5;} ";  

  for (var i = quantilesColors.length - 1; i >= 0; i--) {
    cartocssString = cartocssString + "#" + tableName + "[ " + op + " <= " + quantilesValues[op][i] + " ] { polygon-fill:" + quantilesColors[i] + " ; } ";  
  }

  var objectTemp = {sql: sqlString, cartocss:cartocssString};
  console.log(objectTemp.sql);
  console.log(objectTemp.cartocss);
  return objectTemp;
}    
