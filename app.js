/* Global Variables */
const projectData = {};

// Create a new date instance dynamically with JS

const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip='
const apiKey = '&APPID=85c0955723ea8d8ca16a480fd439457a&units=imperial'

document.getElementById('generate').addEventListener('click', action);

/*** function action ***/

function action() {

  const userResponse = document.getElementById('feelings').value;
  const zip = document.getElementById('zip').value;

  getData(baseURL+zip+apiKey)
  .then(function (data) {
    console.log(data);
    console.log("success");
    sendData({temperature: data.main.temp, date:data.dt, userResponse:userResponse});
  })

  .then (setTimeout(changeUI, 2000))
}


/**** getData ****/
const getData = async (url='') => {

const res = await fetch(url);

try {
  const data = await res.json();
  console.log(data);
  return data;
}

catch(error) {
  console.log("error", error)
}

}

/**** sendData ****/
const sendData = (data = {}) => {
console.log(data);

projectData.temperature = data.temperature;
projectData.date = data.date;
projectData.userResponse = data.userResponse;

};

/**** changeUI ****/
const changeUI = () => {

  let data = projectData;
    console.log(data);

    let d = new Date(data.date * 1000);
    let newDate = (d.getMonth()+1)+'.'+ d.getDate()+'.'+ d.getFullYear();

    document.getElementById('date').innerHTML = newDate;
    document.getElementById('temp').innerHTML = data.temperature;
    document.getElementById('content').innerHTML = data.userResponse;
    return data;

}
