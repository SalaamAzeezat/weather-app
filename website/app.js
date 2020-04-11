// Personal API Key for OpenWeatherMap API
let baseURL ='http://api.openweathermap.org/data/2.5/weather?zip=,';
let apiKey = '&appid=d3847693e36f8b671bc7bb8f7744c5e8';
let countryCode = 'ng';


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction)
/* Function called by event listener */
function performAction(e){
    const zip = document.getElementById('zip').value;
    const content = document.getElementById('feelings').value;

    getWeather(baseURL, zip, countryCode, apiKey)
    .then(function(data){
        console.log(data);
        postData('/add', {date:newDate, temp:list.main.temp, content:content});
    })
    .then(
        updateUI()
    )
    }
    const updateUI = async () =>{
        const request = await fetch('/all');
        try{
            const allData = await request.json();
            document.getElementById('date').innerHTML = allData[0].date;
            document.getElementById('temp').innerHTML = allData[0].temp;
            document.getElementById('content').innerHTML = allData[0].content;
        }
        catch(error){
            console.log("error", error);
        }
    }
/* Function to GET Web API Data*/
    const getWeather = async (baseURL, zip, countryCode, apiKey)=>{
        
        const res = await fetch(baseURL+zip+countryCode+apiKey)
    
        try {
    
        const data = await res.json();
        console.log(data)
        return data;
        }  catch(error) {
        console.log("error", error);
        // appropriately handle the error
        }
    }

/* Function to POST data */
const postData = async(url='', data= {})=>{
const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header        
  });

    try {
      const newData = await response.json();
      return newData
    }
    catch(error) {
    console.log("error", error);
    }
}

/* Function to GET Project Data */