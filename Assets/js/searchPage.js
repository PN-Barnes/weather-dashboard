var searchButton = document.getElementById('button-addon2');
var todayInfo  = document.getElementById('todayInfo')
var fiveForecastContainer = document.getElementById('fiveContent')
var inputKey = document.getElementById('inputKey');
var apiKey = 'dae35eafecabbca38e28c2fc1f8371c6'
var searchCity = document.getElementById('city')
var currentDay = moment().format('MMMM Do YYYY');
var todayDate = document.getElementById('Date')
var todayTemp = document.getElementById('todayTemp')
var todayHumidity = document.getElementById('todayHumidity')
var todayWind = document.getElementById('todayWind')
var todayUV = document.getElementById('todayUV')
var todayIcon = document.getElementById('icon')
var searchHistory = document.getElementById('previousCitySearch')
console.log(currentDay);


function getApi() {

  createSearchHistory()

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputKey.value}&appid=dae35eafecabbca38e28c2fc1f8371c6&units=imperial`)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(`${inputKey.value} raw data: `);
    //We need to examine the API response to know how to access the data we want to extract.
    
    
    

    searchCity.textContent = inputKey.value;
    todayDate.textContent = currentDay;
    todayTemp.textContent = 'Temperature: ' + data.main.temp;
    todayHumidity.textContent = 'Humidity: ' + data.main.humidity +'%';
    todayWind.textContent = 'Wind speed: ' + data.wind.speed;
    todayIcon = data.weather[0].icon;
    console.log(todayIcon)
  })
}




searchHistory.onclick = function(event) {
  let target = event.target;
  inputKey.value = target;
  var newInput = inputKey.value
  console.log(newInput)
  getApi( )
}
// var savedCitySearch = localStorage.getItem('searchHistory')

function createSearchHistory(citySearch) {

  createCity = document.createElement('button')
  createCity.textContent = inputKey.value
  createCity.setAttribute("class", "btn btn-outline-secondary btn-lg col-12")
  console.log(createCity)
  searchHistory.appendChild(createCity)



  localStorage.setItem('searchHistoy', createCity)

  localStorage
}

searchButton.addEventListener('click', getApi);


