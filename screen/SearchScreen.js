import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import Ionicons from 'react-native-vector-icons/Ionicons'

export default function SearchScreen() {
    return (
        <LinearGradient
            colors={['#352163', '#331972', '#33143C']}
            locations={[0, 0.58, 1]}
            style={styles.container}
        >
           <Text style={{color: '#fff'}}>Search Screen</Text>

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