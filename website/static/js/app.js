// data route
var sampleMetaDataRoute = "/metadata/";
var dataRoute = "/samples/";

function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
  
    // construct url
    var MetaURL = (sampleMetaDataRoute+sample);

    // Use d3 to select the panel with id of `#sample-metadata`
    var panelSelect = d3.select("#sample-metadata");
    
    // Use `.html("") to clear any existing metadata
    panelSelect.html("");

    d3.json(MetaURL).then(function(response){
      // console.log(response);

      /*loop through response object to pull AGE, BBTYPE, ETHNICITY
         GENDER, LOCATION 
      */

        Object.entries(response).forEach(function([key,value]){
          var entry = panelSelect.append("div");
          entry.text(key+": "+value);   
        
      });
    });

    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);
}



// function buildCharts(sample) {

//   // @TODO: Use `d3.json` to fetch the sample data for the plots
  
//   // construct url
//    var url = (dataRoute+sample);

//     // // @TODO: Build a Bubble Chart using the sample data
//     //   // Use d3 to select the panel with id of `#bubble`
//     //   var bubbleSelect = d3.select("#bubble");

//     //   // Use `.html("") to clear any existing metadata
//     //   bubbleSelect.html("");

//     //   d3.json(url).then(function(response){
//     //     var otu_ids = response.otu_ids;
//     //     var otu_labels = response.otu_labels;
//     //     var samples = response.sample_values.map(function(item){
//     //       return parseFloat(item,2);
//     //     });

//     //     // console.log(otu_ids);
//     //     // console.log(otu_labels);
//     //     // console.log(samples);

//     //     var traceBubble = {
//     //       x: otu_ids,
//     //       y: samples,
//     //       mode: 'markers',
//     //       hovertext: otu_labels,
//     //       marker: {
//     //         size: samples,
//     //         color: otu_ids
            
//     //       }
//     //     };

//     //     var bubbleData = [traceBubble];

//     //     var bubbleLayout = {
//     //       title: "Belly Button Distribution",
//     //       showlegend: false
//     //     };

//     //     Plotly.newPlot("bubble",bubbleData, bubbleLayout);
//     //     buildPlot();
//       // });
      
//     // @TODO: Build a Pie Chart

//       // Use d3 to select the panel with id of `#pie`
//       // var pieSelect = d3.select("#pie");

//       // // Use `.html("") to clear any existing metadata
//       // pieSelect.html("");

//       //   d3.json(url).then(function(response){

//       //     var otu_ids_10 = response.otu_ids.slice(0,10);
//       //     var otu_labels_10 = response.otu_labels.slice(0,10);
//       //     var samples_10 = response.sample_values.slice(0,10).map(function(item){
//       //       return parseFloat(item,2);
//       //     });

//       //     // console.log(otu_ids_10);
//       //     // console.log(otu_labels_10);
//       //     // console.log(samples_10);

//       //     var tracePie = {
//       //       labels: otu_ids_10,
//       //       values: samples_10,
//       //       hovertext: otu_labels_10,
//       //       type: 'pie'
//       //     };

//       //     var pieData = [tracePie];

//       //     var pieLayout = {
//       //       title: "Top 10 Belly Button Samples"
//       //     };

//       //     Plotly.newPlot("pie",pieData, pieLayout);
//       //     buildPlot();

// //       });

  
// // }



// // function init() {
// //   // Grab a reference to the dropdown select element
// //   var selector = d3.select("#selDataset");

// //   // Use the list of sample names to populate the select options
// //   d3.json("/names").then((sampleNames) => {
// //     sampleNames.forEach((sample) => {
// //       selector
// //         .append("option")
// //         .text(sample)
// //         .property("value", sample);
// //     });

// //     // Use the first sample from the list to build the initial plots
// //     const firstSample = sampleNames[0];
// //     buildCharts(firstSample);
// //     buildMetadata(firstSample);
// //   });
// // }

// // function optionChanged(newSample) {
// //   // Fetch new data each time a new sample is selected
// //   buildCharts(newSample);
// //   buildMetadata(newSample);
// // }

// // Initialize the dashboard
// init();
// }


//plot diabetes map
var jsonurl = 'http://127.0.0.1:5000/diabetes-rate';

Plotly.d3.json(jsonurl, function(data) {

  function json_obj_to_array(jsonobj) {
      var json_array = Object.keys(jsonobj).map(function(key) {
        return jsonobj[key];
      });

      return json_array;
  };

  var map_abbr = json_obj_to_array(data.State_2);
  var map_data = json_obj_to_array(data["Diabetes Rate 2018"]);
  var map_label = json_obj_to_array(data.State);
  
  var mapdata = [{
              type: 'choropleth',
              locationmode: 'USA-states',
              locations: map_abbr,
              z: map_data,
              text: map_label,
              zmin: 7,
              zmax: 17,
              colorscale: [
                [0, '#ccffff'], [0.2, '#66ccff'],
                [0.4, '#3399ff'], [0.6, '#800080'],
                [0.8, '#CD5C5C'], [1, '#DC143C']
              ],
            colorbar: {
              title: 'Percentage',
              thickness: 20.0
            },
            marker: {
              line:{
                color: 'rgb(255,255,255)',
                width: 2
              }
            }
          }];

  var layout = {
          title: '2018 US Diabetes Rate by State',
          font: {
            family: 'Open Sans, Monospace',
            size: 16,
            color: '#7f7f7f'
          },
          geo:{
            scope: 'usa',
            showlakes: true,
            lakecolor: 'rgb(255,255,255)'
          }
      };
      Plotly.plot(myDiv, mapdata, layout, {showLink: false});
  });

// Plot CandyMap
var jsonurl = 'http://127.0.0.1:5000/candy-consumption';

Plotly.d3.json(jsonurl, function(data) {

  function json_obj_to_array(jsonobj) {
      var json_array = Object.keys(jsonobj).map(function(key) {
        return jsonobj[key];
      });

      return json_array;
  };

  var map_abbr = json_obj_to_array(data.State_2);
  var map_data = json_obj_to_array(data["Per_Capita_Consumption_Pounds_Per_Person"]);
  var map_label = json_obj_to_array(data.State);
  
  var mapdata = [{
    type: 'choropleth',
    locationmode: 'USA-states',
    locations: map_abbr,
    z: map_data,
    geojson: "https://raw.githubusercontent.com/python-visualization/folium/master/examples/data/us-states.json",
    text: map_label,
    zmin: 0,
    zmax: 50,
    colorscale: [
      [0, '#4FC1E9'], [0.1, '#48CFAD'],
      [0.3, '#A0D468'], [0.4, '#FFCE54'],
      [0.5, '#FC6E51'], [1, '#ED5565']
    ],
  colorbar: {
    title: 'Consumption per Capita',
    thickness: 20.0
  },
  marker: {
    line:{
      color: 'rgb(255,255,255)',
      width: 2
    }
  }
}];

  var layout = {
          title: '2018 Candy Consumption by State',
          font: {
            family: 'Open Sans, Monospace',
            size: 16,
            color: '#7f7f7f'
          },
          geo:{
            scope: 'usa',
            showlakes: true,
            lakecolor: 'rgb(255,255,255)'
          }
      };
      Plotly.newPlot(CandyMap, mapdata, layout, {showLink: false});
  });

// candyPlot.on('plotly_click', function(candyData){

//
// Horizontal bar and Scatter chart
let myChart = document.getElementById('myChart').getContext('2d');

Chart.defaults.global.defaultFontFamily='Lato';
Chart.defaults.global.defaultFontFamily=18;
Chart.defaults.global.defaultFontColor='#777';
Chart.defaults.global.animation = {
  duration:2000,
  easing:'easeInOutExpo'
}

//Data pull horizontal
var combinedurl = 'http://127.0.0.1:5000/consumption_data';

Plotly.d3.json(combinedurl, function(data) {
  function json_obj_to_array(jsonobj) {
    var json_array = Object.keys(jsonobj).map(function(key) {
      return jsonobj[key];
    });

    return json_array;
  };
 
  var candy_c = json_obj_to_array(data.candy);
  var pounds_c = json_obj_to_array(data.pounds);
 
  //console.log(pounds_c);

  let consumeChart = new Chart(myChart, {
    type:'horizontalBar', //bar, horizontalBar, pie, line, donut, radar, polarArea
    data:{
        labels: candy_c,
        datasets:[{
            label:'Pounds',
            data: pounds_c,
            backgroundColor:['orange','red','green','blue','pink'],
            borderWidth:1,
            borderColor:'#777',
            hoverBorderWidth:'#000',
            hoverBorderColor:'#000'
        }]
    },
    options:{
        title:{
            display:true,
            text:"Halloween Candy Consumption USA",
            fontSize:20
        },
        legend:{
            display:false,
            position:'right',
            labels:{
                fontColor:'#000'
            }
        },
        layout:{
            padding:{
                left:50,
                right:0,
                bottom:0,
                top:0
            }
        },
        tooltips:{
            enabled:true
        }
    }
  });
});


// Scatter
//Data pull scatter
var scatterurl = 'http://127.0.0.1:5000/candy-diabetes-combined';

Plotly.d3.json(scatterurl, function(data) {
  function json_obj_to_array(jsonobj) {
    var json_array = Object.keys(jsonobj).map(function(key) {
      return jsonobj[key];
    });

    return json_array;
  };

 
var diabetes_rate = json_obj_to_array(data.Diabetes_Rate_2018);
var per_capita = json_obj_to_array(data.per_capita_consumption);

var scatter_data = [];

for (var i = 0; i < diabetes_rate.length; i++) {
  scatter_data.push({
    x: diabetes_rate[i],
    y: per_capita[i]
  });
}

// console.log(scatter_data);

var scatterChart = new Chart(scatter, {
  type: 'scatter',
  data: {
      datasets: [{
          label: 'Scatter Dataset',
          data: scatter_data
      }]
    },
  options: {
      scales: {
          xAxes: [{
              type: 'linear',
              position: 'bottom'
          }]
      }
    }
  });
});
