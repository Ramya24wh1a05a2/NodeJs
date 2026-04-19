
const apiKey ="96b3f525c5ec772eeb957c0887e64b9f"; // get from OpenWeather

let chart;

async function getWeather() {
    const city = document.getElementById("city").value;

    if (!city) {
        alert("Enter city name");
        return;
    }

    try {
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

        const response = await fetch(url);
        const data = await response.json();

        console.log(data);

        if (data.cod !== "200") {
            alert(data.message);
            return;
        }

        const temps = data.list.slice(0, 8).map(item => item.main.temp);
        const times = data.list.slice(0, 8).map(item => item.dt_txt);

        drawChart(times, temps);

    } catch (error) {
        console.error(error);
        alert("Something went wrong");
    }
}