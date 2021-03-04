
var svgWidth = 1200;
var svgHeight = 700;

var margin = {
  top: 20,
  right: 40,
  bottom: 80,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Append an SVG group
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Initial Params
var chosenXAxis = "poverty";
var chosenYAxis = "heathcare";

// function used for updating x-scale var upon click on axis label
function xScale(allData, chosenXAxis) {
  // create scales

  chosenXAxis = "poverty"

  var xLinearScale = d3.scaleLinear()
    .domain([d3.min(allData, d => d[chosenXAxis]) * 0.8,
      d3.max(allData, d => d[chosenXAxis]) * 1.2
    ])
    .range([0, width]);

  return xLinearScale;
};

// function used for updating y-scale var upon click on axis label
function yScale(allData, chosenYAxis) {
  // create scales

  chosenYAxis = "healthcare"

  var yLinearScale = d3.scaleLinear()
    .domain([d3.min(allData, d => d[chosenYAxis]) * 0.8,
      d3.max(allData, d => d[chosenYAxis]) * 1.2
    ])
    .range([height, 0]);

  return yLinearScale;
};

// function used for updating circles group with a transition to
// new circles
function renderCircles(circlesGroup, newXScale, chosenXAxis) {

  circlesGroup.transition()
    .duration(1000)
    .attr("cx", d => newXScale(d[chosenXAxis]));

  return circlesGroup;
}


// function used for updating circles group with new tooltip
// function updateToolTip(chosenXAxis, circlesGroup) {

//   var label;

//   label = "Poverty Level"

//   if (chosenXAxis === "hair_length") {
//     label = "Hair Length:";
//   }
//   else {
//     label = "# of Albums:";
//   }

  // var toolTip = d3.tip()
  //   .attr("class", "tooltip")
  //   .offset([80, -60])
  //   .html(function(d) {
  //     return (`${d.rockband}<br>${label} ${d[chosenXAxis]}`);
  //   });

//   circlesGroup.call(toolTip);

//   circlesGroup.on("mouseover", function(data) {
//     toolTip.show(data);
//   })
//     // onmouseout event
//     .on("mouseout", function(data, index) {
//       toolTip.hide(data);
//     });

//   return circlesGroup;
// }

// Retrieve data from the CSV file and execute everything below
d3.csv("assets/data/data.csv").then(function(allData, err) {
  
  if (err) throw err;
  //console.log(allData);
  // parse data
  allData.forEach(function(d) {
    // d.id = x.id
    // console.log(d)
    d.poverty = +d.poverty;
    d.healthcare = +d.healthcare;
    // d.abbr = d.abbr;
    // d.state= d.state;
    //console.log(d.state, d.abbr);
    // d = +x;
    // console.log(d)

  });

  chosenXAxis = "poverty"
  chosenYAxis = "healthcare"

  // xLinearScale function above csv import
  var xLinearScale = xScale(allData, chosenXAxis);

  // xLinearScale function above csv import
  var yLinearScale = yScale(allData, chosenYAxis);

  // Create initial axis functions
  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);

  // append x axis
  var xAxis = chartGroup.append("g")
    .classed("x-axis", true)
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

  // append y axis
  chartGroup.append("g")
    .call(leftAxis);

  // append initial circles
  var circlesGroup = chartGroup.selectAll("circle")
    .data(allData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d[chosenXAxis]))
    .attr("cy", d => yLinearScale(d[chosenYAxis]))
    .attr("r", 20)
    .attr("fill", "red")
    .attr("opacity", "0.6")

  var circleLabelsGroup = chartGroup.selectAll(null)
    .data(allData)
    .enter()
    .append("text");

  circleLabelsGroup
    .attr("x", function(d) {
      return xLinearScale(d[chosenXAxis]);
    })
    .attr("y", function(d) {
      return yLinearScale(d[chosenYAxis]) + 5;
    })
    .text(function(d) {
      //  console.log(d.abbr)
      return d.abbr;
    })
    .attr("font-family", "arial")
    .attr("font-size", "15px")
    .attr("text-anchor", "middle")
    .attr("fill", "white");


  // Create group for two x-axis labels
  var labelsGroup = chartGroup.append("g")
    .attr("transform", `translate(${width / 2}, ${height + 20})`);

  var povertyLabel = labelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 20)
    .attr("value", "poverty") // value to grab for event listener
    .classed("active", true)
    .text("In Poverty (%)");

  // append y axis
  chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .classed("active", true)
    .text("Lacks Healthcare (%)");

  // updateToolTip function above csv import
  // var circlesGroup = updateToolTip(chosenXAxis, circlesGroup);

  // x axis labels event listener
  // labelsGroup.selectAll("text")
  //   .on("click", function() {
  //     // get value of selection
  //     var value = d3.select(this).attr("value");
  //     if (value !== chosenXAxis) {

  //       // replaces chosenXAxis with value
  //       chosenXAxis = value;

  //       // console.log(chosenXAxis)

  //       // functions here found above csv import
  //       // updates x scale for new data
  //       xLinearScale = xScale(allData, chosenXAxis);

  //       // updates x axis with transition
  //       xAxis = renderAxes(xLinearScale, xAxis);

  //       // updates circles with new x values
  //       circlesGroup = renderCircles(circlesGroup, xLinearScale, chosenXAxis);

  //       // updates tooltips with new info
  //       circlesGroup = updateToolTip(chosenXAxis, circlesGroup);

  //       // changes classes to change bold text
  //       if (chosenXAxis === "num_albums") {
  //         albumsLabel
  //           .classed("active", true)
  //           .classed("inactive", false);
  //         hairLengthLabel
  //           .classed("active", false)
  //           .classed("inactive", true);
  //       }
  //       else {
  //         albumsLabel
  //           .classed("active", false)
  //           .classed("inactive", true);
  //         hairLengthLabel
  //           .classed("active", true)
  //           .classed("inactive", false);
  //       }
  //     }
  //   });
});