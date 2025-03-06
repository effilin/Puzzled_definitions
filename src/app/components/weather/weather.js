'use client'
import { useEffect, useState, useContext } from "react"
import { UserContext } from "@/app/context";
import '../../globals.css';


export default function Weather() {

 const [weather, setWeather] = useState()
 const {currentUser, setCurrentUser} = useContext(UserContext);
 const [conditions, setConditions] = useState();
 const [city, setCity] = useState('');
 const [state, setState] = useState('');
 const [temp, setTemp] = useState('');
 const [icon, setIcon] = useState('')



    useEffect(() => {

        let isMounted = true;
        const zipCodeCurrent = currentUser.zipCode? currentUser.zipCode: 23218;
      
        const getWeather = async() => {
            try {
                const res = await fetch('/api/weather', {
                 method:'POST',
                 headers: {
                     'Content-Type': 'application/json'
                    },
                 body: JSON.stringify({ zipCode: zipCodeCurrent })
                });
     
                const data = await res.json()
                console.log(data);
                if(isMounted) {
                    if (res.ok) {
                        console.log('weather fetched')
                        setWeather(data)
                    };
                    if (!res.ok) {
                        console.log(`failed to fetch weather:${res.status}`)
                    }
                }
                 
            }catch(error) {
                console.log("error fetching")
            }
        };
        getWeather()

        return() => {
            isMounted = false;
        }

    }, [currentUser]);


useEffect(() => {
    if(!weather){
        console.log('no weather');
    }
    if(weather) {
    console.log(`weather is${weather.current}`)
    
    setConditions( weather.current.condition.text);
    setCity( weather.location.name)
    setState( weather.location.region);
    setTemp( weather.current.temp_f)
    setIcon(weather.current.condition.icon)
}},[weather])




return ( 
<div>
    {!weather? 
    <div>
        <h4>Loading... </h4>
    </div>:
    <div className="d-flex">
        <div className="weather-box">
            <h5 className="text">Weather in: {city}, {state}</h5>
            <p className="text2">Conditions: {conditions}.</p>
            <p className="text2">Temperature: {temp} &#x2109;</p>
            <p className="text2">Wind Chill: {weather.current.windchill_f} &#x2109; </p>
        </div>
        <div className="icon-box d-flex justify-content-end">
            <img src={icon} id="weather-icon" className="float-end" alt={conditions}/>
        </div>
    </div>}
    <div className="d-flex justify-center">
        <h6 className="me-4 text2">Powered by : </h6> 
        <a href="https://www.weatherapi.com/" title="Free Weather API">
        <img src='//cdn.weatherapi.com/v4/images/weatherapi_logo.png' alt="Weather data by WeatherAPI.com" border="0"/>
        </a>
    </div>

</div>
)
}
