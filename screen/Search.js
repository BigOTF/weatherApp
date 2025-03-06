import { View, Text, StyleSheet, SafeAreaView } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';

export default function Search() {
    return (
        <LinearGradient
            colors={['#352163', '#331972', '#33143C']}
            locations={[0, 0.58, 1]}
            style={styles.container}
        >
            <Text>Search Scren</Text>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})