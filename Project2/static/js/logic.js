// Create a map object
var myMap = L.map("mapid", {
    center: [15.5994, -28.6731],
    zoom: 2
});
  
//   Adding tile layer
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
   attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
   tileSize: 512,
   maxZoom: 13,
   zoomOffset: -1,
   id: "mapbox/dark-v10",
   accessToken: API_KEY
}).addTo(myMap);

var link= "static/data/commodity.json";


//create map saed on qtty
d3.json(link).then(function(data) {

  // create markers where the colors are related to factory capacity to deliver commodity

  for (var i = 0; i < data.length; i++) {
    

     commodity= data[i].commodity
     if(data[i].capacity< 500 &&  data[i].capacity > 0){
      var color_= "green" 
   }
   else if (data[i].capacity< 1000 &&  data[i].capacity > 500){
       var color_= "#7FFF00" 
   }
   else if (data[i].capacity< 10000 &&  data[i].capacity > 1000){
       var color_= "yellow" 
   }
   else if (data[i].capacity< 100000 &&  data[i].capacity > 10000){
       var color_= "#DEB887" 
   }
   else if (data[i].capacity< 200000 &&  data[i].capacity > 100000){
       var color_= "orange" 
   }
   else {
       var color_= "red"
   }

        var place= [data[i].latitude, data[i].longitude]
        var markers= L.circle(place, {
          fillOpacity: 0.75,
          color: color_,
          fillColor: color_,
          radius: 10000

        })
        .bindPopup(data[i].fac_name).addTo(myMap);
    

  

      }

      //create legend
      var legend = L.control({ position: "bottomleft" });
      legend.onAdd = function(map) {
        var div = L.DomUtil.create("div", "legend");
        div.innerHTML += "<h4>Factory by commodity capacity</h4>";
        div.innerHTML += '<i style="background: green"></i><span>0-500</span><br>';
        div.innerHTML += '<i style="background: #7FFF00"></i><span>1000-500</span><br>';
        div.innerHTML += '<i style="background: yellow"></i><span>1000-10000</span><br>';
        div.innerHTML += '<i style="background: #DEB887"></i><span>10000-10000</span><br>';
        div.innerHTML += '<i style="background: orange"></i><span>100000-200000</span><br>';
        div.innerHTML += '<i style="background: red"></i><span>200000+</span><br>';
      //   div.innerHTML += '<i class="icon" style="background-image: url(https://d30y9cdsu7xlg0.cloudfront.net/png/194515-200.png);background-repeat: no-repeat;"></i><span>Grænse</span><br>';
        
        
      
        return div;
      };
      
      legend.addTo(myMap);
      
 
  
});
  // create array that will get puched in the dropdown menu
  var commodity_name= ["Aluminum", "Coal","Cobalt","Copper","Nickel","Lithium"];
  var data= "static/data/commodity.csv";
  var financial= "static/data/financial.json";
  var linkin= "static/data/commodity.json";
  var investor= "static/data/inves_stock1.csv";

//create buildgraph function  
 
function buildgraph(index){
  var public=[]
  // var private=[]
  // var lit=[]

  //create multiline graph based on investor
  d3.csv(investor).then(function(inves){
    console.log(inves)
    var invest= d3.nest()
        .key(function(d) { return d.commodity; })
        .key(function(d) { return d.symbol; })
        .entries(inves);
    console.log(invest)
    var z= 3
    var pos=2
    var temp= invest[z]
    var i;
    for(i= z; i >= pos; i--)
    {
      invest[i] = invest[i - 1]; 
    }

    //create empty array for for loop
    var information=[]
    var name=[]
    var close= []
    var data=[]
    var name1=[]
    var close1= []
    var data1=[]
    var name2=[]
    var close2= []
    var data2=[]
    var name3=[]
    var closeee= []
    var data3=[]
    var name4=[]
    var close4= []
    var data4=[]
    invest[pos] = temp; 
    var stock= invest[index]
    console.log(stock)
    console.log(stock.values[0].values[0].Close)

   //create a for loop to retrieve the date and price
  for (var i=0; i< stock.values.length;i++){
   
      
    
    for (var i=0; i< 99; i++){
      close.push(stock.values[0].values[i].Close)
      data.push(stock.values[0].values[i].Date)
      name.push(stock.values[0].values[i].symbol)
        
    }
    for (var j=0; j< 99; j++){
      close1.push(stock.values[1].values[j].Close)
      data1.push(stock.values[1].values[j].Date)
      name1.push(stock.values[1].values[j].symbol)
        
    }
    for (var i=0; i< 99; i++){
      close2.push(stock.values[2].values[i].Close)
      data2.push(stock.values[2].values[i].Date)
      name2.push(stock.values[2].values[i].symbol)
        
    }
    for (var i=0; i< 78; i++){
      closeee.push(stock.values[3].values[i].Close)
      data3.push(stock.values[3].values[i].Date)
      name3.push(stock.values[3].values[i].symbol)
        
    }
    
    for (var i=0; i< 99; i++){
      close4.push(stock.values[4].values[i].Close)
      data4.push(stock.values[4].values[i].Date)
      name4.push(stock.values[4].values[i].symbol)
        
    }
  }
    console.log(close1)
    console.log(close2)
    var trace1 = {
      x: data,
      y: close,
      name: name[0],
      type: 'line'
    };
    console.log(trace1)
    
    var trace2 = {
      x: data1,
      y: close1,
      name: name1[0],
      type: 'line'
    };
    var trace3 = {
      x: data2,
      y: close2,
      name: name2[0],
      type: 'line'
    };
    var trace4 = {
      x: data3,
      y: closeee,
      name: name3[0],
      type: 'line'
    };
    var trace5 = {
      x: data4,
      y: close4,
      name: name4[0],
      type: 'line'
    };
    console.log(trace2)
    var layout = {
      title: "Companies historical stock prices",
      xaxis: { title: "Dates" },
      yaxis: { title: "stock price"}
    };
    
    var data = [trace1, trace2, trace3, trace4,trace5];
    
    Plotly.newPlot('multiline', data,layout);
  
  });
  



    
  ;

  //create Commodity inormation card that will specify number of public and private company
  d3.json(linkin).then(function(dataset) {
   

    var data_info = dataset.map(function(dataset){
    return {"Commodity":dataset.commodity, "Type":dataset.Company_Type};
    });
    console.log(data_info)
    var comp= d3.nest()
        .key(function(d) { return d.Commodity; })
        .key(function(d) { return d.Type; })
        .entries(data_info);
    console.log(comp)   
   
   

    // create company information card
    var demo_info= d3.select('#sample-metadata')
    demo_info.html("")
    // console.log(inves)
      
      var info= demo_info.append('p').text(`${comp[index].values[0].key} Company: ${comp[index].values[0].values.length} `)
      var re_nfo= demo_info.append('p').text(`${comp[index].values[1].key} Company : ${comp[index].values[1].values.length} `)
   
    


  
    // create line graph that display commodity historical futures prices
    d3.csv(data).then(function(info){
      // console.log(info)
      
      for (var i=0; i< commodity_name.length; i++){
       
        
        var information= d3.select('#selDataset').append('option').text(commodity_name[i])
       
      };
      var month_=[];
  
      var comodity= d3.nest()
        .key(function(d) { return d.Commodity; })
        
        
        
        .entries(info);
      
      
      var price_=[]; 
      
        var como_info= comodity[index].key
        var como_index= comodity[index]
        console.log(comodity)
        for (var i=0; i< como_index.values.length; i++){
          var values= como_index.values[i].Month
          var priz= parseInt(como_index.values[i].Price.replace(/,/g, ''), 10)
        
          month_.push(values)
          price_.push(priz)
        } 

      

      var month=[];
      var price=[];
    
      
      
     // create commodity historical futures prices
      var chart = new Chart('chart', {
        type: 'line',
        title: 'Commodity historical futures prices',
      data: {
        labels: month_.reverse(),
        datasets: [
          {
            data: price_.reverse(),
            label: como_info,
            borderColor: "#3e95cd",
           fill: false
            }
          ],
          
       }
      });
        

    
  
  });
  
    
}); 

};
//Default graph using Aluminium commodity
buildgraph(0);

//create new function that will take care of display data based of dropdown menu option
function handlesubmit(){
  var data= "static/data/commodity.csv";
  var link= "static/data/commodity.json";
  
  d3.csv(data).then(function(info){
    var comodity= d3.nest()
        .key(function(d) { return d.Commodity; })
        
        
        
        .entries(info);
      console.log(comodity) 
    

    var p_id= d3.select('#selDataset').node().value
    d3.select('#selDataset').html("")
    for (var i=0; i< comodity.length; i++){
      if (p_id===comodity[i].key){
        console.log(comodity[i].key)
        buildgraph(i)
        
      
        
        return
      }
    }
 

  });

};
//event listener 
d3.select('#selDataset').on('change', handlesubmit);



  
  


