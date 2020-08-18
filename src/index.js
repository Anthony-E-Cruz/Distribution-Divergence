// // javascript
// var dataset = [80, 100, 56, 120, 180, 30, 40, 120, 160];

// var svgWidth = 500, svgHeight = 300, barPadding = 5;

// var barWidth = svgWidth / dataset.length;

// var svg = d3.select('svg')
//   .attr("width", svgWidth)
//   .attr("height", svgHeight);

// var xScale = d3.scaleLinear()
//     .domain([0, d3.max(dataset)])
//     .range([0, svgWidth]);
         
// var yScale = d3.scaleLinear()
//     .domain([0, d3.max(dataset)])
//     .range([svgHeight, 0]);

// var barChart = svg.selectAll("rect")
//   .data(dataset)
//   .enter()
//   .append("rect")
//   .attr("y", function (d) {
//     return svgHeight - d
//   })
//   .attr("height", function (d) {
//     return d;
//   })
//   .attr("width", barWidth - barPadding)
//   .attr("class", "bar")
//   .attr("transform", function (d, i) {
//     var translate = [barWidth * i, 0];
//     return "translate(" + translate + ")";
//   });

// var text = svg.selectAll("text")
//   .data(dataset)
//   .enter()
//   .append("text")
//   .text(function (d) {
//     return d;
//   })
//   .attr("y", function (d, i) {
//     return svgHeight - d - 4;
//   })
//   .attr("x", function (d, i) {
//     return barWidth * i;
//   })
//   .attr("fill", "#A64C38");

// javascript

// var data = [80, 100, 56, 120, 180, 30, 40, 120, 160];

// var svgWidth = 500, svgHeight = 300;

// var svg = d3.select('svg')
//   .attr("width", svgWidth)
//   .attr("height", svgHeight);

// var xScale = d3.scaleLinear()
//   .domain([0, d3.max(data)])
//   .range([0, svgWidth]);

// var yScale = d3.scaleLinear()
//   .domain([0, d3.max(data)])
//   .range([svgHeight, 0]);

// var x_axis = d3.axisBottom()
//   .scale(xScale);

// var y_axis = d3.axisLeft()
//   .scale(yScale);

// svg.append("g")
//   .attr("transform", "translate(50, 10)")
//   .call(y_axis);

// var xAxisTranslate = svgHeight - 20;

// svg.append("g")
//   .attr("transform", "translate(50, " + xAxisTranslate + ")")
//   .call(x_axis);

//API to fetch historical data of Bitcoin Price Index
const api = 'https://api.coindesk.com/v1/bpi/historical/close.json?start=2019-12-31&end=2020-04-01';
// const api = 'https://cloud.iexapis.com/stable/stock/aapl/quote?token=pk_dd5193f164124778a205ed44e317f6d9&format=csv';

/**
 * Loading data from API when DOM Content has been loaded'.
 */
document.addEventListener("DOMContentLoaded", function (event) {
  fetch(api)
    .then(function (response) { return response.json(); })
    .then(function (data) {
      var parsedData = parseData(data);
      drawChart(parsedData);
    })
    .catch(function (err) { console.log(err); })
});

/**
 * Parse data into key-value pairs
 * @param {object} data Object containing historical data of BPI
 */
function parseData(data) {
  var arr = [];
  for (var i in data.bpi) {
    arr.push({
      date: new Date(i), //date
      value: +data.bpi[i] //convert string to number
    });
  }
  return arr;
}

/**
 * Creates a chart using D3
 * @param {object} data Object containing historical data of BPI
 */
function drawChart(data) {
  var svgWidth = 600, svgHeight = 400;
  var margin = { top: 20, right: 20, bottom: 30, left: 50 };
  var width = svgWidth - margin.left - margin.right;
  var height = svgHeight - margin.top - margin.bottom;

  var svg = d3.select('svg')
    .attr("width", svgWidth)
    .attr("height", svgHeight);

  var g = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var x = d3.scaleTime()
    .rangeRound([0, width]);

  var y = d3.scaleLinear()
    .rangeRound([height, 0]);

  var line = d3.line()
    .x(function (d) { return x(d.date) })
    .y(function (d) { return y(d.value) })
  x.domain(d3.extent(data, function (d) { return d.date }));
  y.domain(d3.extent(data, function (d) { return d.value }));

  g.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .select(".domain")
    .remove();

  g.append("g")
    .call(d3.axisLeft(y))
    .append("text")
    .attr("fill", "#000")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", "0.71em")
    .attr("text-anchor", "end")
    .text("Price ($)");

  g.append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-linejoin", "round")
    .attr("stroke-linecap", "round")
    .attr("stroke-width", 1.5)
    .attr("d", line);
}

