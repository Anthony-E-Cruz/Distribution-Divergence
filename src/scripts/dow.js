
var margin = { top: 20, right: 20, bottom: 30, left: 50 },
  width = 960 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom;

var parseTime = d3.timeParse("%d-%b-%y");

var x = d3.scaleTime().range([0, width]);
var y = d3.scaleLinear().range([height, 0]);

var valueline0 = d3.line()
  .x(function (d) { return x(d.date); })
  .y(function (d) { return y(d.close); });

var chart1 = d3.select("body").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform",
    "translate(" + margin.left + "," + margin.top + ")");

d3.csv("DJI.csv", function (error, data) {
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
    .attr("class", "line")
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
});