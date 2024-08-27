const APIKey = '3792aefde03b401da81232716240808';
let locationInput = 'united states portland oregon';
const timeInput = document.querySelector('.time');
const uvDescription = document.querySelector('.UV-description');
const clothingDescription = document.querySelector('.clothing-description');
const mentalHealthDescription = document.querySelector('.mental-health-description');
const dogWalkingDescription = document.querySelector('.dog-walking-description');
const cosmicEventDescription = document.querySelector('.cosmic-events-description');

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

fetch('http://api.weatherapi.com/v1/current.json?key='+APIKey+'&q='+locationInput).then((response) => response.json()).then((data)=> console.log(data));


uvDescription.innerText = allDescriptions.uvIndex[1];
clothingDescription.innerText = allDescriptions.clothing[1];
mentalHealthDescription.innerText = allDescriptions.mentalHealth[1];
dogWalkingDescription.innerText = allDescriptions.dogWalking[1];
cosmicEventDescription.innerText = allDescriptions.cosmicEvent[1];
