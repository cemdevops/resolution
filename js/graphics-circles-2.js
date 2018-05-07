// load the data
var apSvg;
var graphType = 5;
var graphLabelX = 'Eixo X';
var graphLabelY = 'Eixo --- - - - -Y';

var xVariable = "cartodb_id";
graphLabelX = "CartoDB_ID";

xVariable = "ren002"; // renda domiciliar total media
varXMin = 1071.52;
varXMax = 19292.2;
graphLabelX = "Average total household income";

xVariable = "ren003"; // renda domiciliar total media
graphLabelX = "Per capita household income in minimum salaries";


function execScriptGraph (theme, variable, xlabel, ylabel, arrayDataClassBreaks, colTableToLegend, tableName) {
    if ((theme == 0 && variable == "")) {
        graphErase ();
    } else {
        if (graphType == 1) {
            $.getScript( "js/graphics-eixos_xy.js", function( data, textStatus, jqxhr ) {
                //console.log( data ); // Data returned
                //console.log( textStatus ); // Success
                //console.log( jqxhr.status ); // 200
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
            loadGraphicCircles (theme, variable, xlabel, ylabel, arrayDataClassBreaks, colTableToLegend, tableName);
        }
    }
}

function loadGraphicCircles (theme, variable, xlabel, ylabel, arrayDataClassBreaks, colTableToLegend, tableName) {

    tableName = 'files/' + tableName + '.csv';
    var apData = d3.csv (tableName, function (data) {
        var margin = {top: 50, right: 50, bottom: 50, left: 90},
            width = 400 -margin.left - margin.right,
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
            return parseFloat(d[xVariable]);//d [xVariable];//.p3_001; // <- população d.cartodb_id; 19292
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
            .text(graphLabelX);

        // Add the y Axis
        chart.append("g")
            .attr("class", "y axis")
            .call(yAxis);

        // text label for the y axis
        chart.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left)
            .attr("x", 0 - (height / 2))
            .attr("dy", "2.5em")
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
                //console.log ("FILTER: ", d,"d.data", d.data)
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
                //console.log ("D: ", d, "D.data: ", d.data,"D.cartodb_id: ", d.cartodb_id,"D.p1_001: ", d.p1_001)
                fade(d.data, d.cartodb_id, .1);
                document.getElementById("bairro").innerHTML = d [colTableToLegend];
                for (var i=1; i < 8; i++) {
                    document.getElementById("celula"+i).innerHTML = "";
                }
                if (d [variable] >= 0 && d [variable] <= arrayDataClassBreaks[6]) {
                    document.getElementById("celula" + getClassBreaksCel (d [variable], arrayDataClassBreaks)).innerHTML = d [variable];
                }

                div.transition()
                    .duration(200)
                    .style("opacity", .9);

                div.html("<b>" + graphLabelY + ":</b> " + d [variable]+ "<br/><b>"  + graphLabelX + ":</b> " + d [xVariable])
                    .style("left", (d3.event.pageX + 5) + "px")
                    .style("top", (d3.event.pageY - 23) + "px")
                    .style("width", (graphLabelY.length > graphLabelX.length ? graphLabelY.length * 6 : graphLabelX.length * 6) + "px");
            })
            .on('mouseout', function (d) {
                fadeOut(d.cartodb_id);
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
            .attr("cx", function (d) { return x(d [xVariable]); }) // cartodb_id, .p3_001
            .attr("cy", function (d) { return y(d[variable]); }) // d.p1_001
            .ease("bounce");



        function fade(c, cartodb_id, opacity) {
            var cartoId = cartodb_id;
            var pol = polygonsHighlighted;
            if (pol.length > 0) {
                for (var i = 0; i < pol.length; i++) {
                    //console.log ("OFF highLightNodeOff (ADD): ", pol[i])
                    map.removeLayer(pol[i].geo);
                    highLightNodeOff (pol[i].cartoId);
                }
                polygonsHighlighted = [];
            }

            pol = polygons[cartoId];
            if (pol) {
                for (var i = 0; i < pol.length; i++) {
                    //console.log ("ON highLightNodeOn: ", pol[i])
                    map.addLayer(pol[i].geo);
                    highLightNodeOn (pol[i].cartoId);
                    polygonsHighlighted.push(pol[i]);
                }
            }

        }

        function fadeOut(cartodb_id) {
            /*
            apSvg.selectAll("circle")
                .transition()
                .style("opacity", function (d) { opacity(d.data); })
                .style("stroke", "")
                .style("stroke-width", "0x")
            */
            var cartoId = cartodb_id;
            var pol = polygonsHighlighted;
            if (pol.length > 0) {
                for(var i = 0; i < pol.length; i++) {
                    // console.log ("OFF highLightNodeOff: ", pol[i])
                    map.removeLayer(pol[i].geo);
                    highLightNodeOff (pol[i].cartoId);
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

function highLightNodeOn (cartodb_id) {
    apSvg.selectAll("circle")
        .filter(function (d) {
            // console.log(d.cartodb_id, cartodb_id);
            return d.cartodb_id == cartodb_id;
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

function highLightNodeOff (cartodb_id) {
    apSvg.selectAll("circle")
        .filter(function (d) {
            return d.cartodb_id == cartodb_id;
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
    //$("#d3-elements").empty ();
    //$("#graphic-close").hide ();
});

$("#option_theme").change(function(){
    graphErase ();
});

/*
var sql = new cartodb.SQL({ user: 'cemdevops' });

sql.execute("SELECT the_geom, nome, dens_demo, pop_2000, area_km2 FROM munrm07")
    .done(function(dataQuery) {

        var height = 400;
        var width = 600;
        var margin = 40;
        var data =[];
        for(var i = 0; i < 42; i++) {
            data.push({
                x: Math.random() * 400,
                y: Math.random() * 100,
                c: Math.round(Math.random() * 5),
                size: Math.random() * 200,
            });
        }

        console.log(data);
        var labelX = 'X';
        var labelY = 'Y';
        var svg = d3.select('.chart')
            .append('svg')
            .attr('class', 'chart')
            .attr("width", width + margin + margin)
            .attr("height", height + margin + margin)
            .append("g")
            .attr("transform", "translate(" + margin + "," + margin + ")");

        var x = d3.scale.linear()
            .domain([d3.min(data, function (d) { return d.x; }), d3.max(data, function (d) { return d.x; })])
            .range([0, width]);

        var y = d3.scale.linear()
            .domain([d3.min(data, function (d) { return d.y; }), d3.max(data, function (d) { return d.y; })])
            .range([height, 0]);

        var scale = d3.scale.sqrt()
            .domain([d3.min(data, function (d) { return d.size; }), d3.max(data, function (d) { return d.size; })])
            .range([1, 20]);

        var opacity = d3.scale.sqrt()
            .domain([d3.min(data, function (d) { return d.size; }), d3.max(data, function (d) { return d.size; })])
            .range([1, .5]);

        var color = d3.scale.category10();

        var xAxis = d3.svg.axis().scale(x);
        var yAxis = d3.svg.axis().scale(y).orient("left");

        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("x", 20)
            .attr("y", -margin)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text(labelY);
        // x axis and label
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
            .append("text")
            .attr("x", width + 20)
            .attr("y", margin - 10)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text(labelX);

            
        svg.selectAll("circle")
            .data(data)
            .enter()
            .insert("circle")
            .attr("cx", width / 2)
            .attr("cy", height / 2)
            .attr("opacity", function (d) { return opacity(d.size); })
            .attr("r", function (d) { return scale(d.size); })
            .style("fill", function (d) { return color(d.c); })
            .on('mouseover', function (d, i) {
                console.log ("D: ", d)
                fade(d.c, .1);
            })
            .on('mouseout', function (d, i) {
                fadeOut();
            })
            .transition()
            .delay(function (d, i) { return x(d.x) - y(d.y); })
            .duration(500)
            .attr("cx", function (d) { return x(d.x); })
            .attr("cy", function (d) { return y(d.y); })
            .ease("bounce");


        function fade(c, opacity) {
            svg.selectAll("circle")
                .filter(function (d) {
                    return d.c != c;
                })
                .transition()
                .style("opacity", opacity);
        }

        function fadeOut() {
            svg.selectAll("circle")
                .transition()
                .style("opacity", function (d) { opacity(d.size); });
        }
    });
    */