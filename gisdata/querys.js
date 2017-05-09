// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// DEMOGRAFIA
var demografia = {
    "p3_001": { // População
        sql: "SELECT * FROM sc2010_rmsp_cem_r",
        cartocss: "#sc2010_rmsp_cem_r{polygon-fill: #FC4E2A;polygon-opacity: 0.5;line-color: #fff;line-width: 0.5;line-opacity: 1;} \
            #sc2010_rmsp_cem_r [ p3_001 <= 3489 ] { polygon-fill: #B10026; } \
			#sc2010_rmsp_cem_r [ p3_001 <= 1671 ] { polygon-fill: #E31A1C; } \
			#sc2010_rmsp_cem_r [ p3_001 <= 1350 ] { polygon-fill: #FC4E2A; } \
			#sc2010_rmsp_cem_r [ p3_001 <= 1079 ] { polygon-fill: #FD8D3C; } \
			#sc2010_rmsp_cem_r [ p3_001 <= 809  ] { polygon-fill: #FEB24C; } \
			#sc2010_rmsp_cem_r [ p3_001 <= 539  ] { polygon-fill: #FED976; } \
			#sc2010_rmsp_cem_r [ p3_001 <= 269  ] { polygon-fill: #FFFFB2; }"
    },
    "p11_001": { // Homens residentes
        sql: "SELECT * FROM sc2010_rmsp_cem_r",
        cartocss: "#sc2010_rmsp_cem_r{polygon-fill: #FC4E2A;polygon-opacity: 0.5;line-color: #fff;line-width: 0.5;line-opacity: 1;} \
            #sc2010_rmsp_cem_r [ p11_001 <= 3320 ] { polygon-fill: #B10026; } \
			#sc2010_rmsp_cem_r [ p11_001 <= 931  ] { polygon-fill: #E31A1C; } \
			#sc2010_rmsp_cem_r [ p11_001 <= 750  ] { polygon-fill: #FC4E2A; } \
			#sc2010_rmsp_cem_r [ p11_001 <= 600  ] { polygon-fill: #FD8D3C; } \
			#sc2010_rmsp_cem_r [ p11_001 <= 450  ] { polygon-fill: #FEB24C; } \
			#sc2010_rmsp_cem_r [ p11_001 <= 300  ] { polygon-fill: #FED976; } \
			#sc2010_rmsp_cem_r [ p11_001 <= 150  ] { polygon-fill: #FFFFB2; }"
    },
    "p12_001": { // Mulheres residentes
        sql: "SELECT * FROM sc2010_rmsp_cem_r",
        cartocss: "#sc2010_rmsp_cem_r{polygon-fill: #FC4E2A;polygon-opacity: 0.5;line-color: #fff;line-width: 0.5;line-opacity: 1;} \
            #sc2010_rmsp_cem_r [ p12_001 <= 1946 ] { polygon-fill: #B10026; } \
			#sc2010_rmsp_cem_r [ p12_001 <= 957  ] { polygon-fill: #E31A1C; } \
			#sc2010_rmsp_cem_r [ p12_001 <= 764  ] { polygon-fill: #FC4E2A; } \
			#sc2010_rmsp_cem_r [ p12_001 <= 610  ] { polygon-fill: #FD8D3C; } \
			#sc2010_rmsp_cem_r [ p12_001 <= 458  ] { polygon-fill: #FEB24C; } \
			#sc2010_rmsp_cem_r [ p12_001 <= 305  ] { polygon-fill: #FED976; } \
			#sc2010_rmsp_cem_r [ p12_001 <= 152  ] { polygon-fill: #FFFFB2; }"
    },
    "p13_022": { // Faixa etárias - menor que 1 ano
        sql: "SELECT * FROM sc2010_rmsp_cem_r",
        cartocss: "#sc2010_rmsp_cem_r{polygon-fill: #FC4E2A;polygon-opacity: 0.5;line-color: #fff;line-width: 0.5;line-opacity: 1;} \
            #sc2010_rmsp_cem_r [ p13_022 <= 115 ] { polygon-fill: #B10026; } \
			#sc2010_rmsp_cem_r [ p13_022 <= 57  ] { polygon-fill: #E31A1C; } \
			#sc2010_rmsp_cem_r [ p13_022 <= 47  ] { polygon-fill: #FC4E2A; } \
			#sc2010_rmsp_cem_r [ p13_022 <= 37  ] { polygon-fill: #FD8D3C; } \
			#sc2010_rmsp_cem_r [ p13_022 <= 28  ] { polygon-fill: #FEB24C; } \
			#sc2010_rmsp_cem_r [ p13_022 <= 18  ] { polygon-fill: #FED976; } \
			#sc2010_rmsp_cem_r [ p13_022 <= 9   ] { polygon-fill: #FFFFB2; }"
    },
    "p13_036": { // Faixa etárias - 2 anos
        sql: "SELECT * FROM sc2010_rmsp_cem_r",
        cartocss: "#sc2010_rmsp_cem_r{polygon-fill: #FC4E2A;polygon-opacity: 0.5;line-color: #fff;line-width: 0.5;line-opacity: 1;} \
            #sc2010_rmsp_cem_r [ p13_036 <= 89 ] { polygon-fill: #B10026; } \
			#sc2010_rmsp_cem_r [ p13_036 <= 55  ] { polygon-fill: #E31A1C; } \
			#sc2010_rmsp_cem_r [ p13_036 <= 45  ] { polygon-fill: #FC4E2A; } \
			#sc2010_rmsp_cem_r [ p13_036 <= 36  ] { polygon-fill: #FD8D3C; } \
			#sc2010_rmsp_cem_r [ p13_036 <= 27  ] { polygon-fill: #FEB24C; } \
			#sc2010_rmsp_cem_r [ p13_036 <= 18  ] { polygon-fill: #FED976; } \
			#sc2010_rmsp_cem_r [ p13_036 <= 9   ] { polygon-fill: #FFFFB2; }"
    },
    "p13_037": { // Faixa etárias - 3 anos
        sql: "SELECT * FROM sc2010_rmsp_cem_r",
        cartocss: "#sc2010_rmsp_cem_r{polygon-fill: #FC4E2A;polygon-opacity: 0.5;line-color: #fff;line-width: 0.5;line-opacity: 1;} \
            #sc2010_rmsp_cem_r [ p13_037 <= 135 ] { polygon-fill: #B10026; } \
			#sc2010_rmsp_cem_r [ p13_037 <= 61  ] { polygon-fill: #E31A1C; } \
			#sc2010_rmsp_cem_r [ p13_037 <= 47  ] { polygon-fill: #FC4E2A; } \
			#sc2010_rmsp_cem_r [ p13_037 <= 38  ] { polygon-fill: #FD8D3C; } \
			#sc2010_rmsp_cem_r [ p13_037 <= 28  ] { polygon-fill: #FEB24C; } \
			#sc2010_rmsp_cem_r [ p13_037 <= 19  ] { polygon-fill: #FED976; } \
			#sc2010_rmsp_cem_r [ p13_037 <= 9   ] { polygon-fill: #FFFFB2; }"
    },
    "p13_038": { // Faixa etárias - 4 anos
        sql: "SELECT * FROM sc2010_rmsp_cem_r",
        cartocss: "#sc2010_rmsp_cem_r{polygon-fill: #FC4E2A;polygon-opacity: 0.5;line-color: #fff;line-width: 0.5;line-opacity: 1;} \
            #sc2010_rmsp_cem_r [ p13_038 <= 114 ] { polygon-fill: #B10026; } \
			#sc2010_rmsp_cem_r [ p13_038 <= 57  ] { polygon-fill: #E31A1C; } \
			#sc2010_rmsp_cem_r [ p13_038 <= 47  ] { polygon-fill: #FC4E2A; } \
			#sc2010_rmsp_cem_r [ p13_038 <= 38  ] { polygon-fill: #FD8D3C; } \
			#sc2010_rmsp_cem_r [ p13_038 <= 28  ] { polygon-fill: #FEB24C; } \
			#sc2010_rmsp_cem_r [ p13_038 <= 19  ] { polygon-fill: #FED976; } \
			#sc2010_rmsp_cem_r [ p13_038 <= 9   ] { polygon-fill: #FFFFB2; }"
    },
    "p13_039": { // Faixa etárias - 5 anos
        sql: "SELECT * FROM sc2010_rmsp_cem_r",
        cartocss: "#sc2010_rmsp_cem_r{polygon-fill: #FC4E2A;polygon-opacity: 0.5;line-color: #fff;line-width: 0.5;line-opacity: 1;} \
            #sc2010_rmsp_cem_r [ p13_039 <= 96 ] { polygon-fill: #B10026; } \
			#sc2010_rmsp_cem_r [ p13_039 <= 61 ] { polygon-fill: #E31A1C; } \
			#sc2010_rmsp_cem_r [ p13_039 <= 50 ] { polygon-fill: #FC4E2A; } \
			#sc2010_rmsp_cem_r [ p13_039 <= 40 ] { polygon-fill: #FD8D3C; } \
			#sc2010_rmsp_cem_r [ p13_039 <= 30 ] { polygon-fill: #FEB24C; } \
			#sc2010_rmsp_cem_r [ p13_039 <= 20 ] { polygon-fill: #FED976; } \
			#sc2010_rmsp_cem_r [ p13_039 <= 10 ] { polygon-fill: #FFFFB2; }"
    },
    "p13_201": { // Faixa etárias - 6 a 10 anos
        sql: "SELECT * FROM sc2010_rmsp_cem_r",
        cartocss: "#sc2010_rmsp_cem_r{polygon-fill: #FC4E2A;polygon-opacity: 0.5;line-color: #fff;line-width: 0.5;line-opacity: 1;} \
            #sc2010_rmsp_cem_r [ p13_201 <= 475 ] { polygon-fill: #B10026; } \
			#sc2010_rmsp_cem_r [ p13_201 <= 245 ] { polygon-fill: #E31A1C; } \
			#sc2010_rmsp_cem_r [ p13_201 <= 202 ] { polygon-fill: #FC4E2A; } \
			#sc2010_rmsp_cem_r [ p13_201 <= 162 ] { polygon-fill: #FD8D3C; } \
			#sc2010_rmsp_cem_r [ p13_201 <= 121 ] { polygon-fill: #FEB24C; } \
			#sc2010_rmsp_cem_r [ p13_201 <= 81  ] { polygon-fill: #FED976; } \
			#sc2010_rmsp_cem_r [ p13_201 <= 40  ] { polygon-fill: #FFFFB2; }"
    },
    "p13_202": { // Faixa etárias - 11 a 14 anos
        sql: "SELECT * FROM sc2010_rmsp_cem_r",
        cartocss: "#sc2010_rmsp_cem_r{polygon-fill: #FC4E2A;polygon-opacity: 0.5;line-color: #fff;line-width: 0.5;line-opacity: 1;} \
            #sc2010_rmsp_cem_r [ p13_202 <= 442 ] { polygon-fill: #B10026; } \
			#sc2010_rmsp_cem_r [ p13_202 <= 209 ] { polygon-fill: #E31A1C; } \
			#sc2010_rmsp_cem_r [ p13_202 <= 172 ] { polygon-fill: #FC4E2A; } \
			#sc2010_rmsp_cem_r [ p13_202 <= 138 ] { polygon-fill: #FD8D3C; } \
			#sc2010_rmsp_cem_r [ p13_202 <= 103 ] { polygon-fill: #FEB24C; } \
			#sc2010_rmsp_cem_r [ p13_202 <= 69  ] { polygon-fill: #FED976; } \
			#sc2010_rmsp_cem_r [ p13_202 <= 34  ] { polygon-fill: #FFFFB2; }"
    },
    "p13_203": { // Faixa etárias - 15 a 17 anos
        sql: "SELECT * FROM sc2010_rmsp_cem_r",
        cartocss: "#sc2010_rmsp_cem_r{polygon-fill: #FC4E2A;polygon-opacity: 0.5;line-color: #fff;line-width: 0.5;line-opacity: 1;} \
            #sc2010_rmsp_cem_r [ p13_203 <= 228 ] { polygon-fill: #B10026; } \
			#sc2010_rmsp_cem_r [ p13_203 <= 149 ] { polygon-fill: #E31A1C; } \
			#sc2010_rmsp_cem_r [ p13_203 <= 124 ] { polygon-fill: #FC4E2A; } \
			#sc2010_rmsp_cem_r [ p13_203 <= 99  ] { polygon-fill: #FD8D3C; } \
			#sc2010_rmsp_cem_r [ p13_203 <= 74  ] { polygon-fill: #FEB24C; } \
			#sc2010_rmsp_cem_r [ p13_203 <= 49  ] { polygon-fill: #FED976; } \
			#sc2010_rmsp_cem_r [ p13_203 <= 24  ] { polygon-fill: #FFFFB2; }"
    },
    "p13_204": { // Faixa etárias - 18 a 29 anos
        sql: "SELECT * FROM sc2010_rmsp_cem_r",
        cartocss: "#sc2010_rmsp_cem_r{polygon-fill: #FC4E2A;polygon-opacity: 0.5;line-color: #fff;line-width: 0.5;line-opacity: 1;} \
            #sc2010_rmsp_cem_r [ p13_204 <= 2068 ] { polygon-fill: #B10026; } \
			#sc2010_rmsp_cem_r [ p13_204 <= 488  ] { polygon-fill: #E31A1C; } \
			#sc2010_rmsp_cem_r [ p13_204 <= 395  ] { polygon-fill: #FC4E2A; } \
			#sc2010_rmsp_cem_r [ p13_204 <= 316  ] { polygon-fill: #FD8D3C; } \
			#sc2010_rmsp_cem_r [ p13_204 <= 237  ] { polygon-fill: #FEB24C; } \
			#sc2010_rmsp_cem_r [ p13_204 <= 158  ] { polygon-fill: #FED976; } \
			#sc2010_rmsp_cem_r [ p13_204 <= 79   ] { polygon-fill: #FFFFB2; }"
    },
    "p13_205": { // Faixa etárias - 30 a 49 anos
        sql: "SELECT * FROM sc2010_rmsp_cem_r",
        cartocss: "#sc2010_rmsp_cem_r{polygon-fill: #FC4E2A;polygon-opacity: 0.5;line-color: #fff;line-width: 0.5;line-opacity: 1;} \
            #sc2010_rmsp_cem_r [ p13_205 <= 1239 ] { polygon-fill: #B10026; } \
			#sc2010_rmsp_cem_r [ p13_205 <= 640  ] { polygon-fill: #E31A1C; } \
			#sc2010_rmsp_cem_r [ p13_205 <= 519  ] { polygon-fill: #FC4E2A; } \
			#sc2010_rmsp_cem_r [ p13_205 <= 415  ] { polygon-fill: #FD8D3C; } \
			#sc2010_rmsp_cem_r [ p13_205 <= 311  ] { polygon-fill: #FEB24C; } \
			#sc2010_rmsp_cem_r [ p13_205 <= 207  ] { polygon-fill: #FED976; } \
			#sc2010_rmsp_cem_r [ p13_205 <= 103  ] { polygon-fill: #FFFFB2; }"
    },
    "p13_206": { // Faixa etárias - 50 a 64 anos
        sql: "SELECT * FROM sc2010_rmsp_cem_r",
        cartocss: "#sc2010_rmsp_cem_r{polygon-fill: #FC4E2A;polygon-opacity: 0.5;line-color: #fff;line-width: 0.5;line-opacity: 1;} \
            #sc2010_rmsp_cem_r [ p13_206 <= 445 ] { polygon-fill: #B10026; } \
			#sc2010_rmsp_cem_r [ p13_206 <= 265 ] { polygon-fill: #E31A1C; } \
			#sc2010_rmsp_cem_r [ p13_206 <= 220 ] { polygon-fill: #FC4E2A; } \
			#sc2010_rmsp_cem_r [ p13_206 <= 176 ] { polygon-fill: #FD8D3C; } \
			#sc2010_rmsp_cem_r [ p13_206 <= 132 ] { polygon-fill: #FEB24C; } \
			#sc2010_rmsp_cem_r [ p13_206 <= 88  ] { polygon-fill: #FED976; } \
			#sc2010_rmsp_cem_r [ p13_206 <= 44  ] { polygon-fill: #FFFFB2; }"
    },
    "p13_207": { // Faixa etárias - 65 a 79 anos
        sql: "SELECT * FROM sc2010_rmsp_cem_r",
        cartocss: "#sc2010_rmsp_cem_r{polygon-fill: #FC4E2A;polygon-opacity: 0.5;line-color: #fff;line-width: 0.5;line-opacity: 1;} \
            #sc2010_rmsp_cem_r [ p13_207 <= 190 ] { polygon-fill: #B10026; } \
			#sc2010_rmsp_cem_r [ p13_207 <= 139 ] { polygon-fill: #E31A1C; } \
			#sc2010_rmsp_cem_r [ p13_207 <= 116 ] { polygon-fill: #FC4E2A; } \
			#sc2010_rmsp_cem_r [ p13_207 <= 93  ] { polygon-fill: #FD8D3C; } \
			#sc2010_rmsp_cem_r [ p13_207 <= 69  ] { polygon-fill: #FEB24C; } \
			#sc2010_rmsp_cem_r [ p13_207 <= 46  ] { polygon-fill: #FED976; } \
			#sc2010_rmsp_cem_r [ p13_207 <= 23  ] { polygon-fill: #FFFFB2; }"
    },
    "p13_208": { // Faixa etárias - acima 80 anos
        sql: "SELECT * FROM sc2010_rmsp_cem_r",
        cartocss: "#sc2010_rmsp_cem_r{polygon-fill: #FC4E2A;polygon-opacity: 0.5;line-color: #fff;line-width: 0.5;line-opacity: 1;} \
            #sc2010_rmsp_cem_r [ p13_208 <= 167 ] { polygon-fill: #B10026; } \
			#sc2010_rmsp_cem_r [ p13_208 <= 80  ] { polygon-fill: #E31A1C; } \
			#sc2010_rmsp_cem_r [ p13_208 <= 64  ] { polygon-fill: #FC4E2A; } \
			#sc2010_rmsp_cem_r [ p13_208 <= 51  ] { polygon-fill: #FD8D3C; } \
			#sc2010_rmsp_cem_r [ p13_208 <= 38  ] { polygon-fill: #FEB24C; } \
			#sc2010_rmsp_cem_r [ p13_208 <= 25  ] { polygon-fill: #FED976; } \
			#sc2010_rmsp_cem_r [ p13_208 <= 12  ] { polygon-fill: #FFFFB2; }"
    },
    "t_env": { // Taxa de envelhecimento
        sql: "SELECT * FROM sc2010_rmsp_cem_r",
        cartocss: "#sc2010_rmsp_cem_r{polygon-fill: #FC4E2A;polygon-opacity: 0.5;line-color: #fff;line-width: 0.5;line-opacity: 1;} \
            #sc2010_rmsp_cem_r [ t_env <= 167 ] { polygon-fill: #B10026; } \
			#sc2010_rmsp_cem_r [ t_env <= 80  ] { polygon-fill: #E31A1C; } \
			#sc2010_rmsp_cem_r [ t_env <= 64  ] { polygon-fill: #FC4E2A; } \
			#sc2010_rmsp_cem_r [ t_env <= 51  ] { polygon-fill: #FD8D3C; } \
			#sc2010_rmsp_cem_r [ t_env <= 38  ] { polygon-fill: #FEB24C; } \
			#sc2010_rmsp_cem_r [ t_env <= 25  ] { polygon-fill: #FED976; } \
			#sc2010_rmsp_cem_r [ t_env <= 12  ] { polygon-fill: #FFFFB2; }"
    }
};
// DEMOGRAFIA
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// RAÇA E IMIGRAÇÃO

var raca_imigracao = {
    "p3_002": { // Cor/Raça - Branca
        sql: "SELECT * FROM sc2010_rmsp_cem_r",
        cartocss: "#sc2010_rmsp_cem_r{polygon-fill: #FC4E2A;polygon-opacity: 0.5;line-color: #fff;line-width: 0.5;line-opacity: 1;} \
            #sc2010_rmsp_cem_r [ p3_002 <= 1834 ] { polygon-fill: #B10026; } \
			#sc2010_rmsp_cem_r [ p3_002 <= 998  ] { polygon-fill: #E31A1C; } \
			#sc2010_rmsp_cem_r [ p3_002 <= 818  ] { polygon-fill: #FC4E2A; } \
			#sc2010_rmsp_cem_r [ p3_002 <= 654  ] { polygon-fill: #FD8D3C; } \
			#sc2010_rmsp_cem_r [ p3_002 <= 491  ] { polygon-fill: #FEB24C; } \
			#sc2010_rmsp_cem_r [ p3_002 <= 327  ] { polygon-fill: #FED976; } \
			#sc2010_rmsp_cem_r [ p3_002 <= 163  ] { polygon-fill: #FFFFB2; }"
    },
    "p3_003": { // Cor/Raça - Preta
        sql: "SELECT * FROM sc2010_rmsp_cem_r",
        cartocss: "#sc2010_rmsp_cem_r{polygon-fill: #FC4E2A;polygon-opacity: 0.5;line-color: #fff;line-width: 0.5;line-opacity: 1;} \
            #sc2010_rmsp_cem_r [ p3_003 <= 465 ] { polygon-fill: #B10026; } \
			#sc2010_rmsp_cem_r [ p3_003 <= 265 ] { polygon-fill: #E31A1C; } \
			#sc2010_rmsp_cem_r [ p3_003 <= 206 ] { polygon-fill: #FC4E2A; } \
			#sc2010_rmsp_cem_r [ p3_003 <= 165 ] { polygon-fill: #FD8D3C; } \
			#sc2010_rmsp_cem_r [ p3_003 <= 123 ] { polygon-fill: #FEB24C; } \
			#sc2010_rmsp_cem_r [ p3_003 <= 82  ] { polygon-fill: #FED976; } \
			#sc2010_rmsp_cem_r [ p3_003 <= 41  ] { polygon-fill: #FFFFB2; }"
    },
    "p3_004": { // Cor/Raça - Amarela
        sql: "SELECT * FROM sc2010_rmsp_cem_r",
        cartocss: "#sc2010_rmsp_cem_r{polygon-fill: #FC4E2A;polygon-opacity: 0.5;line-color: #fff;line-width: 0.5;line-opacity: 1;} \
            #sc2010_rmsp_cem_r [ p3_004 <= 480 ] { polygon-fill: #B10026; } \
			#sc2010_rmsp_cem_r [ p3_004 <= 216 ] { polygon-fill: #E31A1C; } \
			#sc2010_rmsp_cem_r [ p3_004 <= 161 ] { polygon-fill: #FC4E2A; } \
			#sc2010_rmsp_cem_r [ p3_004 <= 122 ] { polygon-fill: #FD8D3C; } \
			#sc2010_rmsp_cem_r [ p3_004 <= 91  ] { polygon-fill: #FEB24C; } \
			#sc2010_rmsp_cem_r [ p3_004 <= 60  ] { polygon-fill: #FED976; } \
			#sc2010_rmsp_cem_r [ p3_004 <= 30  ] { polygon-fill: #FFFFB2; }"
    },
    "p3_005": { // Cor/Raça - Parda
        sql: "SELECT * FROM sc2010_rmsp_cem_r",
        cartocss: "#sc2010_rmsp_cem_r{polygon-fill: #FC4E2A;polygon-opacity: 0.5;line-color: #fff;line-width: 0.5;line-opacity: 1;} \
            #sc2010_rmsp_cem_r [ p3_005 <= 2131 ] { polygon-fill: #B10026; } \
			#sc2010_rmsp_cem_r [ p3_005 <= 883  ] { polygon-fill: #E31A1C; } \
			#sc2010_rmsp_cem_r [ p3_005 <= 717  ] { polygon-fill: #FC4E2A; } \
			#sc2010_rmsp_cem_r [ p3_005 <= 574  ] { polygon-fill: #FD8D3C; } \
			#sc2010_rmsp_cem_r [ p3_005 <= 430  ] { polygon-fill: #FEB24C; } \
			#sc2010_rmsp_cem_r [ p3_005 <= 287  ] { polygon-fill: #FED976; } \
			#sc2010_rmsp_cem_r [ p3_005 <= 143  ] { polygon-fill: #FFFFB2; }"
    },
    "p3_006": { // Cor/Raça - Indígena
        sql: "SELECT * FROM sc2010_rmsp_cem_r",
        cartocss: "#sc2010_rmsp_cem_r{polygon-fill: #FC4E2A;polygon-opacity: 0.5;line-color: #fff;line-width: 0.5;line-opacity: 1;} \
            #sc2010_rmsp_cem_r [ p3_006 <= 599 ] { polygon-fill: #B10026; } \
			#sc2010_rmsp_cem_r [ p3_006 <= 74  ] { polygon-fill: #E31A1C; } \
			#sc2010_rmsp_cem_r [ p3_006 <= 42  ] { polygon-fill: #FC4E2A; } \
			#sc2010_rmsp_cem_r [ p3_006 <= 26  ] { polygon-fill: #FD8D3C; } \
			#sc2010_rmsp_cem_r [ p3_006 <= 18  ] { polygon-fill: #FEB24C; } \
			#sc2010_rmsp_cem_r [ p3_006 <= 12  ] { polygon-fill: #FED976; } \
			#sc2010_rmsp_cem_r [ p3_006 <= 6   ] { polygon-fill: #FFFFB2; }"
    },
    "de020": { // Pessoas residentes a menos de 3 anos (%)
        sql: "SELECT * FROM sc2010_rmsp_cem_r",
        cartocss: "#sc2010_rmsp_cem_r{polygon-fill: #FC4E2A;polygon-opacity: 0.5;line-color: #fff;line-width: 0.5;line-opacity: 1;} \
            #sc2010_rmsp_cem_r [ de020 <= 21.9 ] { polygon-fill: #B10026; } \
			#sc2010_rmsp_cem_r [ de020 <= 12.8 ] { polygon-fill: #E31A1C; } \
			#sc2010_rmsp_cem_r [ de020 <= 10.9 ] { polygon-fill: #FC4E2A; } \
			#sc2010_rmsp_cem_r [ de020 <= 9.5  ] { polygon-fill: #FD8D3C; } \
			#sc2010_rmsp_cem_r [ de020 <= 8.3  ] { polygon-fill: #FEB24C; } \
			#sc2010_rmsp_cem_r [ de020 <= 7.2  ] { polygon-fill: #FED976; } \
			#sc2010_rmsp_cem_r [ de020 <= 5.9  ] { polygon-fill: #FFFFB2; }"
    },
    "de023": { // Pessoas nascidas em outro Estado (%)
        sql: "SELECT * FROM sc2010_rmsp_cem_r",
        cartocss: "#sc2010_rmsp_cem_r{polygon-fill: #FC4E2A;polygon-opacity: 0.5;line-color: #fff;line-width: 0.5;line-opacity: 1;} \
            #sc2010_rmsp_cem_r [ de023 <= 51.0 ] { polygon-fill: #B10026; } \
			#sc2010_rmsp_cem_r [ de023 <= 32.4 ] { polygon-fill: #E31A1C; } \
			#sc2010_rmsp_cem_r [ de023 <= 29.2 ] { polygon-fill: #FC4E2A; } \
			#sc2010_rmsp_cem_r [ de023 <= 26.1 ] { polygon-fill: #FD8D3C; } \
			#sc2010_rmsp_cem_r [ de023 <= 22.9 ] { polygon-fill: #FEB24C; } \
			#sc2010_rmsp_cem_r [ de023 <= 19.8 ] { polygon-fill: #FED976; } \
			#sc2010_rmsp_cem_r [ de023 <= 16.5 ] { polygon-fill: #FFFFB2; }"
    },
    "de024": { // Pessoas nascidas no Nordeste residentes a menos de 10 anos (%)
        sql: "SELECT * FROM sc2010_rmsp_cem_r",
        cartocss: "#sc2010_rmsp_cem_r{polygon-fill: #FC4E2A;polygon-opacity: 0.5;line-color: #fff;line-width: 0.5;line-opacity: 1;} \
            #sc2010_rmsp_cem_r [ de024 <= 18.8 ] { polygon-fill: #B10026; } \
			#sc2010_rmsp_cem_r [ de024 <= 6.2  ] { polygon-fill: #E31A1C; } \
			#sc2010_rmsp_cem_r [ de024 <= 5.2  ] { polygon-fill: #FC4E2A; } \
			#sc2010_rmsp_cem_r [ de024 <= 4.3  ] { polygon-fill: #FD8D3C; } \
			#sc2010_rmsp_cem_r [ de024 <= 3.5  ] { polygon-fill: #FEB24C; } \
			#sc2010_rmsp_cem_r [ de024 <= 2.8  ] { polygon-fill: #FED976; } \
			#sc2010_rmsp_cem_r [ de024 <= 2.1  ] { polygon-fill: #FFFFB2; }"
    }
};

// RAÇA E IMIGRAÇÃO
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// RELIGIÃO
var religiao = {
    "re027": { // Percentual de pessoas que se declararam (apenas) sem religião
        sql: "SELECT * FROM sc2010_rmsp_cem_r",
        cartocss: "#sc2010_rmsp_cem_r{polygon-fill: #FC4E2A;polygon-opacity: 0.5;line-color: #fff;line-width: 0.5;line-opacity: 1;} \
            #sc2010_rmsp_cem_r [ re027 <= 19.10 ] { polygon-fill: #B10026; } \
			#sc2010_rmsp_cem_r [ re027 <= 13.09 ] { polygon-fill: #E31A1C; } \
			#sc2010_rmsp_cem_r [ re027 <= 11.24 ] { polygon-fill: #FC4E2A; } \
			#sc2010_rmsp_cem_r [ re027 <= 9.84  ] { polygon-fill: #FD8D3C; } \
			#sc2010_rmsp_cem_r [ re027 <= 8.40  ] { polygon-fill: #FEB24C; } \
			#sc2010_rmsp_cem_r [ re027 <= 7.17  ] { polygon-fill: #FED976; } \
			#sc2010_rmsp_cem_r [ re027 <= 5.72  ] { polygon-fill: #FFFFB2; }"
    },
    "re028": { // Percentual de pessoas que se declararam agnósticos
        sql: "SELECT * FROM sc2010_rmsp_cem_r",
        cartocss: "#sc2010_rmsp_cem_r{polygon-fill: #FC4E2A;polygon-opacity: 0.5;line-color: #fff;line-width: 0.5;line-opacity: 1;} \
            #sc2010_rmsp_cem_r [ re028 <= 3.16 ] { polygon-fill: #B10026; } \
			#sc2010_rmsp_cem_r [ re028 <= 3.16 ] { polygon-fill: #E31A1C; } \
			#sc2010_rmsp_cem_r [ re028 <= 2.13 ] { polygon-fill: #FC4E2A; } \
			#sc2010_rmsp_cem_r [ re028 <= 1.38  ] { polygon-fill: #FD8D3C; } \
			#sc2010_rmsp_cem_r [ re028 <= 1.38  ] { polygon-fill: #FEB24C; } \
			#sc2010_rmsp_cem_r [ re028 <= 1.30  ] { polygon-fill: #FED976; } \
			#sc2010_rmsp_cem_r [ re028 <= 0.00  ] { polygon-fill: #FFFFB2; }"
    },
    "re029": { // Percentual de pessoas que se declararam ateus
        sql: "SELECT * FROM sc2010_rmsp_cem_r",
        cartocss: "#sc2010_rmsp_cem_r{polygon-fill: #FC4E2A;polygon-opacity: 0.5;line-color: #fff;line-width: 0.5;line-opacity: 1;} \
            #sc2010_rmsp_cem_r [ re029 <= 4.30 ] { polygon-fill: #B10026; } \
			#sc2010_rmsp_cem_r [ re029 <= 2.75 ] { polygon-fill: #E31A1C; } \
			#sc2010_rmsp_cem_r [ re029 <= 2.05 ] { polygon-fill: #FC4E2A; } \
			#sc2010_rmsp_cem_r [ re029 <= 1.89  ] { polygon-fill: #FD8D3C; } \
			#sc2010_rmsp_cem_r [ re029 <= 1.51  ] { polygon-fill: #FEB24C; } \
			#sc2010_rmsp_cem_r [ re029 <= 1.34  ] { polygon-fill: #FED976; } \
			#sc2010_rmsp_cem_r [ re029 <= 1.09  ] { polygon-fill: #FFFFB2; }"
    },
    "re030": { // Percentual de pessoas que se declararam católicos
        sql: "SELECT * FROM sc2010_rmsp_cem_r",
        cartocss: "#sc2010_rmsp_cem_r{polygon-fill: #FC4E2A;polygon-opacity: 0.5;line-color: #fff;line-width: 0.5;line-opacity: 1;} \
            #sc2010_rmsp_cem_r [ re030 <= 82.70 ] { polygon-fill: #B10026; } \
			#sc2010_rmsp_cem_r [ re030 <= 64.41 ] { polygon-fill: #E31A1C; } \
			#sc2010_rmsp_cem_r [ re030 <= 61.26 ] { polygon-fill: #FC4E2A; } \
			#sc2010_rmsp_cem_r [ re030 <= 58.39 ] { polygon-fill: #FD8D3C; } \
			#sc2010_rmsp_cem_r [ re030 <= 55.23 ] { polygon-fill: #FEB24C; } \
			#sc2010_rmsp_cem_r [ re030 <= 51.99 ] { polygon-fill: #FED976; } \
			#sc2010_rmsp_cem_r [ re030 <= 48.62 ] { polygon-fill: #FFFFB2; }"
    },
    "re031": { // Percentual de pessoas que se declararam evangélicos
        sql: "SELECT * FROM sc2010_rmsp_cem_r",
        cartocss: "#sc2010_rmsp_cem_r{polygon-fill: #FC4E2A;polygon-opacity: 0.5;line-color: #fff;line-width: 0.5;line-opacity: 1;} \
            #sc2010_rmsp_cem_r [ re031 <= 44.26 ] { polygon-fill: #B10026; } \
            #sc2010_rmsp_cem_r [ re031 <= 32.93] { polygon-fill: #E31A1C; } \
            #sc2010_rmsp_cem_r [ re031 <= 30.18 ] { polygon-fill: #FC4E2A; } \
            #sc2010_rmsp_cem_r [ re031 <= 27.56 ] { polygon-fill: #FD8D3C; } \
            #sc2010_rmsp_cem_r [ re031 <= 24.38 ] { polygon-fill: #FEB24C; } \
            #sc2010_rmsp_cem_r [ re031 <= 21.05 ] { polygon-fill: #FED976; } \
            #sc2010_rmsp_cem_r [ re031 <= 14.55 ] { polygon-fill: #FFFFB2; }"
    },
    "re038": { // Percentual de pessoas que se declararam evangélicos pentecostais
        sql: "SELECT * FROM sc2010_rmsp_cem_r",
        cartocss: "#sc2010_rmsp_cem_r{polygon-fill: #FC4E2A;polygon-opacity: 0.5;line-color: #fff;line-width: 0.5;line-opacity: 1;} \
            #sc2010_rmsp_cem_r [ re038 <= 41.79 ] { polygon-fill: #B10026; } \
            #sc2010_rmsp_cem_r [ re038 <= 30.38] { polygon-fill: #E31A1C; } \
            #sc2010_rmsp_cem_r [ re038 <= 27.95 ] { polygon-fill: #FC4E2A; } \
            #sc2010_rmsp_cem_r [ re038 <= 25.09 ] { polygon-fill: #FD8D3C; } \
            #sc2010_rmsp_cem_r [ re038 <= 21.80 ] { polygon-fill: #FEB24C; } \
            #sc2010_rmsp_cem_r [ re038 <= 18.14 ] { polygon-fill: #FED976; } \
            #sc2010_rmsp_cem_r [ re038 <= 11.97 ] { polygon-fill: #FFFFB2; }"
    },
    "re047": { // Percentual de pessoas que se declararam com religião afro-brasileira
        sql: "SELECT * FROM sc2010_rmsp_cem_r",
        cartocss: "#sc2010_rmsp_cem_r{polygon-fill: #FC4E2A;polygon-opacity: 0.5;line-color: #fff;line-width: 0.5;line-opacity: 1;} \
            #sc2010_rmsp_cem_r [ re047 <= 2.33 ] { polygon-fill: #B10026; } \
            #sc2010_rmsp_cem_r [ re047 <= 2.10 ] { polygon-fill: #E31A1C; } \
            #sc2010_rmsp_cem_r [ re047 <= 1.81 ] { polygon-fill: #FC4E2A; } \
            #sc2010_rmsp_cem_r [ re047 <= 1.67 ] { polygon-fill: #FD8D3C; } \
            #sc2010_rmsp_cem_r [ re047 <= 1.48 ] { polygon-fill: #FEB24C; } \
            #sc2010_rmsp_cem_r [ re047 <= 1.28 ] { polygon-fill: #FED976; } \
            #sc2010_rmsp_cem_r [ re047 <= 0.98 ] { polygon-fill: #FFFFB2; }"
    },
    "re050": { // Percentual de pessoas pertencentes a outros segmentos religiosos
        sql: "SELECT * FROM sc2010_rmsp_cem_r",
        cartocss: "#sc2010_rmsp_cem_r{polygon-fill: #FC4E2A;polygon-opacity: 0.5;line-color: #fff;line-width: 0.5;line-opacity: 1;} \
            #sc2010_rmsp_cem_r [ re050 <= 31.05 ] { polygon-fill: #B10026; } \
            #sc2010_rmsp_cem_r [ re050 <= 6.26 ] { polygon-fill: #E31A1C; } \
            #sc2010_rmsp_cem_r [ re050 <= 5.32 ] { polygon-fill: #FC4E2A; } \
            #sc2010_rmsp_cem_r [ re050 <= 4.63 ] { polygon-fill: #FD8D3C; } \
            #sc2010_rmsp_cem_r [ re050 <= 4.05 ] { polygon-fill: #FEB24C; } \
            #sc2010_rmsp_cem_r [ re050 <= 3.45 ] { polygon-fill: #FED976; } \
            #sc2010_rmsp_cem_r [ re050 <= 2.79 ] { polygon-fill: #FFFFB2; }"
    }
};
// RAÇA E IMIGRAÇÃO
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// EDUCAÇÃO (NESTE CASO UTILIZA-SE ÁREAS DE PONDERAÇÃO AO INVÉS DOS SETORES CENSITÁRIOS)
var educacao = {
    "p1_001": { // Alfabetizadas com 5 ou mais anos de idade
        sql: "SELECT * FROM ap2010_rmsp_cem_r",
        cartocss: "#ap2010_rmsp_cem_r{polygon-fill: #FC4E2A;polygon-opacity: 0.5;line-color: #fff;line-width: 0.5;line-opacity: 1;} \
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
        cartocss: "#ap2010_rmsp_cem_r{polygon-fill: #FC4E2A;polygon-opacity: 0.5;line-color: #fff;line-width: 0.5;line-opacity: 1;} \
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
        cartocss: "#ap2010_rmsp_cem_r{polygon-fill: #FC4E2A;polygon-opacity: 0.5;line-color: #fff;line-width: 0.5;line-opacity: 1;} \
            #ap2010_rmsp_cem_r [ ins002 <= 14.1 ] { polygon-fill: #B10026; } \
			#ap2010_rmsp_cem_r [ ins002 <= 10.9 ] { polygon-fill: #E31A1C; } \
			#ap2010_rmsp_cem_r [ ins002 <= 9.1  ] { polygon-fill: #FC4E2A; } \
			#ap2010_rmsp_cem_r [ ins002 <= 7.9  ] { polygon-fill: #FD8D3C; } \
			#ap2010_rmsp_cem_r [ ins002 <= 7.2  ] { polygon-fill: #FEB24C; } \
			#ap2010_rmsp_cem_r [ ins002 <= 6.7  ] { polygon-fill: #FED976; } \
			#ap2010_rmsp_cem_r [ ins002 <= 6.1  ] { polygon-fill: #FFFFB2; }"
    },
    "ins032": { // Percentual de pessoas de 7 a 14 anos de idade fora da escola
        sql: "SELECT * FROM ap2010_rmsp_cem_r",
        cartocss: "#ap2010_rmsp_cem_r{polygon-fill: #FC4E2A;polygon-opacity: 0.5;line-color: #fff;line-width: 0.5;line-opacity: 1;} \
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
        cartocss: "#ap2010_rmsp_cem_r{polygon-fill: #FC4E2A;polygon-opacity: 0.5;line-color: #fff;line-width: 0.5;line-opacity: 1;} \
            #ap2010_rmsp_cem_r [ ins037 <= 38.3 ] { polygon-fill: #B10026; } \
			#ap2010_rmsp_cem_r [ ins037 <= 30.5 ] { polygon-fill: #E31A1C; } \
			#ap2010_rmsp_cem_r [ ins037 <= 27.7 ] { polygon-fill: #FC4E2A; } \
			#ap2010_rmsp_cem_r [ ins037 <= 24.0 ] { polygon-fill: #FD8D3C; } \
			#ap2010_rmsp_cem_r [ ins037 <= 21.6 ] { polygon-fill: #FEB24C; } \
			#ap2010_rmsp_cem_r [ ins037 <= 19.4 ] { polygon-fill: #FED976; } \
			#ap2010_rmsp_cem_r [ ins037 <= 17.1 ] { polygon-fill: #FFFFB2; }"
    }
};
// EDUCAÇÃO (NESTE CASO UTILIZA-SE ÁREAS DE PONDERAÇÃO AO INVÉS DOS SETORES CENSITÁRIOS)
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// RENDA E TRABALHO
var renda_trabalho = {
    "ren002": { // Renda domiciliar total média
        sql: "SELECT * FROM sc2010_rmsp_cem_r",
        cartocss: "#sc2010_rmsp_cem_r{polygon-fill: #FC4E2A;polygon-opacity: 0.5;line-color: #fff;line-width: 0.5;line-opacity: 1;} \
            #sc2010_rmsp_cem_r [ ren002 <= 19292.16 ] { polygon-fill: #B10026; } \
			#sc2010_rmsp_cem_r [ ren002 <= 5449.51  ] { polygon-fill: #E31A1C; } \
			#sc2010_rmsp_cem_r [ ren002 <= 3459.20  ] { polygon-fill: #FC4E2A; } \
			#sc2010_rmsp_cem_r [ ren002 <= 2607.73  ] { polygon-fill: #FD8D3C; } \
			#sc2010_rmsp_cem_r [ ren002 <= 2202.87  ] { polygon-fill: #FEB24C; } \
			#sc2010_rmsp_cem_r [ ren002 <= 1939.82  ] { polygon-fill: #FED976; } \
			#sc2010_rmsp_cem_r [ ren002 <= 1696.20  ] { polygon-fill: #FFFFB2; }"
    },
    "ren003": { // Renda domiciliar per capita em salários mínimos
        sql: "SELECT * FROM sc2010_rmsp_cem_r",
        cartocss: "#sc2010_rmsp_cem_r{polygon-fill: #FC4E2A;polygon-opacity: 0.5;line-color: #fff;line-width: 0.5;line-opacity: 1;} \
            #sc2010_rmsp_cem_r [ ren003 <= 15.86 ] { polygon-fill: #B10026; } \
			#sc2010_rmsp_cem_r [ ren003 <= 6.32  ] { polygon-fill: #E31A1C; } \
			#sc2010_rmsp_cem_r [ ren003 <= 3.78  ] { polygon-fill: #FC4E2A; } \
			#sc2010_rmsp_cem_r [ ren003 <= 2.59  ] { polygon-fill: #FD8D3C; } \
			#sc2010_rmsp_cem_r [ ren003 <= 2.05  ] { polygon-fill: #FEB24C; } \
			#sc2010_rmsp_cem_r [ ren003 <= 1.52  ] { polygon-fill: #FED976; } \
			#sc2010_rmsp_cem_r [ ren003 <= 1.11  ] { polygon-fill: #FFFFB2; }"
    },
    "ren004": { // Renda domiciliar total média em salários mínimos
        sql: "SELECT * FROM sc2010_rmsp_cem_r",
        cartocss: "#sc2010_rmsp_cem_r{polygon-fill: #FC4E2A;polygon-opacity: 0.5;line-color: #fff;line-width: 0.5;line-opacity: 1;} \
            #sc2010_rmsp_cem_r [ ren004 <= 37.83 ] { polygon-fill: #B10026; } \
			#sc2010_rmsp_cem_r [ ren004 <= 13.9  ] { polygon-fill: #E31A1C; } \
			#sc2010_rmsp_cem_r [ ren004 <= 8.27  ] { polygon-fill: #FC4E2A; } \
			#sc2010_rmsp_cem_r [ ren004 <= 6.51  ] { polygon-fill: #FD8D3C; } \
			#sc2010_rmsp_cem_r [ ren004 <= 5.00  ] { polygon-fill: #FEB24C; } \
			#sc2010_rmsp_cem_r [ ren004 <= 4.13  ] { polygon-fill: #FED976; } \
			#sc2010_rmsp_cem_r [ ren004 <= 3.40  ] { polygon-fill: #FFFFB2; }"
    },
    "ren016": { // Pessoas com renda per capita até meio salário mínimo (%)
        sql: "SELECT * FROM sc2010_rmsp_cem_r",
        cartocss: "#sc2010_rmsp_cem_r{polygon-fill: #FC4E2A;polygon-opacity: 0.5;line-color: #fff;line-width: 0.5;line-opacity: 1;} \
            #sc2010_rmsp_cem_r [ ren016 <= 49.63 ] { polygon-fill: #B10026; } \
			#sc2010_rmsp_cem_r [ ren016 <= 32.47 ] { polygon-fill: #E31A1C; } \
			#sc2010_rmsp_cem_r [ ren016 <= 27.72 ] { polygon-fill: #FC4E2A; } \
			#sc2010_rmsp_cem_r [ ren016 <= 23.18 ] { polygon-fill: #FD8D3C; } \
			#sc2010_rmsp_cem_r [ ren016 <= 19.00 ] { polygon-fill: #FEB24C; } \
			#sc2010_rmsp_cem_r [ ren016 <= 14.05 ] { polygon-fill: #FED976; } \
			#sc2010_rmsp_cem_r [ ren016 <= 9.15  ] { polygon-fill: #FFFFB2; }"
    },
    "ren101": { // Pessoas com renda per capita entre 0,5 e 1 salário mínimo (%)
        sql: "SELECT * FROM sc2010_rmsp_cem_r",
        cartocss: "#sc2010_rmsp_cem_r{polygon-fill: #FC4E2A;polygon-opacity: 0.5;line-color: #fff;line-width: 0.5;line-opacity: 1;} \
            #sc2010_rmsp_cem_r [ ren101 <= 42.57 ] { polygon-fill: #B10026; } \
			#sc2010_rmsp_cem_r [ ren101 <= 35.12 ] { polygon-fill: #E31A1C; } \
			#sc2010_rmsp_cem_r [ ren101 <= 32.29 ] { polygon-fill: #FC4E2A; } \
			#sc2010_rmsp_cem_r [ ren101 <= 29.64 ] { polygon-fill: #FD8D3C; } \
			#sc2010_rmsp_cem_r [ ren101 <= 26.06 ] { polygon-fill: #FEB24C; } \
			#sc2010_rmsp_cem_r [ ren101 <= 20.38 ] { polygon-fill: #FED976; } \
			#sc2010_rmsp_cem_r [ ren101 <= 12.97 ] { polygon-fill: #FFFFB2; }"
    },
    "ren102": { // Pessoas com renda per capita entre 1 e 3 salários mínimos (%)
        sql: "SELECT * FROM sc2010_rmsp_cem_r",
        cartocss: "#sc2010_rmsp_cem_r{polygon-fill: #FC4E2A;polygon-opacity: 0.5;line-color: #fff;line-width: 0.5;line-opacity: 1;} \
            #sc2010_rmsp_cem_r [ ren102 <= 57.29 ] { polygon-fill: #B10026; } \
			#sc2010_rmsp_cem_r [ ren102 <= 45.63 ] { polygon-fill: #E31A1C; } \
			#sc2010_rmsp_cem_r [ ren102 <= 41.78 ] { polygon-fill: #FC4E2A; } \
			#sc2010_rmsp_cem_r [ ren102 <= 38.36 ] { polygon-fill: #FD8D3C; } \
			#sc2010_rmsp_cem_r [ ren102 <= 34.90 ] { polygon-fill: #FEB24C; } \
			#sc2010_rmsp_cem_r [ ren102 <= 30.91 ] { polygon-fill: #FED976; } \
			#sc2010_rmsp_cem_r [ ren102 <= 26.43 ] { polygon-fill: #FFFFB2; }"
    },
    "ren103": { // Pessoas com renda per capita entre 3 e 5 salários mínimos (%)
        sql: "SELECT * FROM sc2010_rmsp_cem_r",
        cartocss: "#sc2010_rmsp_cem_r{polygon-fill: #FC4E2A;polygon-opacity: 0.5;line-color: #fff;line-width: 0.5;line-opacity: 1;} \
            #sc2010_rmsp_cem_r [ ren103 <= 23.88 ] { polygon-fill: #B10026; } \
			#sc2010_rmsp_cem_r [ ren103 <= 16.16 ] { polygon-fill: #E31A1C; } \
			#sc2010_rmsp_cem_r [ ren103 <= 12.62 ] { polygon-fill: #FC4E2A; } \
			#sc2010_rmsp_cem_r [ ren103 <= 9.36  ] { polygon-fill: #FD8D3C; } \
			#sc2010_rmsp_cem_r [ ren103 <= 6.24  ] { polygon-fill: #FEB24C; } \
			#sc2010_rmsp_cem_r [ ren103 <= 4.18  ] { polygon-fill: #FED976; } \
			#sc2010_rmsp_cem_r [ ren103 <= 2.79  ] { polygon-fill: #FFFFB2; }"
    },
    "ren104": { // Pessoas com renda per capita entre 5 e 10 salários mínimos (%)
        sql: "SELECT * FROM sc2010_rmsp_cem_r",
        cartocss: "#sc2010_rmsp_cem_r{polygon-fill: #FC4E2A;polygon-opacity: 0.5;line-color: #fff;line-width: 0.5;line-opacity: 1;} \
            #sc2010_rmsp_cem_r [ ren104 <= 32.64 ] { polygon-fill: #B10026; } \
			#sc2010_rmsp_cem_r [ ren104 <= 22.15 ] { polygon-fill: #E31A1C; } \
			#sc2010_rmsp_cem_r [ ren104 <= 13.53 ] { polygon-fill: #FC4E2A; } \
			#sc2010_rmsp_cem_r [ ren104 <= 8.31  ] { polygon-fill: #FD8D3C; } \
			#sc2010_rmsp_cem_r [ ren104 <= 5.95  ] { polygon-fill: #FEB24C; } \
			#sc2010_rmsp_cem_r [ ren104 <= 3.58  ] { polygon-fill: #FED976; } \
			#sc2010_rmsp_cem_r [ ren104 <= 2.00  ] { polygon-fill: #FFFFB2; }"
    },
    "ren105": { // Pessoas com renda per capita acima de 10 salários mínimos (%)
        sql: "SELECT * FROM sc2010_rmsp_cem_r",
        cartocss: "#sc2010_rmsp_cem_r{polygon-fill: #FC4E2A;polygon-opacity: 0.5;line-color: #fff;line-width: 0.5;line-opacity: 1;} \
            #sc2010_rmsp_cem_r [ ren105 <= 42.66 ] { polygon-fill: #B10026; } \
			#sc2010_rmsp_cem_r [ ren105 <= 25.15 ] { polygon-fill: #E31A1C; } \
			#sc2010_rmsp_cem_r [ ren105 <= 13.10 ] { polygon-fill: #FC4E2A; } \
			#sc2010_rmsp_cem_r [ ren105 <= 7.60  ] { polygon-fill: #FD8D3C; } \
			#sc2010_rmsp_cem_r [ ren105 <= 4.63  ] { polygon-fill: #FEB24C; } \
			#sc2010_rmsp_cem_r [ ren105 <= 2.84  ] { polygon-fill: #FED976; } \
			#sc2010_rmsp_cem_r [ ren105 <= 1.94  ] { polygon-fill: #FFFFB2; }"
    },
    "mt006": { // Taxa de desocupação
        sql: "SELECT * FROM sc2010_rmsp_cem_r",
        cartocss: "#sc2010_rmsp_cem_r{polygon-fill: #FC4E2A;polygon-opacity: 0.5;line-color: #fff;line-width: 0.5;line-opacity: 1;} \
            #sc2010_rmsp_cem_r [ mt006 <= 19.99 ] { polygon-fill: #B10026; } \
			#sc2010_rmsp_cem_r [ mt006 <= 11.85 ] { polygon-fill: #E31A1C; } \
			#sc2010_rmsp_cem_r [ mt006 <= 10.27 ] { polygon-fill: #FC4E2A; } \
			#sc2010_rmsp_cem_r [ mt006 <= 9.05  ] { polygon-fill: #FD8D3C; } \
			#sc2010_rmsp_cem_r [ mt006 <= 7.92  ] { polygon-fill: #FEB24C; } \
			#sc2010_rmsp_cem_r [ mt006 <= 6.67  ] { polygon-fill: #FED976; } \
			#sc2010_rmsp_cem_r [ mt006 <= 5.35  ] { polygon-fill: #FFFFB2; }"
    },
    "mt008": { // Taxa de ocupação
        sql: "SELECT * FROM sc2010_rmsp_cem_r",
        cartocss: "#sc2010_rmsp_cem_r{polygon-fill: #FC4E2A;polygon-opacity: 0.5;line-color: #fff;line-width: 0.5;line-opacity: 1;} \
            #sc2010_rmsp_cem_r [ mt008 <= 98.21 ] { polygon-fill: #B10026; } \
			#sc2010_rmsp_cem_r [ mt008 <= 94.82 ] { polygon-fill: #E31A1C; } \
			#sc2010_rmsp_cem_r [ mt008 <= 93.44 ] { polygon-fill: #FC4E2A; } \
			#sc2010_rmsp_cem_r [ mt008 <= 92.19 ] { polygon-fill: #FD8D3C; } \
			#sc2010_rmsp_cem_r [ mt008 <= 91.00 ] { polygon-fill: #FEB24C; } \
			#sc2010_rmsp_cem_r [ mt008 <= 89.76 ] { polygon-fill: #FED976; } \
			#sc2010_rmsp_cem_r [ mt008 <= 88.17 ] { polygon-fill: #FFFFB2; }"
    },
    "mt007": { // Taxa de participação
        sql: "SELECT * FROM sc2010_rmsp_cem_r",
        cartocss: "#sc2010_rmsp_cem_r{polygon-fill: #FC4E2A;polygon-opacity: 0.5;line-color: #fff;line-width: 0.5;line-opacity: 1;} \
            #sc2010_rmsp_cem_r [ mt007 <= 74.47 ] { polygon-fill: #B10026; } \
			#sc2010_rmsp_cem_r [ mt007 <= 65.12 ] { polygon-fill: #E31A1C; } \
			#sc2010_rmsp_cem_r [ mt007 <= 63.27 ] { polygon-fill: #FC4E2A; } \
			#sc2010_rmsp_cem_r [ mt007 <= 61.59 ] { polygon-fill: #FD8D3C; } \
			#sc2010_rmsp_cem_r [ mt007 <= 60.20 ] { polygon-fill: #FEB24C; } \
			#sc2010_rmsp_cem_r [ mt007 <= 58.78 ] { polygon-fill: #FED976; } \
			#sc2010_rmsp_cem_r [ mt007 <= 56.71 ] { polygon-fill: #FFFFB2; }"
    }

};
