import { useState } from 'react'
import { View, Text, StyleSheet, TextInput, Pressable, Image, TouchableOpacity, FlatList } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import Ionicons from 'react-native-vector-icons/Ionicons'

const API_KEY = 'eccebeba529b4197b40153829250503';

export default function SearchScreen() {

    const [city, setCity] = useState('')
    const [suggestion, setSuggestion] = useState([])
    const [weather, setWeather] = useState(null)

    const fetchCitySuggestion = async(query) => {
        try {
            const response = await fetch(`http://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${query}`)
            const data = await response.json()
            setSuggestion(data)
        } catch(err) {
            console.error(err)
        }
    }

    const fetchWeather = async (selectedCity) => {
        setCity(selectedCity);
        setSuggestion([])    
        try {
          const response = await fetch(
            `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${selectedCity}&days=1`
          );
          const data = await response.json();
          setWeather(data);
        } catch (err) {
          setError("Error fetching weather. Try again.");
        }
    };

    return (
        <LinearGradient
            colors={['#352163', '#331972', '#33143C']}
            locations={[0, 0.58, 1]}
            style={styles.container}
        >
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>

                <LinearGradient
                    colors={['#957DCD', '#523D7F']}
                    locations={[0, 1]} 
                    style={styles.searchContainer}
                >
                    <Ionicons name='search' size={16} color='#fff' />

                    <TextInput style={styles.input}
                        value={city}
                        onChangeText={(text) => {
                            setCity(text)
                            fetchCitySuggestion(text)
                        }}
                        placeholder='Enter city name'
                        placeholderTextColor='#a4a4a4'
                    />
                </LinearGradient>

                <LinearGradient
                    colors={['#957DCD', '#523D7F']}
                    locations={[0, 1]} 
                    style={styles.locationContainer}
                >
                    <Ionicons name='location-outline' size={20} color='#fff' />
                </LinearGradient>

            </View>

            {suggestion.length > 0 && (
                <FlatList
                    data={suggestion}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => fetchWeather(item.name)}
                            style={{
                            padding: 10,
                            borderBottomWidth: 1,
                            borderBottomColor: "#ddd",
                            }}
                        >
                            <Text style={{color: '#fff', fontSize: 16}}>{item.name}, {item.country}</Text>
                        </TouchableOpacity>
                      /*   <View>
                            <Text style={{color: '#fff'}}>{item.country}</Text>
                        </View> */
                    )}
                />
            )}
        

            {
                weather &&
                <View style={{marginTop: 50}}>
                    
                    <View style={{flexDirection: 'row',}}>
                        <LinearGradient
                            colors={['#957DCD', '#523D7F']}
                            locations={[0, 1]}
                            style={{borderRadius: 15, paddingHorizontal: 30, paddingVertical: 20, width: '100%'}} 
                        >
                            <Text style={{fontSize: 20, fontWeight: '600', color: '#fff'}}>{weather.location.name}</Text>
                            <Text style={{fontSize: 14, fontWeight: '500', color: '#a4a4a4'}}>{weather.current.condition.text}</Text>
                        </LinearGradient>

                        <View style={{position: 'absolute', right: -20, top: -45}}>
                            <Image source={{ uri: `https:${weather.current.condition.icon}` }}style={{width: 145, height: 160}} resizeMode='contain' />
                        </View>
                        
                    </View>

                </View>
            }      

            <View style={styles.footerView}>
           
                <View style={styles.footerLinearContainer}>
                    <Ionicons name='home' size={24} color='#fff' />
                </View>

                <LinearGradient
                    colors={['#957DCD', '#523D7F']}
                    locations={[0, 1]}
                    style={styles.footerLinearContainer}
                >
                    <Ionicons name='search' size={24} color='#fff' />
                </LinearGradient>
                
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
        paddingHorizontal: 15,
        paddingTop: 100
    },
    searchContainer: {
        paddingHorizontal: 25,
        paddingVertical: 8,
        borderRadius: 50,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        width: '85%',
    },
    input: {
        color: '#fff',
        width: '90%'
    },
    locationContainer: {
        width: 38,
        height: 38,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
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