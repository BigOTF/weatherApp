import { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, Image, Text, ScrollView, ImageBackground, StatusBar } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';

const API_KEY = 'eccebeba529b4197b40153829250503';
const CITY = "Akure";
const URL = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${CITY}&days=1`;

export default function Home() {
    const [weather, setWeather] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    const weatherImages = {
        "Sunny": require("../assets/cloudy.png"),
        "Partly Cloudy": require("../assets/cloudy.png"),
        "Cloudy": require("../assets/cloudy.png"),
        "Rain": require("../assets/rainy.png"),
        "Thunderstorm": require("../assets/rain.png"),
        "Patchy rain nearby": require("../assets/rain.png"),
        "Snow": require("../assets/snowy.png"),
        "Mist": require("../assets/snowy.png"),
        "Fog": require("../assets/snowy.png"),
    };

    const specificHours = [10, 12, 13, 15, 17, 22];

    const selectedWeather = weather.forecast.forecastday[0].hour.filter(hour => {
        const hourValue = new Date(hour.time).getHours();
        return specificHours.includes(hourValue);
    });
    console.log(selectedWeather);

    const formatDateTime = (localtime) => {
        const date = new Date(localtime);
        return new Intl.DateTimeFormat("en-GB", {
          weekday: "long",
          day: "2-digit",
          month: "long",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }).format(date).replace(",", " |");
    };

    const fetchWeather = async() => {
        try {
            const response = await fetch(URL)
            const data = await response.json()
            setWeather(data)
            setIsLoading(false)
        } catch(err) {
            console.error('Error fetching weather data', err)
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchWeather()
    }, [])

    return (
        <ImageBackground
            source={require('../assets/background.png')} resizeMode='cover'
            style={{flex: 1}}
        >
            <StatusBar />
            <LinearGradient
                colors={['#352163', '#331972', '#33143C']}
                locations={[0, 0.58, 1]}
                style={styles.container}
            >
                {
                    isLoading 
                    ? <ActivityIndicator size='large' color='#fff' />
                    :   <ScrollView>

                            <View style={styles.informationContainer}>

                                <View style={styles.information}>
                                    <Text style={styles.weatherText}>{weather.current.condition.text}</Text>

                                    <Image source={weatherImages[weather.current.condition.text]} style={{width: 172, height: 179}} resizeMode='contain' />

                                    <Text style={styles.tempText}>{weather.current.temp_c + '\u00B0'}</Text>

                                    <Text style={styles.weatherTime}>{formatDateTime(weather.location.localtime)}</Text>
                                </View>

                                <LinearGradient
                                    colors={['#957DCD', '#523D7F']}
                                    locations={[0, 1]}
                                    style={styles.weatherInformation}
                                >
                                    <View style={styles.weatherQuality}>
                                        <Image source={require('../assets/precipitation.png')} resizeMode='cover' style={{width: 24, height: 24}} />
                                        <Text style={styles.qualityValue}>{weather.current.precip_mm}%</Text>
                                        <Text style={styles.qualityName}>Precipitation</Text>
                                    </View>

                                    <View style={styles.weatherQuality}>
                                        <Image source={require('../assets/humidity.png')} resizeMode='cover' style={{width: 24, height: 24}} />
                                        <Text style={styles.qualityValue}>{weather.current.humidity}%</Text>
                                        <Text style={styles.qualityName}>Humidity</Text>
                                    </View>
                                    
                                    <View style={styles.weatherQuality}>
                                        <Image source={require('../assets/speed.png')} resizeMode='cover' style={{width: 24, height: 24}} />
                                        <Text style={styles.qualityValue}>{weather.current.wind_kph}Km/h</Text>
                                        <Text style={styles.qualityName}>Wind Speed</Text>
                                    </View>
                                </LinearGradient>
                            </View>

                            <View style={{marginTop: 30, gap: 15}}>
                                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                    <Text style={{fontSize: 12, fontWeight: '600', color: '#DEDDDD'}}>Today</Text>
                                    <Text style={{fontSize: 12, fontWeight: '600', color: '#DEDDDD'}}>7-Day Forecasts</Text>
                                </View>


                                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                    <View style={{flexDirection: 'row', gap: 10}}>
                                        {selectedWeather.map((hour, index) => (
                                            <LinearGradient
                                                colors={['#957DCD', '#523D7F']}
                                                locations={[0, 1]}
                                                key={index}
                                                style={{borderRadius: 8, paddingHorizontal: 7, paddingVertical: 10, alignItems: 'center', gap: 3}}
                                            >
                                                <Text style={{fontSize: 12, fontWeight: '600', color: '#DEDDDD'}}>{new Date(hour.time).toLocaleTimeString("en-US", { hour: "numeric", hour12: true })}</Text>
                                                <Image source={{ uri: `https:${hour.condition.icon}` }} style={{ width: 37, height: 30 }} />
                                                <Text style={{fontSize: 12, fontWeight: '600', color: '#DEDDDD'}}>{hour.temp_c +  '\u00B0'}</Text>
                                            </LinearGradient>
                                        ))}
                                    </View>

                                </ScrollView>
                            </View>
                        </ScrollView>
                }
                
            

            </LinearGradient>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        fontFamily: 'Poppins',
        paddingHorizontal: 15
    },
    informationContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
        marginTop: 106
    },
    information: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    weatherText: {
        fontSize: 12,
        fontWeight: '700',
        color: '#DEDDDD'
    },
    tempText: {
        fontSize: 81,
        color: '#fff'
    },
    weatherTime: {
        fontSize: 12,
        fontWeight: '600',
        color: '#DEDDDD'
    },
    weatherInformation: {
        borderRadius: 8,
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 95,
        gap: 30,
        paddingHorizontal: 20
    },
    qualityValue: {
        fontSize: 14,
        fontWeight: '600',
        color: '#fff'
    },
    qualityName: {
        fontSize: 14,
        fontWeight: '600',
        color: '#DEDDDD'
    },
    weatherQuality: {
        alignItems: 'center',
        gap: 3
    }
})