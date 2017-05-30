// http://bl.ocks.org/oriolbx
// http://bl.ocks.org/javisantana
// http://bl.ocks.org/michellechandra/90d59f022ad7e9fd0e5d legenda


// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// CONTROLE DOS DDL-VARIAVEIS E DDL_TEMAS
// vetor contendo os nomes dos ddls-variaveis
var nome_ddl_variavel = ["#opcao_variavel_demografia", "#opcao_variavel_raca_imigracao", "#opcao_variavel_religiao",
                         "#opcao_variavel_educacao", "#opcao_variavel_renda_trabalho", "#opcao_variavel_condicoes_domicilio",
                         "#opcao_variavel_condicoes_entorno"];
// loop para ocultar os ddls-variaveis
for (var i = 1; i < nome_ddl_variavel.length; i++) { // inicia a partir do 2º ddls-variaveis
    $(nome_ddl_variavel[i]).css("display", "none");
}
// nome do objeto (ddls-variaveis) inicial
var opcao_variavel_anterior = nome_ddl_variavel[0];

// evento disparado ao modificar opção do ddl-tema
$("#opcao_tema").change(function () {
    // controi nome do objeto (ddl-tema) selecionado anteriormente
    var obj_atual = "#opcao_variavel_" + $(this).attr("value");
    // oculta ddls-variaveis selecionada anteriormente
    $(opcao_variavel_anterior).css("display", "none");
    // seleciona a 1º opção da ddl-variaveis selecionada anteriormente
    $(opcao_variavel_anterior).val("selecione");
    // provoca change na ddl-variaveis selecionada anteriormente
    $(opcao_variavel_anterior).trigger("change");
    // mostra a ddl-variaveis selecionada atual
    $(obj_atual).css("display", "block");
    // controi nome do objeto (ddl-variaveis) selecionado atual
    opcao_variavel_anterior = "#opcao_variavel_" + $(this).attr("value");
});
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//Mariela - evento disparado ao clickar no botão mapa base/temático
$("#opcao_mapa_base").click(function () {
    //$("#buOpcaoMapaBase").text('Mapa tematico');
    if ($("#opcao_mapa_base").val() == 'Mapa base'){
        //mostrar o mapa base e o temático
        adicionarMapaBase(radios.value);

        //mudar a imagem do fundo e texto do control
        $("#opcao_mapa_base").attr('value', 'Mapa temático');
        $("#opcao_mapa_base").removeClass("mapa-base");
        $("#opcao_mapa_base").addClass("mapa-tematico");
    } else{
        //mostrar só o mapa temático
        removerMapaBase(layerMapaBaseSel);

        //mudar a imagem do fundo e texto do control
        $("#opcao_mapa_base").attr('value', 'Mapa base');
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
const ZOOM_APRESENTACAO_BORDAS = 13;
// Armazena nível de zoom anterior
var zoomAnterior;
// Armazena nível de zoom atual
var zoomAtual = ZOOM_NIVEL_INICIAL;
// Armazena sublayer atual
var varSubLayer = null;

map.on ('zoomstart', function (e) {
    zoomAnterior = map.getZoom();
});

map.on ('zoomend', function (e) {
    zoomAtual = map.getZoom();
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
});
// ... Clóvis - 20170413: tratamento de bordas de acordo com Zoom.

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
var layerDarkMatter = L.tileLayer(urlDarkMatter, {attribution: copyOSM});
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Google Maps
// url para o tile server + copyright - OpenStreetMap
var urlGoogle = "http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}";
// copyright para as imagens
var copyGoogle = "&copy; <a href='http://maps.google.com'>Google Maps</a>";
// definição dos layers (URL xyz + copyright)
var layerGoogle = L.tileLayer(urlGoogle, {attribution: copyGoogle});
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//---Mariela: inicalizamos o portal usando o mapa base de OSM
layerOSM.addTo(map);

//--mariela
//definição da variável para armazenar o mapa base usado
var layerMapaBaseSel = 'osm';

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//---Mariela-----
// CONTROLE DOS BASEMAPS
var radios = document.forms["select_basemap"].elements["radio_change_basemap"];
for(var i = 0, max = radios.length; i < max; i++) {
    radios[i].onclick = function() {
        removerMapaBase(layerMapaBaseSel);
        adicionarMapaBase(radios.value);
    }
}

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

//--------Mariela-----
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// DEMOGRAFIA
// gerencia os layers para o ddl-tema Demografia
cartodb.createLayer(map,{
        user_name: "viniciusmaeda",
        type: "cartodb",
        sublayers: []
    })
    .addTo(map)
    .done(function(layer){
        // colocando ordem de sobreposição dos layers
        layer.setZIndex(1);

        $("#opcao_variavel_demografia").change(function(){
            // limpa os layer de transporte ativo
            layer.getSubLayers().forEach(function(sublayer){sublayer.remove()});
            varSubLayer = null;

            // verifica qual opção foi selecionada para criar o layer
            $("#opcao_variavel_demografia").each(function(){
                // obter o value do ddl selecionado
                var op = $(this).attr("value");
                op == "p3_001"  ? layer.createSubLayer(demografia[op]) : // ver dicionário
                op == "p11_001" ? layer.createSubLayer(demografia[op]) : // ver dicionário
                op == "p12_001" ? layer.createSubLayer(demografia[op]) : // ver dicionário
                op == "p13_022" ? layer.createSubLayer(demografia[op]) : // ver dicionário
                op == "p13_036" ? layer.createSubLayer(demografia[op]) : // ver dicionário
                op == "p13_037" ? layer.createSubLayer(demografia[op]) : // ver dicionário
                op == "p13_038" ? layer.createSubLayer(demografia[op]) : // ver dicionário
                op == "p13_039" ? layer.createSubLayer(demografia[op]) : // ver dicionário
                op == "p13_201" ? layer.createSubLayer(demografia[op]) : // ver dicionário
                op == "p13_202" ? layer.createSubLayer(demografia[op]) : // ver dicionário
                op == "p13_203" ? layer.createSubLayer(demografia[op]) : // ver dicionário
                op == "p13_204" ? layer.createSubLayer(demografia[op]) : // ver dicionário
                op == "p13_205" ? layer.createSubLayer(demografia[op]) : // ver dicionário
                op == "p13_206" ? layer.createSubLayer(demografia[op]) : // ver dicionário
                op == "p13_207" ? layer.createSubLayer(demografia[op]) : // ver dicionário
                op == "p13_208" ? layer.createSubLayer(demografia[op]) : // ver dicionário
                op == "t_env"   ? layer.createSubLayer(demografia[op]) : // ver dicionário
                                  null;

                // captura o texto do ddl-variaveis selecionado
                var variavel = $( "#opcao_variavel_demografia option:selected" ).text();

                // verifica se a legenda do layer existe. Se houver, remove-a
                if ($("div.cartodb-legend.choropleth").length) {
                    $('div.cartodb-legend.choropleth').remove();
                }

                // se a opçao for diferente, então será construído a caixa de informação (tooltip)
                if (op != 'selecione') {

                    // obtem os dados do layer construído na tela
                    var sublayer = layer.getSubLayer(0);

                    // Clóvis 20170413 - armazena sublayer atual
                    varSubLayer = layer.getSubLayer (0);
                    if (map.getZoom() >= ZOOM_APRESENTACAO_BORDAS) {
                        // Apresenta mapas com bordas
                        varSubLayer.setCartoCSS(varSubLayer.getCartoCSS().replace("line-width: 0", "line-width: 0.5"));
                    }
                    // ... Clóvis

                    // define as colunas que serão utilizadas para mostrar as informações abaixo
                    sublayer.setInteractivity('nom_ba,' + op);

                    // Clóvis/André 2017033...
                    // Inclusão de função no evento 'featureOver', para preenchimento de valor na legenda.
                    // Futuramente poderá ser criado uma função, em caso de obtenção de quantiles automaticamente.

                    var vector = demografia_valores_quantiles[op];
                    // itens abaixo a sere, usados para obtenção dinâmica de valores de quantiles.
                    // var sql = new cartodb.SQL({ user: 'ckhanashiro'});
                    // var strSQL = "SELECT unnest (CDB_QuantileBins (array_agg(" + op + "::numeric), 7)) FROM sc2010_rmsp_cem_r";

                    sublayer.on('featureOver', function(e,latlng,pos,data) {
                        valor = data[op];
                        for (i=1; i < 8; i++) {
                            strElement = "celula"+i;
                            document.getElementById(strElement).innerHTML = "";
                        }
                        document.getElementById("bairro").innerHTML = data["nom_ba"];
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
                      }
                    ) // sublayer.on
                    // ... Clóvis/André 20170331

                    // mostra as informaçõs do polígono no estilo Tooltip (mouse hover)
                    var toolTip = layer.leafletMap.viz.addOverlay({
                        // Clóvis/André 20170331: type alterado de tooltip para infobox
                        type: 'infobox',
                        layer: sublayer,
                        // Clovis/Andre 20170331: template alterado para hidden - contorno
                        // template: "<div class='cartodb-tooltip-content-wrapper'><h4>{{nom_ba}}</h4><p>{{"+op+"}}</p></div>",
                        template: "<div style='Visibility:hidden'></div>",
                        width: 200,
                        position: 'bottom|right',
                        fields: [{ nom_ba: 'nom_ba' }]
                    });
                    $('body').append(toolTip.render().el);

                    // variável para eleborar os dados da legenda
                    var dados_legenda;

                    // verifica o layer ativo para definir os valores da legenda
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
                                      null;

                    // constroi os elementos que compoe a legenda e seus valores
                    // Clóvis/André - Alteração de legenda (class = quartile-cem, inclusão de id - celula<seq>).
                    //                Inclusão de bairro. Inclusão de largura fixa para cartodb-legend
                    var legenda = "\
                    <div class='cartodb-legend choropleth' style='width:250px'> \
                        <div class='legend-title'>"+dados_legenda.titulo+"</div> \
                        <div id ='bairro' class='legend-title' style='height:20px'> </div> \
                        <ul> \
                            <li class='min'>"+dados_legenda.minimo+"</li> \
                            <li class='max'>"+dados_legenda.maximo+"</li> \
                            <li class='graph count_441'> \
                                <div class='colors'> \
                                    <div class='quartile-cem' id='celula1' style='background-color:#FFFFB2;color:black;opacity:0.5;'></div> \
                                    <div class='quartile-cem' id='celula2' style='background-color:#FED976;color:black;opacity:0.5;'></div> \
                                    <div class='quartile-cem' id='celula3' style='background-color:#FEB24C;color:black;opacity:0.5;'></div> \
                                    <div class='quartile-cem' id='celula4' style='background-color:#FD8D3C;color:black;opacity:0.5;'></div> \
                                    <div class='quartile-cem' id='celula5' style='background-color:#FC4E2A;color:black;opacity:0.5;'></div> \
                                    <div class='quartile-cem' id='celula6' style='background-color:#E31A1C;color:white;opacity:0.5;'></div> \
                                    <div class='quartile-cem' id='celula7' style='background-color:#B10026;color:white;opacity:0.5;'></div> \
                                </div> \
                            </li> \
                        </ul> \
                    </div>";

                    // adiciona a legenda no mapa
                    $('body').append(legenda);

                }

            });
        });
    });
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// RAÇA E IMIGRAÇÃO
// gerencia os layers para o ddl-tema Demografia
cartodb.createLayer(map,{
        user_name: "viniciusmaeda",
        type: "cartodb",
        sublayers: []
    })
    .addTo(map)
    .done(function(layer){
        // colocando ordem de sobreposição dos layers
        layer.setZIndex(1);
        $("#opcao_variavel_raca_imigracao").change(function(){
            // limpa os layer de transporte ativo
            layer.getSubLayers().forEach(function(sublayer){sublayer.remove()});
            varSubLayer = null;
            // verifica qual opção foi selecionada para criar o layer
            $("#opcao_variavel_raca_imigracao").each(function(){
                // obter o value do ddl selecionado
                var op = $(this).attr("value");
                op == "p3_002"  ? layer.createSubLayer(raca_imigracao[op]) : // ver dicionário
                op == "p3_003"  ? layer.createSubLayer(raca_imigracao[op]) : // ver dicionário
                op == "p3_004"  ? layer.createSubLayer(raca_imigracao[op]) : // ver dicionário
                op == "p3_005"  ? layer.createSubLayer(raca_imigracao[op]) : // ver dicionário
                op == "p3_006"  ? layer.createSubLayer(raca_imigracao[op]) : // ver dicionário
                op == "de020"   ? layer.createSubLayer(raca_imigracao[op]) : // ver dicionário
                op == "de023"   ? layer.createSubLayer(raca_imigracao[op]) : // ver dicionário
                op == "de024"   ? layer.createSubLayer(raca_imigracao[op]) : // ver dicionário
                                  null;

                // captura o texto do ddl-variaveis selecionado
                var variavel = $( "#opcao_variavel_raca_imigracao option:selected" ).text();

                // verifica se a legenda do layer existe. Se houver, remove-a
                if ($("div.cartodb-legend.choropleth").length) {
                    $('div.cartodb-legend.choropleth').remove();
                }

                // se a opçao for diferente, então será construído a caixa de informação (tooltip)
                if (op != 'selecione') {

                    // obtem os dados do layer construído na tela
                    var sublayer = layer.getSubLayer(0);
                    // define as colunas que serão utilizadas para mostrar as informações abaixo

                    // Clóvis 20170413 - armazena sublayer atual
                    varSubLayer = layer.getSubLayer (0);
                    if (map.getZoom() >= ZOOM_APRESENTACAO_BORDAS) {
                        // Apresenta mapas com bordas
                        varSubLayer.setCartoCSS(varSubLayer.getCartoCSS().replace("line-width: 0", "line-width: 0.5"));
                    }
                    // ... Clóvis

                    sublayer.setInteractivity('nom_ba,' + op);

                    // Clóvis/André 2017033...
                    // Inclusão de função no evento 'featureOver', para preenchimento de valor na legenda.
                    // Futuramente poderá ser criado uma função, em caso de obtenção de quantiles automaticamente.

                    var vector = raca_emigracao_valores_quantiles[op];
                    // itens abaixo a sere, usados para obtenção dinâmica de valores de quantiles.
                    // var sql = new cartodb.SQL({ user: 'ckhanashiro'});
                    // var strSQL = "SELECT unnest (CDB_QuantileBins (array_agg(" + op + "::numeric), 7)) FROM sc2010_rmsp_cem_r";

                    sublayer.on('featureOver', function(e,latlng,pos,data) {
                        valor = data[op];
                        for (i=1; i < 8; i++) {
                            strElement = "celula"+i;
                            document.getElementById(strElement).innerHTML = "";
                        }
                        document.getElementById("bairro").innerHTML = data["nom_ba"];
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
                      }
                    ) // sublayer.on
                    // ... Clóvis/André 20170331

                    // mostra as informaçõs do polígono no estilo Tooltip (mouse hover)
                    var toolTip = layer.leafletMap.viz.addOverlay({
                        type: 'infobox',
                        layer: sublayer,
                        //template: "<div class='cartodb-tooltip-content-wrapper'><h4>{{nom_ba}}</h4><p>{{"+op+"}}</p></div>",
                        template: "<div style='Visibility:hidden'></div>",
                        width: 200,
                        position: 'bottom|right',
                        fields: [{ nom_ba: 'nom_ba' }]
                    });
                    $('body').append(toolTip.render().el);

                    // variável para eleborar os dados da legenda
                    var dados_legenda;

                    // verifica o layer ativo para definir os valores da legenda
                    op == "p3_002"  ? dados_legenda = {titulo: "Cor/Raça - Branca", minimo: "0", maximo: "1834"} :
                    op == "p3_003"  ? dados_legenda = {titulo: "Cor/Raça - Preta", minimo: "0", maximo: "465"} :
                    op == "p3_004"  ? dados_legenda = {titulo: "Cor/Raça - Amarela", minimo: "0", maximo: "480"} :
                    op == "p3_005"  ? dados_legenda = {titulo: "Cor/Raça - Parda", minimo: "0", maximo: "2131"} :
                    op == "p3_006"  ? dados_legenda = {titulo: "Cor/Raça - Indígena", minimo: "0", maximo: "599"} :
                    op == "de020"   ? dados_legenda = {titulo: "Residentes a menos de 3 anos (%)", minimo: "3.39%", maximo: "21.93%"} :
                    op == "de023"   ? dados_legenda = {titulo: "Nascidas em outro Estado (%)", minimo: "5.65%", maximo: "51.05%"} :
                    op == "de024"   ? dados_legenda = {titulo: "Nascidas no Nordeste e residentes < 10 anos (%)", minimo: "0%", maximo: "18.85%"} :
                                      null;

                    // constroi os elementos que compoe a legenda e seus valores
                    var legenda = "\
                    <div class='cartodb-legend choropleth' style='width:250px'> \
                        <div class='legend-title'>"+dados_legenda.titulo+"</div> \
                        <div id ='bairro' class='legend-title' style='height:20px'> </div> \
                        <ul> \
                            <li class='min'>"+dados_legenda.minimo+"</li> \
                            <li class='max'>"+dados_legenda.maximo+"</li> \
                            <li class='graph count_441'> \
                                <div class='colors'> \
                                    <div class='quartile-cem' id='celula1' style='background-color:#FFFFB2;color:black;opacity:0.5;'></div> \
                                    <div class='quartile-cem' id='celula2' style='background-color:#FED976;color:black;opacity:0.5;'></div> \
                                    <div class='quartile-cem' id='celula3' style='background-color:#FEB24C;color:black;opacity:0.5;'></div> \
                                    <div class='quartile-cem' id='celula4' style='background-color:#FD8D3C;color:black;opacity:0.5;'></div> \
                                    <div class='quartile-cem' id='celula5' style='background-color:#FC4E2A;color:black;opacity:0.5;'></div> \
                                    <div class='quartile-cem' id='celula6' style='background-color:#E31A1C;color:white;opacity:0.5;'></div> \
                                    <div class='quartile-cem' id='celula7' style='background-color:#B10026;color:white;opacity:0.5;'></div> \
                                </div> \
                            </li> \
                        </ul> \
                    </div>";

                    // adiciona a legenda no mapa
                    $('body').append(legenda);

                }

            });
        });
    });
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// EDUCAÇÃO (NESTE CASO UTILIZA-SE ÁREAS DE PONDERAÇÃO AO INVÉS DOS SETORES CENSITÁRIOS)
// gerencia os layers para o ddl-tema Educação
cartodb.createLayer(map,{
        user_name: "viniciusmaeda",
        type: "cartodb",
        sublayers: []
    })
    .addTo(map)
    .done(function(layer){
        // colocando ordem de sobreposição dos layers
        layer.setZIndex(1);
        $("#opcao_variavel_educacao").change(function(){
            // limpa os layer de transporte ativo
            layer.getSubLayers().forEach(function(sublayer){sublayer.remove()});
            varSubLayer = null;
            // verifica qual opção foi selecionada para criar o layer
            $("#opcao_variavel_educacao").each(function(){
                // obter o value do ddl selecionado
                var op = $(this).attr("value");
                op == "p1_001" ? layer.createSubLayer(educacao[op]) : // ver dicionário
                op == "ins001" ? layer.createSubLayer(educacao[op]) : // ver dicionário
                op == "ins002" ? layer.createSubLayer(educacao[op]) : // ver dicionário
                op == "ins032" ? layer.createSubLayer(educacao[op]) : // ver dicionário
                op == "ins037" ? layer.createSubLayer(educacao[op]) : // ver dicionário
                                  null;

                // captura o texto do ddl-variaveis selecionado
                var variavel = $( "#opcao_variavel_educacao option:selected" ).text();

                // verifica se a legenda do layer existe. Se houver, remove-a
                if ($("div.cartodb-legend.choropleth").length) {
                    $('div.cartodb-legend.choropleth').remove();
                }

                // se a opçao for diferente, então será construído a caixa de informação (tooltip)
                if (op != 'selecione') {

                    // obtem os dados do layer construído na tela
                    var sublayer = layer.getSubLayer(0);

                    // Clóvis 20170413 - armazena sublayer atual
                    //if (map.getZoom() >= ZOOM_APRESENTACAO_BORDAS) {
                        // Apresenta mapas com bordas
                        // varSubLayer.setCartoCSS(varSubLayer.getCartoCSS().replace("line-width: 0", "line-width: 0.5"));
                    //}
                    varSubLayer = layer.getSubLayer (0);
                    // ... Clóvis

                    // define as colunas que serão utilizadas para mostrar as informações abaixo
                    sublayer.setInteractivity('nom_mu,' + op);

                   // Clóvis/André 2017033...
                    // Inclusão de função no evento 'featureOver', para preenchimento de valor na legenda.
                    // Futuramente poderá ser criado uma função, em caso de obtenção de quantiles automaticamente.

                    var vector = educacao_valores_quantiles[op];
                    // itens abaixo a sere, usados para obtenção dinâmica de valores de quantiles.
                    // var sql = new cartodb.SQL({ user: 'ckhanashiro'});
                    // var strSQL = "SELECT unnest (CDB_QuantileBins (array_agg(" + op + "::numeric), 7)) FROM sc2010_rmsp_cem_r";
                    sublayer.on('featureOver', function(e,latlng,pos,data) {
                        valor = data[op];
                        for (i=1; i < 8; i++) {
                            strElement = "celula"+i;
                            document.getElementById(strElement).innerHTML = "";
                        }
                        document.getElementById("bairro").innerHTML = data["nom_mu"];
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
                      }
                    ) // sublayer.on
                    // ... Clóvis/André 20170331

                    // mostra as informaçõs do polígono no estilo Tooltip (mouse hover)
                    var toolTip = layer.leafletMap.viz.addOverlay({
                        type: 'infobox',
                        layer: sublayer,
                        //template: "<div class='cartodb-tooltip-content-wrapper'><h4>{{nom_mu}}</h4><p>{{"+op+"}}</p></div>",
                        template: "<div style='Visibility:hidden'></div>",
                        width: 200,
                        position: 'bottom|right',
                        fields: [{ nom_mu: 'nom_mu' }]
                    });
                    $('body').append(toolTip.render().el);

                    // variável para eleborar os dados da legenda
                    var dados_legenda;

                    // verifica o layer ativo para definir os valores da legenda
                    op == "p1_001" ? dados_legenda = {titulo: "Alfabetizadas com 5 ou mais anos de idade", minimo: "6794", maximo: "137423"} :
                    op == "ins001" ? dados_legenda = {titulo: "Anos médios de estudo do chefe de domicílio", minimo: "4.7", maximo: "14.5"} :
                    op == "ins002" ? dados_legenda = {titulo: "Anos médios de estudo de mulheres chefes", minimo: "4.6", maximo: "14.1"} :
                    op == "ins032" ? dados_legenda = {titulo: "Pessoas de 7 a 14 anos de idade fora da escola (%)", minimo: "0%", maximo: "18.6%"} :
                    op == "ins037" ? dados_legenda = {titulo: "Pessoas de 3 a 6 anos de idade que nunca frequentaram escola ou creche (%)", minimo: "0%", maximo: "38.7%"} :
                                      null;

                    // constroi os elementos que compoe a legenda e seus valores
                    var legenda = "\
                    <div class='cartodb-legend choropleth' style='width:250px'> \
                        <div class='legend-title'>"+dados_legenda.titulo+"</div> \
                        <div id ='bairro' class='legend-title' style='height:20px'> </div> \
                        <ul> \
                            <li class='min'>"+dados_legenda.minimo+"</li> \
                            <li class='max'>"+dados_legenda.maximo+"</li> \
                            <li class='graph count_441'> \
                                <div class='colors'> \
                                    <div class='quartile-cem' id='celula1' style='background-color:#FFFFB2;color:black;opacity:0.5;'></div> \
                                    <div class='quartile-cem' id='celula2' style='background-color:#FED976;color:black;opacity:0.5;'></div> \
                                    <div class='quartile-cem' id='celula3' style='background-color:#FEB24C;color:black;opacity:0.5;'></div> \
                                    <div class='quartile-cem' id='celula4' style='background-color:#FD8D3C;color:black;opacity:0.5;'></div> \
                                    <div class='quartile-cem' id='celula5' style='background-color:#FC4E2A;color:black;opacity:0.5;'></div> \
                                    <div class='quartile-cem' id='celula6' style='background-color:#E31A1C;color:white;opacity:0.5;'></div> \
                                    <div class='quartile-cem' id='celula7' style='background-color:#B10026;color:white;opacity:0.5;'></div> \
                                </div> \
                            </li> \
                        </ul> \
                    </div>";

                    // adiciona a legenda no mapa
                    $('body').append(legenda);

                }

            });
        });
    });
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// RENDA E TRABALHO
// gerencia os layers para o ddl-tema Renda e Trabalho
cartodb.createLayer(map,{
        user_name: "viniciusmaeda",
        type: "cartodb",
        sublayers: []
    })
    .addTo(map)
    .done(function(layer){
        // colocando ordem de sobreposição dos layers
        layer.setZIndex(1);
        $("#opcao_variavel_renda_trabalho").change(function(){
            // limpa os layer de transporte ativo
            layer.getSubLayers().forEach(function(sublayer){sublayer.remove()});
            varSubLayer = null;
            // verifica qual opção foi selecionada para criar o layer
            $("#opcao_variavel_renda_trabalho").each(function(){

                // verifica se a legenda do layer existe. Se houver, remove-a
                if ($("div.cartodb-legend.choropleth").length) {
                    $('div.cartodb-legend.choropleth').remove();
                }

                // obter o value do ddl selecionado
                var op = $(this).attr("value");

                // se a opçao for diferente, então será construído a caixa de informação (tooltip)
                if (op != 'selecione') {

                    layer.createSubLayer(renda_trabalho[op]); // ver dicionário

                    // obtem os dados do layer construído na tela
                    var sublayer = layer.getSubLayer(0);

                    // Clóvis 20170413 - armazena sublayer atual
                    if (map.getZoom() >= ZOOM_APRESENTACAO_BORDAS) {
                        // Apresenta mapas com bordas
                        varSubLayer.setCartoCSS(varSubLayer.getCartoCSS().replace("line-width: 0", "line-width: 0.5"));
                    }
                    varSubLayer = layer.getSubLayer (0);
                    // ... Clóvis

                    // define as colunas que serão utilizadas para mostrar as informações abaixo
                    sublayer.setInteractivity('nom_ba,' + op);

                    // Clóvis/André 2017033...
                    // Inclusão de função no evento 'featureOver', para preenchimento de valor na legenda.
                    // Futuramente poderá ser criado uma função, em caso de obtenção de quantiles automaticamente.

                    var vector = renda_trabalho_valores_quantiles[op];
                    // itens abaixo a sere, usados para obtenção dinâmica de valores de quantiles.
                    // var sql = new cartodb.SQL({ user: 'ckhanashiro'});
                    // var strSQL = "SELECT unnest (CDB_QuantileBins (array_agg(" + op + "::numeric), 7)) FROM sc2010_rmsp_cem_r";

                    sublayer.on('featureOver', function(e,latlng,pos,data) {
                        valor = data[op];
                        for (i=1; i < 8; i++) {
                            strElement = "celula"+i;
                            document.getElementById(strElement).innerHTML = "";
                        }
                        document.getElementById("bairro").innerHTML = data["nom_ba"];
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
                      }
                    ) // sublayer.on
                    // ... Clóvis/André 20170331

                    // mostra as informaçõs do polígono no estilo Tooltip (mouse hover)
                    var toolTip = layer.leafletMap.viz.addOverlay({
                        type: 'infobox',
                        layer: sublayer,
                        // template: "<div class='cartodb-tooltip-content-wrapper'><h4>{{nom_ba}}</h4><p>{{"+op+"}}</p></div>",
                        template: "<div style='Visibility:hidden'></div>",
                        width: 200,
                        position: 'bottom|right',
                        fields: [{ nom_ba: 'nom_ba' }]
                    });
                    $('body').append(toolTip.render().el);

                    // variável para eleborar os dados da legenda
                    var dados_legenda;

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
                                      null;

                    // constroi os elementos que compoe a legenda e seus valores
                    var legenda = "\
                    <div class='cartodb-legend choropleth' style='width:250px'> \
                        <div class='legend-title'>"+dados_legenda.titulo+"</div> \
                        <div id ='bairro' class='legend-title' style='height:20px'> </div> \
                        <ul> \
                            <li class='min'>"+dados_legenda.minimo+"</li> \
                            <li class='max'>"+dados_legenda.maximo+"</li> \
                            <li class='graph count_441'> \
                                <div class='colors'> \
                                    <div class='quartile-cem' id='celula1' style='background-color:#FFFFB2;color:black;opacity:0.5;'></div> \
                                    <div class='quartile-cem' id='celula2' style='background-color:#FED976;color:black;opacity:0.5;'></div> \
                                    <div class='quartile-cem' id='celula3' style='background-color:#FEB24C;color:black;opacity:0.5;'></div> \
                                    <div class='quartile-cem' id='celula4' style='background-color:#FD8D3C;color:black;opacity:0.5;'></div> \
                                    <div class='quartile-cem' id='celula5' style='background-color:#FC4E2A;color:black;opacity:0.5;'></div> \
                                    <div class='quartile-cem' id='celula6' style='background-color:#E31A1C;color:white;opacity:0.5;'></div> \
                                    <div class='quartile-cem' id='celula7' style='background-color:#B10026;color:white;opacity:0.5;'></div> \
                                </div> \
                            </li> \
                        </ul> \
                    </div>";

                    // adiciona a legenda no mapa
                    $('body').append(legenda);

                }

            });
        });
    });
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// RELIGIÃO
// gerencia os layers para o ddl-tema Religião
cartodb.createLayer(map,{
        user_name: "viniciusmaeda",
        type: "cartodb",
        sublayers: []
    })
    .addTo(map)
    .done(function(layer){
        // colocando ordem de sobreposição dos layers
        layer.setZIndex(1);
        $("#opcao_variavel_religiao").change(function(){
            // limpa os layer de transporte ativo
            layer.getSubLayers().forEach(function(sublayer){sublayer.remove()});
            varSubLayer = null;
            // verifica qual opção foi selecionada para criar o layer
            $("#opcao_variavel_religiao").each(function(){

                // verifica se a legenda do layer existe. Se houver, remove-a
                if ($("div.cartodb-legend.choropleth").length) {
                    $('div.cartodb-legend.choropleth').remove();
                }

                // obter o value do ddl selecionado
                var op = $(this).attr("value");

                // se a opçao for diferente, então será construído a caixa de informação (tooltip)
                if (op != 'selecione') {

                    layer.createSubLayer(religiao[op]); // ver dicionário

                    // obtem os dados do layer construído na tela
                    var sublayer = layer.getSubLayer(0);

                    // Clóvis 20170413 - armazena sublayer atual
                    varSubLayer = layer.getSubLayer (0);
                    if (map.getZoom() >= ZOOM_APRESENTACAO_BORDAS) {
                        // Apresenta mapas com bordas
                        varSubLayer.setCartoCSS(varSubLayer.getCartoCSS().replace("line-width: 0", "line-width: 0.5"));
                    }
                    // ... Clóvis

                    // define as colunas que serão utilizadas para mostrar as informações abaixo
                    sublayer.setInteractivity('nom_ba,' + op);

                    // Clóvis/André 2017033...
                    // Inclusão de função no evento 'featureOver', para preenchimento de valor na legenda.
                    // Futuramente poderá ser criado uma função, em caso de obtenção de quantiles automaticamente.

                    var vector = religiao_valores_quantiles[op];
                    // itens abaixo a sere, usados para obtenção dinâmica de valores de quantiles.
                    // var sql = new cartodb.SQL({ user: 'ckhanashiro'});
                    // var strSQL = "SELECT unnest (CDB_QuantileBins (array_agg(" + op + "::numeric), 7)) FROM sc2010_rmsp_cem_r";

                    sublayer.on('featureOver', function(e,latlng,pos,data) {
                        valor = data[op];
                        for (i=1; i < 8; i++) {
                            strElement = "celula"+i;
                            document.getElementById(strElement).innerHTML = "";
                        }
                        document.getElementById("bairro").innerHTML = data["nom_ba"];
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
                      }
                    ) // sublayer.on
                    // ... Clóvis/André 20170331

                    // mostra as informaçõs do polígono no estilo Tooltip (mouse hover)
                    var toolTip = layer.leafletMap.viz.addOverlay({
                        type: 'infobox',
                        layer: sublayer,
                        // template: "<div class='cartodb-tooltip-content-wrapper'><h4>{{nom_ba}}</h4><p>{{"+op+"}}</p></div>",
                        template: "<div style='Visibility:hidden'></div>",
                        width: 200,
                        position: 'bottom|right',
                        fields: [{ nom_ba: 'nom_ba' }]
                    });
                    $('body').append(toolTip.render().el);

                    // variável para eleborar os dados da legenda
                    var dados_legenda;

                    // verifica o layer ativo para definir os valores da legenda
                    op == "re027" ? dados_legenda = {titulo: "Percentual de pessoas que se declararam (apenas) sem religião", minimo: "0%", maximo: "19.1%"} :
                    op == "re028" ? dados_legenda = {titulo: "Percentual de pessoas que se declararam agnósticos", minimo: "0%", maximo: "3.16%"} :
                    op == "re029" ? dados_legenda = {titulo: "Percentual de pessoas que se declararam ateus", minimo: "0%", maximo: "4.3%"} :
                    op == "re030" ? dados_legenda = {titulo: "Percentual de pessoas que se declararam católicos", minimo: "38.34%", maximo: "82.7%"} :
                    op == "re031" ? dados_legenda = {titulo: "Percentual de pessoas que se declararam evangélicos", minimo: "3.99%", maximo: "44.26%"} :
                    op == "re038" ? dados_legenda = {titulo: "Percentual de pessoas que se declararam evangélicos pentecostais", minimo: "2.22%", maximo: "41.79%"} :
                    op == "re047" ? dados_legenda = {titulo: "Percentual de pessoas que se declararam com religião afro-brasileira", minimo: "0%", maximo: "2.33%"} :
                    op == "re050" ? dados_legenda = {titulo: "Percentual de pessoas pertencentes a outros segmentos religiosos", minimo: "0%", maximo: "31.05%"} :
                                      null;

                    // constroi os elementos que compoe a legenda e seus valores
                    var legenda = "\
                    <div class='cartodb-legend choropleth' style='width:250px'> \
                        <div class='legend-title'>"+dados_legenda.titulo+"</div> \
                        <div id ='bairro' class='legend-title' style='height:20px'> </div> \
                        <ul> \
                            <li class='min'>"+dados_legenda.minimo+"</li> \
                            <li class='max'>"+dados_legenda.maximo+"</li> \
                            <li class='graph count_441'> \
                                <div class='colors'> \
                                    <div class='quartile-cem' id='celula1' style='background-color:#FFFFB2;color:black;opacity:0.5;'></div> \
                                    <div class='quartile-cem' id='celula2' style='background-color:#FED976;color:black;opacity:0.5;'></div> \
                                    <div class='quartile-cem' id='celula3' style='background-color:#FEB24C;color:black;opacity:0.5;'></div> \
                                    <div class='quartile-cem' id='celula4' style='background-color:#FD8D3C;color:black;opacity:0.5;'></div> \
                                    <div class='quartile-cem' id='celula5' style='background-color:#FC4E2A;color:black;opacity:0.5;'></div> \
                                    <div class='quartile-cem' id='celula6' style='background-color:#E31A1C;color:white;opacity:0.5;'></div> \
                                    <div class='quartile-cem' id='celula7' style='background-color:#B10026;color:white;opacity:0.5;'></div> \
                                </div> \
                            </li> \
                        </ul> \
                    </div>";

                    // adiciona a legenda no mapa
                    $('body').append(legenda);

                }

            });
        });
    });
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// CONTROLE DOS LAYERS DE TRANSPORTES (METRO E TREM)
// array contendo os dados para os layers de transportes
var transportes = {
    "metro_linha": {
        sql: "SELECT * FROM resolution_metro_linhas",
        cartocss: "#resolution_metro_linhas{line-color: #fff; line-width: 1; line-opacity: 0.7;} " +
            "#resolution_metro_linhas [ linha = 'Azul'     ] { line-color: #0153A0; } " + // linha 1-Azul
            "#resolution_metro_linhas [ linha = 'Verde'    ] { line-color: #008061; } " + // linha 2-Verde
            "#resolution_metro_linhas [ linha = 'Vermelha' ] { line-color: #EE3E34; } " + // linha 3-Vermelha
            "#resolution_metro_linhas [ linha = 'Amarela'  ] { line-color: #FED304; } " + // linha 4-Amarela
            "#resolution_metro_linhas [ linha = 'Lilas'    ] { line-color: #A54499; } "   // linha 5-Lilás
    },
    "metro_estacoes": {
        sql: "SELECT * FROM resolution_trem_linhas",
        cartocss: "#resolution_trem_linhas{line-color: #fff;line-width: 1;line-opacity: 0.7;}" +
            "#resolution_trem_linhas [ id = 2 ] { line-color: #9E1766; }" + // Linha 7 - Rubi
            "#resolution_trem_linhas [ id = 3 ] { line-color: #9E9E93; }" + // Linha 8 - Diamante
            "#resolution_trem_linhas [ id = 4 ] { line-color: #00A78E; }" + // Linha 9 - Esmeralda
            "#resolution_trem_linhas [ id = 5 ] { line-color: #007C8F; }" + // Linha 10 - Turquesa
            "#resolution_trem_linhas [ id = 6 ] { line-color: #F04D22; }" + // Linha 11 - Coral
            "#resolution_trem_linhas [ id = 7 ] { line-color: #083E89; }"   // Linha 12 - Safira
    }
};

// controle dos checckboxs que mostrar as linhas de metro/trem
cartodb.createLayer(map,{
        user_name: "viniciusmaeda",
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
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// PLACES
var places = {
    "rmsp": {
        sql: "SELECT * FROM resolution_places_osm_rmsp WHERE type='city' OR type='town'",
        cartocss: "#resolution_places_osm_rmsp::labels {text-name: [name]; text-face-name: 'Lato Bold'; text-size: 14; " +
                                                "text-label-position-tolerance: 0; text-fill: #535353; text-halo-fill: #fff; " +
                                                "text-halo-radius: 0.5; text-dy: 0; text-allow-overlap: true; " +
                                                "text-placement: point; text-placement-type: dummy;}"
    }
};

cartodb.createLayer(map,{
        user_name: "viniciusmaeda",
        type: "cartodb",
        sublayers: []
    })
    .addTo(map)
    .done(function(layer){
        var sublayer = null;
        var zoomControleLabel = ZOOM_NIVEL_INICIAL;
        map.on ('zoomend', function (e) {
            zoomControleLabel = map.getZoom();
            if (zoomControleLabel < 10) {
                sublayer.setSQL("SELECT * FROM resolution_places_osm_rmsp WHERE 1=0")
            } else if (zoomControleLabel < 14) {
                sublayer.setSQL("SELECT * FROM resolution_places_osm_rmsp WHERE type='city' OR type='town'")
            } else if (zoomControleLabel < 15) {
                sublayer.setSQL("SELECT * FROM resolution_places_osm_rmsp WHERE type='city' OR type='town' OR type='suburb' OR type='hamlet'")
            } else {
                sublayer.setSQL("SELECT * FROM resolution_places_osm_rmsp")
            }
        });
        // colocando ordem de sobreposição dos layers
        layer.setZIndex(1);
        // adiciona o layer ao mapa
        layer.createSubLayer(places["rmsp"]);
        // utilizado para controlar visualização (ou não) dos labels
        sublayer = layer.getSubLayer(0);
    });
// PLACES
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ÁGUAS
cartodb.createLayer(map,{
        user_name: "viniciusmaeda",
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
            cartocss: "#resolution_cem_aguas_2{polygon-fill: #526475; line-color: #526475}"
        });
    });
// ÁGUAS
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
