var searchButton = document.getElementById('button-addon2');
var todayInfo  = document.getElementById('todayInfo')
var fiveForecastContainer = document.getElementById('fiveContent')
var inputKey = document.getElementById('inputKey');
var apiKey = 'dae35eafecabbca38e28c2fc1f8371c6'

function getApi() {

fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputKey.value}&appid=dae35eafecabbca38e28c2fc1f8371c6`)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(`${inputKey.value} raw data: `);
    //We need to examine the API response to know how to access the data we want to extract.
    console.log(data);
  });
}

searchButton.addEventListener('click', getApi);
