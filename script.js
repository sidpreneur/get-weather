const myButton = document.querySelector('#myButton');
const apiKey = '91bb49e733f6cc6cc0a83cdc87379e23';
const result = document.getElementById("result");

myButton.addEventListener('click', () => {
  const city = document.querySelector('#city').value;

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      if (data.weather) {
        console.log("Weather Data:", data);
        if((data.main.temp - 273.15) < 10){
            var emoji='❄️';
        }
        else if((data.main.temp - 273.15) < 25){
            var emoji='☁️'
        }
        else{
            var emoji='☀️';
        }



        result.innerHTML = `
          <h3>Weather in ${data.name}, ${data.sys.country}</h3>
          <h5>Coordinates: ${data.coord.lon} , ${data.coord.lat}</h5>
          <p>Weather: ${data.weather[0].description} ${emoji}</p>
          <p>Temperature: ${(data.main.temp - 273.15).toFixed(2)}°C</p>
        `;
      } else {
        console.error("Error:", data.message);
      }
    })
    .catch(error => {
      console.error("Fetch Error:", error);
      result.innerHTML = `<p>Error: ${error.message}</p>`;
    });
});
