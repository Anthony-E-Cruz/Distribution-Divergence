///////////// Networth ////////////
var margin = { top: 20, right: 20, bottom: 30, left: 50 },
  width = 960 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom;

// parse the date / time
var parseTime = d3.timeParse("%d-%b-%y");

// set the ranges
var x = d3.scaleTime().range([0, width]);
var y = d3.scaleLinear().range([height, 0]);

// define the 1st line
var valueline = d3.line()
  .x(function (d) { return x(d.date); })
  .y(function (d) { return y(d.top1); });

// define the 2nd line
var valueline2 = d3.line()
  .x(function (d) { return x(d.date); })
  .y(function (d) { return y(d.top10); });

// define the 3rd line
var valueline3 = d3.line()
  .x(function (d) { return x(d.date); })
  .y(function (d) { return y(d.top50); });

// define the 3rd line
var valueline4 = d3.line()
  .x(function (d) { return x(d.date); })
  .y(function (d) { return y(d.bottom); });

// append the svg obgect to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var chart2 = d3.select("body").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform",
    "translate(" + margin.left + "," + margin.top + ")");

// Get the data
d3.csv("networth.csv", function (error, data) {
  if (error) throw error;

  // format the data
  data.forEach(function (d) {
    d.date = parseTime(d.date);
    d.close = +d.close;
    d.open = +d.top1;
  });

  // Scale the range of the data
  x.domain(d3.extent(data, function (d) { return d.date; }));
  y.domain([0, d3.max(data, function (d) {
    return Math.max(d.top1, d.top10, d.top50, d.bottom);
  })]);

  // Add the valueline path.
  chart2.append("path")
    .data([data])
    .attr("class", "line")
    .style("stroke", "purple")
    .attr("d", valueline);

  // Add the valueline2 path.
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

  // Add the X Axis
  chart2.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  // Add the Y Axis
  chart2.append("g")
    .call(d3.axisLeft(y));

  chart2.append("text")
    .attr("text-anchor", "end")
    .attr("transform", "rotate(-90)")
    .attr("y", -margin.left + 80)
    .attr("x", -margin.top)
    .text("Trillions of Dollars")

  // // add legend   
  // var legend = chart2.append("g")
  //   .attr("class", "legend")
  //   .attr("x", width - 65)
  //   .attr("y", 25)
  //   .attr("height", 100)
  //   .attr("width", 100);

});
