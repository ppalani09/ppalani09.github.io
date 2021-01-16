
function optionChanged(user_selection) {

  var selected_individual = user_selection;
  console.log(selected_individual);

  // read in json data
  var data = d3.json("samples.json")

  // map raw data to specific data sets
  let individual_data = data.names
  let demo_data = data.metadata
  let otu_data = data.samples

  // Get the value property of the input element
  var user_selection = d3.select("#selDataset").property("value");

  // use individual selection to match against demographic data
  var demo_output = runRetrieve_demoData(user_selection, demo_data)


  function runRetrieve_demoData(selected_individual, dataset) {

    console.log(demo_data);

    // ------------- GET DEMOGRAPHIC DATA FROM USER SELECTION ------------- //

    // Filter data per inputted form data
    let filteredData_demo = demo_data.filter(sample => sample.id == selected_individual);

    document.getElementById("ethnicity-text").innerHTML = filteredData_demo.ethnicity[0]
    document.getElementById("gender-text-text").innerHTML = filteredData_demo.gender[0]
    document.getElementById("age-text").innerHTML = filteredData_demo.age[0]
    document.getElementById("location-text").innerHTML = filteredData_demo.location[0]
    document.getElementById("bb-text").innerHTML = filteredData_demo.bbtype[0]
    document.getElementById("freq-text").innerHTML = filteredData_demo.wfreq[0]

  };



  // use individual selection to match against otu data




  // identify the top 10 otu's for the selected individual





  // create bar chart & populate with top 10 otu's




  // create a bubble chart & populate with otu labels & sample values




  // populate demographic data in the demographic info box




  };
