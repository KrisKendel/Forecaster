let btn = document.getElementById("button");
let containerDisp = document.getElementById("container");
let cityDisp = document.getElementById("city");
let cityName = document.getElementById("name-city");
let text = document.getElementById("text");


text.addEventListener("keydown", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    btn.click();
  }
});

btn.addEventListener("click", function () {
  let api = "http://api.weatherbit.io/v2.0/forecast/daily?city=";
  let apikey = ",HR&key=ff96fcff7418482a9eb4fde448866d04";
  let sum = api + text.value + apikey;
  let ourRequest = new XMLHttpRequest();

  ourRequest.onreadystatechange = function () {
    if (ourRequest.readyState === 4) {
      if (ourRequest.status == 200) {
        containerDisp.style.display = media();
        cityDisp.style.display = "block";
        cityName.innerHTML = text.value;
      } else if (ourRequest.status >= 500) {
        return alert("internal server error!");
      } else if (ourRequest.status >= 402 && ourRequest.status <= 420) {
        return alert("Client error!");
      } else if (ourRequest.status == 204) {
        return alert("Please enter valid name of the Croatian city!");
      } else if (ourRequest.status == 400 || ourRequest.status == 401) {
        return alert("Bad request & unauthorized error!");
      }
    }
  };
  ourRequest.open("GET", sum, true);
  ourRequest.onload = function () {
    let ourData = JSON.parse(ourRequest.responseText);

    for (let i = 0; i < ourData.data.length; i++) {
      let d = new Date();
      let getDay = (d.getDay() + i) % 7;
      let whatDayIsIt = dayOfWeek(getDay);

      let date = ourData.data[i].valid_date;
      let temp = ourData.data[i].temp;
      let maxTemp = ourData.data[i].max_temp;
      let minTemp = ourData.data[i].min_temp;

      let days = "day" + i;
      let dates = "date" + i;
      let temps = "temp" + i;
      let maxtemps = "maxtemp" + i;
      let mintemps = "mintemp" + i;

      document.getElementById(days).innerHTML = whatDayIsIt;
      document.getElementById(dates).innerHTML = convertDate(date);
      document.getElementById(temps).innerHTML = temp;
      document.getElementById(maxtemps).innerHTML = maxTemp;
      document.getElementById(mintemps).innerHTML = minTemp;
    }
  };
  if (text) {
    ourRequest.send();
  }
});

function convertDate(dateString) {
  var p = dateString.split(/\D/g);
  return [p[2], p[1], p[0]].join(".");
}

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

function media() {
  window.onresize = media;
  let query = window.matchMedia("(max-width: 659px)");
  let maxQuery = window.matchMedia("(max-width: 1500px)");

  if (query.matches) {
    return (containerDisp.style.display = "block");
  } else if (!query.matches && maxQuery.matches) {
    return (containerDisp.style.display = "grid");
  } else if (!maxQuery.matches) {
    return (containerDisp.style.display = "flex");
  }
}