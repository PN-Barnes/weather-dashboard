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

// ------------------------ retrieve weather data from API --------------------




function getApi(input) { //
  input = inputKey.value //
  createSearchHistory() // --Save the input into the search column for future reference
  
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=dae35eafecabbca38e28c2fc1f8371c6&units=imperial`)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(`${input} raw data: `)
    console.log(typeof input)
    
    searchCity.textContent = input; //
    todayDate.textContent = currentDay;
    todayTemp.textContent = 'Temperature: ' + data.main.temp;
    todayHumidity.textContent = 'Humidity: ' + data.main.humidity +'%';
    todayWind.textContent = 'Wind speed: ' + data.wind.speed;
    todayIcon = data.weather[0].icon;
    console.log(todayIcon)
  })
  
  
}


// whenever side bar item clicked, value runs through getAPI
searchHistory.onclick = function(event) {
  console.log(event.target.textContent)
  inputKey.value = event.target.textContent
  getApi()
}  
// var savedCitySearch = localStorage.getItem('searchHistory')


// save input to side column and store within local storage
function createSearchHistory() {

  createCity = document.createElement('button')
  createCity.textContent = inputKey.value
  createCity.setAttribute("class", "btn btn-outline-secondary btn-lg col-12")
  console.log(createCity.value)
  searchHistory.appendChild(createCity)



  localStorage.setItem('searchHistoy', createCity)

  localStorage
}

searchButton.addEventListener('click', getApi);


