
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
    let state = e.target.value;
    if (state != 'select') {
        let city = Object.values(Object.values(usInfo));
        let states = Object.keys(usInfo);
        let index = states.indexOf(state)
        let allCities = city[index]?.sort();
        let weatherInfo = [];
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
            displayText(data.current.temp_f, data.current.temp_c)
            // weatherInfo = [data.current.temp_f, data.current.temp_c]
            // console.log(Object.entries(data.current.temp_c))
        )
        // testFuncton(weatherInfo)
        // console.log(weatherInfo)
    }

    else {
        return false;
    }
}

function displayText(f, c) {
    console.log(f,c)

}

function displayWeather(e) {
    locationParameter = e.target.value;
    fetch('http://api.weatherapi.com/v1/current.json?key='+APIKey+'&q='+locationParameter).then((response) => response.json()).then((data)=> console.log(data));
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
