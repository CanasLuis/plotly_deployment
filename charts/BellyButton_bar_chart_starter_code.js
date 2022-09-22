function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];

    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}

// 1. Create the buildCharts function.
function buildCharts(sample) {
  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
    // 3. Create a variable that holds the samples array. 
    var build = data.build;
    // 4. Create a variable that filters the samples for the object with the desired sample number.
    var buildResult = build.filter(sampleObj => sampleObj.id == sample);
    //  5. Create a variable that holds the first sample in the array.
    var first = buildResult[0];

    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    var ids = first.otu_ids;
    var labels = first.result.otu.labels.slice(0,10).reverse();
    var values = result.sample_values.slice(0,10).reverse();


    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last. 

    var yticks = ids.map(sampleObj => "OTU" + sampleObj).slice(0,10).reverse();
    
    // 8. Create the trace for the bar chart. 
    var barData = [{
      x: values, 
      y: yticks,
      type:"bar",
      text:labels
    }
      
    ];
    // 9. Create the layout for the bar chart. 
    var barLayout = {
      title: "First ten Bacterias found in Belly"
     
    };
    // 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot("bar", barData,barLayouy)
  });
}

// Bar and Bubble charts
// Create the buildCharts function.
  

    // 1. Create the trace for the bubble chart.
    var bubbleData = [{
      x:ids,
      y: values,
      text: labels,
      mode: 'markers',
        marker:{
          color:['rgb(93, 164, 214)'],
          size: values,
        }
     
      
    }];

    // 2. Create the layout for the bubble chart.
    var bubbleLayout = {
      title: "Bateria cultures per sample",
      xaxis:{title: "OTU ID"},
      automargin: true,
      hovermode:"closest"
      
    };

    // 3. Use Plotly to plot the data with the layout.
    Plotly.newPlot("bubble", bubbleData, bubbleLayout); 


//Gauge starter code
// 1. Create a variable that filters the metadata array for the object with the desired sample number.

    var metadata = data.metadata;
    var desiredSample = metadata.filter(metaObj => metaObj.id == sample);

    // Create a variable that holds the first sample in the array.
    


    // 2. Create a variable that holds the first sample in the metadata array.
    var desiredFirst = desiredSample[0];

    // Create variables that hold the otu_ids, otu_labels, and sample_values.


    // 3. Create a variable that holds the washing frequency.
   var washingFreq = desiredFirst
   console.log(washingFreq)

   
    
    // 4. Create the trace for the gauge chart.
    var gaugeData = [{
      //domain:
      value: desiredFirst,
      title: "Belly Button Washing Frequency"
      type: "indicator",
      mode: "gauge+number",
      gauge: {
        axis: {range: [null,10], tickwidth:"2"}
        bar: { color: "darkblue" },
        bgcolor: "white",
        borderwidth: 2,
        bordercolor: "gray",
        steps: [
        { range: [0, 2], color: "r" },
        { range: [2, 4], color: "tab:orange" },
        { range: [4, 6], color: "yellow" },
        { range: [6, 8], color: "lime" },
        { range: [8, 10], color: "limegreen" }


      ],
      }
    }
     
    ];
    
    // 5. Create the layout for the gauge chart.
    var gaugeLayout = { 
      automargin:true
     
    };

    // 6. Use Plotly to plot the gauge data and layout.
    Plotly.newPlot("gauge", gaugeData,gaugeLayout);
