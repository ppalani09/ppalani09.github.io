
function optionChanged(user_selection) {

  var selected_individual = user_selection;
  console.log(selected_individual);

  // read in json data
  var data = d3.json("samples.json")

  // map raw data to specific data sets
  var individual_data = data.names
  var demo_data = data.metadata
  var otu_data = data.samples

  // Get the value property of the input element
  var user_selection = d3.select("#selDataset").property("value");

  // use individual selection to match against demographic data
  var demo_output = runRetrieve_demoData(user_selection, demo_data)


  function runRetrieve_demoData(selected_individual, dataset) {

    // ------------- GET DEMOGRAPHIC DATA FROM USER SELECTION ------------- //

    // Prevent the page from refreshing
    d3.event.preventDefault();

    // Select the input element and get the raw HTML node
    

    // Filter data per inputted form data
    let filteredData_demo = dataset.filter(names => individual_data.id == selected_individual)[0];

    document.getElementById("ethnicity-text").innerHTML = filteredData_demo.ethnicity
    document.getElementById("gender-text-text").innerHTML = filteredData_demo.gender
    document.getElementById("age-text").innerHTML = filteredData_demo.age
    document.getElementById("location-text").innerHTML = filteredData_demo.location
    document.getElementById("bb-text").innerHTML = filteredData_demo.bbtype
    document.getElementById("freq-text").innerHTML = filteredData_demo.wfreq


  };



  // use individual selection to match against otu data




  // identify the top 10 otu's for the selected individual





  // create bar chart & populate with top 10 otu's




  // create a bubble chart & populate with otu labels & sample values




  // populate demographic data in the demographic info box




  };
