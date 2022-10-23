import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native'
import RNPickerSelect from 'react-native-picker-select';
import { Feather } from '@expo/vector-icons'
import {useState, useEffect} from 'react'
import * as Location from 'expo-location'
import { EvilIcons } from '@expo/vector-icons' 
import ThemeContext from './context/ThemeContext';

import InfoCard from './components/InfoCard'
import MainCard from "./components/MainCard"

import getCurrentWeather from './api/consultApi'

export default function App() {

  const axios = require('axios')
  const themeHook = useState("dark");
  const [darkTheme, setDarkTheme] = useState(true)
  
  const [currentTemperature, setCurrentTemperature] = useState('0')

  const [locationCoords, setLocationCoords] = useState({
    latitude: 13.6894,
    longitude: -89.1872
  });

  const [locationName, setLocationName] = useState('Brasil, Fortaleza')
  
  const [temperatureMin, setTemperatureMin] = useState('21')
  const [temperatureMax, setTemperatureMax] = useState('32')
  const [wind, setWind] = useState('')
  const [humidity, setHumidity] = useState('')

  async function setCurrentWeatherEspecific(coords){
    console.log(coords);
    await getLocation();
    const data = await getCurrentWeather(coords)
    console.log(data);
    // Vem da api nessa ordem [currentTemperature, temperatureMin, temperatureMax, locationName, wind, humidity]

    setCurrentTemperature(convertKelvinToC(data[0]))
    setTemperatureMin(convertKelvinToC(data[1]))
    setTemperatureMax(convertKelvinToC(data[2]))
    setLocationName(data[3])
    setWind(data[4])
    setHumidity(data[5])
    
  }

  const Dropdown = () => {
      return (
          <RNPickerSelect
              onValueChange={(value) =>{
                console.log(value);
                switch (value) {
                  case '1':
                    setCurrentWeatherEspecific({latitude: 13.6894, longitude: -89.1872});
                    break;
                  case '2':
                    setCurrentWeatherEspecific({latitude: 13.95778000, longitude: -89.18774500});
                    break;
                  case '3':
                      setCurrentWeatherEspecific({latitude: 13.80000000, longitude: -89.18333330});
                    break;
                  case '4':
                    setCurrentWeatherEspecific({latitude: 13.75000000, longitude: -89.20000000});
                    break;
                  case '5':
                    setCurrentWeatherEspecific({latitude: 13.71807900, longitude: -89.16844300});
                    break;
                  case '6':
                    setCurrentWeatherEspecific({latitude: 13.73333330, longitude: -89.18333330});
                    break;
                  case '7':
                    setCurrentWeatherEspecific({latitude: 13.97179000, longitude: -89.21816690});
                    break;
                  case '8':
                    setCurrentWeatherEspecific({latitude: 13.87401400,longitude: -89.17176200});
                    break;
                  case '9':
                    setCurrentWeatherEspecific({latitude: 13.70000000, longitude: -89.11666670});
                    break;
                  case '10':
                    setCurrentWeatherEspecific({latitude: 13.73333330, longitude: -89.21666670});
                    break;
                  case '11':
                    setCurrentWeatherEspecific({latitude: 13.89000000, longitude: -89.28000000});
                    break;
                  case '12':
                    setCurrentWeatherEspecific({latitude: 13.60993500, longitude: -89.17963800});
                    break;
                  case '13':
                    setCurrentWeatherEspecific({latitude: 13.57424300, longitude: -89.20749300});
                    break;
                  case '14':
                    setCurrentWeatherEspecific({latitude: 13.65227630, longitude: -89.17536140});
                    break;
                  case '15':
                    setCurrentWeatherEspecific({latitude: 13.79418500, longitude: -88.89653000});
                    break;
                  case '16':
                    setCurrentWeatherEspecific({latitude: 13.64118300, longitude: -89.13295300});
                    break;
                  case '17':
                    setCurrentWeatherEspecific({latitude: 13.70196400, longitude: 	-89.14777400});
                    break;
                  case '18':
                    setCurrentWeatherEspecific({latitude: 13.77609300, longitude: -89.11782400});
                    break;
                  default:
                    break;
                }
              }}
              items={[
                  { label: 'San Salvador', value: '1' },
                  { label: 'Aguilares', value: '2'},
                  { label: 'Apopa', value: '3'},
                  { label: 'Ayutuxtepeque', value: '4'},
                  { label: 'Ciudad delgado', value: '5'},
                  { label: 'Cuscatancingo', value: '6'},
                  { label: 'El Paisnal', value: '7'},
                  { label: 'Guazapa', value: '8'},
                  { label: 'Ilopando', value: '9'},
                  { label: 'Mejicanos', value: '10'},
                  { label: 'Nejapa', value: '11'},
                  { label: 'Panchimalco', value: '12'},
                  { label: 'Rosario de mora', value: '13'},
                  { label: 'San Marcos', value: '14'},
                  { label: 'San Martin', value: '15'},
                  { label: 'Santo Tomás', value: '16'},
                  { label: 'Soyapango', value: '17'},
                  { label: 'Tonacatepeque', value: '18'}
              ]}
          />
      );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: darkTheme ? '#232634'  :'#F2F2F2',
      alignItems: 'center',
    },
    refreshButton: {
      position: 'absolute',
      alignSelf: 'flex-start', 
      margin: 30,
    },  
    themeButtonCircle:{
      alignSelf: darkTheme ? 'flex-end' : 'flex-start',
      margin: 5,
      width: 20,
      height: 20,
      borderRadius: 50,
      backgroundColor: darkTheme ? '#232634'  :'#F2F2F2', 
    },   
    temperatureView: {
      alignItems: 'center',
      flexDirection: 'row',
      marginTop: 10,
    },
    temperatureText: {
      color: darkTheme ? '#e0e0e0'  : 'black',
      fontSize: 50,
    },
    cardsView:{
      color: darkTheme ? 'black'  : 'white',
      margin: 10,
      alignItems: 'center',
      flexDirection: 'row',
    },
    localizationText:{
      color: darkTheme ? '#e0e0e0'  : 'black',
    },  
    info: {
      alignItems: 'center',
      borderRadius: 20,
      width: 350,
      height: 230,
      backgroundColor: darkTheme ? '#393e54'  :'#8F8F8F',
      
    },
    infoText: {
      color: darkTheme ? '#e0e0e0'  : 'white',
      margin: 15,
      fontSize: 20,
      fontWeight: 'bold',
    },
    addtionalInfo:{
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    themeButton: {
      margin: 10,
      marginLeft: 300,
      alignItems: 'center',
      justifyContent: 'center',
      width: 50,
      height: 50,
      borderRadius: 25,
    },
    themeButtonSquare: {
      backgroundColor: darkTheme ? '#F2F2F2'  :'#8F8F8F', 
      justifyContent: 'center',
      borderRadius: 20,
      marginRight: 20,
      width: 50,
      height: 25,
    },  
  });

  async function getLocation(){
    let { status } = await Location.requestPermissionsAsync()
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied')
      }else{
        let location = await Location.getCurrentPositionAsync({})
        await setLocationCoords(location.coords)
      }
  }

  async function setCurrentWeather(){
    const location = await getLocation();
    const data = await getCurrentWeather(locationCoords)

    // Vem da api nessa ordem [currentTemperature, temperatureMin, temperatureMax, locationName, wind, humidity]

    setCurrentTemperature(convertKelvinToC(data[0]))
    setTemperatureMin(convertKelvinToC(data[1]))
    setTemperatureMax(convertKelvinToC(data[2]))
    setLocationName(data[3])
    setWind(data[4])
    setHumidity(data[5])
    
  }

  

  function convertKelvinToC(kelvin){
    return parseInt(kelvin - 273)
  }

  useEffect(() => {
    setCurrentWeather()
  }, [])

  return (
    <ThemeContext.Provider value = {themeHook}>
      <View style={styles.container}>
      
        <TouchableOpacity style={styles.refreshButton} onPress={() => setCurrentWeather()}>
          {/* <h1>Hello</h1> */}
          <EvilIcons name="refresh" color={darkTheme ? 'white'  : 'black'} size={24}/>
        </TouchableOpacity>

        <View style={styles.temperatureView}>
          {/* <TextInput style={{
            borderWidth:'2px',
            borderColor:'white',
            color:'white'
          }}/> */}
          <Dropdown/>
        </View>

        <Feather style={{marginTop: 50}} name="sun" size={40} color="orange" />

        <View style={styles.temperatureView}>
          <Text style={styles.temperatureText}>{currentTemperature}</Text>
          <Text style={[styles.temperatureText, {fontSize: 14}]}>°C</Text>
        </View>
        
        <Text style={styles.localizationText}>{locationName}</Text>

        <View style={styles.cardsView}>
          <MainCard title={"Mañana"} icon={'morning'} temperature={"27°"} backgroundColor={ darkTheme ?'#D26F2F' : '#CC6E30'} ></MainCard>
          <MainCard title={"Tarde"} icon={'afternoon'} temperature={"31°"} backgroundColor={darkTheme ? '#D29600'  : '#FCC63F'} ></MainCard>
          <MainCard title={"Noche"} icon={'night'} temperature={"21°"} backgroundColor={darkTheme ? '#008081'  : '#38B7B8'} ></MainCard>
        </View>
    
        <View style={styles.info}>
          <Text style={styles.infoText}>Información adicionaal:</Text>
          <View style={styles.addtionalInfo}>
            <InfoCard title={'Viento'} variable={wind} ></InfoCard>
            <InfoCard title={'Umedad'} variable={humidity} ></InfoCard>
            <InfoCard title={'Temp. Min'} variable={temperatureMin} ></InfoCard>
            <InfoCard title={'Temp. Max'} variable={temperatureMax} ></InfoCard>
          </View>
        </View>

        <View style={styles.themeButton}>
          <View style={styles.themeButtonSquare}>
            <TouchableOpacity style={styles.themeButtonCircle} onPress={() =>darkTheme ? setDarkTheme(false) : setDarkTheme(true)}></TouchableOpacity>
          </View>
        </View>
        
      </View>
    </ThemeContext.Provider>
  );
}


