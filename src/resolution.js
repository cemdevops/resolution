// http://bl.ocks.org/oriolbx
// http://bl.ocks.org/javisantana
// http://bl.ocks.org/michellechandra/90d59f022ad7e9fd0e5d legenda

// theme: 1--> demografia, 2-->raca e emigração, 3--> religião, 4-->educação, 5-->Renda e trabalho
// Column names for each theme
var colsNameArray = ['nom_ba','nom_ba','nom_ba','nom_mu','nom_ba'];
// Tables names for each theme
var tablesNamesArray = ['resolution_sc2010_cem_rmsp_erase','resolution_sc2010_cem_rmsp_erase','resolution_sc2010_cem_rmsp_erase','ap2010_rmsp_cem_r','resolution_sc2010_cem_rmsp_erase'];
// types of polygons
var typesOfPolygons = ['Áreas de Ponderação','Setores Censitários'];
// Opacity of polygons: value range from 0 to 1
var polygonOpacityWithoutBaseMap = 1;
var polygonOpacityWithBaseMap = 0.4;
//var mapTypes = ["Mapa temático","Mapa base"];

// Mariela: evento disparado ao clickar no botão mapa base/temático
$("#opcao_mapa_base").click(function () {
    //$("#buOpcaoMapaBase").text('Mapa tematico');
    if ($("#opcao_mapa_base").val() == 'Mapa base'){
        //mostrar o mapa base e o temático
        adicionarMapaBase('osm');

        //mudar a imagem do fundo e texto do control
        $("#opcao_mapa_base").attr('value', 'Mapa temático');
        $("#opcao_mapa_base").attr('title','Click aqui para mudar para o mapa temático!');
        $("#opcao_mapa_base").removeClass("mapa-base");
        $("#opcao_mapa_base").addClass("mapa-tematico");

    } else{
        //mostrar só o mapa temático
        removerMapaBase(layerMapaBaseSel);

        //mudar a imagem do fundo e texto do control
        $("#opcao_mapa_base").attr('value', 'Mapa base');
        $("#opcao_mapa_base").attr('title','Click aqui para mudar para o mapa base!');
        $("#opcao_mapa_base").removeClass("mapa-tematico");
        $("#opcao_mapa_base").addClass("mapa-base");        
    }
});

// Constante que define o nível de zoom inicial
ZOOM_NIVEL_INICIAL = 10;

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// definição do mapa com propriedades suas propriedades
var map = L.map("map", {
    center: [-23.60, -46.55], // centralizar o map nesta posição
    zoom: ZOOM_NIVEL_INICIAL, // nível de zoom
    maxZoom: 18 // nível de zoom máximo
});
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// André - 20170512: inclusão de escala (km) no mapa
L.control.scale({metric: true, imperial: false, position: 'topleft' }).addTo(map);

// Clóvis - 20170413: tratamento de bordas de acordo com Zoom...
// Constante que guarda nível de zoom a partir do qual serão apresentadas
// bordas do setor censitário
// Clóvis - 20160627: migrado para querys.js, para utilização tbém naquele arquivo...
// const ZOOM_APRESENTACAO_BORDAS = 13;
// ... Clóvis - 20160627: migrado para querys.js, para utilização tbém naquele arquivo.
// Armazena nível de zoom anterior
var zoomAnterior;
// Armazena nível de zoom atual
var zoomAtual = ZOOM_NIVEL_INICIAL;
// Armazena sublayer atual
// Clóvis - 20170627: sem necessidade. Utilizado zoom em cartoCSS...
// var varSubLayer = null;
// ... Clóvis - 20170627: sem necessidade. Utilizado zoom em cartoCSS

map.on ('zoomstart', function (e) {
    zoomAnterior = map.getZoom();
});

map.on ('zoomend', function (e) {
    zoomAtual = map.getZoom();
    /* Clóvis - 20170627: sem necessidade. Utilizado zoom em cartoCSS...
    if (varSubLayer != null) {
      strCarto = varSubLayer.getCartoCSS();
      if (strCarto.indexOf ("#ap2010") < 0) { // Não aplica para áreas de ponderação
          if ((zoomAtual >= ZOOM_APRESENTACAO_BORDAS) && (zoomAnterior < ZOOM_APRESENTACAO_BORDAS)) {
            // Não tinha bordas. Vai apresentar.
            strCarto = strCarto.replace("line-width: 0", "line-width: 0.5");
            varSubLayer.setCartoCSS(strCarto);
          } else if ((zoomAtual < ZOOM_APRESENTACAO_BORDAS) && (zoomAnterior >= ZOOM_APRESENTACAO_BORDAS)) {
            //Tinha bordas. Vai retirar.
            strCarto = strCarto.replace("line-width: 0.5", "line-width: 0");
            varSubLayer.setCartoCSS(strCarto);
          }
      }
    }
    ... Clóvis - 20170627: sem necessidade. Utilizado zoom em cartoCSS */
});
// ... Clóvis - 20170413: tratamento de bordas de acordo com Zoom.

// Clóvis - 20170623: function to create legend string...
function newStrLegend (strTitle, strUnit, strMinValue, strMaxValue, bolEnableMethod, opacity) {
    var textColorForDarkBackground = opacity == 1 ? 'white': 'black';
    var strLegend = "<div class='cartodb-legend choropleth cartodb-legend-container'> " +
          "  <div class='legend-title' title='Variável escolhida'>" + strTitle + "</div>" +
          "  <div> (" + strUnit + ")</div> <br>" +
          "  <div id ='bairro' class='legend-title' style='height:20px' title='Bairro'> </div>" +
          "  <ul>" +
          "      <li class='min'>" + strMinValue + "</li>" +
          "      <li class='max'>" + strMaxValue + "</li>" +
          "      <li class='graph count_441'>" +
          "        <div class='colors' >" +
          "          <div class='quartile-cem' id='celula1' style='background:rgba(255, 255, 178," + opacity + ");color:black;'></div>" +
          "          <div class='quartile-cem' id='celula2' style='background:rgba(254, 217, 118," + opacity + ");color:black;'></div>" +
          "          <div class='quartile-cem' id='celula3' style='background:rgba(254, 178, 76," + opacity + ");color:black;'></div>" +
          "          <div class='quartile-cem' id='celula4' style='background:rgba(253, 141, 60," + opacity + ");color:black;'></div>" +
          "          <div class='quartile-cem' id='celula5' style='background:rgba(252, 78, 42," + opacity + ");color:black;'></div>" +
          "          <div class='quartile-cem' id='celula6' style='background:rgba(227, 26, 28," + opacity + ");color: " + textColorForDarkBackground + ";'></div>" +
          "          <div class='quartile-cem' id='celula7' style='background:rgba(177, 0, 38," + opacity + ");color: " + textColorForDarkBackground + ";'></div>" +
          "        </div>" +
          "      </li>" +
          "  </ul>";

    // Clóvis - 20170623: Selection between Natural Breaks and Quantils...
    if (bolEnableMethod) {
        strLegend = strLegend + " <br> <div id='containerOptionsDataMethod'>" +
      "    <form id='selectDataMethod'>" +
          "       <fieldset>" +
          "         <legend><b>Método de classificação de dados:</b></legend>" +
          "         <div class='radio'>" +
      "           <label><input type='radio' name='radioDataMethod' id='radioQuantil' value='quantiles' checked='true'>Quantile</label>" +
      "         </div>" +
      "         <div class='radio'>" +
      "           <label><input type='radio' name='radioDataMethod' value='jenks'>Jenks Natural Breaks</label>" +
      "         </div>" +
          "       </fieldset>" +
      "    </form>" +
          "  </div>";
     }
    // ... Clóvis - 20170623: Selection between Natural Breaks and Quantils

     strLegend = strLegend + "</div>";
     return (strLegend);
}
// ... Clóvis - 20170623: function to create legend string

// Clóvis - 20170626: function to change among Quantile and Jenks Natural Breaks...
function changeDataMethod(strMethod, dataField, strDatabase, localSubLayer, vector, layer) {
    //    console.log ('Mudou para ' + strMethod);
    if (localSubLayer != null) {
        var sql = new cartodb.SQL({ user: 'cemdevops'});
        var strMethodSQL;

        if (strMethod == "quantiles") {
            strMethodSQL = "CDB_QuantileBins";
        } else {
            strMethodSQL = "CDB_JenksBins";
        }

        var strSQL = "SELECT unnest ( " + strMethodSQL + " (array_agg(" + dataField + "::numeric), 7)) FROM " + strDatabase;
        $("html,body").css("cursor", "progress");
        $("#map").css("cursor", "progress");
        sql.execute (strSQL)
        .done (function (data) {
            for (i = 0; i < data.total_rows; i++) {
                vector [i] = data.rows[i].unnest;
            }
            var strCarto = "#" + strDatabase + " {" +
                    "polygon-fill: ramp([" + dataField + "], (#FFFFB2, #FED976, #FEB24C, #FD8D3C, #FC4E2A, #E31A1C, #B10026)," + strMethod + ");" +
                    "polygon-opacity: 1;";
            // Verifica se são áreas de ponderação
            if (strDatabase.indexOf ("ap2010") < 0) {
               // Setores censitários. Bordas de acordo com zoom.
               strCarto = strCarto +
                 "[zoom<" + ZOOM_APRESENTACAO_BORDAS + "] {line-width: 0;} [zoom>=" + ZOOM_APRESENTACAO_BORDAS + "] {line-width: 0.5;}";
            } else {
               // Área de ponderação. Bordas sempre visíveis
               strCarto = strCarto + "line-width: 0.5";
            }
            strCarto = strCarto +
                    "line-color: #476b6b;" +
                    "line-opacity: 1;" +
                    "}" +
                    // Put vector values here because it's showing different values when constructing maps automaticaly
                    "#" + strDatabase + "[" + dataField + "<=" + vector[6] + "] { polygon-fill: #B10026;}" + 
                    "#" + strDatabase + "[" + dataField + "<=" + vector[5] + "] { polygon-fill: #E31A1C;}" + 
                    "#" + strDatabase + "[" + dataField + "<=" + vector[4] + "] { polygon-fill: #FC4E2A;}" + 
                    "#" + strDatabase + "[" + dataField + "<=" + vector[3] + "] { polygon-fill: #FD8D3C;}" + 
                    "#" + strDatabase + "[" + dataField + "<=" + vector[2] + "] { polygon-fill: #FEB24C;}" + 
                    "#" + strDatabase + "[" + dataField + "<=" + vector[1] + "] { polygon-fill: #FED976;}" + 
                    "#" + strDatabase + "[" + dataField + "<=" + vector[0] + "] { polygon-fill: #FFFFB2;}";
            localSubLayer.setCartoCSS(strCarto);
            layer.on ("load", function() {
                $("html,body").css("cursor", "default");
                $('#map').css('cursor', '');
            })
        }).error (function() {
            alert ('Tempo máximo de execução atingido! Tente novamente.')
            $("html,body").css("cursor", "default");
            $('#map').css('cursor', '');
        });
    }
};
// ...Clóvis - 20170626: function to change among Quantile and Jenks Natural Breaks

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
removerMapaBase(layerMapaBaseSel);
adicionarMapaBase('osm');

// Mariela: Adicionar Mapa base segundo o tipo de mapa escolhido
function adicionarMapaBase(tipoMapaBaseSelecionado) {

    if (tipoMapaBaseSelecionado=="osm") {
            map.addLayer(layerOSM);
            layerMapaBaseSel = 'osm';
        } else if (tipoMapaBaseSelecionado=="google_maps") {
            map.addLayer(layerGoogle);
            layerMapaBaseSel = 'google_maps';

        } else if (tipoMapaBaseSelecionado=="carto_positron") {
            map.addLayer(layerPositron);
            layerMapaBaseSel = 'carto_positron';

        } else if (tipoMapaBaseSelecionado=="carto_darkmatter") {
            map.addLayer(layerDarkMatter);
            layerMapaBaseSel = 'carto_darkmatter';
        }
}

// Mariela: Remover o Mapa base existente 
function removerMapaBase(tipoMapaBaseSelecionado) {

    if (tipoMapaBaseSelecionado=="osm") {
            map.removeLayer(layerOSM);
        } else if (tipoMapaBaseSelecionado=="google_maps") {
            map.removeLayer(layerGoogle);

        } else if (tipoMapaBaseSelecionado=="carto_positron") {
            map.removeLayer(layerPositron);

        } else if (tipoMapaBaseSelecionado=="carto_darkmatter") {
            map.removeLayer(layerDarkMatter);

        }
}

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// gerencia os layers para o ddl-tema
cartodb.createLayer(map,{
        user_name: "cemdevops",
        type: "cartodb",
        sublayers: []
    })
    .addTo(map)
    .done(function(layer){
        // colocando ordem de sobreposição dos layers
        layer.setZIndex(1);

        $("#opcao_mapa_base").click(function () {
          showThematicLayer(layer);
        });

        $("#option-variables").change(function(){
          showThematicLayer(layer);

            
        });
    });
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
/*
 * Function to show thematic layer
 */
function showThematicLayer(layer,op){
  // limpa os layer de transporte ativo
  layer.getSubLayers().forEach(function(sublayer){sublayer.remove()});
  // Clóvis - 20170627: sem necessidade. Utilizado zoom no cartoCSS
  //varSubLayer = null;

  // get Variable code. For example, p3_001, p11_001 . codVariable == op  
  //var op = $(this).val(); //$(this).attr("value");
  var el = document.getElementById("option-variables");
  var op = el.options[el.selectedIndex].value;

  // get theme selected
  var e = document.getElementById("option-theme");
  var theme = e.options[e.selectedIndex].value;
  console.log(theme +'-'+ op);            
         
  // verifica se a legenda do layer existe. Se houver, remove-a
  if ($("div.cartodb-legend.choropleth").length) {
    $('div.cartodb-legend.choropleth').remove();
  }

  // se a opçao for diferente, então será construído a caixa de informação (tooltip)                
  if(op != 'selecione') {
    // get button value
    var buttonVal = document.getElementById("opcao_mapa_base").value;
    // If button value is 'Mapa base' is because the basemap isn't visible
    var opacity = buttonVal == 'Mapa base' ? polygonOpacityWithoutBaseMap : polygonOpacityWithBaseMap;
    createSubLayer(layer, theme, op, opacity);
    // obtem os dados do layer construído na tela
    var sublayer = layer.getSubLayer(0);

    // Clóvis 20170413 - armazena sublayer atual
    /* Clóvis - 20170627: sem necessidade. Utilizado zoom no cartoCSS ...
    varSubLayer = layer.getSubLayer (0);
    if (map.getZoom() >= ZOOM_APRESENTACAO_BORDAS) {
      // Apresenta mapas com bordas
      varSubLayer.setCartoCSS(varSubLayer.getCartoCSS().replace("line-width: 0", "line-width: 0.5"));
    }
    ... Clóvis - 20170627: sem necessidade. Utilizado zoom no cartoCSS */
    // ... Clóvis

    // define as colunas que serão utilizadas para mostrar as informações abaixo
    var colName = colsNameArray[theme-1];
    sublayer.setInteractivity(colName + ',' + op);

    // Clóvis/André 2017033...
    // Inclusão de função no evento 'featureOver', para preenchimento de valor na legenda.
    // Futuramente poderá ser criado uma função, em caso de obtenção de quantiles automaticamente.

    var vector =  getQuantilesValues(theme, op);//demografia_valores_quantiles[op];

    // itens abaixo a serem usados para obtenção dinâmica de valores de quantiles.
    // var sql = new cartodb.SQL({ user: 'ckhanashiro'});
    // var strSQL = "SELECT unnest (CDB_QuantileBins (array_agg(" + op + "::numeric), 7)) FROM sc2010_rmsp_cem_r";

    sublayer.on('featureOver', function(e,latlng,pos,data) {
      valor = data[op];
      for (i=1; i < 8; i++) {
        strElement = "celula"+i;
        document.getElementById(strElement).innerHTML = "";
      }
   
      document.getElementById("bairro").innerHTML = data[colName];
      if (valor >= 0 && valor <= vector[6]) {
        if (valor <= vector[0]) {
            document.getElementById("celula1").innerHTML = valor;
        } else if (valor <= vector[1]) {
          document.getElementById("celula2").innerHTML = valor;
        } else if (valor <= vector[2]) {
          document.getElementById("celula3").innerHTML = valor;
        } else if (valor <= vector[3]) {
          document.getElementById("celula4").innerHTML = valor;
        } else if (valor <= vector[4]) {
          document.getElementById("celula5").innerHTML = valor;
        } else if (valor <= vector[5]) {
          document.getElementById("celula6").innerHTML = valor;
        } else if (valor <= vector[6]) {
          document.getElementById("celula7").innerHTML = valor;
        }
      }
    }); // sublayer.on
    // ... Clóvis/André 20170331

    // mostra as informaçõs do polígono no estilo Tooltip (mouse hover)
    var toolTip = createInfoboxTooltip(layer,sublayer,colName);
    $('body').append(toolTip.render().el);

    // variável para eleborar os dados da legenda
    var dados_legenda;
    // verifica o layer ativo para definir os valores da legenda
    dados_legenda = getLegendData(theme,op);

    // constroi os elementos que compoe a legenda e seus valores
    // Clóvis/André - Alteração de legenda (class = quartile-cem, inclusão de id - celula<seq>).
    //                Inclusão de bairro. Inclusão de largura fixa para cartodb-legend
    // Clóvis (20170623): legend str composition in separated function. Units included.
    var bolEnableDataMethod = true;
    var typeOfPolygon = theme == 4 ? typesOfPolygons[0]: typesOfPolygons[1];
    var legenda = newStrLegend (dados_legenda.titulo, typeOfPolygon, dados_legenda.minimo, dados_legenda.maximo, bolEnableDataMethod, opacity);

    // adiciona a legenda no mapa
    $('body').append(legenda);

    // Clóvis - 20170626: event of change in selection among quantile and natural break (jenks)
    $("input[type=radio][name=radioDataMethod]").change (function () {
      var strDatabase = tablesNamesArray[theme];
      changeDataMethod (this.value, op, strDatabase, sublayer, vector,layer);
    });
  }
}

/* 
 * Function to create a infobox tooltip
 * Show the polygon informations as Infobox or Tooltip (mouse hover)
 */

function createInfoboxTooltip(layer, sublayer, colName){    
    return layer.leafletMap.viz.addOverlay({
        // Clóvis/André 20170331: type alterado de tooltip para infobox
        type: 'infobox',
        layer: sublayer,
        // Clovis/Andre 20170331: template alterado para hidden - contorno
        //template: "<div class='cartodb-tooltip-content-wrapper'><h4>{{nom_ba}}</h4><p>{{"+op+"}}</p></div>",
        template: "<div style='Visibility:hidden'></div>",
        width: 200,
        position: 'bottom|right',
        fields: [{ colName: colName}]
    });
}

/* 
 * Function to create a sublayer according the theme and variable chosen 
 */
function createSubLayer(layer, theme, op, opacity){      
    console.log(opacity);
    //console.log(getQueryAndCSS(opacity)[op].cartocss);
    theme == 1 ? layer.createSubLayer(getQueryAndCssToCreateLayer(op, tablesNamesArray[theme], quantiles_demography, quantiles_colors_hex, opacity)):
    theme == 2 ? layer.createSubLayer(getQueryAndCssToCreateLayer(op, tablesNamesArray[theme], quantiles_race_emigration, quantiles_colors_hex, opacity)):
    theme == 3 ? layer.createSubLayer(getQueryAndCssToCreateLayer(op, tablesNamesArray[theme], quantiles_religion, quantiles_colors_hex, opacity)):
    theme == 4 ? layer.createSubLayer(getQueryAndCssToCreateLayer(op, tablesNamesArray[theme], quantiles_education, quantiles_colors_hex, opacity)):
    theme == 5 ? layer.createSubLayer(getQueryAndCssToCreateLayer(op, tablesNamesArray[theme], quantiles_employment, quantiles_colors_hex, opacity)):
                 null;
}

/* 
 * Function to get quantiles values according the theme and variabe chosen 
 */
function getQuantilesValues(theme, op){
    theme == 1 ? vetor = quantiles_demography[op]:
    theme == 2 ? vetor = quantiles_race_emigration[op]:
    theme == 3 ? vetor = quantiles_religion[op]:
    theme == 4 ? vetor = quantiles_education[op]:
    theme == 5 ? vetor = quantiles_employment[op]:
                vetor = null;

    return vetor;
}

/*
 * Function to get Legenda data
 */
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

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// CONTROLE DOS LAYERS DE TRANSPORTES (METRO E TREM)
// array contendo os dados para os layers de transportes
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

// controle dos checckboxs que mostrar as linhas de metro/trem
cartodb.createLayer(map,{
        user_name: "cemdevops",
        type: "cartodb",
        sublayers: []
    })
    .addTo(map)
    .done(function(layer){
        // colocando ordem de sobreposição dos layers
        layer.setZIndex(1);
        // assim que os checckboxs forem acionados, dispara essa função
        $("input[name='transporte']").change(function(){
            // limpa os layer de transporte ativo
            layer.getSubLayers().forEach(function(sublayer){sublayer.remove()});
            // para cada layer de transporte ativado, adiciona-se o sublayer
            $.each($("input[name='transporte']:checked"), function(){
                layer.createSubLayer(transportes[$(this).attr("id")]);
            });
        });
    });

// ++++++++++++++++++++++++++++++++++++++PLACES+++++++++++++++++++++++++++++++++++++++++++++++
var places = {
    "rmsp": {
        sql: "SELECT * FROM resolution_places_osm_rmsp  WHERE type='city' OR type='town'",
        cartocss: "#resolution_places_osm_rmsp::labels {text-name: [name]; text-face-name: 'Lato Bold'; text-size: 14;" +
                                                "text-label-position-tolerance: 0; text-fill: #535353; text-halo-fill: #fff; " +
                                                "text-halo-radius: 0.9; text-dy: 0; text-allow-overlap: true; " +
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
// add the layer to our map which already contains 0 sublayers
.addTo(map)
.done(function(layer){
    var sublayer = null;
    var zoomControleLabel = ZOOM_NIVEL_INICIAL;
    map.on ('zoomend', function (e) {
        if (layer.getSubLayerCount()>0) {
            zoomControleLabel = map.getZoom();
            if (zoomControleLabel < 10) {
                // 1=0 means the query returns no result
                sublayer.setSQL("SELECT * FROM resolution_places_osm_rmsp WHERE 1=0")
            } else if (zoomControleLabel < 14) {
                sublayer.setSQL("SELECT * FROM resolution_places_osm_rmsp WHERE type='city' OR type='town'")
            } else if (zoomControleLabel < 15) {
                sublayer.setSQL("SELECT * FROM resolution_places_osm_rmsp WHERE type='city' OR type='town' OR type='suburb' OR type='hamlet'")
            } else {
                sublayer.setSQL("SELECT * FROM resolution_places_osm_rmsp")
            }
        }
    });

    // Put the places layer on anothers layers
    layer.setZIndex(1);    

    $("#opcao_mapa_base").click(function () {
      showPlacesLayer(layer,sublayer);
    });

    $("#option-variables").change(function(){
      showPlacesLayer(layer,sublayer);
    });
});

/*
 * Function to show the places layer
 */
function showPlacesLayer(layer,sublayer){
  // get button value
  var buttonVal = document.getElementById("opcao_mapa_base").value;
  // get variable value chosen
  var variableSel = document.getElementById("option-variables").value;
  console.log(buttonVal +'-'+ variableSel);

  // Clean the places layer
  layer.getSubLayers().forEach(function(sublayer){sublayer.remove()});            
  
  if (variableSel != 'selecione' && buttonVal == 'Mapa base'){                
    // create and add a new sublayer to map
    layer.createSubLayer(places["rmsp"]);
    // this line is used to show places layer while the zoom is working
    sublayer = layer.getSubLayer(0);
  } 
}
// PLACES

// +++++++++++++++++++++++++++++++++++++ÁGUAS++++++++++++++++++++++++++++++++++++++++++++++++
// 
cartodb.createLayer(map,{
        user_name: "cemdevops",
        type: "cartodb",
        sublayers: []
    })
    .addTo(map)
    .done(function(layer){
        // colocando ordem de sobreposição dos layers
        layer.setZIndex(1);
        // adiciona o layer ao mapa
        layer.createSubLayer({
            sql: "SELECT * FROM resolution_cem_aguas_2",
            cartocss: "#resolution_cem_aguas_2{polygon-fill:#526475; line-color:#526475}"
        });
    });
// ÁGUAS
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
