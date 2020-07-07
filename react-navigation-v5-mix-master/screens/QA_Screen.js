import React, {useState, useEffect, Component}from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import firebase from '@react-native-firebase/app'
import database from '@react-native-firebase/database'
import LinearGradient from 'react-native-linear-gradient';
import { color } from 'react-native-reanimated';

var dataList=[];
class QA_Screen extends React.Component{

  constructor(props){
    super(props)


  
  this.state=({
    dataList:[]
  });
}
componentDidMount(){
    firebase.database().ref('/Questions').on('value',snapshot=>{
      //let data =snapshot.val();
      let dataList=[]
      snapshot.forEach((child) => {
        dataList.push({
          user:child.val().user,
          name:child.val().name,
          title:child.val().title,
          description:child.val().description,
          _key:child.key
        });
      });
      
     this.setState({dataList:dataList})
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

    return (
      // <View style={styles.container}>
      //   <Text>Previuos Cases</Text>
      //   <Button
      //     title="Click Here"
      //     onPress={() => alert('Button Clicked!')}
      //   />
      // </View>

      <View style={styles.container}>
      <ScrollView>
        {/*Loop of JS which is like foreach loop*/}
        {this.state.dataList.map((item, key) => ((item.user==firebase.auth().currentUser.email)?
          //key is the index of the array 
          //item is the single item of the array
          <View key={key} style={{backgroundColor:'#A4A4A4', borderColor:'black', borderWidth:2}}>
            <Text>To admin:-</Text>
            <Text style={styles.text,{fontWeight:"bold", fontSize:20, textAlign:'center'}}>{item.title}</Text>
            <Text style={styles.text}>{item.description}</Text>
            
                <TouchableOpacity
                onPress={()=>{this.DeleteMessage(item._key)}}
                   style={[styles.signIn, {
                        borderColor: '#6E6E6E',
                        borderWidth: 2,
                        marginBottom:2,
                        marginLeft:280,
                        backgroundColor:'#B40404',
                        padding:15
                       
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color: 'white'
                    }]}>Delete</Text>
                </TouchableOpacity>
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
    fontSize: 18,
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