const apiURL =
  "https://api.open-meteo.com/v1/forecast?latitude=37.7749&longitude=-122.4194&current=precipitation,temperature_2m";
fetch(apiURL)
  .then((response) => response.json())
  .then((data) => {
    console.log("Response: ", data);

    let temperature = data.current.temperature_2m;

    let rain = data.current.precipitation;

    console.log(`Temperature: ${temperature} °C`);

    console.log(`Rain: ${rain} mm `);
  })
  .catch((error) => console.error("Something went wrong: ", error));
