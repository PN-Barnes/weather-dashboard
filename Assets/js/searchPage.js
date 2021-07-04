var searchButton = document.getElementById('button-addon2');
var todayInfo  = document.getElementById('todayInfo')
var fiveForecastContainer = document.getElementById('fiveContent')
var inputKey = document.getElementById('inputKey');
function getApi() {


//     var requestUrl = ''

//     fetch(requestUrl)
    
//     .then(function (response) {
//         console.log("response", response)

//         return response.json();
//     })
//     .then(function (data) {
//         console.log("data", data)
//     })
// }


fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputKey.value}`)
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

// https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}

// 