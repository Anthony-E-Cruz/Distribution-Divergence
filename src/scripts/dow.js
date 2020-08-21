
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

});