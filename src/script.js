// let weather = {
//   paris: {
//     temp: 19.7,
//     humidity: 80
//   },
//   tokyo: {
//     temp: 17.3,
//     humidity: 50
//   },
//   lisbon: {
//     temp: 30.2,
//     humidity: 20
//   },
//   "san francisco": {
//     temp: 20.9,
//     humidity: 100
//   },
//   moscow: {
//     temp: -5,
//     humidity: 20
//   }
// };
//
// let city = prompt("Enter a city?");
// city = city.toLowerCase();
// if (weather[city] !== undefined) {
//   let temperature = weather[city].temp;
//   let humidity = weather[city].humidity;
//   let celsiusTemperature = Math.round(temperature);
//   let fahrenheitTemperature = Math.round((temperature * 9) / 5 + 32);
//
//   alert(
//     `It is currently ${celsiusTemperature}°C (${fahrenheitTemperature}°F) in ${city} with a humidity of ${humidity}%`
//   );
// } else {
//   alert(
//     `Sorry we don't know the weather for this city, try going to https://www.google.com/search?q=weather+${city}`
//   );
// }
/////////////////////////////////////////////

// Выводим заголовок

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#current-temperature")
  let temperature = Math.round(response.data.temperature.current)
  let cityElement = document.querySelector("#current-city")
  let weatherDescription = document.querySelector("#weather-description")
  let humidityElement = document.querySelector("#humidity")
  let windSpeed = document.querySelector("#wind-speed")
  let iconElement = document.querySelector("#icon")

  cityElement.innerHTML = response.data.city
  weatherDescription.innerHTML = response.data.condition.description
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`
  windSpeed.innerHTML = `${response.data.wind.speed}km/h`

  temperatureElement.innerHTML = Math.round(temperature)
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="current-temperature-icon" />`

  getForecast(response.data.city)
}

function searchCity(city) {

  let apiKey = "78f3071a140683cd3aot3e0bc84c340d"
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`

  axios.get(apiUrl).then(displayTemperature)
}

function search(event) {
  event.preventDefault()
  let searchInputElement = document.querySelector("#search-input")
  searchCity(searchInputElement.value)
}


function formatDate(date) {
  let minutes = date.getMinutes()
  let hours = date.getHours()
  let day = date.getDay()

  if (minutes < 10) {
    minutes = `0${minutes}`
  }

  if (hours < 10) {
    hours = `0${hours}`
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ]

  let formattedDay = days[day]
  return `${formattedDay} ${hours}:${minutes}`
}

function getForecast(city) {
  let apiKey = "78f3071a140683cd3aot3e0bc84c340d"
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`

  axios(apiUrl).then(displayForecast)
}

function displayForecast(response) {

  let days = ['Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  let forecastHtml = ""

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
  `
  <div class="forecast-weather-day">
    <div class="forecast-weather-date">${day}</div>
    <div class="forecast-weather-icon">🌤️</div>
    <div class="forecast-weather-temperatures">
      <div class="forecast-weather-temperature">
        <strong>15º</strong>
      </div>
      <div class="forecast-weather-temperature">9º</div>
    </div>
    </div>
`
  })
  let forecastElement = document.querySelector("#forecast")
  forecastElement.innerHTML = forecastHtml
}

let searchForm = document.querySelector("#search-form")
searchForm.addEventListener("submit", search)

let currentDateELement = document.querySelector("#current-date")
let currentDate = new Date()

currentDateELement.innerHTML = formatDate(currentDate)

searchCity("Kiev")












