import { StatusBar } from 'expo-status-bar';
import React, {useEffect,useState} from 'react';
import { StyleSheet, Text, View,ImageBackground,ActivityIndicator } from 'react-native';

import DateTime from './components/DateTime'
import WeatherScroll from './components/WeatherScroll'
import SearchBar from './components/SearchBar';

const API_KEY = 'da257f6c23d27b02a28c7673dc23851c';
const img = require('./assets/cloud.jpg')



export default function App() {
  const [data,setData] = useState({});
  const [weatherData, setWeatherData] = useState(null);
  const [loaded, setLoaded] = useState(true);

      async function fetchWeatherData(cityName) {
        setLoaded(false);
        const API = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`
        try {
            const response = await fetch(API);
            if(response.status == 200) {
                const data = await response.json();
                setWeatherData(data);
            } else {
                setWeatherData(null);
            }
            setLoaded(true);
            
        } catch (error) {
            console.log(error);
        }
    }


  useEffect(() => {
    

    navigator.geolocation.getCurrentPosition((success) => {
        
      let {latitude, longitude } = success.coords;
      fetchDataFromApi(latitude,longitude )

      //fetchWeatherData('Colombo');
     

  }, (err) => {
    if(err){
      fetchDataFromApi("40.7128", "-74.0060")
    }
  })
  }, [])

  const fetchDataFromApi = (latitude, longitude) => {
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`).then(res => res.json()).then(data => {

      console.log(data)
      setData(data)
      })
  }
         if(!loaded) {
            return (
                <View style={styles.container}>
                    <ActivityIndicator color='gray'  size={36} />
                </View>
    
            )
        }
    
      else if(weatherData === null) {
  //           return (
  //               <View style={styles.container}>
  //                   <SearchBar fetchWeatherData={fetchWeatherData}/>
  //                   <Text style={styles.primaryText}>City Not Found! Try Different City</Text>
  //               </View>
  //           )
  //       }
  return (
    <View style={styles.container}>
      <ImageBackground source={img} style={styles.image}>
      <SearchBar fetchWeatherData={fetchWeatherData}/>
      {/* <Text style={styles.primaryText}>City Not Found! Try Different City</Text> */}
      <DateTime current={data.current} timezone={data.timezone} lat={data.lat} lon={data.lon}/>
     

      <WeatherScroll weatherData={data.daily}/>
      
      </ImageBackground>
      
    </View>
    
  );
}
  // useEffect(() => {
  //           fetchWeatherData('Colombo');
  //       }, [])
        
    
  //       if(!loaded) {
  //           return (
  //               <View style={styles.container}>
  //                   <ActivityIndicator color='gray'  size={36} />
  //               </View>
    
  //           )
  //       }
    
  //       else if(weatherData === null) {
  //           return (
  //               <View style={styles.container}>
  //                   <SearchBar fetchWeatherData={fetchWeatherData}/>
  //                   <Text style={styles.primaryText}>City Not Found! Try Different City</Text>
  //               </View>
  //           )
  //       }
    
  //       return (
  //           <View style={styles.container}>
  //               <Weather weatherData={weatherData} fetchWeatherData={fetchWeatherData}  />
  //           </View>
  //       );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue'
  },

  image:{
    flex:1,
    resizeMode:"cover", 
    justifyContent:"center"
  },
  primaryText: {
      margin: 20,
      fontSize: 28
  }
});


// import { StatusBar } from 'expo-status-bar';
// import React, { useState, useEffect } from 'react';
// import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
// import Weather from './components/Weather';
// import SearchBar from './components/SearchBar';

// const API_KEY = "46a9246bebba16d42b36aac3fc3ba8af";


// export default function App() {

//     const [weatherData, setWeatherData] = useState(null);
//     const [loaded, setLoaded] = useState(true);

//     async function fetchWeatherData(cityName) {
//         setLoaded(false);
//         const API = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`
//         try {
//             const response = await fetch(API);
//             if(response.status == 200) {
//                 const data = await response.json();
//                 setWeatherData(data);
//             } else {
//                 setWeatherData(null);
//             }
//             setLoaded(true);
            
//         } catch (error) {
//             console.log(error);
//         }
//     }

//     useEffect(() => {
//         fetchWeatherData('Mumbai');
//     }, [])
    

//     if(!loaded) {
//         return (
//             <View style={styles.container}>
//                 <ActivityIndicator color='gray'  size={36} />
//             </View>

//         )
//     }

//     else if(weatherData === null) {
//         return (
//             <View style={styles.container}>
//                 <SearchBar fetchWeatherData={fetchWeatherData}/>
//                 <Text style={styles.primaryText}>City Not Found! Try Different City</Text>
//             </View>
//         )
//     }

//     return (
//         <View style={styles.container}>
//             <Weather weatherData={weatherData} fetchWeatherData={fetchWeatherData}  />
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   primaryText: {
//       margin: 20,
//       fontSize: 28
//   }
// });