import { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { LinearGradient } from 'expo-linear-gradient'

const API_KEY = process.env.EXPO_PUBLIC_WEATHER_API_KEY

export default function SearchDetails({route}) {
    const { weather, city } = route?.params

    const [sevenDays, setSevenDays] = useState(null)

    const fetchSevenDaysUrl = async() => {
        try {
            const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=7`)
            const data = await response.json()
            setSevenDays(data.forecast.forecastday)
        } catch(err) {
            console.error(err)
        }
    }

    useEffect(() => {
        fetchSevenDaysUrl()
    }, [])

    return (
         <LinearGradient
            colors={['#352163', '#331972', '#33143C']}
            locations={[0, 0.58, 1]}
            style={styles.container}
        >
            
            <LinearGradient
                colors={['#957DCD', '#523D7F']}
                locations={[0, 1]} 
                style={styles.tempContainer}
            >
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Image source={{ uri: `https:${weather.current.condition.icon}` }} style={{width: 169, height: 132}} />
                    <Text style={styles.tempText}>{weather.current.temp_c + '\u00B0'}</Text>
                </View>

                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 50}}>

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

                </View>

            </LinearGradient>

            <ScrollView showsVerticalScrollIndicator={false} style={{marginTop: 50, marginBottom: 30}}>
           
                {sevenDays?.length > 0 && (
                
                    <View style={{gap: 20}}>
                        {sevenDays.map((day, index) => (
                            <View
                                key={index}
                                style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}
                            >
                                <Text style={{ fontSize: 16, color: "#fff" }}>
                                    {new Date(day.date).toLocaleDateString("en-US", { weekday: "long" })}
                                </Text>

                                <View style={{flexDirection: 'row', alignItems: 'center', gap: 2}}>
                                    <Image source={{ uri: `https:${day.day.condition.icon}` }} style={{ width: 51, height: 40 }} resizeMode="contain" />
                                    <Text style={{fontSize: 14, fontWeight: '500', color: '#fff'}}>{day.day.condition.text}</Text>
                                </View>
                                
                                <Text style={{fontSize: 16, fontWeight: '500', color: '#fff'}}>{day.day.avgtemp_c +  '\u00B0'}</Text>
                            </View>
                        ))}
                    </View>
                    
                )}

            </ScrollView>

        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        fontFamily: 'Poppins',
        paddingHorizontal: 15,
        paddingTop: 80
    },
    tempContainer: {
        borderRadius: 15,
        paddingHorizontal: 20,
        paddingVertical: 20,
        gap: 20
    },
    tempText: {
        fontSize: 55,
        color: '#fff',
        fontWeight: 600
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
})