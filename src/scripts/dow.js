
var dowMargin = { top: 20, right: 20, bottom: 30, left: 50 },
  dowWidth = 960 - dowMargin.left - dowMargin.right,
  dowHeight = 500 - dowMargin.top - dowMargin.bottom;

var parseTime = d3.timeParse("%d-%b-%y");

var x = d3.scaleTime().range([0, dowWidth]);
var y = d3.scaleLinear().range([dowHeight, 0]);

var valueline0 = d3.line()
  .x(function (d) { return x(d.date); })
  .y(function (d) { return y(d.close); });

var chart1 = d3.select("body").append("svg")
  .attr("width", dowWidth + dowMargin.left + dowMargin.right)
  .attr("height", dowHeight + dowMargin.top + dowMargin.bottom)
  .append("g")
  .attr("transform",
    "translate(" + dowMargin.left + "," + dowMargin.top + ")");
  
var tooltip = d3.select('body').append('div')
  .style('position', 'absolute')
  .style('background', 'gray')
  .style('opacity', '0')

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

  chart1.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  chart1.append("g")
    .call(d3.axisLeft(y));

  chart1.append("text")
    .attr("text-anchor", "end")
    .attr("transform", "rotate(-90)")
    .attr("y", -margin.left + 80)
    .attr("x", -margin.top)
    .text("Dollars")

  var legend = chart1.selectAll(".legend")
    .data(["DJIA Price"])
    .enter().append("g")
    .attr("class", "legend")
    .attr("transform", function (d, i) { return "translate(-100," + i * 20 + ")"; });

  legend.append("rect")
    .attr("x", width - 18)
    .attr("width", 18)
    .attr("height", 7)
    .style("fill", "#2c6b9b");

  legend.append("text")
    .attr("x", width - 24)
    .attr("y", 9)
    .attr("dy", ".35em")
    .style("text-anchor", "end")
    .text(function (d) { return d; });

  d3.select("line1")
    .transition()
      .style("stroke", "red")

  

  /////// MOUSEOVER ////////////

  var mouseG = chart1.append("g")
    .attr("class", "mouse-over-effects");

  mouseG.append("path") // this is the black vertical line to follow mouse
    .attr("class", "mouse-line")
    .style("stroke", "black")
    .style("stroke-width", "1px")
    .style("opacity", "0");

  var lines = document.getElementsByClassName('line1');
  console.log(lines)
  var mousePerLine = mouseG.selectAll('.mouse-per-line')
    .data(data)
    .enter()
    .append("g")
    .attr("class", "mouse-per-line");

  mousePerLine.append("circle")
    .attr("r", 7)
    .style("stroke", function (d) {
      // return "red"
      // console.log(color(d.name))
      return color(d.name);
    })
    .style("fill", "none")
    .style("stroke-width", "1px")
    .style("opacity", "0");

  mousePerLine.append("text")
    .attr("transform", "translate(10,3)");

  mouseG.append('svg:rect') // append a rect to catch mouse movements on canvas
    .attr('width', width) // can't catch mouse events on a g element
    .attr('height', height)
    .attr('fill', 'none')
    .attr('pointer-events', 'all')
    .on('mouseout', function () { // on mouse out hide line, circles and text
      d3.select(".mouse-line")
        .style("opacity", "0");
      d3.selectAll(".mouse-per-line circle")
        .style("opacity", "0");
      d3.selectAll(".mouse-per-line text")
        .style("opacity", "0");
    })
    .on('mouseover', function () { // on mouse in show line, circles and text
      d3.select(".mouse-line")
        .style("opacity", "1");
      d3.selectAll(".mouse-per-line circle")
        .style("opacity", "1");
      d3.selectAll(".mouse-per-line text")
        .style("opacity", "1");
    })
    .on('mousemove', function () { // mouse moving over canvas
      var mouse = d3.mouse(this);
      d3.select(".mouse-line")
        .attr("d", function () {
          var d = "M" + mouse[0] + "," + height;
          d += " " + mouse[0] + "," + 0;
          return d;
        });

      d3.selectAll(".mouse-per-line")
        .attr("transform", function (d, i) {
          // console.log(width / mouse[0])
          // console.log(x.invert(mouse[0]))
          // console.log(d)
          var xDate = x.invert(mouse[0]),
            bisect = d3.bisector(function (d) { 
              return d.date; }).right;
              // console.log(xDate)
          idx = bisect(d.date, xDate);
          
          // console.log(lines[i])

          var beginning = 0,
            end = lines[i].getTotalLength(),
            target = null;

          while (true) {
            target = Math.floor((beginning + end) / 2);
            // console.log(lines[i])
            pos = lines[i].getPointAtLength(target);
            if ((target === end || target === beginning) && pos.x !== mouse[0]) {
              break;
            }
            if (pos.x > mouse[0]) end = target;
            else if (pos.x < mouse[0]) beginning = target;
            else break; //position found
          }
          // console.log(y.invert(pos.y))
          d3.select(this).select('text')
            .text(y.invert(pos.y).toFixed(2));

          return "translate(" + mouse[0] + "," + pos.y + ")";
        });
    });


  //////// SIMPLE TOOLTIP ////////
  // chart1.append("circle")
  //   .attr("id", "circleBasicTooltip")
  //   .attr("cx", 150)
  //   .attr("cy", 200)
  //   .attr("r", 40)
  //   .attr("fill", "#69b3a2")

  // create a tooltip
  // var tooltip = d3.select("#my_dataviz")
  //   .append("div")
  //   .style("position", "absolute")
  //   .style("visibility", "hidden")
  //   .text("I'm a circle!");

  // //
  // d3.select("#circleBasicTooltip")
  //   .on("mouseover", function () { return tooltip.style("visibility", "visible"); })
  //   .on("mousemove", function () { return tooltip.style("top", (event.pageY - 800) + "px").style("left", (event.pageX - 800) + "px"); })
  //   .on("mouseout", function () { return tooltip.style("visibility", "hidden"); });
});