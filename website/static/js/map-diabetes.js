
var jsonurl = 'http://127.0.0.1:5500/test.json';

Plotly.d3.json(jsonurl, function(data) {

  function json_obj_to_array(jsonobj) {
      var json_array = Object.keys(jsonobj).map(function(key) {
        return jsonobj[key];
      });

      return json_array;
  };

  var map_abbr = json_obj_to_array(data.Abbreviation);
  var map_data = json_obj_to_array(data["Diabetes Rate 2018"]);
  var map_label = json_obj_to_array(data.State);

  // var map_abbr = Object.keys(data.Abbreviation).map(function(key) {
  //   return data.Abbreviation[key];
  // });

  // var map_data = Object.keys(data["Diabetes Rate 2018"]).map(function(key) {
  //   return data["Diabetes Rate 2018"][key];
  // });

  // var map_label = Object.keys(data.State).map(function(key) {
  //   return data.State[key];
  // });

  console.log(map_abbr);
  
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
                [0.4, '#3399ff'], [0.6, '#0066ff'],
                [0.8, '#0000ff'], [1, '#0000cc']
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

//console.log(mapdata.locations);
  var layout = {
          title: '2018 US Diabetes Rate by State',
          geo:{
            scope: 'usa',
            showlakes: true,
            lakecolor: 'rgb(255,255,255)'
          }
      };
      Plotly.plot(myDiv, mapdata, layout, {showLink: false});
  });