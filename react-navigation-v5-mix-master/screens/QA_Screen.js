import React, {useState, useEffect, Component}from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert,ImageBackground, ActivityIndicator} from 'react-native';
import firebase from '@react-native-firebase/app'
import database from '@react-native-firebase/database'
import LinearGradient from 'react-native-linear-gradient';
import { color } from 'react-native-reanimated';
import {IconButton} from 'react-native-paper';

var dataList=[];
class QA_Screen extends React.Component{

  constructor(props){
    super(props)


  
  this.state=({
    dataList:[],
    animating:true
  });
}
      
closeActivityIndicator=()=>{
  setTimeout(()=>this.setState({animating:false}),100)
}

componentDidMount(){
    firebase.database().ref('/Questions').on('value',snapshot=>{
      //let data =snapshot.val();
      let dataList=[]
      snapshot.forEach((child) => {
        dataList.push({
          date:child.val().date,
          user:child.val().user,
          name:child.val().name,
          title:child.val().title,
          time:child.val().time,
          respond:child.val().respond,
          description:child.val().description,
          ndate:child.val().ndate,
          ntime:child.val().ntime,
        //  respond:child.val().respond,
          _key:child.key
        });
      });
      
     this.setState({dataList:dataList})
     this.closeActivityIndicator()
    });

 

}
 DeleteMessage(val){
  Alert.alert(
    'Are you sure you want to delete?',
    '',
    [
      {text: 'NO', onPress: () =>{}, style: 'cancel'},
      {text: 'YES', onPress: () => firebase.database().ref('/Questions').child(val).remove()},
    ]
  );
  
}

render(){

  const animating=this.state.animating
    return (
      <ImageBackground source={require('../assets/children.jpg')} style={{width:'100%', height:'100%'}}>
       <View style={{margin:10}}>
        <ActivityIndicator
         animating={animating}
         color="#bc2b78"
         size="large"
         style={styles.indicator}
        />
        </View>
      <View style={styles.container}>
      <ScrollView>
        {/*Loop of JS which is like foreach loop*/}
        {this.state.dataList.reverse().map((item, key) => ((item.user==firebase.auth().currentUser.email)?
          //key is the index of the array 
          //item is the single item of the array
          <View key={key} style={{borderRadius:20,backgroundColor:'#A9F5E1', borderColor:'black', borderWidth:2,marginLeft:50, marginVertical:10}}>
            <View style={{flexDirection:'row'}}>
            <Text>  {item.date}</Text>
            <Text style={{marginLeft:180}}>{item.time}</Text>
             </View>
            <Text style={{fontStyle:"italic"}}>  To admin:-</Text>
           <Text style={styles.text,{fontWeight:"bold", fontSize:20, textAlign:'center'}}>{item.title}</Text>
            <Text style={styles.text}>{item.description}</Text>
            
                {/* <TouchableOpacity
                onPress={()=>{this.DeleteMessage(item._key)}}
                   style={[styles.signIn, {
                        borderColor: '#6E6E6E',
                        borderWidth: 2,
                        marginBottom:2,
                        marginLeft:230,
                        backgroundColor:'#DF0101',
                       
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color: 'white'
                    }]}>Delete</Text>
                </TouchableOpacity> */}
           <IconButton icon="delete" color="red" size={23} style={{marginLeft:250}} onPress={()=>{this.DeleteMessage(item._key)}}></IconButton>
          </View>:null
        ))}
        {this.state.dataList.reverse().map((item, key) => ((item.user==firebase.auth().currentUser.email)&&(item.respond!='')?
          //key is the index of the array 
          //item is the single item of the array
          <View key={key} style={{borderRadius:20,backgroundColor:'#E0F2F7', borderColor:'black', borderWidth:2,marginRight:50, marginVertical:10}}>
            <View style={{flexDirection:'row'}}>
            <Text>  {item.ndate}</Text>
            <Text style={{marginLeft:180}}>{item.ntime}</Text>
             </View>
            <Text style={{fontStyle:"italic"}}> Reply from admin:-</Text>
           <Text style={styles.text,{fontWeight:"bold", fontSize:20, textAlign:'center'}}>{item.title}</Text>
            <Text style={styles.text}>{item.respond}</Text>
            
                {/* <TouchableOpacity
                onPress={()=>{this.DeleteMessage(item._key)}}
                   style={[styles.signIn, {
                        borderColor: '#6E6E6E',
                        borderWidth: 2,
                        marginBottom:2,
                        marginLeft:230,
                        backgroundColor:'#DF0101',
                        
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color: 'white'
                    }]}>Delete</Text>
                </TouchableOpacity> */}
                <IconButton icon="delete" color="red" size={23} style={{marginLeft:250}} onPress={()=>{this.DeleteMessage(item._key)}}></IconButton>
            <View style={styles.separator} />
          </View>:null
        ))}
      </ScrollView>
      <TouchableOpacity
                    style={styles.signIn, {marginBottom:10,width:200, marginLeft:100}}
                    onPress={() =>this.props.navigation.goBack()}
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
    </ImageBackground>

    );
        }
};


export default QA_Screen;

const styles = StyleSheet.create({
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
indicator:{
  flex:1,
  justifyContent:'center',
  alignItems:'center',
  height:50
}
});