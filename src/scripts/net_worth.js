var margin = { top: 20, right: 20, bottom: 30, left: 50 },
  width = 960 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom;

var parseTime = d3.timeParse("%d-%b-%y");

var x = d3.scaleTime().range([0, width]);
var y = d3.scaleLinear().range([height, 0]);

var valueline = d3.line()
  .x(function (d) { return x(d.date); })
  .y(function (d) { return y(d.top1); });

var valueline2 = d3.line()
  .x(function (d) { return x(d.date); })
  .y(function (d) { return y(d.top10); });

var valueline3 = d3.line()
  .x(function (d) { return x(d.date); })
  .y(function (d) { return y(d.top50); });

var valueline4 = d3.line()
  .x(function (d) { return x(d.date); })
  .y(function (d) { return y(d.bottom); });

var chart2 = d3.select("body").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform",
    "translate(" + margin.left + "," + margin.top + ")");

d3.csv("networth.csv", function (error, data) {
  if (error) throw error;

  data.forEach(function (d) {
    d.date = parseTime(d.date);
    d.close = +d.close;
    d.open = +d.top1;
  });

  x.domain(d3.extent(data, function (d) { return d.date; }));
  y.domain([0, d3.max(data, function (d) {
    return Math.max(d.top1, d.top10, d.top50, d.bottom);
  })]);

  chart2.append("path")
    .data([data])
    .attr("class", "line")
    .style("stroke", "purple")
    .attr("d", valueline);

  chart2.append("path")
    .data([data])
    .attr("class", "line")
    .style("stroke", "cyan")
    .attr("d", valueline2);

  chart2.append("path")
    .data([data])
    .attr("class", "line")
    .style("stroke", "green")
    .attr("d", valueline3);

  chart2.append("path")
    .data([data])
    .attr("class", "line")
    .style("stroke", "red")
    .attr("d", valueline4);

  chart2.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  chart2.append("g")
    .call(d3.axisLeft(y));

  chart2.append("text")
    .attr("text-anchor", "end")
    .attr("transform", "rotate(-90)")
    .attr("y", -margin.left + 80)
    .attr("x", -margin.top)
    .text("Trillions of Dollars")

  var legend = chart2.selectAll(".legend")
    .data(["Top 1%", "Top 2%-10%", "Top 50%-90%", "Bottom 50%"])
    .enter().append("g")
    .attr("class", "legend")

    .attr("transform", function (d, i) {
      return "translate(-700," + i * 25 + ")";
    })

  legend.append("rect")
    .attr("x", width - 18)
    .attr("width", 18)
    .attr("height", 10)
    .style("fill", function (d) {
      if (d === "Top 1%") return "purple"
      if (d === "Top 2%-10%") return "cyan"
      if (d === "Top 50%-90%") return "green"
      if (d === "Bottom 50%") return "red"
    });

  legend.append("text")
    .attr("x", width - 24)
    .attr("y", 9)
    .attr("dy", ".35em")
    .style("text-anchor", "end")
    .text(function (d) { return d; });
});
