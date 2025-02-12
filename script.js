

async function getWather(params) {
const api = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=YOUR_API_KEY`;
    
 const city = document.getelementById("city").value;
 if(!city) {
    alert("Please enter a city!");
    return;
 }

 const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
 
 try{
    const response = await fetch(url);
    const data = await response.json();

    if(data.cod !== 200){
        document.getElementById("weather").innerHTML = `<p class="text-red-500">${data.message}</p>`;
        return;
    }

    document.getElementById("weather").innerHTML = `
    <p class="text-gray-700">${data.name}, ${data.sys.country}</p>
    <p class="text-4xl font-bold">${data.main.temp}°C</p>
    <p class="text-gray-500">${data.weather[0].description}</p>
`;
 }
 catch(error){
    console.error("Error fetching weather data:" , error);
 }

}


