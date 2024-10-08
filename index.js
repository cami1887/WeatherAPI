
import { usInfo } from "./data/US_States_and_Cities.js";
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

function displayWeather(e) {
    locationParameter = e.target.value;
    fetch('http://api.weatherapi.com/v1/current.json?key='+APIKey+'&q='+locationParameter+' '+stateSelect)
        .then((response) => 
            response.json())
            .then((data)=> 
                processData(data.current.temp_f, data.current.uv, data.current.cloud, data.current.precip_in, data.current.wind_mph, data.current.condition.text)
    );
    // fetch('http://api.weatherapi.com/v1/astronomy.json?key='+APIKey+'&q='+allCities[0])
    //     .then((response) => 
    //         response.json())
    //     .then((data)=> 
    //         processCosmicEvent(data.astronomy.astro.moon_phase))
}

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
            processData(data.current.temp_f, data.current.uv, data.current.cloud, data.current.precip_in, data.current.wind_mph, data.current.condition.text, data.location.localtime)
        )
    fetch('http://api.weatherapi.com/v1/astronomy.json?key='+APIKey+'&q='+allCities[0])
        .then((response) => 
            response.json())
        .then((data)=> 
            processCosmicEvent(data.astronomy.astro.moon_phase))
    }
    else {
        return false;
    }
}

function processData(temp, uv, cloud, precip, wind, condition, time) {
    console.log("uv: " + uv, "temp: "+ temp, "cloud cover: "+ cloud, "precipitation: "+ precip, "wind: "+ wind, "condition: "+ condition, "Regular Time: " + time)
    processTime(time);
    processUv(uv);
    processDogWalking(temp);
    processClothing(temp, precip);
    processMentalHealth(cloud, wind, precip);
}

function processTime(time) {
    let currentTime = new Date(time);
    let hours = currentTime.getHours();
    let minutes = currentTime.getMinutes();
    let ampm = "";
    if (hours < 12) {
        ampm = "AM";
    }
    if (hours >= 12) {
        hours -= 12;
        ampm = "PM";
    }
    timeOutput.innerText = "Last Updated: " + hours + ":" + minutes + " " + ampm;
}

function processCosmicEvent(moonPhase) {
    console.log(moonPhase);
    cosmicEventDescription.innerText = "It's a "+ moonPhase + " tonight!"
}

function processClothing(temp, precipitation) {
    clothingDescription.innerText = "";
    if (temp <= 24) {
        clothingDescription.innerText = "It's very cold out! Make sure to layer up and wear a heavy coat to keep warm."
    }
    if (temp >= 25 && temp <= 44) {
        clothingDescription.innerText = "Its a chilly out right now. For warmth, be sure you at least wear a light/medium coat!"
    } 
    if (temp > 44 && temp <= 64) {
        clothingDescription.innerText = "It's cool right now. A singe fleece layer for warmth should be enough."
    }
    if (temp > 64 && temp <=79) {
        clothingDescription.innerText = "Its gonna be a comfortable day! A tee and pants will be plenty."
    }
    if (temp > 79 && temp <= 99) {
        clothingDescription.innerText = "Its gonna be warm today, wear loose and airy clothing."
    }
    if (temp > 99) {
        clothingDescription.innerText = "Its a scorcher! Make sure you wear light and airy clothing. Shorts and a tank may be in order. It's especially important to stay hydrated!"
    }

    if (precipitation >= 0.07 && precipitation < 0.19){
        clothingDescription.innerText += " It also looks like its lightly precipitating today so consider wearing something with a hood."
    }
    if (precipitation >= 0.19 && precipitation <= 0.23){
        clothingDescription.innerText = clothingDescription.innerText + " It is moderately precipitating as well, so a hooded, waterproof shell is recommended."
    }
    if (precipitation > 0.23 && precipitation <= 0.78){
        clothingDescription.innerText = clothingDescription.innerText + " There is precipitation so please wear a waterproof and hooded outer shell along with close-toed shoes."
    }
    if (precipitation > 0.78){
        clothingDescription.innerText = clothingDescription.innerText + " It's precipitating heavily so time to break out the waterproof coats, hats, and boots. An umbrella could be good too...if you're into that sort of thing"
    }
}

function processMentalHealth(cloud, wind, precipitation) {
    let total = 0;
    if (cloud < 10) {
        total += 1;
    }
    if (cloud >= 10 && cloud < 25) {
        total += 2;
    }
    if (cloud >= 25 && cloud < 50) {
        total += 3;
    }
    if (cloud >= 50 && cloud < 90) {
        total += 4;
    }
    if (cloud >= 90) {
        total += 5;
    }

    if (wind <= 3) {
        total += 1;
    }
    if (wind > 3 && wind <= 7) {
        total += 2;
    }
    if (wind > 7 && wind <= 12) {
        total += 3;
    }
    if (wind > 12 && wind <= 24) {
        total += 4;
    }
    if (wind > 24) {
        total += 5;
    }

    if (precipitation <= 0.07) {
        total += 1;
    }
    if (precipitation > 0.07 && precipitation <= .17 ) {
        total += 2;
    }
    if (precipitation > 0.17 && precipitation <= .41) {
        total += 3;
    }
    if (precipitation > 0.41 && precipitation <= .98) {
        total += 4;
    }
    if (precipitation > .98) {
        total += 5;
    }
    console.log(total)
    if (total >= 3 && total < 7) {
        mentalHealthDescription.innerText = allDescriptions.mentalHealth[0];
        
    }
    if (total >= 7 && total < 11) {
        mentalHealthDescription.innerText = allDescriptions.mentalHealth[1]
    }
    if (total >= 11) {
        mentalHealthDescription.innerText = allDescriptions.mentalHealth[2]
    }
}

function processUv(uv) {
    if (uv === 1 || uv === 2) {
        console.log(uv)
        uvDescription.innerText = allDescriptions.uvIndex[0]
    }

    else if (uv === 3 || uv === 4 || uv === 5 || uv === 6 || uv === 7) {
        console.log(uv)
        uvDescription.innerText = allDescriptions.uvIndex[1]
    }

    else if (uv >= 8) {
        console.log(uv);
        uvDescription.innerText = allDescriptions.uvIndex[2] 
    }
    else {
        console.log("error")
    }
}

function processDogWalking(temperature) {
    if (temperature >= 89) {
        console.log(temperature);
        dogWalkingDescription.innerText = allDescriptions.dogWalking[0];
    }
    else if (temperature <= 33) {
        console.log(temperature);
        dogWalkingDescription.innerText = allDescriptions.dogWalking[2];
    }
    else {
        console.log(temperature);
        dogWalkingDescription.innerText = allDescriptions.dogWalking[1];
    }
}


const allDescriptions = {
    uvIndex: [
        "UV index is low, feel free to enjoy the outdoors with minimal protection!",
        "There is medium sun exposure risk. Avoid the midday sun and wear sunscreen!",
        "There is a high risk of sun exposure. Please avoid the outdoors, especially the midday sun."
    ],
    mentalHealth: [
        "The weather is nice right now! Enjoy the day with minimal negative effects from the weather.", 
        "The current weather conditions may have a neutral effect on your mood. If you're prone to depression or SAD make sure you get out of the house and move your body!",
        "The weather will likely have a negative impact on your mood and that's okay. Maybe its best to spend time with loved ones indoors over a nice warm meal and drink"],
    dogWalking: [
        "Most dogs are at risk of heat stroke when temperatures are above 89°F, and you should avoid walking your dog when it's 90°F or hotter. Some dogs may be at risk even in temperatures as low as 70°F–77°F.",
        "The weather is in perfect conditon to take your pup for a walk right about now!", 
        "Temperatures below 32°F are too cold to keep your dog outside for long."],
}


uvDescription.innerText = allDescriptions.uvIndex[1];
dogWalkingDescription.innerText = allDescriptions.dogWalking[1];
