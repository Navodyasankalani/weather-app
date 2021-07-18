import React from 'react'
import {StyleSheet,View, Text, Image} from 'react-native'
import moment from 'moment-timezone'

const FutureForecast = ({data}) => {
    return(
        <View style={{flexDirection:'row'}}>
            {
                data && data.length > 0 ?

                data.map((data, idx) => (

                    idx !==0 && <FutureForecastItem  forecastItem={data}/>
                ))

                :

                <View/>
            }
            
        </View>
    )
}

const FutureForecastItem = ({forecastItem}) => {
    const img = {uri:'http://openweathermap.org/img/wn/'+forecastItem.weather[0].icon+'@4x.png'}
    return(
        <View style={styles.futureForecastItem}>
            <Text style={styles.day}>{moment(forecastItem.dt * 1000).format('ddd')}</Text>
            <Image source={img} style={styles.image}/> 
            <Text style={styles.temp}>Night - {forecastItem.temp.night}&#176;C</Text>
            <Text style={styles.temp}>Day - {forecastItem.temp.day}&#176;C</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    image:{
        width:100,
        height:100
    },
    futureForecastItem:{
        flex:1,
        justifyContent:'center',
        backgroundColor:'#00000033',
        borderRadius:10,
        borderColor:"#eee",
        borderWidth:1,
        padding:20,
        marginLeft:10,
        width:150,
        opacity:0.8
    },
    day:{
        fontSize:20,
        color:'white',
        backgroundColor:'#3c3c44',
        padding:10,
        textAlign:'center',
        borderRadius:50,
        fontWeight:'20',
        marginBottom:15
    },
    temp:{
        fontSize:16,
        color:'white',
        fontWeight:'100',
        textAlign:'center'
    }
})

export default FutureForecast