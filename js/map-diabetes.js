
Plotly.d3.csv('../static/diabetes.csv', function(err, rows){
      function unpack(rows, key) {
          return rows.map(function(row) { return row[key]; });
      }
console.log(unpack(rows, 'Abbreviation'));
 var data = [{
              type: 'choropleth',
              locationmode: 'USA-states',
              locations: unpack(rows, 'Abbreviation'),
              z: unpack(rows, 'Diabetes Rate 2018'),
              text: unpack(rows, 'State'),
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

//console.log(data.locations);
  var layout = {
          title: '2018 US Diabetes Rate by State',
          geo:{
            scope: 'usa',
            showlakes: true,
            lakecolor: 'rgb(255,255,255)'
          }
      };
      Plotly.plot(myDiv, data, layout, {showLink: false});
  });