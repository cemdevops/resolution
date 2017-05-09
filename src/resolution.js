// http://bl.ocks.org/oriolbx
// http://bl.ocks.org/javisantana
// http://bl.ocks.org/michellechandra/90d59f022ad7e9fd0e5d legenda


// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// CONROLE DOS DDL-VARIAVEIS E DDL_TEMAS
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

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// definição do mapa com propriedades suas propriedades
var map = L.map("map", {
    center: [-23.60, -46.55], // centralizar o map nesta posição
    zoom: 11 // nível de zoom
});
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// OpenStreetMap
// url para o tile server + copyright - OpenStreetMap
var urlOSM = "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
// copyright para as imagens
var copyOSM = "&copy; <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a>";
// definição dos layers (URL xyz + copyright)
var layerOSM = L.tileLayer(urlOSM, {attribution: copyOSM}).addTo(map);
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// CartoDB
// url para o tile server - Carto (Positron) + OpenStreetMap
var urlPositron = "http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png";
// url para o tile server - Carto (DarkMatter) + OpenStreetMap
var urlDarkMatter = "http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png";
// copyright para as imagens
var copyCarto = "&copy; <a href='https://carto.com/attributions'>CARTO</a>";
// definição dos layers (URL xyz + copyright)
var layerPositron = L.tileLayer(urlPositron, {attribution: copyOSM});
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

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// CONTROLE DOS BASEMAPS
var radios = document.forms["select_basemap"].elements["radio_change_basemap"];
for(var i = 0, max = radios.length; i < max; i++) {
	radios[i].onclick = function() {
		if (radios.value=="osm") {
			if (map.hasLayer(layerGoogle) || map.hasLayer(layerPositron) || map.hasLayer(layerDarkMatter)) {
				map.removeLayer(layerGoogle);
				map.removeLayer(layerPositron);
				map.removeLayer(layerDarkMatter);
				map.addLayer(layerOSM);
			}
		} else if (radios.value=="google_maps") {
			if (map.hasLayer(layerOSM) || map.hasLayer(layerPositron) || map.hasLayer(layerDarkMatter)) {
				map.removeLayer(layerOSM);
				map.removeLayer(layerPositron);
				map.removeLayer(layerDarkMatter);
				map.addLayer(layerGoogle);
			}
		} else if (radios.value=="carto_positron") {
			if (map.hasLayer(layerOSM) || map.hasLayer(layerGoogle) || map.hasLayer(layerDarkMatter)) {
				map.removeLayer(layerOSM);
				map.removeLayer(layerGoogle);
				map.removeLayer(layerDarkMatter);
				map.addLayer(layerPositron);
			}
		} else if (radios.value=="carto_darkmatter") {
			if (map.hasLayer(layerOSM) || map.hasLayer(layerGoogle) || map.hasLayer(layerPositron)) {
				map.removeLayer(layerOSM);
				map.removeLayer(layerGoogle);
				map.removeLayer(layerPositron);
				map.addLayer(layerDarkMatter);
			}
		}
	}
}
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
        $("#opcao_variavel_demografia").change(function(){
            // limpa os layer de transporte ativo
            layer.getSubLayers().forEach(function(sublayer){sublayer.remove()});
            // verifica qual opção foi selecionada para criar o layer
            $("#opcao_variavel_demografia").each(function(){
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

                // verifica se a legenda do layer existe
                if ($("div.cartodb-legend.choropleth").length) {
                    $('div.cartodb-legend.choropleth').remove();
                }

                if (op != 'selecione') {

                    // obtem os dados do layer construído na tela
                    var sublayer = layer.getSubLayer(0);
                    // define as colunas que serão utilizadas para mostrar as informações abaixo
                    sublayer.setInteractivity('nom_ba,' + op);

                    // mostra as informaçõs do polígono no estilo Tooltip (mouse hover)
                    var toolTip = layer.leafletMap.viz.addOverlay({
                        type: 'tooltip',
                        layer: sublayer,
                        template: "<div class='cartodb-tooltip-content-wrapper'><h4>{{nom_ba}}</h4><p>{{"+op+"}}</p></div>",
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
                    var legenda = "\
                    <div class='cartodb-legend choropleth'> \
                        <div class='legend-title'>"+dados_legenda.titulo+"</div> \
                        <ul> \
                            <li class='min'>"+dados_legenda.minimo+"</li> \
                            <li class='max'>"+dados_legenda.maximo+"</li> \
                            <li class='graph count_441'> \
                                <div class='colors'> \
                                    <div class='quartile' style='background-color:#FFFFB2'></div> \
                                    <div class='quartile' style='background-color:#FED976'></div> \
                                    <div class='quartile' style='background-color:#FEB24C'></div> \
                                    <div class='quartile' style='background-color:#FD8D3C'></div> \
                                    <div class='quartile' style='background-color:#FC4E2A'></div> \
                                    <div class='quartile' style='background-color:#E31A1C'></div> \
                                    <div class='quartile' style='background-color:#B10026'></div> \
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
        $("#opcao_variavel_raca_imigracao").change(function(){
            // limpa os layer de transporte ativo
            layer.getSubLayers().forEach(function(sublayer){sublayer.remove()});
            // verifica qual opção foi selecionada para criar o layer
            $("#opcao_variavel_raca_imigracao").each(function(){
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

                // verifica se a legenda do layer existe
                if ($("div.cartodb-legend.choropleth").length) {
                    $('div.cartodb-legend.choropleth').remove();
                }

                if (op != 'selecione') {

                    // obtem os dados do layer construído na tela
                    var sublayer = layer.getSubLayer(0);
                    // define as colunas que serão utilizadas para mostrar as informações abaixo
                    sublayer.setInteractivity('nom_ba,' + op);

                    // mostra as informaçõs do polígono no estilo Tooltip (mouse hover)
                    var toolTip = layer.leafletMap.viz.addOverlay({
                        type: 'tooltip',
                        layer: sublayer,
                        template: "<div class='cartodb-tooltip-content-wrapper'><h4>{{nom_ba}}</h4><p>{{"+op+"}}</p></div>",
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
                    op == "de020"   ? dados_legenda = {titulo: "Residentes a menos de 3 anos (%)", minimo: "3.39", maximo: "21.93"} :
                    op == "de023"   ? dados_legenda = {titulo: "Nascidas em outro Estado (%)", minimo: "5.65", maximo: "51.05"} :
                    op == "de024"   ? dados_legenda = {titulo: "Nascidas no Nordeste e residentes < 10 anos (%)", minimo: "0", maximo: "18.85"} :
                                      null;

                    // constroi os elementos que compoe a legenda e seus valores
                    var legenda = "\
                    <div class='cartodb-legend choropleth'> \
                        <div class='legend-title'>"+dados_legenda.titulo+"</div> \
                        <ul> \
                            <li class='min'>"+dados_legenda.minimo+"</li> \
                            <li class='max'>"+dados_legenda.maximo+"</li> \
                            <li class='graph count_441'> \
                                <div class='colors'> \
                                    <div class='quartile' style='background-color:#FFFFB2'></div> \
                                    <div class='quartile' style='background-color:#FED976'></div> \
                                    <div class='quartile' style='background-color:#FEB24C'></div> \
                                    <div class='quartile' style='background-color:#FD8D3C'></div> \
                                    <div class='quartile' style='background-color:#FC4E2A'></div> \
                                    <div class='quartile' style='background-color:#E31A1C'></div> \
                                    <div class='quartile' style='background-color:#B10026'></div> \
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
        $("#opcao_variavel_educacao").change(function(){
            // limpa os layer de transporte ativo
            layer.getSubLayers().forEach(function(sublayer){sublayer.remove()});
            // verifica qual opção foi selecionada para criar o layer
            $("#opcao_variavel_educacao").each(function(){
                var op = $(this).attr("value");
                op == "p1_001" ? layer.createSubLayer(educacao[op]) : // ver dicionário
                op == "ins001" ? layer.createSubLayer(educacao[op]) : // ver dicionário
                op == "ins002" ? layer.createSubLayer(educacao[op]) : // ver dicionário
                op == "ins032" ? layer.createSubLayer(educacao[op]) : // ver dicionário
                op == "ins037" ? layer.createSubLayer(educacao[op]) : // ver dicionário
                                  null;

                // captura o texto do ddl-variaveis selecionado
                var variavel = $( "#opcao_variavel_educacao option:selected" ).text();

                // verifica se a legenda do layer existe
                if ($("div.cartodb-legend.choropleth").length) {
                    $('div.cartodb-legend.choropleth').remove();
                }

                if (op != 'selecione') {

                    // obtem os dados do layer construído na tela
                    var sublayer = layer.getSubLayer(0);
                    // define as colunas que serão utilizadas para mostrar as informações abaixo
                    sublayer.setInteractivity('nom_mu,' + op);

                    // mostra as informaçõs do polígono no estilo Tooltip (mouse hover)
                    var toolTip = layer.leafletMap.viz.addOverlay({
                        type: 'tooltip',
                        layer: sublayer,
                        template: "<div class='cartodb-tooltip-content-wrapper'><h4>{{nom_mu}}</h4><p>{{"+op+"}}</p></div>",
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
                    op == "ins032" ? dados_legenda = {titulo: "Pessoas de 7 a 14 anos de idade fora da escola (%)", minimo: "0", maximo: "18.6"} :
                    op == "ins037" ? dados_legenda = {titulo: "Pessoas de 3 a 6 anos de idade que nunca frequentaram escola ou creche (%)", minimo: "0", maximo: "38.7"} :
                                      null;

                    // constroi os elementos que compoe a legenda e seus valores
                    var legenda = "\
                    <div class='cartodb-legend choropleth'> \
                        <div class='legend-title'>"+dados_legenda.titulo+"</div> \
                        <ul> \
                            <li class='min'>"+dados_legenda.minimo+"</li> \
                            <li class='max'>"+dados_legenda.maximo+"</li> \
                            <li class='graph count_441'> \
                                <div class='colors'> \
                                    <div class='quartile' style='background-color:#FFFFB2'></div> \
                                    <div class='quartile' style='background-color:#FED976'></div> \
                                    <div class='quartile' style='background-color:#FEB24C'></div> \
                                    <div class='quartile' style='background-color:#FD8D3C'></div> \
                                    <div class='quartile' style='background-color:#FC4E2A'></div> \
                                    <div class='quartile' style='background-color:#E31A1C'></div> \
                                    <div class='quartile' style='background-color:#B10026'></div> \
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
        $("#opcao_variavel_renda_trabalho").change(function(){
            // limpa os layer de transporte ativo
            layer.getSubLayers().forEach(function(sublayer){sublayer.remove()});
            // verifica qual opção foi selecionada para criar o layer
            $("#opcao_variavel_renda_trabalho").each(function(){

                // verifica se a legenda do layer existe
                if ($("div.cartodb-legend.choropleth").length) {
                    $('div.cartodb-legend.choropleth').remove();
                }

                var op = $(this).attr("value");

                if (op != 'selecione') {

                    layer.createSubLayer(renda_trabalho[op]); // ver dicionário

                    // obtem os dados do layer construído na tela
                    var sublayer = layer.getSubLayer(0);
                    // define as colunas que serão utilizadas para mostrar as informações abaixo
                    sublayer.setInteractivity('nom_ba,' + op);

                    // mostra as informaçõs do polígono no estilo Tooltip (mouse hover)
                    var toolTip = layer.leafletMap.viz.addOverlay({
                        type: 'tooltip',
                        layer: sublayer,
                        template: "<div class='cartodb-tooltip-content-wrapper'><h4>{{nom_ba}}</h4><p>{{"+op+"}}</p></div>",
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
                    op == "ren016" ? dados_legenda = {titulo: "Pessoas com renda per capita até meio salário mínimo (%)", minimo: "0", maximo: "49.63"} :
                    op == "ren101" ? dados_legenda = {titulo: "Pessoas com renda per capita entre 0,5 e 1 salário mínimo (%)", minimo: "0", maximo: "42.57"} :
                    op == "ren102" ? dados_legenda = {titulo: "Pessoas com renda per capita entre 1 e 3 salários mínimos (%)", minimo: "8.78", maximo: "57.29"} :
                    op == "ren103" ? dados_legenda = {titulo: "Pessoas com renda per capita entre 3 e 5 salários mínimos (%)", minimo: "0", maximo: "23.88"} :
                    op == "ren104" ? dados_legenda = {titulo: "Pessoas com renda per capita entre 5 e 10 salários mínimos (%)", minimo: "0", maximo: "32.64"} :
                    op == "ren105" ? dados_legenda = {titulo: "Pessoas com renda per capita acima de 10 salários mínimos (%)", minimo: "0", maximo: "42.66"} :
                    op == "mt006"  ? dados_legenda = {titulo: "Taxa de desocupação", minimo: "0", maximo: "19.99"} :
                    op == "mt008"  ? dados_legenda = {titulo: "Taxa de ocupação", minimo: "80.01", maximo: "98.21"} :
                    op == "mt007"  ? dados_legenda = {titulo: "Taxa de participação", minimo: "49.51", maximo: "74.47"} :
                                      null;

                    // constroi os elementos que compoe a legenda e seus valores
                    var legenda = "\
                    <div class='cartodb-legend choropleth'> \
                        <div class='legend-title'>"+dados_legenda.titulo+"</div> \
                        <ul> \
                            <li class='min'>"+dados_legenda.minimo+"</li> \
                            <li class='max'>"+dados_legenda.maximo+"</li> \
                            <li class='graph count_441'> \
                                <div class='colors'> \
                                    <div class='quartile' style='background-color:#FFFFB2'></div> \
                                    <div class='quartile' style='background-color:#FED976'></div> \
                                    <div class='quartile' style='background-color:#FEB24C'></div> \
                                    <div class='quartile' style='background-color:#FD8D3C'></div> \
                                    <div class='quartile' style='background-color:#FC4E2A'></div> \
                                    <div class='quartile' style='background-color:#E31A1C'></div> \
                                    <div class='quartile' style='background-color:#B10026'></div> \
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
        $("#opcao_variavel_religiao").change(function(){
            // limpa os layer de transporte ativo
            layer.getSubLayers().forEach(function(sublayer){sublayer.remove()});
            // verifica qual opção foi selecionada para criar o layer
            $("#opcao_variavel_religiao").each(function(){

                // verifica se a legenda do layer existe
                if ($("div.cartodb-legend.choropleth").length) {
                    $('div.cartodb-legend.choropleth').remove();
                }

                var op = $(this).attr("value");

                if (op != 'selecione') {

                    layer.createSubLayer(religiao[op]); // ver dicionário

                    // obtem os dados do layer construído na tela
                    var sublayer = layer.getSubLayer(0);
                    // define as colunas que serão utilizadas para mostrar as informações abaixo
                    sublayer.setInteractivity('nom_ba,' + op);

                    // mostra as informaçõs do polígono no estilo Tooltip (mouse hover)
                    var toolTip = layer.leafletMap.viz.addOverlay({
                        type: 'tooltip',
                        layer: sublayer,
                        template: "<div class='cartodb-tooltip-content-wrapper'><h4>{{nom_ba}}</h4><p>{{"+op+"}}</p></div>",
                        width: 200,
                        position: 'bottom|right',
                        fields: [{ nom_ba: 'nom_ba' }]
                    });
                    $('body').append(toolTip.render().el);

                    // variável para eleborar os dados da legenda
                    var dados_legenda;

                    // verifica o layer ativo para definir os valores da legenda
                    op == "re027" ? dados_legenda = {titulo: "Percentual de pessoas que se declararam (apenas) sem religião", minimo: "0", maximo: "19.1"} :
                    op == "re028" ? dados_legenda = {titulo: "Percentual de pessoas que se declararam agnósticos", minimo: "0", maximo: "3.16"} :
                    op == "re029" ? dados_legenda = {titulo: "Percentual de pessoas que se declararam ateus", minimo: "0", maximo: "4.3"} :
                    op == "re030" ? dados_legenda = {titulo: "Percentual de pessoas que se declararam católicos", minimo: "38.34", maximo: "82.7"} :
                    op == "re031" ? dados_legenda = {titulo: "Percentual de pessoas que se declararam evangélicos", minimo: "3.99", maximo: "44.26"} :
                    op == "re038" ? dados_legenda = {titulo: "Percentual de pessoas que se declararam evangélicos pentecostais", minimo: "2.22", maximo: "41.79"} :
                    op == "re047" ? dados_legenda = {titulo: "Percentual de pessoas que se declararam com religião afro-brasileira", minimo: "0", maximo: "2.33"} :
                    op == "re050" ? dados_legenda = {titulo: "Percentual de pessoas pertencentes a outros segmentos religiosos", minimo: "0", maximo: "31.05"} :
                                      null;

                    // constroi os elementos que compoe a legenda e seus valores
                    var legenda = "\
                    <div class='cartodb-legend choropleth'> \
                        <div class='legend-title'>"+dados_legenda.titulo+"</div> \
                        <ul> \
                            <li class='min'>"+dados_legenda.minimo+"</li> \
                            <li class='max'>"+dados_legenda.maximo+"</li> \
                            <li class='graph count_441'> \
                                <div class='colors'> \
                                    <div class='quartile' style='background-color:#FFFFB2'></div> \
                                    <div class='quartile' style='background-color:#FED976'></div> \
                                    <div class='quartile' style='background-color:#FEB24C'></div> \
                                    <div class='quartile' style='background-color:#FD8D3C'></div> \
                                    <div class='quartile' style='background-color:#FC4E2A'></div> \
                                    <div class='quartile' style='background-color:#E31A1C'></div> \
                                    <div class='quartile' style='background-color:#B10026'></div> \
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
