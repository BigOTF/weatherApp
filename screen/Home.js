import { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, Image, Text, ScrollView, StatusBar, RefreshControl, Pressable, FlatList } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';

const API_KEY = process.env.EXPO_PUBLIC_WEATHER_API_KEY
const CITY = "Akure";
const URL = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${CITY}&days=2`;
const SEVENDAYSURL = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${CITY}&days=7`;

export default function Home({ navigation }) {
    const [weather, setWeather] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isRefresh, setIsRefresh] = useState(false)
    const [sevenDays, setSevenDays] = useState(null)

    const [dayToShow, setDayToShow] = useState(true)

    const specificHours = [10, 12, 14, 16, 18, 20, 22, 0];
    const selectedWeather = weather?.forecast?.forecastday?.[0]?.hour?.filter(hour => {
        const hourValue = new Date(hour.time).getHours();
        return specificHours.includes(hourValue);
    }) || []; 

    const fetchSevenDaysUrl = async() => {
        try {
            const response = await fetch(SEVENDAYSURL)
            const data = await response.json()
            setSevenDays(data.forecast.forecastday)
        } catch(err) {
            console.error(err)
        }
    }

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
        fetchSevenDaysUrl()
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
                            <Text style={styles.weatherText}>{weather.current.condition.text}</Text>

                            <Image source={{ uri: `https:${weather.current.condition.icon}` }} style={{width: 170, height: 170, marginTop: 30}} resizeMode='cover' />

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

                            <Pressable onPress={() => setDayToShow(true)}>
                                <Text style={{fontSize: 12, fontWeight: '600', color: dayToShow ? '#fff' : '#a4a4a4'}}>Today</Text>
                            </Pressable>
                            

                            <Pressable onPress={() => setDayToShow(false)}>
                                <Text style={{fontSize: 12, fontWeight: '600', color: dayToShow ? '#a4a4a4' : '#fff'}}>7-Day Forecasts</Text>
                            </Pressable>
                            
                        </View>

                        {
                            dayToShow ?
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
                                            {/* <Text style={{fontSize: 12, fontWeight: '600', color: '#DEDDDD'}}>{hour.condition.text}</Text> */}
                                            <Text style={{fontSize: 12, fontWeight: '600', color: '#DEDDDD'}}>{hour.temp_c +  '\u00B0'}</Text>
                                        </LinearGradient>
                                    ))}
                                </View>
                            </ScrollView> :

                            <View>

                                {sevenDays?.length > 0 && (
                                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                        <View style={{flexDirection: 'row', gap: 10}}>
                                            {sevenDays.map((day, index) => (
                                                <LinearGradient
                                                    colors={['#957DCD', '#523D7F']}
                                                    locations={[0, 1]}
                                                    key={index}
                                                    style={{borderRadius: 8, paddingHorizontal: 7, paddingVertical: 10, alignItems: 'center', gap: 3}}
                                                >
                                                    <Text style={{ fontSize: 14, fontWeight: "600", color: "#DEDDDD" }}>
                                                        {new Date(day.date).toLocaleDateString("en-US", { weekday: "long" })}
                                                    </Text>
                                                    <Image source={{ uri: `https:${day.day.condition.icon}` }} style={{ width: 30, height: 30 }} />
                                                    {/* <Text style={{fontSize: 12, fontWeight: '600', color: '#DEDDDD'}}>{day.day.condition.text}</Text> */}
                                                    <Text style={{fontSize: 12, fontWeight: '600', color: '#DEDDDD'}}>{day.day.avgtemp_c +  '\u00B0'}</Text>
                                                </LinearGradient>
                                            ))}
                                        </View>
                                    </ScrollView>
                                )}

                            </View>
                        }

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
        
            </View>
        </LinearGradient>
       
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        fontFamily: 'Poppins',
        paddingHorizontal: 15,
        paddingTop: StatusBar.currentHeight
    },
    informationContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
    },
    information: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    weatherText: {
        fontSize: 20,
        fontWeight: '600',
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