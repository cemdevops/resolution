// load the data
var apSvg;
var graphType = 5;

function execScriptGraph (xVariableForGraph, theme, variable, ylabel, arrayDataClassBreaks, colTableToLegend,
                          tableNameForGraphs, cartoUserForGraphs, polygonCodName) {

    var variableForGraph = getVariableData(theme,xVariableForGraph);
    var xlabel = variableForGraph.title;

    if ((theme == 0 && variable == "")) {
        graphErase ();
    } else {
        if (graphType == 1) {
            $.getScript( "js/graphics-eixos_xy.js", function( data, textStatus, jqxhr ) {
                console.log( "Eixos was performed." );
            });
        } else if (graphType == 2) {
            $.getScript( "js/graphics-circles.js", function( data, textStatus, jqxhr ) {
                console.log( "Circles was performed." );
            });
        } else if (graphType == 3) {
            $.getScript( "js/graphics-barras-and-mapa.js", function( data, textStatus, jqxhr ) {
                console.log( "Barras was performed." );
            });
        } else if (graphType == 4) {
            $.getScript( "js/graphics-bubbles.js", function( data, textStatus, jqxhr ) {
                console.log( "Bubbles was performed." );
            });
        } else if (graphType == 5) {
            loadGraphicCircles (xVariableForGraph, variable, xlabel, ylabel, arrayDataClassBreaks, colTableToLegend,
                tableNameForGraphs, cartoUserForGraphs,polygonCodName);
        }
    }
}

function loadGraphicCircles (xVariableForGraph, variable, xlabel, ylabel, arrayDataClassBreaks, colTableToLegend,
                             tableNameForGraphs, cartoUserForGraphs, polygonCodName) {

    //tableNameForGraphs = 'data/' + tableNameForGraphs + '.csv';
    //var apData = d3.csv (tableNameForGraphs, function (data) {});

    var sql = new cartodb.SQL({ user: cartoUserForGraphs });
    var strQuery = "SELECT cartodb_id," + polygonCodName + "," + variable + "," + xVariableForGraph  + "," +
        (polygonCodName == 'codsc_cem' ? "nom_mu," + colTableToLegend: colTableToLegend) +
        " FROM " + tableNameForGraphs + " where " + variable + "<> -999.99";
    sql.execute(strQuery)
        .done(function(dataQuery) {
            var data = dataQuery.rows;
            var margin = {top: 50, right: 50, bottom: 50, left: 100},
                width = 430 -margin.left - margin.right,
                height = 300 - margin.top - margin.bottom;

            //apSvg = d3.select('.chart')
            apSvg = d3.select('#d3-elements')
                .append('svg')
                .attr('class', 'chart')
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom);

            var chart = apSvg.append("g")
                .attr('class', 'circle')
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            var x = d3.scale.linear().range([0, width]);
            x.domain([ 0, d3.max (data, function (d) {
                return parseFloat(d[xVariableForGraph]);//d [xVariable];//.p3_001; // <- população d.cartodb_id; 19292
            })
            ]);

            var y = d3.scale.linear().range([height,0]);
            y.domain([0,
                d3.max (data, function (d) {
                    return parseFloat(d[variable]);
                })
            ]);

            var scale = d3.scale.sqrt()
                .domain([
                    d3.min (data, function (d) {
                        return 5000;
                    }),
                    d3.max (data, function (d) {
                        return 19;
                    })
                ])
                .range([1, 20]);

            var opacity = d3.scale.sqrt()
                .domain([
                    d3.min (data, function (d) {
                        return 30;
                    }),
                    d3.max (data, function (d) {
                        return 20;
                    })
                ])
                .range([1, .5]);

            var color = d3.scale.category10();

            var xAxis = d3.svg.axis().scale(x);
            var yAxis = d3.svg.axis().scale(y).orient("left");

            // Add the x Axis
            chart.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis);

            // text label for the x axis
            chart.append("text")
                .attr("transform",
                    "translate(" + (width/2) + " ," +
                    (height + margin.top/1.3) + ")")
                .style("text-anchor", "middle")
                .text(xlabel);

            // Add the y Axis
            chart.append("g")
                .attr("class", "y axis")
                .call(yAxis);

            // text label for the y axis
            chart.append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 0 - margin.left)
                .attr("x", 0 - (height / 2))
                .attr("dy", "2.1em")
                .style("text-anchor", "middle")
                // .attr("startOffset", "50%")
                .text(ylabel)
                .call(wrap, height);

            // Define the div for the tooltip
            var div = d3.select("body").append("div")
                .attr("class", "tooltip")
                .style("opacity", 0);

            chart.selectAll("circle")
                .data(data)
                .enter()
                .insert("circle")
                .filter(function (d) {
                    return d [variable] >= 0;
                })
                .attr("cx", width)
                .attr("cy", height)
                //.attr("opacity", function (d) { return opacity(d.data); })  // transparency
                .attr("opacity", .9)
                .attr("r", 5)//function (d) { console.log ("scale d.data",d.p1_001, d.data, scale(d.p1_001)); return scale(d.data); })
                //.style("fill", function (d) { return color(d.data); })
                .style("fill", "#595959" )
                .on('mouseover', function (d) {
                    //fade(d.data, d.cartodb_id, .1);
                    fade(d.data, polygonCodName, d[polygonCodName], .1);
                    //console.log('d:',d);
                    // Fill district value in legend
                    if (polygonCodName == "codsc_cem" && d["nom_mu"] != d[colTableToLegend]) {
                        document.getElementById("bairro").innerHTML = d["nom_mu"] + " - " + d[colTableToLegend];
                        document.getElementById("bairro").title = 'Municipio - Distrito';
                    } else {
                        document.getElementById("bairro").innerHTML = d[colTableToLegend];
                        document.getElementById("bairro").title = 'Municipio';
                    }
                    for (var i=1; i < 8; i++) {
                        document.getElementById("celula"+i).innerHTML = "";
                    }
                    if (d [variable] >= 0 && d [variable] <= arrayDataClassBreaks[6]) {
                        document.getElementById("celula" + getClassBreaksCel (d [variable], arrayDataClassBreaks)).innerHTML = d [variable];
                    }

                    div.transition()
                        .duration(200)
                        .style("opacity", .9);

                    div.html("<b>" + ylabel + ":</b> " + d [variable]+ "<br/><b>"  + xlabel + ":</b> " + d [xVariableForGraph])
                        .style("left", (d3.event.pageX + 5) + "px")
                        .style("top", (d3.event.pageY - 23) + "px")
                        .style("width", (ylabel.length > xlabel.length ? ylabel.length * 6 : xlabel.length * 6) + "px");
                })
                .on('mouseout', function (d) {
                    fadeOut( polygonCodName, d[polygonCodName]);
                    for (var i=1; i < 8; i++) {
                        document.getElementById("celula"+i).innerHTML = "";
                    }

                    div.transition()
                        .duration(500)
                        .style("opacity", 0);
                })
                .transition()
                //      .delay(function (d, i) { return x(d.cartodb_id) - y(d.p1_001); })
                .duration(500)
                .attr("cx", function (d) { return x(d[xVariableForGraph]); }) // cartodb_id, .p3_001
                .attr("cy", function (d) { return y(d[variable]); }) // d.p1_001
                .ease("bounce");



            function fade(c, polygonCodName, selectedPolygonCod, opacity) {
                var polId = selectedPolygonCod;
                var pol = polygonsHighlighted;
                if (pol.length > 0) {
                    for (var i = 0; i < pol.length; i++) {
                        map.removeLayer(pol[i].geo);
                        highLightNodeOff (polygonCodName, pol[i].polId);
                    }
                    polygonsHighlighted = [];
                }

                pol = polygons[polId];
                if (pol) {
                    for (var i = 0; i < pol.length; i++) {
                        map.addLayer(pol[i].geo);
                        highLightNodeOn (polygonCodName, pol[i].polId);
                        polygonsHighlighted.push(pol[i]);
                    }
                }

            }

            function fadeOut(polygonCodName, selectedPolygonCod) {
                /*
                apSvg.selectAll("circle")
                    .transition()
                    .style("opacity", function (d) { opacity(d.data); })
                    .style("stroke", "")
                    .style("stroke-width", "0x")
                */
                var polId = selectedPolygonCod;
                var pol = polygonsHighlighted;
                if (pol.length > 0) {
                    for(var i = 0; i < pol.length; i++) {
                        map.removeLayer(pol[i].geo);
                        highLightNodeOff (polygonCodName, pol[i].polId);
                    }
                    polygonsHighlighted = [];
                }

            }
        });
}

function wrap(text, width) {
    text.each(function() {
        var text = d3.select(this),
            words = text.text().split(/\s+/).reverse(),
            word,
            line = [],
            lineNumber = 0,
            lineHeight = 1.1, // ems
            y = text.attr("y"),
            dy = parseFloat(text.attr("dy")),
            tspan = text.text(null).append("tspan").attr("x", -100).attr("y", y).attr("dy", dy + "em")
        while (word = words.pop()) {
            line.push(word)
            tspan.text(line.join(" "))
            if (tspan.node().getComputedTextLength() > width) {
                line.pop()
                tspan.text(line.join(" "))
                line = [word]
                tspan = text.append("tspan").attr("x", -100).attr("y", y).attr("dy", `${++lineNumber * lineHeight + dy}em`).text(word)
            }
        }
    })
}

function highLightNodeOn (polygonCodName, selectedPolygonCod) {
    apSvg.selectAll("circle")
        .filter(function (d) {
            return d[polygonCodName] == selectedPolygonCod;
        })
        .moveToFront()
        .style("stroke", "#ff3300")
        .style("stroke-width", "2px")
        .style("fill","#ff3300");
}

d3.selection.prototype.moveToFront = function() {
    return this.each(function(){
        this.parentNode.appendChild(this);
    });
};

function highLightNodeOff (polygonCodName, selectedPolygonCod) {
    apSvg.selectAll("circle")
        .filter(function (d) {
            return d[polygonCodName] == selectedPolygonCod;
        })
        .style("stroke", "")
        .style("stroke-width", "0px")
        .style("fill", "#595959")
        .attr("opacity", .9)
}

function isGraphVisible () {
    if (document.getElementById("d3-elements").innerHTML == "") {
        return false;
    } else {
        return true;
    }
}

function graphErase () {
    if (isGraphVisible ()) {
        $("#d3-elements").empty ();
        $("#graphic-close").hide ();
    }
}

$("#graphic-close").click(function () {
    graphErase ();
});

$("#option_theme").change(function(){
    graphErase ();
});
