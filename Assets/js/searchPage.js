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
var JumboHeader = document.getElementById('jumbotronHeader')
var todayIcon = document.getElementById('TodayIconDisplay')
var searchHistory = document.getElementById('previousCitySearch')
console.log(currentDay);
var retrieveDate;
var forecastDates = []
var forecastRow = document.getElementById('contentRow')


// icon URL http://openweathermap.org/img/wn/10d@2x.png 



// ------------------------ retrieve weather data from API --------------------



function getUVindex(input1, input2) {  
  fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${input1}&lon=${input2}&appid=dae35eafecabbca38e28c2fc1f8371c6`)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data)
    var UVindex = data.current.uvi
    if(UVindex > 3 || UVindex <=5) {
      todayUV.setAttribute('style', 'color:green; ')
    } else if(UVindex > 5 || UVindex <= 7) {
      todayUV.setAttribute('style', 'color:yellow; ')
    } else if(UVindex > 7 || UVindex <= 10) {
      todayUV.setAttribute('style', 'color:red; ')
    } else if(UVindex > 10) {
      todayUV.setAttribute('style', 'color:purple; ')
    } else {
      todayUV.setAttribute('style', 'color:black; ')
    }
    todayUV.textContent = 'UV index: ' + UVindex; 
    return UVindex;
  })
}

// --------------------- Get Data for inputKey.value -------------------------------

function getApi(input) { //
  input = inputKey.value
  createSearchHistory() // --Save the input into the search column for future reference
  //getUVindex()
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputKey.value}&appid=dae35eafecabbca38e28c2fc1f8371c6&units=imperial`)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(`${inputKey.value} raw data: `)
    console.log(data)
    
    searchCity.textContent = inputKey.value; //
    todayDate.textContent = currentDay;
    todayTemp.textContent = 'Temperature: ' + data.main.temp;
    todayHumidity.textContent = 'Humidity: ' + data.main.humidity +'%';
    todayWind.textContent = 'Wind speed: ' + data.wind.speed;
    var IconIndex = data.weather[0].icon;
    var todayIconSrc = 'https://openweathermap.org/img/wn/' + IconIndex + '@2x.png'
    var createImg = document.createElement('img')
    createImg.setAttribute('src', todayIconSrc)
    JumboHeader.appendChild(createImg)
    // todayIcon.setAttribute('src', todayIconSrc )
    console.log(todayIcon)
    var latitude = data.coord.lat
    var longitude = data.coord.lon
    
    console.log(latitude)
    console.log(longitude)
    
    getUVindex(latitude, longitude) // Take data from this call and implement it into another function.
    inputKey.value = ''
  })  
}


//---------------------------- END OF FUNCTION GETAPI ---------------------------


//----------------------------- GRAB DATA FOR 5 DAY FORECAST  ----------------------

// -------------------------- Grab Dates for getApi5day function ------------------
function makeDate(){
  for (i=1; i < 6; i++) {
    retrieveDate = moment().add(i,"days").format('MM/DD/YY')
    console.log(retrieveDate);
  }
}


function getApi5day(input) {
  input = inputKey.value
  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${input}&appid=dae35eafecabbca38e28c2fc1f8371c6&units=imperial`)
  .then(function (response) {
    console.log(response)
    return response.json();

  })
  .then(function (data) {
    console.log(`${inputKey.value} five day forecast`)
    console.log(data)
  // creates the next five dates from today
    var count = 0
    for(i=0; i<5; i++) {
      count= count + 1
      console.log(count)
      retrieveDate = moment().add(count,"days").format('MM/DD/YY');
      console.log(typeof retrieveDate)
      console.log(retrieveDate);
      forecastDates.push(retrieveDate)
    }
    var arrayIndex = 0
    forecastRow.innerHTML = ''
  // CREATE THE CONTENT BOXES FOR THE FIVE DAY FORECAST W/ INFORMATION.
    for( i = 0; i < 40 ; i += 8) {
        
      
      
      var createDate = document.createElement('h3')
      createDate.setAttribute('class', 'text-center border border-4 fivedayHeaders')
      createDate.textContent = forecastDates[arrayIndex]
      console.log(createDate.textContent)
      var createDay = document.createElement('div')
      createDay.setAttribute("class", 'col border border-4 forecastBox rounded box oneTimeRemove')
      var createTemp = document.createElement('p')
      createTemp.textContent = 'Temperature: ' + data.list[i].main.temp + ' °F'
      console.log(createTemp)
      var createHumidity = document.createElement('p')
      createHumidity.textContent = 'Humidity: ' + data.list[i].main.humidity + '%'
      console.log(createHumidity)

      forecastRow.appendChild(createDay)
      createDay.appendChild(createDate)
      createDay.appendChild(createTemp)
      createDay.appendChild(createHumidity)


      arrayIndex++ // increment the index number to grab next date
    }
  })


}

// ------------------------- END OF 5 DAY FORECAST FUNCTION -------------------------

// whenever side bar item clicked, value runs through getAPI
searchHistory.onclick = function(event) {
  console.log(event.target.textContent)
  inputKey.value = event.target.textContent
  getApi(inputKey.value)
  getApi5day(inputKey.value)
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
searchButton.addEventListener('click', getApi5day)
