

  
// const searchBtn = document.getElementById("searchBtn");
// const cityInput = document.getElementById("cityInput");
// const weatherDisplay = document.getElementById("weatherDisplay");
// const forecastDisplay = document.getElementById("forecastDisplay");
// const errorMsg = document.getElementById("errorMsg");
// const recentCities = document.getElementById("recentCities");
// const recentList = document.getElementById("recentList");

// Selects the first form element in your HTML.
// adds event listener that runs when form is submitted

// document.querySelector("form").addEventListener("submit", function (event) {
//    event.preventDefault(); //stop the page from reloading 

//    const city = document.getElementById("city").value.trim(); //get user input without spaces
 
   
//    if(city) {

//       const apikey = `60cd929853a7126e32474435012191dd`;
//       const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
//        console.log("Fetching", apiUrl);
    
//       fetch(apiUrl)
//       .then(response => {
//          if(!response.ok){
//             throw new Error("City not found");
//          }

//          return response.json();
//       })
//       .then(data => {
//          console.log(data);  //log api response 

//       })
//       .catch(error => console.error("Error fetching data: ", error));
//    } else {
//       alert("Please enter a city name!");
//    }
// });




// function getWeather() {
//    const apikey = `60cd929853a7126e32474435012191dd`;
//    const city = document.getElementById("city").value.trim();

//    if(!city) {
//       alert("Please enter a city!!");
//       return;
//    }

//    const curetnWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
//    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apikey}`;


//    fetch(curetnWeatherUrl)
//    .then(response => response.json())
//    .then(data => {
//       dispalyWeather(data);
//    })
//    .catch(error => {
//       console.error('Error fetching current weater data:' , error);
//       alert('Error fetching current weather data. Please try again. ');
//    });


//    fetch(forecastUrl)
//    .then(response => response.json())
//    .then(data => {
//       dispalyHourlyForecast(data);
//    })
//    .catch(error => {
//       console.error('Error fetching hourly forecast data:' , error);
//       alert('Error fetching hourly forecast data. Please try again. ');
//    });
// }



// function dispalyWeather(data) {
   
// }


// function dispalyHourlyForecast(data) {
   
// }




//integrating weather Api

// const apikey = `60cd929853a7126e32474435012191dd`;
// const city = document.getElementById("city").value.trim();
// const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;

// fetch(apiUrl)
//   .then(response => response.json())
//   .then(data => {
//     console.log(data);
//     const temperature = data.main.temp;
//     const weatherDescription = data.weather[0].description;
//     console.log(`Temperature: ${temperature}°C`);
//     console.log(`Weather: ${weatherDescription}`);
//   })
//   .catch(error => console.error("Error fetching weather data:", error));


// //   Display Data on the Webpage

// const cityName = document.getElementById("city-name");
// const temp = document.getElementById("temp");
// const condition = document.getElementById("condition");

// fetch(apiUrl)
//   .then(response => response.json())
//   .then(data => {
//     cityName.textContent = data.name;
//     temp.textContent = data.main.temp;
//     condition.textContent = data.weather[0].description;
//   })
//   .catch(error => console.error("Error fetching weather data:", error));



// Use Geolocation 
// To get the weather for the user’s current location








//all theupper code is not working have errors in it but it was a good practice so i decided to keep it.
//  please ignore the upper code and focus on the lower one


document.addEventListener("DOMContentLoaded", () => {
   const API_KEY = "60cd929853a7126e32474435012191dd";
   const searchInput = document.getElementById("city");
   const searchButton = document.getElementById("searchBtn");
   const locationButton = document.getElementById("currentLocationBtn");
   const recentCitiesDropdown = document.getElementById("recentCities");
   const recentList = document.getElementById("recentList");
   const weatherDisplay = document.getElementById("weather");
   const forecastDisplay = document.getElementById("forecastDisplay");
   const forecastContainer = document.getElementById("forecastContainer");
   const cityName = document.getElementById("city-name");
   const temp = document.getElementById("temp");
   const condition = document.getElementById("condition");
   const humidity = document.getElementById("humidity");
   const windSpeed = document.getElementById("wind-speed");
   const weatherIcon = document.getElementById("weather-icon");
   const errorMsg = document.getElementById("errorMsg");

   //fetching the api from openweathermap
   
   function fetchWeather(city) {
       fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
           .then(response => response.json())
           .then(data => {
               if (data.cod === 200) { 
                   displayWeather(data);
                   fetchForecast(city);
                   saveRecentSearch(city);
               } else {
                   showError("City not found. Please enter a valid city name.");
               }
           })
           .catch(error => showError("Error fetching weather data. Please try again.", error));
   }
   
   //fetching the data acrouding to the location of the user
   function fetchWeatherByLocation(lat, lon) {
       fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
           .then(response => response.json())
           .then(data => {
               displayWeather(data);
               fetchForecast(data.name);
           })
           .catch(error => showError("Error fetching location weather.",error));
   }

   //fetching the data of a city from 5-days apart
   
   function fetchForecast(city) {
       fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`)
           .then(response => response.json())
           .then(data => {
               if (data.cod === "200") {
                   displayForecast(data.list);
               } else {
                   showError("Error fetching forecast data.");
               }
           })
           .catch(error => showError("Error fetching forecast data. Please try again.",error));
   }
   

   //displaying the data onto the webpage

   function displayWeather(data) {
       const { name, main, wind, weather } = data;
       cityName.textContent = name;
       temp.textContent = main.temp;
       condition.textContent = weather[0].description;
       humidity.textContent = main.humidity;
       windSpeed.textContent = wind.speed;
       weatherIcon.src = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
       weatherIcon.alt = weather[0].description;
       weatherDisplay.classList.remove("hidden");
       errorMsg.classList.add("hidden");
   }
   
   function displayForecast(forecastData) {
       forecastContainer.innerHTML = "";
       forecastDisplay.classList.remove("hidden");
       
       const dailyForecasts = {};
       
       forecastData.forEach(entry => {
           const date = entry.dt_txt.split(" ")[0];
           if (!dailyForecasts[date]) {
               dailyForecasts[date] = entry;
           }
       });
       
       Object.values(dailyForecasts).slice(0, 5).forEach(day => {
           const forecastElement = document.createElement("div");
           forecastElement.classList.add("p-4", "bg-blue-100", "rounded-lg", "text-center", "shadow-md");
           forecastElement.innerHTML = `
               <p class="font-bold">${day.dt_txt.split(" ")[0]}</p>
               <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="${day.weather[0].description}" class="mx-auto">
               <p>${day.main.temp}°C</p>
               <p>Wind: ${day.wind.speed} km/h</p>
               <p>Humidity: ${day.main.humidity}%</p>
           `;
           forecastContainer.appendChild(forecastElement);
       });
   }

   //showing errors if any
   
   function showError(message) {
       errorMsg.textContent = message;
       errorMsg.classList.remove("hidden");
       weatherDisplay.classList.add("hidden");
       forecastDisplay.classList.add("hidden");
   }

   //saving the seartch city that is typed into the input and storing it into the localstorage
   
   function saveRecentSearch(city) {
       let recentSearches = JSON.parse(localStorage.getItem("recentSearches")) || [];
       if (!recentSearches.includes(city)) {
           recentSearches.unshift(city);
           localStorage.setItem("recentSearches", JSON.stringify(recentSearches.slice(0, 5)));
           updateRecentSearches();
       }
   }

   //updating the recent searches
   
   function updateRecentSearches() {
       let recentSearches = JSON.parse(localStorage.getItem("recentSearches")) || [];
       recentList.innerHTML = "";
       if (recentSearches.length > 0) {
           recentCitiesDropdown.classList.remove("hidden");
           recentSearches.forEach(city => {
               let li = document.createElement("li");
               li.textContent = city;
               li.classList.add("cursor-pointer", "hover:bg-gray-200", "p-2", "rounded");
               li.addEventListener("click", () => fetchWeather(city));
               recentList.appendChild(li);
           });
       } else {
           recentCitiesDropdown.classList.add("hidden");
       }
   }
   

   //adding event listeners to the search button for it to work our ways 
   searchButton.addEventListener("click", () => {
       let city = searchInput.value.trim();
       if (city) fetchWeather(city);
   });
   
   locationButton.addEventListener("click", () => {
       if (navigator.geolocation) {
           navigator.geolocation.getCurrentPosition(
               position => fetchWeatherByLocation(position.coords.latitude, position.coords.longitude),
               () => showError("Unable to retrieve location."));
       } else {
           showError("Geolocation is not supported by your browser.");
       }
   });
   
   updateRecentSearches();
});