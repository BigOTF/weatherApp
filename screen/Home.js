import { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, Image, Text, ScrollView, StatusBar, RefreshControl, Pressable } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';

const API_KEY = 'eccebeba529b4197b40153829250503';
const CITY = "Akure";
//const URL = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${CITY}`;
const URL = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${CITY}&days=2`;

export default function Home({ navigation }) {
    const [weather, setWeather] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isRefresh, setIsRefresh] = useState(false)

    const specificHours = [10, 12, 13, 15, 17, 22];
    const selectedWeather = weather?.forecast?.forecastday?.[0]?.hour?.filter(hour => {
        const hourValue = new Date(hour.time).getHours();
        return specificHours.includes(hourValue);
    }) || []; 

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

    const handleRefresh = () => {
        setIsRefresh(true)
        fetchWeather()
        setIsRefresh(false)
    }

    return (       
        <LinearGradient
            colors={['#352163', '#331972', '#33143C']}
            locations={[0, 0.58, 1]}
            style={styles.container}
        >
            <StatusBar />
            {
                isLoading 
                ? <ActivityIndicator size='large' color='#fff' />
                :   
                <ScrollView showsVerticalScrollIndicator={false} 
                    refreshControl={
                        <RefreshControl refreshing={isRefresh} onRefresh={handleRefresh} />
                    }
                >
                    <View style={styles.informationContainer}>

                        <View style={styles.information}>
                            <Text style={styles.weatherText}>{weather?.current.condition.text}</Text>

                            <Image source={{ uri: `https:${weather.current.condition.icon}` }} style={{width: 150, height: 150}} resizeMode='cover' />

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
                                <Text style={styles.qualityValue}>{weather.current?.wind_kph}Km/h</Text>
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

            <View style={styles.footerView}>

                <LinearGradient
                    colors={['#957DCD', '#523D7F']}
                    locations={[0, 1]}
                    style={styles.footerLinearContainer}
                >
                    <Ionicons name='home' size={24} color='#fff' />
                </LinearGradient>
               
                <Pressable onPress={() => navigation.navigate('Search')}>
                    <Ionicons name='search' size={24} color='#fff' />
                </Pressable>
                
                <View>
                    <Ionicons name='person-outline' size={24} color='#fff' />
                </View>
                <View>
                    <Ionicons name='notifications' size={24} color='#fff' />
                </View>
            </View>
        </LinearGradient>
       
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
        marginTop: StatusBar.currentHeight
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
        borderRadius: 10,
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
    },
    footerView: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 50
    },
    footerLinearContainer: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    }
})