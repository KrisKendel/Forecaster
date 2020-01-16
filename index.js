let btn = document.getElementById("button");

btn.addEventListener("click", function() {
  let text = document.getElementById("text").value;
  let api = "http://api.weatherbit.io/v2.0/forecast/daily?city=";
  let apikey = ",HR&key=ff96fcff7418482a9eb4fde448866d04";
  let sum = api + text + apikey;

  let ourRequest = new XMLHttpRequest();
  ourRequest.open("GET", sum, true);

  ourRequest.onload = function() {
    let ourData = JSON.parse(ourRequest.responseText);

    for (let i = 0; i < ourData.data.length; i++) {
      let d = new Date();
      let getDay = (d.getDay() + i) % 7;

      let whatDayItIs = dayOfWeek(getDay);

      let date = ourData.data[i].valid_date;
      let temp = ourData.data[i].temp;
      let maxTemp = ourData.data[i].max_temp;
      let minTemp = ourData.data[i].min_temp;

      let days = "day" + i;
      let dates = "date" + i;
      let temps = "temp" + i;
      let maxtemps = "maxtemp" + i;
      let mintemps = "mintemp" + i;

      document.getElementById(days).innerHTML = whatDayItIs;
      document.getElementById(dates).innerHTML = date; // must format date
      document.getElementById(temps).innerHTML = temp;
      document.getElementById(maxtemps).innerHTML = maxTemp;
      document.getElementById(mintemps).innerHTML = minTemp;
    }
  };
  if (text) {
    ourRequest.send();
  }
  document.getElementById("name-city").innerHTML = text;
});

function dayOfWeek(dayNumber) {
  switch (dayNumber) {
    case 0:
      return "Sunday";
    case 1:
      return "Monday";
    case 2:
      return "Thuesday";
    case 3:
      return "Wedenesday";
    case 4:
      return "Thursday";
    case 5:
      return "Friday";
    case 6:
      return "Saturday";
  }
}
