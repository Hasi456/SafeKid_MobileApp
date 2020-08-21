import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import {Marker} from 'react-native-maps'
import  LinearGradient from 'react-native-linear-gradient'

const TrackScreen = ({navigation}) => {
    return (

     <View>
     <View style={{backgroundColor:'#1C1C1C', height:50, marginBottom:10}}>
          <Text style={styles.Header_text}>Current Location</Text>
        </View>
      <View style={styles.container}>
     <MapView
       provider={PROVIDER_GOOGLE} // remove if not using Google Maps
       style={styles.map}
       region={{
         latitude: 6.910857,
         longitude: 79.945024,
         latitudeDelta: 0.015,
         longitudeDelta: 0.0121,
       }}
     >
       <Marker
       coordinate={{
        latitude: 6.910857,
        longitude: 79.945024,
       }}
       title="My Home"
       description="This is my first location"
       />
    </MapView>
    </View>
    <View>
    <TouchableOpacity
                    style={styles.signIn, {marginTop:500,width:200, marginLeft:80}}
                    onPress={() =>navigation.goBack()}
                >
                <LinearGradient
                    colors={['#2E2E2E', '#151515']}
                    style={styles.signIn1}
                >
                    <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}>Back</Text>
                </LinearGradient>
                </TouchableOpacity>
        </View>       
   </View>
    );
};

export default TrackScreen;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 570,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop:50
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  Header_text:{
    textAlign:"center",
    color:"#FBF5EF",
    fontWeight:"bold",
    fontSize:25,
    marginTop:5
  },
  signIn: {
    width: '25%',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
    },
    textSign: {
    fontSize: 15,
    fontWeight: 'bold'
},
signIn1: {
  width: '100%',
  height: 50,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 10
},
 });
 
