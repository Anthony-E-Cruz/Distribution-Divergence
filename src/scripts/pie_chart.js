var pieWidth = 450
pieHeight = 450
pieMargin = 40

// The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
var radius = Math.min(pieWidth, pieHeight) / 2 - pieMargin

// append the svg object to the div called 'my_dataviz'
var pieChart = d3.select("#my_dataviz")
  .append("svg")
  .attr("width", pieWidth)
  .attr("height", pieHeight)
  .append("g")
  .attr("transform", "translate(" + pieWidth / 2 + "," + pieHeight / 2 + ")");

var nwData = { "Top 1%": 32.55, "Top 2%-10%": 39.16, "Top 50%-90%": 31.09, "Bottom 50%": 1.5 }

var color = d3.scaleOrdinal()
  .domain(nwData)
  .range(d3.schemeSet2);

  console.log(color)

var pie = d3.pie()
  .value(function (d) { return d.value; })
var parsedData = pie(d3.entries(nwData))

var pieArc = d3.arc()
  .innerRadius(0)
  .outerRadius(radius)

pieChart.append('g')
  .selectAll('mySlices')
  .data(parsedData)
  .enter()
  .append('path')
  .attr('d', pieArc)
  .attr("class", "slice") 
  .attr('fill', function (d) { 
    if (d.data.key === "Top 1%") return "purple"
    if (d.data.key === "Top 2%-10%") return "cyan"
    if (d.data.key === "Top 50%-90%") return "green"
    if (d.data.key === "Bottom 50%") return "red"})
  .attr("stroke", "black")
  .style("stroke-width", "2px")
  .style("opacity", .7)

pieChart.append('g')
  .selectAll('mySlices')
  .data(parsedData)
  .enter()
  .append('text')
  .text(function (d) { return d.data.key })
  .attr("transform", function (d) { return "translate(" + pieArc.centroid(d) + ")"; })
  .style("text-anchor", "middle")
  .style("font-size", 17)

pieChart.on("mouseover", function () {
  d3.select(this)
    .select(".slice")
    .style("opacity", ".5");
}).on("mouseout", function () {
  d3.select(this)
    .select(".slice")
    .style("opacity", "1");
});
