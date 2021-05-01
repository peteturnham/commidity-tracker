// Create a map object
var myMap = L.map("mapid", {
    center: [15.5994, -28.6731],
    zoom: 3
})
  
//   Adding tile layer
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
   attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
   tileSize: 512,
   maxZoom: 10,
   zoomOffset: -1,
   id: "mapbox/light-v10",
   accessToken: API_KEY
}).addTo(myMap);

// Flask object 
var link= "http://127.0.0.1:5000/get_data";


// // // Build Map
// d3.json(link).then(function(data) {
//   // var data = data.output

//   // Loop through the flask object and plot each coordinate
//   for (var i = 0; i < data.length; i++) {

//     L.marker([data[i].latitude, data[i].longitude], {
    
//     }).bindPopup("<h3>" + data[i].fac_name +
//     "</h3><hr><p>" + data[i].capacity + "</p>").addTo(myMap);
//   }
// });

var commodity_name= ["Nickel", "Cobalt","Lithium","Coal","Aluminum","Copper"];
var data= "static/data/commodity.csv";
var financial= "static/data/financial.json";
 
function buildgraph(index){

  // Build Public/Private window
  var public=[]
  var private=[]
  d3.json(link).then(function(data) {
    console.log(data.object)
    var data_info = dataset.map(function(dataset){
    return {"Commodity":dataset.commodity, "Type":dataset.Company_Type};
    });
    console.log(data_info)
    var comp= d3.nest()
        .key(function(d) { return d.Commodity; })
        .key(function(d) { return d.Type; })
        .entries(data_info);
    console.log(comp)    
    var dataset_info= comp[index]
    var ok=dataset_info.length
    console.log(ok)
    console.log(dataset_info)
    console.log(dataset_info.values[0].values.length)


    var demo_info= d3.select('#sample-metadata')
    demo_info.html('')
    
    var info= demo_info.append('p').text(`Public Company: ${comp[index].values[0].values.length} `)
    var re_nfo= demo_info.append('p').text(`Private Company : ${comp[index].values[1].values.length} `)
   
  });
  
  // Build commodity financial graph  
  d3.csv(data).then(function(info){
      // console.log(info)
    for (var i=0; i< commodity_name.length; i++){
      var information= d3.select('#selDataset').append('option').text(commodity_name[i])
    }
    var month_=[];
  
    var comodity= d3.nest()
      .key(function(d) { return d.Commodity; })
      .entries(info);
    var price_=[]; 
    var como_info= comodity[index].key
    var como_index= comodity[index]

    for (var i=0; i< como_index.values.length; i++){
      var values= como_index.values[i].Month
      var priz= parseInt(como_index.values[i].Price.replace(/,/g, ''), 10)
        
      month_.push(values)
      price_.push(priz)
    } 
    var month=[];
    var price=[];
    var chart = new Chart('chart', {
        type: 'line',
        data: {
        labels: month_,
        datasets: [
          {
            data: price_,
            label: como_info,
            borderColor: "#3e95cd",
           fill: false
            }
          ]
        }
    });
  });
  
};buildgraph(0);


function handlesubmit(){
  var data= "static/data/commodity.csv";
  var link= "static/data/commodity.json";
  
  d3.csv(data).then(function(info){
    var comodity= d3.nest()
        .key(function(d) { return d.Commodity; })
        
        
        
        .entries(info);
      console.log(comodity) 
    

    var p_id= d3.select('#selDataset').node().value
    for (var i=0; i< comodity.length; i++){
      if (p_id===comodity[i].key){
        console.log(info[i].Commodity)
        buildgraph(i)
        
      
        
        return
      }
    }
    var public=[]
  var private=[]
  d3.json(linkin).then(function(dataset) {
    var p_id= d3.select('#selDataset').node().value
    var data_info = dataset.map(function(dataset){
    return {"Commodity":dataset.commodity, "Type":dataset.Company_Type};
    });
    var comp= d3.nest()
        .key(function(d) { return d.Commodity; })
        .key(function(d) { return d.Type; })
        .entries(data_info);
    console.log(comp) 
    for (var i=0; i< comp.length; i++){
      if (p_id===comp[i].key){
        // console.log(info[i].Commodity)
        buildgraph(i)
        
      
        
        return
      }
    }   
    
    

  })
    

  });

};

d3.select('#selDataset').on('change', handlesubmit);

// var trying = d3.csv.parse(d3.select('commodity.csv').text());
// console.log(trying);

  
  


