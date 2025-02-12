



// Selects the first form element in your HTML.
// adds event listener that runs when form is submitted

document.querySelector("form").addEventListener("submit", function (event) {
   event.preventDefault(); //stop the page from reloading 

   const city = document.getElementById("city").value.trim(); //get user input without spaces
 
   
   if(city) {

      const apikey = `60cd929853a7126e32474435012191dd`;
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
       console.log("Fetching", apiUrl);
    
      fetch(apiUrl)
      .then(response => {
         if(!response.ok){
            throw new Error("City not found");
         }

         return response.json();
      })
      .then(data => {
         console.log(data);  //log api response 

      })
      .catch(error => console.error("Error fetching data: ", error));
   } else {
      alert("Please enter a city name!");
   }
});
