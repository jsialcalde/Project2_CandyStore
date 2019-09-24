
Plotly.d3.csv('../static/candy.csv', function(err, rows){
      function unpack(rows, key) {
          return rows.map(function(row) { return row[key]; });
      }
  
 var data = [{
              type: 'choropleth',
              locationmode: 'USA-states',
              locations: unpack(rows, 'State_2'),
              z: unpack(rows, 'Per_Capita_Consumption (Pounds_Per_Person)'),
              text: unpack(rows, 'State'),
              zmin: 0,
              zmax: 50,
              colorscale: [
                [0, '#ccffff'], [0.2, '#66ccff'],
                [0.4, '#3399ff'], [0.6, '#0066ff'],
                [0.8, '#0000ff'], [1, '#0000cc']
              ],
            colorbar: {
              title: 'Consumption Per Capiat',
              thickness: 20.0
            },
            marker: {
              line:{
                color: 'rgb(255,255,255)',
                width: 2
              }
            }
          }];

console.log(data.locations);
  var layout = {
          title: '2018 Candy Consumption by State',
          geo:{
            scope: 'usa',
            showlakes: true,
            lakecolor: 'rgb(255,255,255)'
          }
      };
      Plotly.plot(myDiv, data, layout, {showLink: false});
  });