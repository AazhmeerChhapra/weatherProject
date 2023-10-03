import { lazy, useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions, ActivityIndicator} from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import {  clear_day, clear_night, cloud_day, cloud_night, haze_day, haze_night, rain_day, rain_night, snow_day, snow_night } from "../assets/background/index";
const API_KEY = "29958d62aebdd708a4ecc66f67042511"; 


const Weather = (props) => {
    // <FontAwesome5 name="snowflake" size={24} color="black" />
    // <Feather name="sun" size={24} color="black" />
    // <Ionicons name="rainy" size={24} color="black" />
    // <Fontisto name="day-haze" size={24} color="black" />
    // <Entypo name="cloud" size={24} color="black" />

    const [ weatherData, setWeatherData ] = useState(null);
    const [loading, setLoading] = useState(false);
    const [icon, secIcon ] = useState('');
    const [background, setBackground] = useState('');
async function getWeatherData(cityName) {
    setLoading(true);
    const API = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`;
    let res = await fetch(API); // it will take time to fetch API
    if (res.status == 200) {
     res = await res.json();
     setWeatherData(res);

     }else{
       setWeatherData(null);
  }
  setLoading(false)

}
useEffect(() => { // to call API
    getWeatherData(props.cityName);

    const iconObj = {
        snow: <FontAwesome5 name="snowflake" size={48} color="white" />,
        clear: <Feather name="sun" size={48} color="white" />,
        rain:<Ionicons name="rainy" size={48} color="white" />,
        haze:<Fontisto name="day-haze" size={48} color="white" />,
        cloud:<Entypo name="cloud" size={48} color="white" />

    }
    if (weatherData != null) {

        const now = new Date();
        const sunrise = new Date(weatherData.sys.sunrise * 1000);
        const sunset = new Date(weatherData.sys.sunset * 1000);
        const isDayTime = now > sunrise && now < sunset;
    switch (weatherData.weather[0].main) {
        case 'Snow':
            secIcon(iconObj.snow);
            isDayTime ? setBackground(snow_day) : setBackground(snow_night);

            break;

        case 'Clear':
            secIcon(iconObj.clear);
            isDayTime ? setBackground(clear_day) : setBackground(clear_night);

            break;

        case 'Rain':
            secIcon(iconObj.rain);
            isDayTime ? setBackground(rain_day) : setBackground(rain_night);

            break;

        case 'Haze':
            secIcon(iconObj.haze);
            isDayTime ? setBackground(haze_day) : setBackground(haze_night);

            break;

        case 'Clouds':
            secIcon(iconObj.cloud)
            isDayTime ? setBackground(cloud_day) : setBackground(cloud_night);

            break;
    
        default:
            secIcon(iconObj.haze)
    }
     props.background(background);   
    }
}, [props.cityName]) // when first time app is rendered, empty brackets call api
if (loading) {
    return(
        <ActivityIndicator size='large' />
    );
}
else if (weatherData == null) {
    return(
        <Text style = {{marginTop: 20, fontSize: 24, textAlign: 'center'}}>
            Enter City Name
        </Text>
    );
}
else{

    return ( 
    <View>
        <View style ={styles.background} ></View>
        <Text style = {styles.degree}>{weatherData.wind.deg}°</Text>
        <Text style = {styles.cityName}>{weatherData.name}</Text>
        <View style = {styles.icon}>
            <View style = {styles.temperature}>
                <Text style = {{color: 'white', fontSize:20}}>Humidity : {weatherData.main.humidity}</Text>
                <Text style = {{color: 'white', fontSize:20}}>Temperature : {weatherData.main.temp}</Text>

            </View>
            <View>
            <Text>{icon}</Text>

            </View>
        </View>
    </View> 
    
);
    }
}
 
export default Weather;

const styles = StyleSheet.create({

    degree:{
        fontSize: 80,
        textAlign:"center",
        marginTop:"10%",
        color:"white"
    },
    cityName:{
        textAlign:"center",
        fontSize:20,
        color:"white"
    },
    icon:{
        flexDirection: "row",
        justifyContent:"space-between",
        width:Dimensions.get('screen').width - 50,
        alignItems:"center", 
        height:"50%",

    },
    temperature:{
        backgroundColor : 'black',
        borderRadius:10, 
        padding:20,
    },
    background: {
        backgroundColor:'black',
        width:"90%",
        height:150,
        position:"absolute",
        top:30,
        borderRadius:5,
        opacity:.5
    }
})