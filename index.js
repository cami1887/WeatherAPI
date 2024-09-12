
import { usInfo } from "./US_States_and_Cities.js";
const APIKey = '3792aefde03b401da81232716240808';
const locationInput = document.getElementById('state');
const cityInput = document.getElementById('city');
const timeOutput = document.getElementById('time');
const uvDescription = document.querySelector('.UV-description');
const clothingDescription = document.querySelector('.clothing-description');
const mentalHealthDescription = document.querySelector('.mental-health-description');
const dogWalkingDescription = document.querySelector('.dog-walking-description');
const cosmicEventDescription = document.querySelector('.cosmic-events-description');
const statesArray = Object.keys(usInfo).sort();
let locationParameter = '';
let stateSelect = '';

fetch('http://api.weatherapi.com/v1/current.json?key='+APIKey+'&q='+'Alabama Auburn').then((response) => response.json()).then((data)=> console.log(data));

statesArray.forEach((state) => {
    const option = document.createElement("option");
    option.textContent = state;
    option.setAttribute("value", state);
    locationInput.appendChild(option);
})

locationInput.addEventListener('input', displayCities);
cityInput.addEventListener('input', displayWeather);

function displayCities(e) {
    while (cityInput.firstChild) {
        cityInput.removeChild(cityInput.firstChild);
    }
    stateSelect = e.target.value;
    if (stateSelect != 'select') {
        let city = Object.values(Object.values(usInfo));
        let states = Object.keys(usInfo);
        let index = states.indexOf(stateSelect)
        let allCities = city[index]?.sort();
        allCities?.forEach((city) => {
            const option = document.createElement("option");
            option.textContent = city;
            option.setAttribute("value", city);
            cityInput.appendChild(option);
        }
    )
    fetch('http://api.weatherapi.com/v1/current.json?key='+APIKey+'&q='+allCities[0])
        .then((response) => 
            response.json())
        .then((data)=> 
            processData(data.current.temp_f, data.current.uv, data.current.cloud, data.current.precip_in, data.current.wind_mph, data.current.condition.text)
        )
    }

    else {
        return false;
    }
}

function processData(temp, uv, cloud, precip, wind, condition) {
    console.log("uv: " + uv, "temp: "+ temp, "cloud cover: "+ cloud, "precipitation: "+ precip, "wind: "+ wind, "condition: "+ condition)
    if (temp){

    }


}

function displayWeather(e) {
    locationParameter = e.target.value;
    fetch('http://api.weatherapi.com/v1/current.json?key='+APIKey+'&q='+locationParameter+' '+stateSelect)
        .then((response) => response.json())
        .then((data)=> 
            processData(data.current.temp_f, data.current.uv, data.current.cloud, data.current.precip_in, data.current.wind_mph, data.current.condition.text)
    );
}


const allDescriptions = {
    uvIndex: [
        "Low UV Index. No need to worry about sun burns!", 
        "Maybe just a little bit of sunscreen is in order...just a little"],
    clothing: [
        "With a high chance of rain and cool temperatures, make sure you layer up!", 
        "Its hot with a high UV index, wear airy and protective clothing. A hat and sunglasses couldn't hurt either :)"],
    mentalHealth: [
        "Its a sunny day today! The weather should not negatively affect your mood.", 
        "It's a gloomy day today. Time to break out a warm cup of tea and move your body a little to make up for the lack of viamin D!"],
    dogWalking: [
        "It's not too hot to walk your dog right now!", 
        "Its defintely on the hotter side, but safe enough to take fido out for a quick walk."],
    cosmicEvent: [
        "No cosmic events where you're located :(", 
        "There's a meteor shower, but it may be too cloudy to see :("
    ]
}


uvDescription.innerText = allDescriptions.uvIndex[1];
clothingDescription.innerText = allDescriptions.clothing[1];
mentalHealthDescription.innerText = allDescriptions.mentalHealth[1];
dogWalkingDescription.innerText = allDescriptions.dogWalking[1];
cosmicEventDescription.innerText = allDescriptions.cosmicEvent[1];
