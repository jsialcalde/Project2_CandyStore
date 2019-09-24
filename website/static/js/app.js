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
  var map_data = json_obj_to_array(data["Diabetes_Rate_2018"]);
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
      Plotly.plot(myDiv, mapdata, layout, {showLink: false})
        .then(gd => {
          gd.on('plotly_click', d => {
            var pt = (d.points || [])[0]
            if(pt) {
              // console.log(pt);
              console.log(pt.location);
              // console.log(pt.fullData);
              var ptIndex = pt.pointIndex;
              console.log(ptIndex);

              var candy_table_div = Plotly.d3.select("#myTable");
              candy_table_div.html("");

              var candy_p = candy_table_div.append("p");
              candy_p.classed("text-center", true);
              candy_p.classed("h2", true);
              candy_p.text(data.State[ptIndex]);

              var candy_table = candy_table_div.append("table");              
              candy_table.classed("table", true);

              var candy_thead = candy_table.append("thead");

              var candy_tr = candy_thead.append("tr");

              var candy_th = candy_tr.append("th").text("Population");
              var candy_th = candy_tr.append("th").text("Diabetes Rate 2018");
              var candy_th = candy_tr.append("th").text("Population with Diabetes");

              var candy_tbody = candy_table.append("tbody");

              var candy_tr = candy_tbody.append("tr");

              var nf = Intl.NumberFormat();

              var candy_population = parseInt(data["Population_2019"][ptIndex]);
              candy_population = nf.format(candy_population);

              var candy_population_diabetes = parseInt(data["Population_with_Diabetes"][ptIndex]);
              candy_population_diabetes = nf.format(candy_population_diabetes);            

              var candy_td = candy_tr.append("td").text(candy_population);
              var candy_td = candy_tr.append("td").text(data["Diabetes_Rate_2018"][ptIndex]);
              var candy_td = candy_tr.append("td").text(candy_population_diabetes);                      
            }
          })
        })
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
      Plotly.newPlot(CandyMap, mapdata, layout, {showLink: false})
      .then(gd => {
        gd.on('plotly_click', d => {
          var pt = (d.points || [])[0]
          if(pt) {
            // console.log(pt);
            console.log(pt.location);
            // console.log(pt.fullData);
            var ptIndex = pt.pointIndex;
            console.log(ptIndex);

            var candy_table_div = Plotly.d3.select("#myTable");
            candy_table_div.html("");

            var candy_p = candy_table_div.append("p");
            candy_p.classed("text-center", true);
            candy_p.classed("h2", true);
            candy_p.text(data.State[ptIndex]);

            var candy_table = candy_table_div.append("table");              
            candy_table.classed("table", true);

            var candy_thead = candy_table.append("thead");

            var candy_tr = candy_thead.append("tr");

            var candy_th = candy_tr.append("th").text("First Place Candy");
            var candy_th = candy_tr.append("th").text("Second Place Candy");
            var candy_th = candy_tr.append("th").text("Third Place Candy");

            var candy_tbody = candy_table.append("tbody");

            var candy_tr = candy_tbody.append("tr");

            var candy_td = candy_tr.append("td").text(data["1st_Place"][ptIndex]);
            var candy_td = candy_tr.append("td").text(data["2nd_Place"][ptIndex]);
            var candy_td = candy_tr.append("td").text(data["3rd_Place"][ptIndex]);                      
          }
        })
      })      
  });

// candyPlot.on('plotly_click', function(candyData){

//
// Horizontal bar and Scatter chart
let myChart = document.getElementById('myChart').getContext('2d');

Chart.defaults.global.defaultFontFamily='Lato';
Chart.defaults.global.defaultFontFamily=18;
Chart.defaults.global.defaultFontColor='#777';
Chart.defaults.global.animation = {
  duration:3000,
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
            backgroundColor:['#73ED0C ','#fc0303','#8B4C09','#FF5733','#C90DCC','#D5B60A','#FF4900'],
            borderWidth:1,
            borderColor:'#777',
            hoverBorderWidth:'#000',
            hoverBorderColor:'#000'
        }]
    },
    options:{
      scales:{
        xAxes: [{type: 'linear',
        position: 'bottom',
        scaleLabel: {
          display: true,
          labelString: 'Pounds Consumed'
        }
        }]
      },
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
var state_c = json_obj_to_array(data.per_capita_consumption)

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
          label: 'Diabetes Rate to Consumption per capita',
          borderColor: "red",
          backgroundColor: "pink",
          data: scatter_data
      }]
    },
  options: {
      scales: {
          xAxes: [{
              type: 'linear',
              position: 'bottom',
              scaleLabel: {
                display: true,
                labelString: 'Diabetes Rate'
          }
        }],
          yAxes: [{
              type: 'linear',
              position: 'left',
              scaleLabel: {
                display: true,
                labelString: "Per Capita Consumption"
              }
          
          }]

      },
      tooltips: {
        backgroundColor: '#000'
        
      }
    }
  });
});
