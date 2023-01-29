import {Typography,Box,TextField,Container,Button,Avatar} from '@mui/material';
// import SendIcon from '@mui/icons-material/Send';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import './App.css';
import { useEffect, useState } from 'react';

let baseURL = "https://api.openweathermap.org/data/2.5/weather?q=";
let myApiKey = '3293ea5c41361dacad10e0a4622a63e1';

const App = () => {
  const [cityName , setCityName] = useState('Dubai');
  const [cityData, setCityData] = useState(null);
  const [isError, setIsError] = useState(null);
  //use... = Это все ХУКИ react
  const fetchWeather = async () => {
    let url = baseURL+ `${cityName}&appid=${myApiKey}`
    const res = await fetch(url);
    const dataCity = await res.json()
    console.log("dataCity: ", dataCity);
    setCityData(dataCity)
  };
  
  useEffect(() => {
    fetchWeather()
  },[]);
  
  if (!cityData) {
    return <h1>Loading...</h1>
  }
  if (cityData?.cod == 404) {
    console.log('error catch');
    return <Typography variant='h2'>{ cityData?.message }</Typography>
  }

  const {name, wind, main:tempp} = cityData
  const {country} = cityData.sys
  const {main, icon} = cityData.weather[0]
  return ( 
    <Box sx={{ mt: 5}}>
      <Container maxWidth='sm'>
        <Box>
            {/* Начало Input */}
        <TextField
          onChange={(e) => {
            setCityName(e.target.value)
          }}

          sx={{ width: 435}}
          label="city name" 
          id="fullWidth" />
            {/* Конец input */}

        {/* Начало Search */}
        <Button 
        onClick={fetchWeather}
        sx={{ height: 56}} 
        variant="contained"  
        endIcon={<TravelExploreIcon />}> Search 
        </Button>
          {/* Конец Search */}
        </Box>

          {/* Начало Boxa */}
        <Box
        sx={{
          width: 800, 
          height:500, 
          borderRadius: 3,
          p: 3,
          bgcolor: '#0096c7', 
          m: '60px auto', }}>

            <Typography variant='h4' sx={{color: 'white'}}>Country: {country}</Typography>
            <Typography variant='h4' sx={{color: 'white'}}>City: {name}</Typography>
            <Typography variant='h5' sx={{mt: 40, ml: 20, color: 'white'}}>Status: {main}</Typography>
            <Typography variant='h5' sx={{ml: 50, mt: -4, color: 'white'}}>Wind: {wind.speed} km/h</Typography>
            <Typography variant='h4' sx={{mt: -28, ml: 50, fontSize: 55, color: 'white'}}> {Math.round(tempp.temp - 273)} °C</Typography>
            <Avatar
            sx={{width: 200, 
              height: 200,
              mt: -18,
              ml: 28, }} 
            alt="Weather" 
            src={` http://openweathermap.org/img/wn/${icon}.png`} />
          </Box>
            {/* Конец Boxa */}

          </Container>
          </Box>
  );
};

export default App;
//wech
//42:46
//твоя улыбка это стиль