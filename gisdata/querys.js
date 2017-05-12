// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// DEMOGRAFIA
var demografia = {
    "p3_001": { // População
        sql: "SELECT * FROM resolution_sc2010_cem_rmsp_erase",
        cartocss: "#resolution_sc2010_cem_rmsp_erase{polygon-fill: #FC4E2A;polygon-opacity: 0.5;line-color: #476b6b;line-width: 0;line-opacity: 1;} \
            #resolution_sc2010_cem_rmsp_erase [ p3_001 <= 3489 ] { polygon-fill: #B10026; } \
			#resolution_sc2010_cem_rmsp_erase [ p3_001 <= 1671 ] { polygon-fill: #E31A1C; } \
			#resolution_sc2010_cem_rmsp_erase [ p3_001 <= 1350 ] { polygon-fill: #FC4E2A; } \
			#resolution_sc2010_cem_rmsp_erase [ p3_001 <= 1079 ] { polygon-fill: #FD8D3C; } \
			#resolution_sc2010_cem_rmsp_erase [ p3_001 <= 809  ] { polygon-fill: #FEB24C; } \
			#resolution_sc2010_cem_rmsp_erase [ p3_001 <= 539  ] { polygon-fill: #FED976; } \
			#resolution_sc2010_cem_rmsp_erase [ p3_001 <= 269  ] { polygon-fill: #FFFFB2; }"
//        Clóvis/André - 20170331
//        OBS: Abaixo código para utilização de diferente forma de chamada de mapa, com cálculo automático de valores de quantiles.
//             Pode ser usada após checagem de valores calculados pelo carto, que está retornando valores diferentes das atuais.
//             Exemplo: valores retornados para o campo p3_001: (285,447,562,671,797,974,3489)
//
//        cartocss: "#resolution_sc2010_cem_rmsp_erase { polygon-fill: ramp([p3_001], (#FFFFB2, #FED976, #FEB24C, #FD8D3C, #FC4E2A, #E31A1C, #B10026), quantiles);\
//                   polygon-opacity: 0.5;\
//                   line-width: 1;\
//                   line-color: #FFF;\
//                   line-opacity: 0.5;}"
    },
    "p11_001": { // Homens residentes
        sql: "SELECT * FROM resolution_sc2010_cem_rmsp_erase",
        cartocss: "#resolution_sc2010_cem_rmsp_erase{polygon-fill: #FC4E2A;polygon-opacity: 0.5;line-color: #476b6b;line-width: 0;line-opacity: 1;} \
            #resolution_sc2010_cem_rmsp_erase [ p11_001 <= 3320 ] { polygon-fill: #B10026; } \
			#resolution_sc2010_cem_rmsp_erase [ p11_001 <= 931  ] { polygon-fill: #E31A1C; } \
			#resolution_sc2010_cem_rmsp_erase [ p11_001 <= 750  ] { polygon-fill: #FC4E2A; } \
			#resolution_sc2010_cem_rmsp_erase [ p11_001 <= 600  ] { polygon-fill: #FD8D3C; } \
			#resolution_sc2010_cem_rmsp_erase [ p11_001 <= 450  ] { polygon-fill: #FEB24C; } \
			#resolution_sc2010_cem_rmsp_erase [ p11_001 <= 300  ] { polygon-fill: #FED976; } \
			#resolution_sc2010_cem_rmsp_erase [ p11_001 <= 150  ] { polygon-fill: #FFFFB2; }"
    },
    "p12_001": { // Mulheres residentes
        sql: "SELECT * FROM resolution_sc2010_cem_rmsp_erase",
        cartocss: "#resolution_sc2010_cem_rmsp_erase{polygon-fill: #FC4E2A;polygon-opacity: 0.5;line-color: #476b6b;line-width: 0;line-opacity: 1;} \
            #resolution_sc2010_cem_rmsp_erase [ p12_001 <= 1946 ] { polygon-fill: #B10026; } \
			#resolution_sc2010_cem_rmsp_erase [ p12_001 <= 957  ] { polygon-fill: #E31A1C; } \
			#resolution_sc2010_cem_rmsp_erase [ p12_001 <= 764  ] { polygon-fill: #FC4E2A; } \
			#resolution_sc2010_cem_rmsp_erase [ p12_001 <= 610  ] { polygon-fill: #FD8D3C; } \
			#resolution_sc2010_cem_rmsp_erase [ p12_001 <= 458  ] { polygon-fill: #FEB24C; } \
			#resolution_sc2010_cem_rmsp_erase [ p12_001 <= 305  ] { polygon-fill: #FED976; } \
			#resolution_sc2010_cem_rmsp_erase [ p12_001 <= 152  ] { polygon-fill: #FFFFB2; }"
    },
    "p13_022": { // Faixa etárias - menor que 1 ano
        sql: "SELECT * FROM resolution_sc2010_cem_rmsp_erase",
        cartocss: "#resolution_sc2010_cem_rmsp_erase{polygon-fill: #FC4E2A;polygon-opacity: 0.5;line-color: #476b6b;line-width: 0;line-opacity: 1;} \
            #resolution_sc2010_cem_rmsp_erase [ p13_022 <= 115 ] { polygon-fill: #B10026; } \
			#resolution_sc2010_cem_rmsp_erase [ p13_022 <= 57  ] { polygon-fill: #E31A1C; } \
			#resolution_sc2010_cem_rmsp_erase [ p13_022 <= 47  ] { polygon-fill: #FC4E2A; } \
			#resolution_sc2010_cem_rmsp_erase [ p13_022 <= 37  ] { polygon-fill: #FD8D3C; } \
			#resolution_sc2010_cem_rmsp_erase [ p13_022 <= 28  ] { polygon-fill: #FEB24C; } \
			#resolution_sc2010_cem_rmsp_erase [ p13_022 <= 18  ] { polygon-fill: #FED976; } \
			#resolution_sc2010_cem_rmsp_erase [ p13_022 <= 9   ] { polygon-fill: #FFFFB2; }"
    },
    "p13_036": { // Faixa etárias - 2 anos
        sql: "SELECT * FROM resolution_sc2010_cem_rmsp_erase",
        cartocss: "#resolution_sc2010_cem_rmsp_erase{polygon-fill: #FC4E2A;polygon-opacity: 0.5;line-color: #476b6b;line-width: 0;line-opacity: 1;} \
            #resolution_sc2010_cem_rmsp_erase [ p13_036 <= 89 ] { polygon-fill: #B10026; } \
			#resolution_sc2010_cem_rmsp_erase [ p13_036 <= 55  ] { polygon-fill: #E31A1C; } \
			#resolution_sc2010_cem_rmsp_erase [ p13_036 <= 45  ] { polygon-fill: #FC4E2A; } \
			#resolution_sc2010_cem_rmsp_erase [ p13_036 <= 36  ] { polygon-fill: #FD8D3C; } \
			#resolution_sc2010_cem_rmsp_erase [ p13_036 <= 27  ] { polygon-fill: #FEB24C; } \
			#resolution_sc2010_cem_rmsp_erase [ p13_036 <= 18  ] { polygon-fill: #FED976; } \
			#resolution_sc2010_cem_rmsp_erase [ p13_036 <= 9   ] { polygon-fill: #FFFFB2; }"
    },
    "p13_037": { // Faixa etárias - 3 anos
        sql: "SELECT * FROM resolution_sc2010_cem_rmsp_erase",
        cartocss: "#resolution_sc2010_cem_rmsp_erase{polygon-fill: #FC4E2A;polygon-opacity: 0.5;line-color: #476b6b;line-width: 0;line-opacity: 1;} \
            #resolution_sc2010_cem_rmsp_erase [ p13_037 <= 135 ] { polygon-fill: #B10026; } \
			#resolution_sc2010_cem_rmsp_erase [ p13_037 <= 61  ] { polygon-fill: #E31A1C; } \
			#resolution_sc2010_cem_rmsp_erase [ p13_037 <= 47  ] { polygon-fill: #FC4E2A; } \
			#resolution_sc2010_cem_rmsp_erase [ p13_037 <= 38  ] { polygon-fill: #FD8D3C; } \
			#resolution_sc2010_cem_rmsp_erase [ p13_037 <= 28  ] { polygon-fill: #FEB24C; } \
			#resolution_sc2010_cem_rmsp_erase [ p13_037 <= 19  ] { polygon-fill: #FED976; } \
			#resolution_sc2010_cem_rmsp_erase [ p13_037 <= 9   ] { polygon-fill: #FFFFB2; }"
    },
    "p13_038": { // Faixa etárias - 4 anos
        sql: "SELECT * FROM resolution_sc2010_cem_rmsp_erase",
        cartocss: "#resolution_sc2010_cem_rmsp_erase{polygon-fill: #FC4E2A;polygon-opacity: 0.5;line-color: #476b6b;line-width: 0;line-opacity: 1;} \
            #resolution_sc2010_cem_rmsp_erase [ p13_038 <= 114 ] { polygon-fill: #B10026; } \
			#resolution_sc2010_cem_rmsp_erase [ p13_038 <= 57  ] { polygon-fill: #E31A1C; } \
			#resolution_sc2010_cem_rmsp_erase [ p13_038 <= 47  ] { polygon-fill: #FC4E2A; } \
			#resolution_sc2010_cem_rmsp_erase [ p13_038 <= 38  ] { polygon-fill: #FD8D3C; } \
			#resolution_sc2010_cem_rmsp_erase [ p13_038 <= 28  ] { polygon-fill: #FEB24C; } \
			#resolution_sc2010_cem_rmsp_erase [ p13_038 <= 19  ] { polygon-fill: #FED976; } \
			#resolution_sc2010_cem_rmsp_erase [ p13_038 <= 9   ] { polygon-fill: #FFFFB2; }"
    },
    "p13_039": { // Faixa etárias - 5 anos
        sql: "SELECT * FROM resolution_sc2010_cem_rmsp_erase",
        cartocss: "#resolution_sc2010_cem_rmsp_erase{polygon-fill: #FC4E2A;polygon-opacity: 0.5;line-color: #476b6b;line-width: 0;line-opacity: 1;} \
            #resolution_sc2010_cem_rmsp_erase [ p13_039 <= 96 ] { polygon-fill: #B10026; } \
			#resolution_sc2010_cem_rmsp_erase [ p13_039 <= 61 ] { polygon-fill: #E31A1C; } \
			#resolution_sc2010_cem_rmsp_erase [ p13_039 <= 50 ] { polygon-fill: #FC4E2A; } \
			#resolution_sc2010_cem_rmsp_erase [ p13_039 <= 40 ] { polygon-fill: #FD8D3C; } \
			#resolution_sc2010_cem_rmsp_erase [ p13_039 <= 30 ] { polygon-fill: #FEB24C; } \
			#resolution_sc2010_cem_rmsp_erase [ p13_039 <= 20 ] { polygon-fill: #FED976; } \
			#resolution_sc2010_cem_rmsp_erase [ p13_039 <= 10 ] { polygon-fill: #FFFFB2; }"
    },
    "p13_201": { // Faixa etárias - 6 a 10 anos
        sql: "SELECT * FROM resolution_sc2010_cem_rmsp_erase",
        cartocss: "#resolution_sc2010_cem_rmsp_erase{polygon-fill: #FC4E2A;polygon-opacity: 0.5;line-color: #476b6b;line-width: 0;line-opacity: 1;} \
            #resolution_sc2010_cem_rmsp_erase [ p13_201 <= 475 ] { polygon-fill: #B10026; } \
			#resolution_sc2010_cem_rmsp_erase [ p13_201 <= 245 ] { polygon-fill: #E31A1C; } \
			#resolution_sc2010_cem_rmsp_erase [ p13_201 <= 202 ] { polygon-fill: #FC4E2A; } \
			#resolution_sc2010_cem_rmsp_erase [ p13_201 <= 162 ] { polygon-fill: #FD8D3C; } \
			#resolution_sc2010_cem_rmsp_erase [ p13_201 <= 121 ] { polygon-fill: #FEB24C; } \
			#resolution_sc2010_cem_rmsp_erase [ p13_201 <= 81  ] { polygon-fill: #FED976; } \
			#resolution_sc2010_cem_rmsp_erase [ p13_201 <= 40  ] { polygon-fill: #FFFFB2; }"
    },
    "p13_202": { // Faixa etárias - 11 a 14 anos
        sql: "SELECT * FROM resolution_sc2010_cem_rmsp_erase",
        cartocss: "#resolution_sc2010_cem_rmsp_erase{polygon-fill: #FC4E2A;polygon-opacity: 0.5;line-color: #476b6b;line-width: 0;line-opacity: 1;} \
            #resolution_sc2010_cem_rmsp_erase [ p13_202 <= 442 ] { polygon-fill: #B10026; } \
			#resolution_sc2010_cem_rmsp_erase [ p13_202 <= 209 ] { polygon-fill: #E31A1C; } \
			#resolution_sc2010_cem_rmsp_erase [ p13_202 <= 172 ] { polygon-fill: #FC4E2A; } \
			#resolution_sc2010_cem_rmsp_erase [ p13_202 <= 138 ] { polygon-fill: #FD8D3C; } \
			#resolution_sc2010_cem_rmsp_erase [ p13_202 <= 103 ] { polygon-fill: #FEB24C; } \
			#resolution_sc2010_cem_rmsp_erase [ p13_202 <= 69  ] { polygon-fill: #FED976; } \
			#resolution_sc2010_cem_rmsp_erase [ p13_202 <= 34  ] { polygon-fill: #FFFFB2; }"
    },
    "p13_203": { // Faixa etárias - 15 a 17 anos
        sql: "SELECT * FROM resolution_sc2010_cem_rmsp_erase",
        cartocss: "#resolution_sc2010_cem_rmsp_erase{polygon-fill: #FC4E2A;polygon-opacity: 0.5;line-color: #476b6b;line-width: 0;line-opacity: 1;} \
            #resolution_sc2010_cem_rmsp_erase [ p13_203 <= 228 ] { polygon-fill: #B10026; } \
			#resolution_sc2010_cem_rmsp_erase [ p13_203 <= 149 ] { polygon-fill: #E31A1C; } \
			#resolution_sc2010_cem_rmsp_erase [ p13_203 <= 124 ] { polygon-fill: #FC4E2A; } \
			#resolution_sc2010_cem_rmsp_erase [ p13_203 <= 99  ] { polygon-fill: #FD8D3C; } \
			#resolution_sc2010_cem_rmsp_erase [ p13_203 <= 74  ] { polygon-fill: #FEB24C; } \
			#resolution_sc2010_cem_rmsp_erase [ p13_203 <= 49  ] { polygon-fill: #FED976; } \
			#resolution_sc2010_cem_rmsp_erase [ p13_203 <= 24  ] { polygon-fill: #FFFFB2; }"
    },
    "p13_204": { // Faixa etárias - 18 a 29 anos
        sql: "SELECT * FROM resolution_sc2010_cem_rmsp_erase",
        cartocss: "#resolution_sc2010_cem_rmsp_erase{polygon-fill: #FC4E2A;polygon-opacity: 0.5;line-color: #476b6b;line-width: 0;line-opacity: 1;} \
            #resolution_sc2010_cem_rmsp_erase [ p13_204 <= 2068 ] { polygon-fill: #B10026; } \
			#resolution_sc2010_cem_rmsp_erase [ p13_204 <= 488  ] { polygon-fill: #E31A1C; } \
			#resolution_sc2010_cem_rmsp_erase [ p13_204 <= 395  ] { polygon-fill: #FC4E2A; } \
			#resolution_sc2010_cem_rmsp_erase [ p13_204 <= 316  ] { polygon-fill: #FD8D3C; } \
			#resolution_sc2010_cem_rmsp_erase [ p13_204 <= 237  ] { polygon-fill: #FEB24C; } \
			#resolution_sc2010_cem_rmsp_erase [ p13_204 <= 158  ] { polygon-fill: #FED976; } \
			#resolution_sc2010_cem_rmsp_erase [ p13_204 <= 79   ] { polygon-fill: #FFFFB2; }"
    },
    "p13_205": { // Faixa etárias - 30 a 49 anos
        sql: "SELECT * FROM resolution_sc2010_cem_rmsp_erase",
        cartocss: "#resolution_sc2010_cem_rmsp_erase{polygon-fill: #FC4E2A;polygon-opacity: 0.5;line-color: #476b6b;line-width: 0;line-opacity: 1;} \
            #resolution_sc2010_cem_rmsp_erase [ p13_205 <= 1239 ] { polygon-fill: #B10026; } \
			#resolution_sc2010_cem_rmsp_erase [ p13_205 <= 640  ] { polygon-fill: #E31A1C; } \
			#resolution_sc2010_cem_rmsp_erase [ p13_205 <= 519  ] { polygon-fill: #FC4E2A; } \
			#resolution_sc2010_cem_rmsp_erase [ p13_205 <= 415  ] { polygon-fill: #FD8D3C; } \
			#resolution_sc2010_cem_rmsp_erase [ p13_205 <= 311  ] { polygon-fill: #FEB24C; } \
			#resolution_sc2010_cem_rmsp_erase [ p13_205 <= 207  ] { polygon-fill: #FED976; } \
			#resolution_sc2010_cem_rmsp_erase [ p13_205 <= 103  ] { polygon-fill: #FFFFB2; }"
    },
    "p13_206": { // Faixa etárias - 50 a 64 anos
        sql: "SELECT * FROM resolution_sc2010_cem_rmsp_erase",
        cartocss: "#resolution_sc2010_cem_rmsp_erase{polygon-fill: #FC4E2A;polygon-opacity: 0.5;line-color: #476b6b;line-width: 0;line-opacity: 1;} \
            #resolution_sc2010_cem_rmsp_erase [ p13_206 <= 445 ] { polygon-fill: #B10026; } \
			#resolution_sc2010_cem_rmsp_erase [ p13_206 <= 265 ] { polygon-fill: #E31A1C; } \
			#resolution_sc2010_cem_rmsp_erase [ p13_206 <= 220 ] { polygon-fill: #FC4E2A; } \
			#resolution_sc2010_cem_rmsp_erase [ p13_206 <= 176 ] { polygon-fill: #FD8D3C; } \
			#resolution_sc2010_cem_rmsp_erase [ p13_206 <= 132 ] { polygon-fill: #FEB24C; } \
			#resolution_sc2010_cem_rmsp_erase [ p13_206 <= 88  ] { polygon-fill: #FED976; } \
			#resolution_sc2010_cem_rmsp_erase [ p13_206 <= 44  ] { polygon-fill: #FFFFB2; }"
    },
    "p13_207": { // Faixa etárias - 65 a 79 anos
        sql: "SELECT * FROM resolution_sc2010_cem_rmsp_erase",
        cartocss: "#resolution_sc2010_cem_rmsp_erase{polygon-fill: #FC4E2A;polygon-opacity: 0.5;line-color: #476b6b;line-width: 0;line-opacity: 1;} \
            #resolution_sc2010_cem_rmsp_erase [ p13_207 <= 190 ] { polygon-fill: #B10026; } \
			#resolution_sc2010_cem_rmsp_erase [ p13_207 <= 139 ] { polygon-fill: #E31A1C; } \
			#resolution_sc2010_cem_rmsp_erase [ p13_207 <= 116 ] { polygon-fill: #FC4E2A; } \
			#resolution_sc2010_cem_rmsp_erase [ p13_207 <= 93  ] { polygon-fill: #FD8D3C; } \
			#resolution_sc2010_cem_rmsp_erase [ p13_207 <= 69  ] { polygon-fill: #FEB24C; } \
			#resolution_sc2010_cem_rmsp_erase [ p13_207 <= 46  ] { polygon-fill: #FED976; } \
			#resolution_sc2010_cem_rmsp_erase [ p13_207 <= 23  ] { polygon-fill: #FFFFB2; }"
    },
    "p13_208": { // Faixa etárias - acima 80 anos
        sql: "SELECT * FROM resolution_sc2010_cem_rmsp_erase",
        cartocss: "#resolution_sc2010_cem_rmsp_erase{polygon-fill: #FC4E2A;polygon-opacity: 0.5;line-color: #476b6b;line-width: 0;line-opacity: 1;} \
            #resolution_sc2010_cem_rmsp_erase [ p13_208 <= 167 ] { polygon-fill: #B10026; } \
			#resolution_sc2010_cem_rmsp_erase [ p13_208 <= 80  ] { polygon-fill: #E31A1C; } \
			#resolution_sc2010_cem_rmsp_erase [ p13_208 <= 64  ] { polygon-fill: #FC4E2A; } \
			#resolution_sc2010_cem_rmsp_erase [ p13_208 <= 51  ] { polygon-fill: #FD8D3C; } \
			#resolution_sc2010_cem_rmsp_erase [ p13_208 <= 38  ] { polygon-fill: #FEB24C; } \
			#resolution_sc2010_cem_rmsp_erase [ p13_208 <= 25  ] { polygon-fill: #FED976; } \
			#resolution_sc2010_cem_rmsp_erase [ p13_208 <= 12  ] { polygon-fill: #FFFFB2; }"
    },
    "t_env": { // Taxa de envelhecimento
        sql: "SELECT * FROM resolution_sc2010_cem_rmsp_erase",
        cartocss: "#resolution_sc2010_cem_rmsp_erase{polygon-fill: #FC4E2A;polygon-opacity: 0.5;line-color: #476b6b;line-width: 0;line-opacity: 1;} \
            #resolution_sc2010_cem_rmsp_erase [ t_env <= 167 ] { polygon-fill: #B10026; } \
			#resolution_sc2010_cem_rmsp_erase [ t_env <= 80  ] { polygon-fill: #E31A1C; } \
			#resolution_sc2010_cem_rmsp_erase [ t_env <= 64  ] { polygon-fill: #FC4E2A; } \
			#resolution_sc2010_cem_rmsp_erase [ t_env <= 51  ] { polygon-fill: #FD8D3C; } \
			#resolution_sc2010_cem_rmsp_erase [ t_env <= 38  ] { polygon-fill: #FEB24C; } \
			#resolution_sc2010_cem_rmsp_erase [ t_env <= 25  ] { polygon-fill: #FED976; } \
			#resolution_sc2010_cem_rmsp_erase [ t_env <= 12  ] { polygon-fill: #FFFFB2; }"
    }
};

// Clóvis/André 20170331 - vetor com valores de quantiles
// OBS: Poderá ser eliminado quando valores forem obtidos dinamicamente
var demografia_valores_quantiles = {
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
// DEMOGRAFIA
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// RAÇA E IMIGRAÇÃO
var raca_imigracao = {
    "p3_002": { // Cor/Raça - Branca
        sql: "SELECT * FROM resolution_sc2010_cem_rmsp_erase",
        cartocss: "#resolution_sc2010_cem_rmsp_erase{polygon-fill: #FC4E2A;polygon-opacity: 0.5;line-color: #476b6b;line-width: 0;line-opacity: 1;} \
            #resolution_sc2010_cem_rmsp_erase [ p3_002 <= 1834 ] { polygon-fill: #B10026; } \
			#resolution_sc2010_cem_rmsp_erase [ p3_002 <= 998  ] { polygon-fill: #E31A1C; } \
			#resolution_sc2010_cem_rmsp_erase [ p3_002 <= 818  ] { polygon-fill: #FC4E2A; } \
			#resolution_sc2010_cem_rmsp_erase [ p3_002 <= 654  ] { polygon-fill: #FD8D3C; } \
			#resolution_sc2010_cem_rmsp_erase [ p3_002 <= 491  ] { polygon-fill: #FEB24C; } \
			#resolution_sc2010_cem_rmsp_erase [ p3_002 <= 327  ] { polygon-fill: #FED976; } \
			#resolution_sc2010_cem_rmsp_erase [ p3_002 <= 163  ] { polygon-fill: #FFFFB2; }"
    },
    "p3_003": { // Cor/Raça - Preta
        sql: "SELECT * FROM resolution_sc2010_cem_rmsp_erase",
        cartocss: "#resolution_sc2010_cem_rmsp_erase{polygon-fill: #FC4E2A;polygon-opacity: 0.5;line-color: #476b6b;line-width: 0;line-opacity: 1;} \
            #resolution_sc2010_cem_rmsp_erase [ p3_003 <= 465 ] { polygon-fill: #B10026; } \
			#resolution_sc2010_cem_rmsp_erase [ p3_003 <= 265 ] { polygon-fill: #E31A1C; } \
			#resolution_sc2010_cem_rmsp_erase [ p3_003 <= 206 ] { polygon-fill: #FC4E2A; } \
			#resolution_sc2010_cem_rmsp_erase [ p3_003 <= 165 ] { polygon-fill: #FD8D3C; } \
			#resolution_sc2010_cem_rmsp_erase [ p3_003 <= 123 ] { polygon-fill: #FEB24C; } \
			#resolution_sc2010_cem_rmsp_erase [ p3_003 <= 82  ] { polygon-fill: #FED976; } \
			#resolution_sc2010_cem_rmsp_erase [ p3_003 <= 41  ] { polygon-fill: #FFFFB2; }"
    },
    "p3_004": { // Cor/Raça - Amarela
        sql: "SELECT * FROM resolution_sc2010_cem_rmsp_erase",
        cartocss: "#resolution_sc2010_cem_rmsp_erase{polygon-fill: #FC4E2A;polygon-opacity: 0.5;line-color: #476b6b;line-width: 0;line-opacity: 1;} \
            #resolution_sc2010_cem_rmsp_erase [ p3_004 <= 480 ] { polygon-fill: #B10026; } \
			#resolution_sc2010_cem_rmsp_erase [ p3_004 <= 216 ] { polygon-fill: #E31A1C; } \
			#resolution_sc2010_cem_rmsp_erase [ p3_004 <= 161 ] { polygon-fill: #FC4E2A; } \
			#resolution_sc2010_cem_rmsp_erase [ p3_004 <= 122 ] { polygon-fill: #FD8D3C; } \
			#resolution_sc2010_cem_rmsp_erase [ p3_004 <= 91  ] { polygon-fill: #FEB24C; } \
			#resolution_sc2010_cem_rmsp_erase [ p3_004 <= 60  ] { polygon-fill: #FED976; } \
			#resolution_sc2010_cem_rmsp_erase [ p3_004 <= 30  ] { polygon-fill: #FFFFB2; }"
    },
    "p3_005": { // Cor/Raça - Parda
        sql: "SELECT * FROM resolution_sc2010_cem_rmsp_erase",
        cartocss: "#resolution_sc2010_cem_rmsp_erase{polygon-fill: #FC4E2A;polygon-opacity: 0.5;line-color: #476b6b;line-width: 0;line-opacity: 1;} \
            #resolution_sc2010_cem_rmsp_erase [ p3_005 <= 2131 ] { polygon-fill: #B10026; } \
			#resolution_sc2010_cem_rmsp_erase [ p3_005 <= 883  ] { polygon-fill: #E31A1C; } \
			#resolution_sc2010_cem_rmsp_erase [ p3_005 <= 717  ] { polygon-fill: #FC4E2A; } \
			#resolution_sc2010_cem_rmsp_erase [ p3_005 <= 574  ] { polygon-fill: #FD8D3C; } \
			#resolution_sc2010_cem_rmsp_erase [ p3_005 <= 430  ] { polygon-fill: #FEB24C; } \
			#resolution_sc2010_cem_rmsp_erase [ p3_005 <= 287  ] { polygon-fill: #FED976; } \
			#resolution_sc2010_cem_rmsp_erase [ p3_005 <= 143  ] { polygon-fill: #FFFFB2; }"
    },
    "p3_006": { // Cor/Raça - Indígena
        sql: "SELECT * FROM resolution_sc2010_cem_rmsp_erase",
        cartocss: "#resolution_sc2010_cem_rmsp_erase{polygon-fill: #FC4E2A;polygon-opacity: 0.5;line-color: #476b6b;line-width: 0;line-opacity: 1;} \
            #resolution_sc2010_cem_rmsp_erase [ p3_006 <= 599 ] { polygon-fill: #B10026; } \
			#resolution_sc2010_cem_rmsp_erase [ p3_006 <= 74  ] { polygon-fill: #E31A1C; } \
			#resolution_sc2010_cem_rmsp_erase [ p3_006 <= 42  ] { polygon-fill: #FC4E2A; } \
			#resolution_sc2010_cem_rmsp_erase [ p3_006 <= 26  ] { polygon-fill: #FD8D3C; } \
			#resolution_sc2010_cem_rmsp_erase [ p3_006 <= 18  ] { polygon-fill: #FEB24C; } \
			#resolution_sc2010_cem_rmsp_erase [ p3_006 <= 12  ] { polygon-fill: #FED976; } \
			#resolution_sc2010_cem_rmsp_erase [ p3_006 <= 6   ] { polygon-fill: #FFFFB2; }"
    },
    "de020": { // Pessoas residentes a menos de 3 anos (%)
        sql: "SELECT * FROM resolution_sc2010_cem_rmsp_erase",
        cartocss: "#resolution_sc2010_cem_rmsp_erase{polygon-fill: #FC4E2A;polygon-opacity: 0.5;line-color: #476b6b;line-width: 0;line-opacity: 1;} \
            #resolution_sc2010_cem_rmsp_erase [ de020 <= 21.9 ] { polygon-fill: #B10026; } \
			#resolution_sc2010_cem_rmsp_erase [ de020 <= 12.8 ] { polygon-fill: #E31A1C; } \
			#resolution_sc2010_cem_rmsp_erase [ de020 <= 10.9 ] { polygon-fill: #FC4E2A; } \
			#resolution_sc2010_cem_rmsp_erase [ de020 <= 9.5  ] { polygon-fill: #FD8D3C; } \
			#resolution_sc2010_cem_rmsp_erase [ de020 <= 8.3  ] { polygon-fill: #FEB24C; } \
			#resolution_sc2010_cem_rmsp_erase [ de020 <= 7.2  ] { polygon-fill: #FED976; } \
			#resolution_sc2010_cem_rmsp_erase [ de020 <= 5.9  ] { polygon-fill: #FFFFB2; }"
    },
    "de023": { // Pessoas nascidas em outro Estado (%)
        sql: "SELECT * FROM resolution_sc2010_cem_rmsp_erase",
        cartocss: "#resolution_sc2010_cem_rmsp_erase{polygon-fill: #FC4E2A;polygon-opacity: 0.5;line-color: #476b6b;line-width: 0;line-opacity: 1;} \
            #resolution_sc2010_cem_rmsp_erase [ de023 <= 51.0 ] { polygon-fill: #B10026; } \
			#resolution_sc2010_cem_rmsp_erase [ de023 <= 32.4 ] { polygon-fill: #E31A1C; } \
			#resolution_sc2010_cem_rmsp_erase [ de023 <= 29.2 ] { polygon-fill: #FC4E2A; } \
			#resolution_sc2010_cem_rmsp_erase [ de023 <= 26.1 ] { polygon-fill: #FD8D3C; } \
			#resolution_sc2010_cem_rmsp_erase [ de023 <= 22.9 ] { polygon-fill: #FEB24C; } \
			#resolution_sc2010_cem_rmsp_erase [ de023 <= 19.8 ] { polygon-fill: #FED976; } \
			#resolution_sc2010_cem_rmsp_erase [ de023 <= 16.5 ] { polygon-fill: #FFFFB2; }"
    },
    "de024": { // Pessoas nascidas no Nordeste residentes a menos de 10 anos (%)
        sql: "SELECT * FROM resolution_sc2010_cem_rmsp_erase",
        cartocss: "#resolution_sc2010_cem_rmsp_erase{polygon-fill: #FC4E2A;polygon-opacity: 0.5;line-color: #476b6b;line-width: 0;line-opacity: 1;} \
            #resolution_sc2010_cem_rmsp_erase [ de024 <= 18.8 ] { polygon-fill: #B10026; } \
			#resolution_sc2010_cem_rmsp_erase [ de024 <= 6.2  ] { polygon-fill: #E31A1C; } \
			#resolution_sc2010_cem_rmsp_erase [ de024 <= 5.2  ] { polygon-fill: #FC4E2A; } \
			#resolution_sc2010_cem_rmsp_erase [ de024 <= 4.3  ] { polygon-fill: #FD8D3C; } \
			#resolution_sc2010_cem_rmsp_erase [ de024 <= 3.5  ] { polygon-fill: #FEB24C; } \
			#resolution_sc2010_cem_rmsp_erase [ de024 <= 2.8  ] { polygon-fill: #FED976; } \
			#resolution_sc2010_cem_rmsp_erase [ de024 <= 2.1  ] { polygon-fill: #FFFFB2; }"
    }
};

var raca_emigracao_valores_quantiles = {
    "p3_002": [163,327,491,654,818,998,1834],
    "p3_003": [41,82,123,165,206,265,465],
    "p3_004": [30,60,91,122,161,216,480],
    "p3_005": [143,287,430,574,717,883,2131],
    "p3_006": [6,12,28,26,42,74,599],
    "de020": [5.9,7.2,8.3,9.5,10.9,12.8,21.9],
    "de023": [16.5,19.8,22.9,26.1,29.2,32.4,51.0],
    "de024": [2.1,2.8,3.5,4.3,5.2,6.2,18.8]
};
// RAÇA E IMIGRAÇÃO
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// RELIGIÃO
var religiao = {
    "re027": { // Percentual de pessoas que se declararam (apenas) sem religião
        sql: "SELECT * FROM resolution_sc2010_cem_rmsp_erase",
        cartocss: "#resolution_sc2010_cem_rmsp_erase{polygon-fill: #FC4E2A;polygon-opacity: 0.5;line-color: #476b6b;line-width: 0;line-opacity: 1;} \
            #resolution_sc2010_cem_rmsp_erase [ re027 <= 19.10 ] { polygon-fill: #B10026; } \
			#resolution_sc2010_cem_rmsp_erase [ re027 <= 13.09 ] { polygon-fill: #E31A1C; } \
			#resolution_sc2010_cem_rmsp_erase [ re027 <= 11.24 ] { polygon-fill: #FC4E2A; } \
			#resolution_sc2010_cem_rmsp_erase [ re027 <= 9.84  ] { polygon-fill: #FD8D3C; } \
			#resolution_sc2010_cem_rmsp_erase [ re027 <= 8.40  ] { polygon-fill: #FEB24C; } \
			#resolution_sc2010_cem_rmsp_erase [ re027 <= 7.17  ] { polygon-fill: #FED976; } \
			#resolution_sc2010_cem_rmsp_erase [ re027 <= 5.72  ] { polygon-fill: #FFFFB2; }"
    },
    "re028": { // Percentual de pessoas que se declararam agnósticos
        sql: "SELECT * FROM resolution_sc2010_cem_rmsp_erase",
        cartocss: "#resolution_sc2010_cem_rmsp_erase{polygon-fill: #FC4E2A;polygon-opacity: 0.5;line-color: #476b6b;line-width: 0;line-opacity: 1;} \
            #resolution_sc2010_cem_rmsp_erase [ re028 <= 3.16 ] { polygon-fill: #B10026; } \
			#resolution_sc2010_cem_rmsp_erase [ re028 <= 3.16 ] { polygon-fill: #E31A1C; } \
			#resolution_sc2010_cem_rmsp_erase [ re028 <= 2.13 ] { polygon-fill: #FC4E2A; } \
			#resolution_sc2010_cem_rmsp_erase [ re028 <= 1.38  ] { polygon-fill: #FD8D3C; } \
			#resolution_sc2010_cem_rmsp_erase [ re028 <= 1.38  ] { polygon-fill: #FEB24C; } \
			#resolution_sc2010_cem_rmsp_erase [ re028 <= 1.30  ] { polygon-fill: #FED976; } \
			#resolution_sc2010_cem_rmsp_erase [ re028 <= 0.00  ] { polygon-fill: #FFFFB2; }"
    },
    "re029": { // Percentual de pessoas que se declararam ateus
        sql: "SELECT * FROM resolution_sc2010_cem_rmsp_erase",
        cartocss: "#resolution_sc2010_cem_rmsp_erase{polygon-fill: #FC4E2A;polygon-opacity: 0.5;line-color: #476b6b;line-width: 0;line-opacity: 1;} \
            #resolution_sc2010_cem_rmsp_erase [ re029 <= 4.30 ] { polygon-fill: #B10026; } \
			#resolution_sc2010_cem_rmsp_erase [ re029 <= 2.75 ] { polygon-fill: #E31A1C; } \
			#resolution_sc2010_cem_rmsp_erase [ re029 <= 2.05 ] { polygon-fill: #FC4E2A; } \
			#resolution_sc2010_cem_rmsp_erase [ re029 <= 1.89  ] { polygon-fill: #FD8D3C; } \
			#resolution_sc2010_cem_rmsp_erase [ re029 <= 1.51  ] { polygon-fill: #FEB24C; } \
			#resolution_sc2010_cem_rmsp_erase [ re029 <= 1.34  ] { polygon-fill: #FED976; } \
			#resolution_sc2010_cem_rmsp_erase [ re029 <= 1.09  ] { polygon-fill: #FFFFB2; }"
    },
    "re030": { // Percentual de pessoas que se declararam católicos
        sql: "SELECT * FROM resolution_sc2010_cem_rmsp_erase",
        cartocss: "#resolution_sc2010_cem_rmsp_erase{polygon-fill: #FC4E2A;polygon-opacity: 0.5;line-color: #476b6b;line-width: 0;line-opacity: 1;} \
            #resolution_sc2010_cem_rmsp_erase [ re030 <= 82.70 ] { polygon-fill: #B10026; } \
			#resolution_sc2010_cem_rmsp_erase [ re030 <= 64.41 ] { polygon-fill: #E31A1C; } \
			#resolution_sc2010_cem_rmsp_erase [ re030 <= 61.26 ] { polygon-fill: #FC4E2A; } \
			#resolution_sc2010_cem_rmsp_erase [ re030 <= 58.39 ] { polygon-fill: #FD8D3C; } \
			#resolution_sc2010_cem_rmsp_erase [ re030 <= 55.23 ] { polygon-fill: #FEB24C; } \
			#resolution_sc2010_cem_rmsp_erase [ re030 <= 51.99 ] { polygon-fill: #FED976; } \
			#resolution_sc2010_cem_rmsp_erase [ re030 <= 48.62 ] { polygon-fill: #FFFFB2; }"
    },
    "re031": { // Percentual de pessoas que se declararam evangélicos
        sql: "SELECT * FROM resolution_sc2010_cem_rmsp_erase",
        cartocss: "#resolution_sc2010_cem_rmsp_erase{polygon-fill: #FC4E2A;polygon-opacity: 0.5;line-color: #476b6b;line-width: 0;line-opacity: 1;} \
            #resolution_sc2010_cem_rmsp_erase [ re031 <= 44.26 ] { polygon-fill: #B10026; } \
            #resolution_sc2010_cem_rmsp_erase [ re031 <= 32.93] { polygon-fill: #E31A1C; } \
            #resolution_sc2010_cem_rmsp_erase [ re031 <= 30.18 ] { polygon-fill: #FC4E2A; } \
            #resolution_sc2010_cem_rmsp_erase [ re031 <= 27.56 ] { polygon-fill: #FD8D3C; } \
            #resolution_sc2010_cem_rmsp_erase [ re031 <= 24.38 ] { polygon-fill: #FEB24C; } \
            #resolution_sc2010_cem_rmsp_erase [ re031 <= 21.05 ] { polygon-fill: #FED976; } \
            #resolution_sc2010_cem_rmsp_erase [ re031 <= 14.55 ] { polygon-fill: #FFFFB2; }"
    },
    "re038": { // Percentual de pessoas que se declararam evangélicos pentecostais
        sql: "SELECT * FROM resolution_sc2010_cem_rmsp_erase",
        cartocss: "#resolution_sc2010_cem_rmsp_erase{polygon-fill: #FC4E2A;polygon-opacity: 0.5;line-color: #476b6b;line-width: 0;line-opacity: 1;} \
            #resolution_sc2010_cem_rmsp_erase [ re038 <= 41.79 ] { polygon-fill: #B10026; } \
            #resolution_sc2010_cem_rmsp_erase [ re038 <= 30.38] { polygon-fill: #E31A1C; } \
            #resolution_sc2010_cem_rmsp_erase [ re038 <= 27.95 ] { polygon-fill: #FC4E2A; } \
            #resolution_sc2010_cem_rmsp_erase [ re038 <= 25.09 ] { polygon-fill: #FD8D3C; } \
            #resolution_sc2010_cem_rmsp_erase [ re038 <= 21.80 ] { polygon-fill: #FEB24C; } \
            #resolution_sc2010_cem_rmsp_erase [ re038 <= 18.14 ] { polygon-fill: #FED976; } \
            #resolution_sc2010_cem_rmsp_erase [ re038 <= 11.97 ] { polygon-fill: #FFFFB2; }"
    },
    "re047": { // Percentual de pessoas que se declararam com religião afro-brasileira
        sql: "SELECT * FROM resolution_sc2010_cem_rmsp_erase",
        cartocss: "#resolution_sc2010_cem_rmsp_erase{polygon-fill: #FC4E2A;polygon-opacity: 0.5;line-color: #476b6b;line-width: 0;line-opacity: 1;} \
            #resolution_sc2010_cem_rmsp_erase [ re047 <= 2.33 ] { polygon-fill: #B10026; } \
            #resolution_sc2010_cem_rmsp_erase [ re047 <= 2.10 ] { polygon-fill: #E31A1C; } \
            #resolution_sc2010_cem_rmsp_erase [ re047 <= 1.81 ] { polygon-fill: #FC4E2A; } \
            #resolution_sc2010_cem_rmsp_erase [ re047 <= 1.67 ] { polygon-fill: #FD8D3C; } \
            #resolution_sc2010_cem_rmsp_erase [ re047 <= 1.48 ] { polygon-fill: #FEB24C; } \
            #resolution_sc2010_cem_rmsp_erase [ re047 <= 1.28 ] { polygon-fill: #FED976; } \
            #resolution_sc2010_cem_rmsp_erase [ re047 <= 0.98 ] { polygon-fill: #FFFFB2; }"
    },
    "re050": { // Percentual de pessoas pertencentes a outros segmentos religiosos
        sql: "SELECT * FROM resolution_sc2010_cem_rmsp_erase",
        cartocss: "#resolution_sc2010_cem_rmsp_erase{polygon-fill: #FC4E2A;polygon-opacity: 0.5;line-color: #476b6b;line-width: 0;line-opacity: 1;} \
            #resolution_sc2010_cem_rmsp_erase [ re050 <= 31.05 ] { polygon-fill: #B10026; } \
            #resolution_sc2010_cem_rmsp_erase [ re050 <= 6.26 ] { polygon-fill: #E31A1C; } \
            #resolution_sc2010_cem_rmsp_erase [ re050 <= 5.32 ] { polygon-fill: #FC4E2A; } \
            #resolution_sc2010_cem_rmsp_erase [ re050 <= 4.63 ] { polygon-fill: #FD8D3C; } \
            #resolution_sc2010_cem_rmsp_erase [ re050 <= 4.05 ] { polygon-fill: #FEB24C; } \
            #resolution_sc2010_cem_rmsp_erase [ re050 <= 3.45 ] { polygon-fill: #FED976; } \
            #resolution_sc2010_cem_rmsp_erase [ re050 <= 2.79 ] { polygon-fill: #FFFFB2; }"
    }
};
//
var religiao_valores_quantiles = {
    "re027": [5.72,7.17,8.40,9.84,11.24,13.09,19.10],
    "re028": [0.00,1.30,1.38,1.38,2.13,3.16,3.16],
    "re029": [1.09,1.34,1.51,1.89,2.05,2.75,4.30],
    "re030": [48.62,51.99,55.23,58.39,61.26,64.41,82.70],
    "re031": [14.55,21.05,24.38,27.56,30.18,32.93,44.26],
    "re038": [11.97,18.14,21.80,25.09,27.95,30.38,41.79],
    "re047": [0.98,1.28,1.48,1.67,1.81,2.10,2.33],
    "re050": [2.79,3.45,4.05,4.63,5.32,6.26,31.05]
};
//
// RELIGIÃO
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// EDUCAÇÃO (NESTE CASO UTILIZA-SE ÁREAS DE PONDERAÇÃO AO INVÉS DOS SETORES CENSITÁRIOS)
var educacao = {
    "p1_001": { // Alfabetizadas com 5 ou mais anos de idade
        sql: "SELECT * FROM ap2010_rmsp_cem_r",
        cartocss: "#ap2010_rmsp_cem_r{polygon-fill: #FC4E2A;polygon-opacity: 0.5;line-color: #476b6b;line-width: 0.5;line-opacity: 1;} \
            #ap2010_rmsp_cem_r [ p1_001 <= 137423 ] { polygon-fill: #B10026; } \
			#ap2010_rmsp_cem_r [ p1_001 <= 40000  ] { polygon-fill: #E31A1C; } \
			#ap2010_rmsp_cem_r [ p1_001 <= 33739  ] { polygon-fill: #FC4E2A; } \
			#ap2010_rmsp_cem_r [ p1_001 <= 28506  ] { polygon-fill: #FD8D3C; } \
			#ap2010_rmsp_cem_r [ p1_001 <= 25481  ] { polygon-fill: #FEB24C; } \
			#ap2010_rmsp_cem_r [ p1_001 <= 20926  ] { polygon-fill: #FED976; } \
			#ap2010_rmsp_cem_r [ p1_001 <= 14372  ] { polygon-fill: #FFFFB2; }"
    },
    "ins001": { // Anos médios de estudo do chefe de domicílio
        sql: "SELECT * FROM ap2010_rmsp_cem_r",
        cartocss: "#ap2010_rmsp_cem_r{polygon-fill: #FC4E2A;polygon-opacity: 0.5;line-color: #476b6b;line-width: 0.5;line-opacity: 1;} \
            #ap2010_rmsp_cem_r [ ins001 <= 15 ] { polygon-fill: #B10026; } \
			#ap2010_rmsp_cem_r [ ins001 <= 12  ] { polygon-fill: #E31A1C; } \
			#ap2010_rmsp_cem_r [ ins001 <= 10  ] { polygon-fill: #FC4E2A; } \
			#ap2010_rmsp_cem_r [ ins001 <= 9  ] { polygon-fill: #FD8D3C; } \
			#ap2010_rmsp_cem_r [ ins001 <= 8  ] { polygon-fill: #FEB24C; } \
			#ap2010_rmsp_cem_r [ ins001 <= 7  ] { polygon-fill: #FED976; } \
			#ap2010_rmsp_cem_r [ ins001 <= 6  ] { polygon-fill: #FFFFB2; }"
    },
    "ins002": { // Anos médios de estudo de mulheres chefes
        sql: "SELECT * FROM ap2010_rmsp_cem_r",
        cartocss: "#ap2010_rmsp_cem_r{polygon-fill: #FC4E2A;polygon-opacity: 0.5;line-color: #476b6b;line-width: 0.5;line-opacity: 1;} \
            #ap2010_rmsp_cem_r [ ins002 <= 14.1 ] { polygon-fill: #B10026; } \
			#ap2010_rmsp_cem_r [ ins002 <= 10.9 ] { polygon-fill: #E31A1C; } \
			#ap2010_rmsp_cem_r [ ins002 <= 9.1  ] { polygon-fill: #FC4E2A; } \
			#ap2010_rmsp_cem_r [ ins002 <= 7.9  ] { polygon-fill: #FD8D3C; } \
			#ap2010_rmsp_cem_r [ ins002 <= 7.2  ] { polygon-fill: #FEB24C; } \
			#ap2010_rmsp_cem_r [ ins002 <= 6.7  ] { polygon-fill: #FED976; } \
			#ap2010_rmsp_cem_r [ ins002 <= 6.1  ] { polygon-fill: #FFFFB2; }"
    },
    "ins032": { // Percentual de pessoas de 7 a 14 anos de idade fora da escola
        sql: "SELECT ins032 FROM ap2010_rmsp_cem_r",
        cartocss: "#ap2010_rmsp_cem_r{polygon-fill: #FC4E2A;polygon-opacity: 0.5;line-color: #476b6b;line-width: 0.5;line-opacity: 1;} \
            #ap2010_rmsp_cem_r [ ins032 <= 18.6 ] { polygon-fill: #B10026; } \
			#ap2010_rmsp_cem_r [ ins032 <= 11.1 ] { polygon-fill: #E31A1C; } \
			#ap2010_rmsp_cem_r [ ins032 <= 8.4  ] { polygon-fill: #FC4E2A; } \
			#ap2010_rmsp_cem_r [ ins032 <= 5.9  ] { polygon-fill: #FD8D3C; } \
			#ap2010_rmsp_cem_r [ ins032 <= 5.8  ] { polygon-fill: #FEB24C; } \
			#ap2010_rmsp_cem_r [ ins032 <= 5.5  ] { polygon-fill: #FED976; } \
			#ap2010_rmsp_cem_r [ ins032 <= 4.8  ] { polygon-fill: #FFFFB2; }"
    },
    "ins037": { // Percentual de pessoas de 3 a 6 anos de idade que nunca frequentaram escola ou creche
        sql: "SELECT * FROM ap2010_rmsp_cem_r",
        cartocss: "#ap2010_rmsp_cem_r{polygon-fill: #FC4E2A;polygon-opacity: 0.5;line-color: #476b6b;line-width: 0.5;line-opacity: 1;} \
            #ap2010_rmsp_cem_r [ ins037 <= 38.3 ] { polygon-fill: #B10026; } \
			#ap2010_rmsp_cem_r [ ins037 <= 30.5 ] { polygon-fill: #E31A1C; } \
			#ap2010_rmsp_cem_r [ ins037 <= 27.7 ] { polygon-fill: #FC4E2A; } \
			#ap2010_rmsp_cem_r [ ins037 <= 24.0 ] { polygon-fill: #FD8D3C; } \
			#ap2010_rmsp_cem_r [ ins037 <= 21.6 ] { polygon-fill: #FEB24C; } \
			#ap2010_rmsp_cem_r [ ins037 <= 19.4 ] { polygon-fill: #FED976; } \
			#ap2010_rmsp_cem_r [ ins037 <= 17.1 ] { polygon-fill: #FFFFB2; }"
    }
};

var educacao_valores_quantiles = {
    "p1_001": [14372,20926,25481,28506,33739,40000,137423],
    "ins001": [6,7,8,9,10,12,15],
    "ins002": [6.1,6.7,7.2,7.9,9.1,10.9,14.1],
    "ins032": [4.8,5.5,5.8,5.9,8.4,11.1,18.6],
    "ins037": [17.1,19.4,21.6,24.0,27.7,30.5,38.3]
};
//
// EDUCAÇÃO (NESTE CASO UTILIZA-SE ÁREAS DE PONDERAÇÃO AO INVÉS DOS SETORES CENSITÁRIOS)
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// RENDA E TRABALHO
var renda_trabalho = {
    "ren002": { // Renda domiciliar total média
        sql: "SELECT * FROM resolution_sc2010_cem_rmsp_erase",
        cartocss: "#resolution_sc2010_cem_rmsp_erase{polygon-fill: #FC4E2A;polygon-opacity: 0.5;line-color: #476b6b;line-width: 0;line-opacity: 1;} \
            #resolution_sc2010_cem_rmsp_erase [ ren002 <= 19292.16 ] { polygon-fill: #B10026; } \
			#resolution_sc2010_cem_rmsp_erase [ ren002 <= 5449.51  ] { polygon-fill: #E31A1C; } \
			#resolution_sc2010_cem_rmsp_erase [ ren002 <= 3459.20  ] { polygon-fill: #FC4E2A; } \
			#resolution_sc2010_cem_rmsp_erase [ ren002 <= 2607.73  ] { polygon-fill: #FD8D3C; } \
			#resolution_sc2010_cem_rmsp_erase [ ren002 <= 2202.87  ] { polygon-fill: #FEB24C; } \
			#resolution_sc2010_cem_rmsp_erase [ ren002 <= 1939.82  ] { polygon-fill: #FED976; } \
			#resolution_sc2010_cem_rmsp_erase [ ren002 <= 1696.20  ] { polygon-fill: #FFFFB2; }"
    },
    "ren003": { // Renda domiciliar per capita em salários mínimos
        sql: "SELECT * FROM resolution_sc2010_cem_rmsp_erase",
        cartocss: "#resolution_sc2010_cem_rmsp_erase{polygon-fill: #FC4E2A;polygon-opacity: 0.5;line-color: #476b6b;line-width: 0;line-opacity: 1;} \
            #resolution_sc2010_cem_rmsp_erase [ ren003 <= 15.86 ] { polygon-fill: #B10026; } \
			#resolution_sc2010_cem_rmsp_erase [ ren003 <= 6.32  ] { polygon-fill: #E31A1C; } \
			#resolution_sc2010_cem_rmsp_erase [ ren003 <= 3.78  ] { polygon-fill: #FC4E2A; } \
			#resolution_sc2010_cem_rmsp_erase [ ren003 <= 2.59  ] { polygon-fill: #FD8D3C; } \
			#resolution_sc2010_cem_rmsp_erase [ ren003 <= 2.05  ] { polygon-fill: #FEB24C; } \
			#resolution_sc2010_cem_rmsp_erase [ ren003 <= 1.52  ] { polygon-fill: #FED976; } \
			#resolution_sc2010_cem_rmsp_erase [ ren003 <= 1.11  ] { polygon-fill: #FFFFB2; }"
    },
    "ren004": { // Renda domiciliar total média em salários mínimos
        sql: "SELECT * FROM resolution_sc2010_cem_rmsp_erase",
        cartocss: "#resolution_sc2010_cem_rmsp_erase{polygon-fill: #FC4E2A;polygon-opacity: 0.5;line-color: #476b6b;line-width: 0;line-opacity: 1;} \
            #resolution_sc2010_cem_rmsp_erase [ ren004 <= 37.83 ] { polygon-fill: #B10026; } \
			#resolution_sc2010_cem_rmsp_erase [ ren004 <= 13.9  ] { polygon-fill: #E31A1C; } \
			#resolution_sc2010_cem_rmsp_erase [ ren004 <= 8.27  ] { polygon-fill: #FC4E2A; } \
			#resolution_sc2010_cem_rmsp_erase [ ren004 <= 6.51  ] { polygon-fill: #FD8D3C; } \
			#resolution_sc2010_cem_rmsp_erase [ ren004 <= 5.00  ] { polygon-fill: #FEB24C; } \
			#resolution_sc2010_cem_rmsp_erase [ ren004 <= 4.13  ] { polygon-fill: #FED976; } \
			#resolution_sc2010_cem_rmsp_erase [ ren004 <= 3.40  ] { polygon-fill: #FFFFB2; }"
    },
    "ren016": { // Pessoas com renda per capita até meio salário mínimo (%)
        sql: "SELECT * FROM resolution_sc2010_cem_rmsp_erase",
        cartocss: "#resolution_sc2010_cem_rmsp_erase{polygon-fill: #FC4E2A;polygon-opacity: 0.5;line-color: #476b6b;line-width: 0;line-opacity: 1;} \
            #resolution_sc2010_cem_rmsp_erase [ ren016 <= 49.63 ] { polygon-fill: #B10026; } \
			#resolution_sc2010_cem_rmsp_erase [ ren016 <= 32.47 ] { polygon-fill: #E31A1C; } \
			#resolution_sc2010_cem_rmsp_erase [ ren016 <= 27.72 ] { polygon-fill: #FC4E2A; } \
			#resolution_sc2010_cem_rmsp_erase [ ren016 <= 23.18 ] { polygon-fill: #FD8D3C; } \
			#resolution_sc2010_cem_rmsp_erase [ ren016 <= 19.00 ] { polygon-fill: #FEB24C; } \
			#resolution_sc2010_cem_rmsp_erase [ ren016 <= 14.05 ] { polygon-fill: #FED976; } \
			#resolution_sc2010_cem_rmsp_erase [ ren016 <= 9.15  ] { polygon-fill: #FFFFB2; }"
    },
    "ren101": { // Pessoas com renda per capita entre 0,5 e 1 salário mínimo (%)
        sql: "SELECT * FROM resolution_sc2010_cem_rmsp_erase",
        cartocss: "#resolution_sc2010_cem_rmsp_erase{polygon-fill: #FC4E2A;polygon-opacity: 0.5;line-color: #476b6b;line-width: 0;line-opacity: 1;} \
            #resolution_sc2010_cem_rmsp_erase [ ren101 <= 42.57 ] { polygon-fill: #B10026; } \
			#resolution_sc2010_cem_rmsp_erase [ ren101 <= 35.12 ] { polygon-fill: #E31A1C; } \
			#resolution_sc2010_cem_rmsp_erase [ ren101 <= 32.29 ] { polygon-fill: #FC4E2A; } \
			#resolution_sc2010_cem_rmsp_erase [ ren101 <= 29.64 ] { polygon-fill: #FD8D3C; } \
			#resolution_sc2010_cem_rmsp_erase [ ren101 <= 26.06 ] { polygon-fill: #FEB24C; } \
			#resolution_sc2010_cem_rmsp_erase [ ren101 <= 20.38 ] { polygon-fill: #FED976; } \
			#resolution_sc2010_cem_rmsp_erase [ ren101 <= 12.97 ] { polygon-fill: #FFFFB2; }"
    },
    "ren102": { // Pessoas com renda per capita entre 1 e 3 salários mínimos (%)
        sql: "SELECT * FROM resolution_sc2010_cem_rmsp_erase",
        cartocss: "#resolution_sc2010_cem_rmsp_erase{polygon-fill: #FC4E2A;polygon-opacity: 0.5;line-color: #476b6b;line-width: 0;line-opacity: 1;} \
            #resolution_sc2010_cem_rmsp_erase [ ren102 <= 57.29 ] { polygon-fill: #B10026; } \
			#resolution_sc2010_cem_rmsp_erase [ ren102 <= 45.63 ] { polygon-fill: #E31A1C; } \
			#resolution_sc2010_cem_rmsp_erase [ ren102 <= 41.78 ] { polygon-fill: #FC4E2A; } \
			#resolution_sc2010_cem_rmsp_erase [ ren102 <= 38.36 ] { polygon-fill: #FD8D3C; } \
			#resolution_sc2010_cem_rmsp_erase [ ren102 <= 34.90 ] { polygon-fill: #FEB24C; } \
			#resolution_sc2010_cem_rmsp_erase [ ren102 <= 30.91 ] { polygon-fill: #FED976; } \
			#resolution_sc2010_cem_rmsp_erase [ ren102 <= 26.43 ] { polygon-fill: #FFFFB2; }"
    },
    "ren103": { // Pessoas com renda per capita entre 3 e 5 salários mínimos (%)
        sql: "SELECT * FROM resolution_sc2010_cem_rmsp_erase",
        cartocss: "#resolution_sc2010_cem_rmsp_erase{polygon-fill: #FC4E2A;polygon-opacity: 0.5;line-color: #476b6b;line-width: 0;line-opacity: 1;} \
            #resolution_sc2010_cem_rmsp_erase [ ren103 <= 23.88 ] { polygon-fill: #B10026; } \
			#resolution_sc2010_cem_rmsp_erase [ ren103 <= 16.16 ] { polygon-fill: #E31A1C; } \
			#resolution_sc2010_cem_rmsp_erase [ ren103 <= 12.62 ] { polygon-fill: #FC4E2A; } \
			#resolution_sc2010_cem_rmsp_erase [ ren103 <= 9.36  ] { polygon-fill: #FD8D3C; } \
			#resolution_sc2010_cem_rmsp_erase [ ren103 <= 6.24  ] { polygon-fill: #FEB24C; } \
			#resolution_sc2010_cem_rmsp_erase [ ren103 <= 4.18  ] { polygon-fill: #FED976; } \
			#resolution_sc2010_cem_rmsp_erase [ ren103 <= 2.79  ] { polygon-fill: #FFFFB2; }"
    },
    "ren104": { // Pessoas com renda per capita entre 5 e 10 salários mínimos (%)
        sql: "SELECT * FROM resolution_sc2010_cem_rmsp_erase",
        cartocss: "#resolution_sc2010_cem_rmsp_erase{polygon-fill: #FC4E2A;polygon-opacity: 0.5;line-color: #476b6b;line-width: 0;line-opacity: 1;} \
            #resolution_sc2010_cem_rmsp_erase [ ren104 <= 32.64 ] { polygon-fill: #B10026; } \
			#resolution_sc2010_cem_rmsp_erase [ ren104 <= 22.15 ] { polygon-fill: #E31A1C; } \
			#resolution_sc2010_cem_rmsp_erase [ ren104 <= 13.53 ] { polygon-fill: #FC4E2A; } \
			#resolution_sc2010_cem_rmsp_erase [ ren104 <= 8.31  ] { polygon-fill: #FD8D3C; } \
			#resolution_sc2010_cem_rmsp_erase [ ren104 <= 5.95  ] { polygon-fill: #FEB24C; } \
			#resolution_sc2010_cem_rmsp_erase [ ren104 <= 3.58  ] { polygon-fill: #FED976; } \
			#resolution_sc2010_cem_rmsp_erase [ ren104 <= 2.00  ] { polygon-fill: #FFFFB2; }"
    },
    "ren105": { // Pessoas com renda per capita acima de 10 salários mínimos (%)
        sql: "SELECT * FROM resolution_sc2010_cem_rmsp_erase",
        cartocss: "#resolution_sc2010_cem_rmsp_erase{polygon-fill: #FC4E2A;polygon-opacity: 0.5;line-color: #476b6b;line-width: 0;line-opacity: 1;} \
            #resolution_sc2010_cem_rmsp_erase [ ren105 <= 42.66 ] { polygon-fill: #B10026; } \
			#resolution_sc2010_cem_rmsp_erase [ ren105 <= 25.15 ] { polygon-fill: #E31A1C; } \
			#resolution_sc2010_cem_rmsp_erase [ ren105 <= 13.10 ] { polygon-fill: #FC4E2A; } \
			#resolution_sc2010_cem_rmsp_erase [ ren105 <= 7.60  ] { polygon-fill: #FD8D3C; } \
			#resolution_sc2010_cem_rmsp_erase [ ren105 <= 4.63  ] { polygon-fill: #FEB24C; } \
			#resolution_sc2010_cem_rmsp_erase [ ren105 <= 2.84  ] { polygon-fill: #FED976; } \
			#resolution_sc2010_cem_rmsp_erase [ ren105 <= 1.94  ] { polygon-fill: #FFFFB2; }"
    },
    "mt006": { // Taxa de desocupação
        sql: "SELECT * FROM resolution_sc2010_cem_rmsp_erase",
        cartocss: "#resolution_sc2010_cem_rmsp_erase{polygon-fill: #FC4E2A;polygon-opacity: 0.5;line-color: #476b6b;line-width: 0;line-opacity: 1;} \
            #resolution_sc2010_cem_rmsp_erase [ mt006 <= 19.99 ] { polygon-fill: #B10026; } \
			#resolution_sc2010_cem_rmsp_erase [ mt006 <= 11.85 ] { polygon-fill: #E31A1C; } \
			#resolution_sc2010_cem_rmsp_erase [ mt006 <= 10.27 ] { polygon-fill: #FC4E2A; } \
			#resolution_sc2010_cem_rmsp_erase [ mt006 <= 9.05  ] { polygon-fill: #FD8D3C; } \
			#resolution_sc2010_cem_rmsp_erase [ mt006 <= 7.92  ] { polygon-fill: #FEB24C; } \
			#resolution_sc2010_cem_rmsp_erase [ mt006 <= 6.67  ] { polygon-fill: #FED976; } \
			#resolution_sc2010_cem_rmsp_erase [ mt006 <= 5.35  ] { polygon-fill: #FFFFB2; }"
    },
    "mt008": { // Taxa de ocupação
        sql: "SELECT * FROM resolution_sc2010_cem_rmsp_erase",
        cartocss: "#resolution_sc2010_cem_rmsp_erase{polygon-fill: #FC4E2A;polygon-opacity: 0.5;line-color: #476b6b;line-width: 0;line-opacity: 1;} \
            #resolution_sc2010_cem_rmsp_erase [ mt008 <= 98.21 ] { polygon-fill: #B10026; } \
			#resolution_sc2010_cem_rmsp_erase [ mt008 <= 94.82 ] { polygon-fill: #E31A1C; } \
			#resolution_sc2010_cem_rmsp_erase [ mt008 <= 93.44 ] { polygon-fill: #FC4E2A; } \
			#resolution_sc2010_cem_rmsp_erase [ mt008 <= 92.19 ] { polygon-fill: #FD8D3C; } \
			#resolution_sc2010_cem_rmsp_erase [ mt008 <= 91.00 ] { polygon-fill: #FEB24C; } \
			#resolution_sc2010_cem_rmsp_erase [ mt008 <= 89.76 ] { polygon-fill: #FED976; } \
			#resolution_sc2010_cem_rmsp_erase [ mt008 <= 88.17 ] { polygon-fill: #FFFFB2; }"
    },
    "mt007": { // Taxa de participação
        sql: "SELECT * FROM resolution_sc2010_cem_rmsp_erase",
        cartocss: "#resolution_sc2010_cem_rmsp_erase{polygon-fill: #FC4E2A;polygon-opacity: 0.5;line-color: #476b6b;line-width: 0;line-opacity: 1;} \
            #resolution_sc2010_cem_rmsp_erase [ mt007 <= 74.47 ] { polygon-fill: #B10026; } \
			#resolution_sc2010_cem_rmsp_erase [ mt007 <= 65.12 ] { polygon-fill: #E31A1C; } \
			#resolution_sc2010_cem_rmsp_erase [ mt007 <= 63.27 ] { polygon-fill: #FC4E2A; } \
			#resolution_sc2010_cem_rmsp_erase [ mt007 <= 61.59 ] { polygon-fill: #FD8D3C; } \
			#resolution_sc2010_cem_rmsp_erase [ mt007 <= 60.20 ] { polygon-fill: #FEB24C; } \
			#resolution_sc2010_cem_rmsp_erase [ mt007 <= 58.78 ] { polygon-fill: #FED976; } \
			#resolution_sc2010_cem_rmsp_erase [ mt007 <= 56.71 ] { polygon-fill: #FFFFB2; }"
    }
};

var renda_trabalho_valores_quantiles = {
    "ren002": [19292.16,5449.51,3459.20,2607.73,2202.87,1939.82,1696.20],
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
