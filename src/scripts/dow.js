var dowMargin = { top: 20, right: 20, bottom: 30, left: 50 },
  dowWidth = 960 - dowMargin.left - dowMargin.right,
  dowHeight = 500 - dowMargin.top - dowMargin.bottom;

var parseTime = d3.timeParse("%d-%b-%y");

var x = d3.scaleTime().range([0, dowWidth]);
var y = d3.scaleLinear().range([dowHeight, 0]);

var valueline0 = d3.line()
  .x(function (d) { return x(d.date); })
  .y(function (d) { return y(d.close); });

var chart1 = d3.select(".dow-chart-container").append("svg")
  .attr("width", dowWidth + dowMargin.left + dowMargin.right)
  .attr("height", dowHeight + dowMargin.top + dowMargin.bottom)
  .append("g")
  .attr("transform",
    "translate(" + dowMargin.left + "," + dowMargin.top + ")");

var data = d3.csv("DJI.csv", function (error, data) {
  if (error) throw error;

  data.forEach(function (d) {
    d.date = parseTime(d.date);
    d.close = +d.close;
    d.open = +d.open;
  });

  x.domain(d3.extent(data, function (d) { return d.date; }));
  y.domain([0, d3.max(data, function (d) {
    return Math.max(d.close);
  })]);

  chart1.append("path")
    .data([data])
    .attr("class", "line1")    
    .attr("d", valueline0);

  // d3.select('.line1')
  //   .transition()
  //   .duration(200)
    // .attr('stroke-width', '3px')

  chart1.append("g")
    .attr("transform", "translate(0," + dowHeight + ")")
    .call(d3.axisBottom(x));

  chart1.append("g")
    .call(d3.axisLeft(y));

  chart1.append("text")
    .attr("text-anchor", "end")
    .attr("transform", "rotate(-90)")
    .attr("y", -dowMargin.left + 80)
    .attr("x", -dowMargin.top)
    .text("Dollars")

  var legend = chart1.selectAll(".legend")
    .data(["DJIA Price"])
    .enter().append("g")
    .attr("class", "legend")
    .attr("transform", function (d, i) { return "translate(-100," + i * 20 + ")"; });

  legend.append("rect")
    .attr("x", dowWidth - 18)
    .attr("width", 18)
    .attr("height", 7)
    .style("fill", "#2c6b9b");

  legend.append("text")
    .attr("x", dowWidth - 24)
    .attr("y", 9)
    .attr("dy", ".35em")
    .style("text-anchor", "end")
    .text(function (d) { return d; });

  d3.select("line1")
    .transition()
      .style("stroke", "red")

  ////// MOUSEOVER //////
  
  var mouseG = chart1.append("g")
    // .attr("class", "mouse-over-effects");

  mouseG.append("path")
    .attr("class", "selector")
    .style("stroke", "gray")
    .style("stroke-width", "2px")

  var lines = document.getElementsByClassName('line1');
  console.log(lines)
  var mousePerLine = mouseG.selectAll('.mouse-lines')
    .data(data)
    .enter()
    .append("g")
    .attr("class", "mouse-lines");

  mousePerLine.append("circle")
    .attr("r", 6)
    .style("stroke", "red")
    .style("fill", "none")
    .style("stroke-width", "1px")
    .style("opacity", "0");

  mousePerLine.append("text")
    .attr("transform", "translate(10,3)");

  mouseG.append('svg:rect') 
    .attr('width', dowWidth) 
    .attr('height', dowHeight)
    .attr('fill', 'none')
    .attr('pointer-events', 'all')
    .on('mouseout', function () { 
      d3.select(".selector")
        .style("opacity", "0");
      d3.selectAll(".mouse-lines circle")
        .style("opacity", "0");
      d3.selectAll(".mouse-lines text")
        .style("opacity", "0");
    })
    .on('mouseover', function () { 
      d3.select(".selector")
        .style("opacity", "1");
      d3.selectAll(".mouse-lines circle")
        .style("opacity", "1");
      d3.selectAll(".mouse-lines text")
        .style("opacity", "1");
    })
    .on('mousemove', function () { 
      var mouse = d3.mouse(this);
      d3.select(".selector")
        .attr("d", function () {
          var d = "M" + mouse[0] + "," + dowHeight;
          d += " " + mouse[0] + "," + 0;
          return d;
        });
        
      d3.selectAll(".mouse-lines")
        .attr("transform", function (d, i) {
          var xDate = x.invert(mouse[0]),
            bisect = d3.bisector(function (d) { 
              return d.date; }).right;
          idx = bisect(d.date, xDate);
          
          var beginning = 0,
          end = lines[i].getTotalLength(),
          target = null;
          
          while (true) {
            target = Math.floor((beginning + end) / 2);
            pos = lines[i].getPointAtLength(target);
            if ((target === end || target === beginning) && pos.x !== mouse[0]) {
              break;
            }
            if (pos.x > mouse[0]) end = target;
            else if (pos.x < mouse[0]) beginning = target;
            else break; 
          }
          d3.select(this).select('text')
            .text(y.invert(pos.y).toFixed(2));

          return "translate(" + mouse[0] + "," + pos.y + ")";
        });
    });

    ///// Transition //////

  var t = d3.transition()
    .duration(7500)
    .ease(d3.easeLinear);

  // d3.selectAll(".line1")
  //   .transition(t)
  //     .style("stroke", "red")
  //   .transition(t)
  //     .style("stroke", "blue")
  //   .transition(t)
  //     .style("stroke", "yellow")
  //   .transition(t)
  //     .style("stroke", "steelblue")

  // d3.selectAll(".line1")
  //   .transition()
  //   .style("stroke", "green")
  //   .on("start", function repeat() {
  //     d3.active(this)
  //       .style("stroke", "red")
  //       .transition()
  //       .style("stroke", "green")
  //       .transition()
  //       .style("stroke", "blue")
  //       .transition()
  //       .on("start", repeat);
  //   });

});