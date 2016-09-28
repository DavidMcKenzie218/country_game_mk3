var map;

// var checkAnswer = function(answer, countryName){

// }

var makePtag = function(country){
  var pTag = document.createElement("div");
  pTag.innerHTML = /*"<h4>Clue 1</h4>" + 
  "<p>Native Name: " + country.nativeName +  "</p>" +*/
  "<h4>Clue 1</h4>" +   
  "<p> Capital City: " + country.capital + "</p>" + 
  "<h4>Clue 2</h4>" +  
  "<p> Sub-Region: " + country.subregion + "</p>";
  return pTag;
}

var startGame = function(countries){
  var randomIndex = Math.floor(Math.random()*countries.length);
  var country = countries[randomIndex];
  console.log(country);
  map.centerAt(country.latlng[0], country.latlng[1]);
  var pTag = makePtag(country);
  var cluesDiv = document.querySelector("#clues")
  cluesDiv.appendChild(pTag);
}

// var populateMarkers = function(countries){
//   for(var i =0; i < countries.length; i++){
//     map.addMarker(countries[i]);
//   }
// }

var requestComplete = function(){
  console.log(this.status);
  console.log("Request complete");
  if (this.status !== 200) return;
  var jsonString = this.responseText;
  var countries = JSON.parse(jsonString);
  // country = countries[0];
  // console.log(country);
  // populateMarkers(countries);
  startGame(countries);
}

var makeRequest = function(url, callback){
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.onload = callback;
  request.send();
}

var app = function(){
  var container = document.getElementById('map');
  map = new Map(container, {lat:50, lng:10}, 13);
  var url = "http://localhost:5000";
  console.log("Before request");
  makeRequest(url, requestComplete);
  console.log("After Request");
}


window.onload = app;