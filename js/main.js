// https://api.unsplash.com/search/photos?page=1&query=${city}&client_id=maVgNo3IKVd7Pw7-_q4fywxtQCACntlNXKBBsFdrBzI&per_page=5&orientation=landscape



let apiKey = "b9fcb4d2f8354d3cbd9110627241201"
let cardsContainer= document.querySelector(".forecast-cards")
let searchBox = document.querySelector("#searchBox")
let cityData = document.querySelector(".city-items")
let allBars = document.querySelectorAll(".clock")


let locationName = document.querySelector(".location .location")
async function getWeather(country){
    let response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${country}&days=3`)
    let result = await response.json()
    console.log(result);
    displayWeather(result)
    
    
}
// getWeather("london")



// console.log(date.toLocaleDateString("en-us", {weekday:"long"}));
function displayWeather(result){
    console.log(result.forecast.forecastday);
    let forcast = result.forecast.forecastday

    let cartona = ''
    locationName.innerHTML = result.location.name
    for(let i=0 ; i< forcast.length; i++ ){
        let date = new Date(forcast[i].date)
        let weekDay = date.toLocaleDateString("en-us", {weekday:"long"})
        // console.log(date.toLocaleDateString("en-us", {weekday:"long"}));
       cartona+= `   
       <div class="card ${i==0? "active" : ""}" data-index=${i} >
        <div class="card-header">
          <div class="day">${weekDay}</div>
        </div>
        <div class="card-body">
          <img src="./images/conditions/${forcast[i].day.condition.text}.svg"/>
          <div class="degree">${forcast[i].hour[date.getHours()].temp_c}°C</div>
        </div>
        <div class="card-data">
          <ul class="left-column">
            <li>Real Feel: <span class="real-feel">${forcast[0].hour[date.getHours()].feelslike_c}°C</span></li>
            <li>Wind: <span class="wind">${forcast[i].hour[date.getHours()].wind_kph} K/h</span></li>
            <li>Pressure: <span class="pressure">${forcast[i].hour[date.getHours()].pressure_mb} Mb</span></li>
            <li>Humidity: <span class="humidity">${forcast[i].hour[date.getHours()].humidity } %</span></li>
          </ul>
          <ul class="right-column">
            <li>Sunrise: <span class="sunrise"> ${forcast[i].astro.sunrise}  </span></li>
            <li>Sunset: <span class="sunset">${forcast[i].astro.sunset}</span></li>
          </ul>
        </div>
      </div>
`
    }
    // console.log(cartona);

    cardsContainer.innerHTML = cartona
    let allCards = document.querySelectorAll(".card")
    // console.log(allCards);
    for(let i=0 ; i< allCards.length ; i++){
        allCards[i].addEventListener('click', function(e){
            console.log(e.target);
            console.log(e.currentTarget);
            let activeCard = document.querySelector(".card.active")
            activeCard.classList.remove("active")
            e.currentTarget.classList.add("active")
            rain(forcast[e.currentTarget.dataset.index].hour)
        })
    }
    displayImg( result.location.name , result.location.country)
}

function rain(weather){
  for(let i=0 ; i<allBars.length ; i++){
      console.log(allBars);
      // console.log(weather[allBars[i].getAttribute("data-clock")].chance_of_rain);
      // console.log(allBars[i].querySelector(".percent"));
      let height = weather[allBars[i].getAttribute("data-clock")].chance_of_rain 
      allBars[i].querySelector(".percent").style.height= `${height}%`
  
  }
}



navigator.geolocation.getCurrentPosition(success, error)

function success(position){

    console.log(position);
    console.log(position.coords.latitude);
    console.log(position.coords.longitude);
    let latitude = position.coords.latitude
    let longitude = position.coords.longitude
    let currentPosition = `${latitude},${longitude}`
    console.log(currentPosition);
    getWeather(currentPosition)
}

function error(){
    getWeather("cairo")
}

searchBox.addEventListener("keyup", function(e){
    // console.log(searchBox.value);
    // console.log(e);
    if(e.key =="Enter")
    {
        // console.log(searchBox.value);
        getWeather(searchBox.value)

    }
})

searchBox.addEventListener("blur", function(){
    // console.log(searchBox.value);
    getWeather(searchBox.value)
})


async function getImg(city){
    let response = await fetch(`https://api.unsplash.com/search/photos?page=1&query=${city}&client_id=maVgNo3IKVd7Pw7-_q4fywxtQCACntlNXKBBsFdrBzI&per_page=5&orientation=landscape`)
    let result = await response.json()
    console.log(result);
    let randomIndex = Math.floor(Math.random()* result.results.length ) //=>0-0.9999999
    let cityData = result.results[randomIndex]
    console.log(cityData);
    return cityData
}



async function displayImg(city , country){
    let cityInfo =await getImg(city)
    // console.log(cityInfo.urls.regular);

let item = `<div class="item">
<div class="city-image">
  <img src="${cityInfo.urls.regular}" alt="Image for ${city} city" />
</div>
<div class="city-name"><span class="city-name">${city}</span>, ${country}</div>
</div>`

cityData.innerHTML += item
}








