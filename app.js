
function optionChanged(user_selection) {

  // var selected_individual = user_selection;
  console.log(user_selection);

  // read in json data
  let data = d3.json("raw_data.json")
  let individual_data = d3.json("names.json")
  let demo_data = d3.json("metadata.json")
  let otu_data = d3.json("samples.json")

  // confirm data sets have been mapped
  console.log(data)
  console.log(individual_data)
  console.log(demo_data)
  console.log(otu_data)

  // call functions to create plots & populate data tables
  populate_demoData(user_selection, demo_data)
  // plot_top10otus(user_selection, otu_data)
  // plot_bubbleChart(user_selection, otu_data)


  };


function populate_demoData(user_selection, dataset) {

  // ------------- GET DEMOGRAPHIC DATA FROM USER SELECTION ------------- //

  // Filter data per inputted form data
  let filteredData_demo = dataset.filter(sample => sample.id == user_selection);

  document.getElementById("ethnicity-text").innerHTML = filteredData_demo.ethnicity[0]
  document.getElementById("gender-text-text").innerHTML = filteredData_demo.gender[0]
  document.getElementById("age-text").innerHTML = filteredData_demo.age[0]
  document.getElementById("location-text").innerHTML = filteredData_demo.location[0]
  document.getElementById("bb-text").innerHTML = filteredData_demo.bbtype[0]
  document.getElementById("freq-text").innerHTML = filteredData_demo.wfreq[0]

  };



function plot_top10otus(user_selection, dataset) {

  // ------------- CREATE TOP 10 OTUs PLOT FROM USER SELECTION ------------- //

  // Filter data per inputted form data
  let filteredData_otu = dataset.filter(sample => sample.id == user_selection);

  otu_ids = filteredData_otu.otu_ids
  otu_labels = filteredData_otu.otu_labels
  otu_values = filteredData_otu.samples_values
    
  Plotly.newPlot("bar", [{

    x: tou_values.slice(0, 10).reverse(),
    y: otu_ids.slice(0, 10).reverse(),
    text: otu_labels.slice(0, 10).reverse(),
    type: "bar",
    orientation: "h"}],
    {title: "Top 10 OTUs"}

    );


  };


function plot_bubbleChart(user_selection, dataset) {

  // ------------- CREATE BUBBLE CHART PLOT FROM USER SELECTION ------------- //

  // Filter data per inputted form data
  let filteredData_otu = dataset.filter(sample => sample.id == user_selection);

  otu_ids = filteredData_otu.otu_ids
  otu_labels = filteredData_otu.otu_labels
  otu_values = filteredData_otu.samples_values
    
  Plotly.newPlot("bubble", [{
    x: otu_ids,
    y: otu_values,
    mode: 'markers',
    marker: {color: otu_ids, size: otu_values},
    text: otu_labels}],
    {title: "OTUs Bubble Chart"}
  );


  };