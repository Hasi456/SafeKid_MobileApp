
import React, {useState, useEffect, Component}from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet, ScrollView, Alert, ImageBackground} from 'react-native';
import firebase from '@react-native-firebase/app'
import database from '@react-native-firebase/database'
import LinearGradient from 'react-native-linear-gradient';
import { color } from 'react-native-reanimated';

var dataList=[];
class DevicesScreen extends React.Component{

  constructor(props){
    super(props)


  
  this.state=({
    dataList:[]
  });
}
componentDidMount(){
    firebase.database().ref('/Devices').on('value',snapshot=>{
      //let data =snapshot.val();
      let dataList=[]
      snapshot.forEach((child) => {
        dataList.push({
          user:child.val().user,
          pname:child.val().pname,
          cname:child.val().cname,
          sno:child.val().sno,
          phoneNo:child.val().phoneNo,
          lat:child.val().lat,
          long:child.val().long,
          _key:child.key
        });
      });
      
     this.setState({dataList:dataList})
    });

 

}
 DeleteMessage(val){
  Alert.alert(
    'Are you sure you want to remove this device??',
    'You will not be able to track using this device anymore',
    [
      {text: 'NO', onPress: () =>{}, style: 'cancel'},
      {text: 'YES', onPress: () => firebase.database().ref('/Devices').child(val).remove()},
    ]
  );
  
}

render(){

    return (
     
      <ImageBackground source={require('../assets/child.jpg')} style={{width:'100%', height:'100%'}}>
      <View style={styles.container}>
        <View style={{backgroundColor:'#1C1C1C', height:50, marginBottom:10}}>
          <Text style={styles.Header_text}>Your Devices</Text>
        </View>
       
      <ScrollView>
      
      
        {this.state.dataList.map((item, key) => ((item.user==firebase.auth().currentUser.email)?
         
          <View key={key} style={{backgroundColor:'#A4A4A4', margin:10, borderColor:'black', borderWidth:2}}>
            
            <Text style={styles.text,{fontWeight:"bold", fontSize:20, textAlign:'center'}}>{item.sno}</Text>
            <Text style={styles.text}>{item.cname}</Text>
            <View style={{flexDirection:'row'}}>
              
                <TouchableOpacity
                onPress={()=>{this.DeleteMessage(item._key)}}
                   style={[styles.signIn, {
                        borderColor: '#6E6E6E',
                        borderWidth: 2,
                        marginBottom:2,
                        marginRight:160,
                        backgroundColor:'#B40404',
                        width:70
                       
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color: 'white',
                        fontSize:13
                    }]}>Remove</Text>
                </TouchableOpacity>
                <TouchableOpacity
                onPress={()=>{this.props.navigation.navigate('TrackScreen',{lat:item.lat, long:item.long})}}
                   style={[styles.signIn, {
                        borderColor: '#6E6E6E',
                        borderWidth: 2,
                        marginBottom:2,
                        marginLeft:10,
                        backgroundColor:'#086A87',
                        width:100
                       
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color: 'white',
                        fontSize:15
                    }]}>Track</Text>
                </TouchableOpacity>
             </View>
            <View style={styles.separator} />
          </View>:null
        ))}
        
      </ScrollView>
      <TouchableOpacity
                    style={styles.signIn, {marginBottom:10,width:200, marginLeft:100}}
                    onPress={() =>this.props.navigation.navigate('AddDevicesScreen')}
                >
                <LinearGradient
                    colors={['#1C1C1C', '#151515']}
                    style={styles.signIn1}
                >
                    <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}>Add New Device</Text>
                </LinearGradient>
                </TouchableOpacity>
      <TouchableOpacity
                    style={styles.signIn, {marginBottom:10,width:200, marginLeft:100}}
                    onPress={() =>this.props.navigation.goBack()}
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
    </ImageBackground>

    );
        }
};


export default DevicesScreen;

const styles = StyleSheet.create({
  Header_text:{
    textAlign:"center",
    color:"#FBF5EF",
    fontWeight:"bold",
    fontSize:25,
    marginTop:5
  },
  container: {
    flex: 1,
    paddingTop: 0,
  },
  separator: {
    height: 1,
    backgroundColor: '#707080',
    width: '100%',
  },
  text: {
    fontSize: 16,
    color: 'black',
    paddingLeft: 10,
    paddingRight:10,
    textAlign:"center"
  },
  button: {
    alignItems: 'center',
    marginTop: 50
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