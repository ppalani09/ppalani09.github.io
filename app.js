
function optionChanged(user_selection) {

  // var selected_individual = user_selection;
  console.log(user_selection);

  // read in json data
  let data = JSON.parse(d3.json("samples.json"))

  // parse json data to subsets
  let individual_data = data.names
  let demo_data = data.metadata
  let otu_data = data.samples

  // confirm data sets have been mapped
  console.log(data)
  console.log(individual_data)
  console.log(demo_data)
  console.log(otu_data)

  // call functions to create plots & populate data tables
  populate_demoData(user_selection, demo_data)

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



function plot_top10otus(selected_individual, dataset) {

  // ------------- CREATE TOP 10 OTUs PLOT FROM USER SELECTION ------------- //

  // Filter data per inputted form data
  let filteredData_otu = dataset.filter(sample => sample.id == selected_individual)[0];

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