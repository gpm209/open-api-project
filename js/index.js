const output = document.getElementById("output");

document
  .getElementById("tempBtn")
  .addEventListener("click", () => getWeather("temperature_2m"));
document
  .getElementById("rainBtn")
  .addEventListener("click", () => getWeather("precipitation"));

const getWeather = (dataPoint) => {
  const city = document.getElementById("cityInput").value;

  if (!city) {
    alert("Please enter a city");
    return;
  }

  const geoURL = `https://geocoding-api.open-meteo.com/v1/search?name=${city}`;

  fetch(geoURL)
    .then((res) => res.json())
    .then((geoData) => {
      if (!geoData.results) throw new Error("City not found");

      const { latitude, longitude } = geoData.results[0];
      const weatherURL = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=${dataPoint}`;

      return fetch(weatherURL);
    })
    .then((res) => res.json())
    .then((weatherData) => {
      const value = weatherData.current[dataPoint];
      if (dataPoint === "temperature_2m") {
        const fahrenheit = (value * 9) / 5 + 32;
        output.textContent = `Temperature: ${value} °C | ${fahrenheit.toFixed(2)} °F`;
      } else {
        output.textContent = `Rain: ${value} mm`;
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      output.textContent = "Something is wrong.";
    });
};
