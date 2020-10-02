import React from 'react';
import { View, Text, Button, StyleSheet, Linking, TouchableOpacity, Platform, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const PhoneScreen = ({navigation}) => {

    const makeCall = (val) => {

        let phoneNumber = '';
    
        if (Platform.OS === 'android') {
          phoneNumber = 'tel:${'+val+'}';
        } else {
          phoneNumber = 'telprompt:${'+val+'}';
        }
    
        Linking.openURL(phoneNumber);
      };

    return (
      <View style={styles.container}> 
        <View style={styles.header}>
            <Text style={{color:'white', textAlign:'center', fontSize:25}}>Emergency Contacts</Text>
        </View>
        <ScrollView>
        <View style={styles.contact}>
        <Text style={styles.text1}>Police Emergency Service</Text>
        <View style={{flexDirection:'row'}}>
        <Text style={styles.text2}>119</Text>
        <TouchableOpacity
                onPress={() =>makeCall('119')}
                   style={[styles.signIn, {
                        borderColor: '#6E6E6E',
                        borderWidth: 2,
                        marginLeft:55,
                        marginBottom:2,
                        backgroundColor:'#088A08',
                        width:100
                       
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color: 'white',
                        fontSize:15
                    }]}>Call</Text>
        </TouchableOpacity>
        </View>

        </View>
        </ScrollView>

         <TouchableOpacity
                    style={{marginBottom:10,width:200, marginLeft:100}}
                    onPress={() =>navigation.goBack()}
                >
                <LinearGradient
                    colors={['#1C1C1C', '#000000']}
                    style={styles.signIn1}
                >
                    <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}>Back</Text>
                </LinearGradient>
                </TouchableOpacity>
      </View>
    );
};

export default PhoneScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    
  },
  header:{
      backgroundColor:'#1C1C1C',
      height:50
  },
  contact:{
      backgroundColor:'#A4A4A4',
      height:60,
      borderRadius:20,
      borderWidth:2,
      margin:20,
  },
  text1:{
      textAlign:'center',
      fontSize:20,
      fontStyle:"italic",
  },
  text2:{
    marginLeft:150,
    fontSize:20,
    fontStyle:"normal",
    color:'#0040FF'
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
