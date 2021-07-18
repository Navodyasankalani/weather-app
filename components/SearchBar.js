import React, { useState  } from 'react'
import { View, TextInput, StyleSheet, Dimensions } from 'react-native';
import { EvilIcons } from '@expo/vector-icons'; 

export default function SearchBar({ fetchWeatherData }) {

    const [cityName, setCityName] = useState('');

    return (
        <View style={styles.searchBar}>
            <TextInput style={styles.textIn}
                placeholder='Enter City Name'
                value={cityName}
                onChangeText={(text) => setCityName(text)}
            />
            <EvilIcons name="search" size={30} color="black"  onPress={() => fetchWeatherData(cityName)}/>
        </View>
    )
}

const styles = StyleSheet.create({
    searchBar: {
        marginTop: 10,
        marginBottem:50,
        flexDirection: 'row',
        alignItems: 'right',
        justifyContent: 'space-between',
        width: Dimensions.get('screen').width - 10,
        borderWidth: 1.5,
        paddingVertical: 5,
        borderRadius: 25,
        marginHorizontal: 5,
        paddingHorizontal: 20,
        backgroundColor: 'darkviolate',
        borderColor: 'lightgray'
    },
    textIn:{
        fontSize:22
    }
})