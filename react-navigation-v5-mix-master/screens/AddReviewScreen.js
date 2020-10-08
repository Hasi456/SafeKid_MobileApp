import React from 'react';
import { 
    View, 
    Text, 
    Button, 
    TouchableOpacity,
    TouchableWithoutFeedback, 
    Dimensions,
    TextInput,
    Platform,
    StyleSheet,
    ScrollView,
    StatusBar,
    Alert
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import firebase from'@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import Animated, { color } from 'react-native-reanimated';

const AddReviewScreen = ({navigation}) => {

    const [data, setData] = React.useState({
        user:'',
        name:'',
        title: '',
        description: '',
        respond:'',
        date: '',
        time:'',
        ndate:'',
        ntime:'',
        rating:''

        
    });

    
    const handleNameChange = (val) => {
            setData({
                ...data,
                name: val,
                user:firebase.auth().currentUser.email,
                date: new Date(),
                time: new Date() 
            });
        }
    
    const handleRating=(val)=>{
        setData({
            ...data,
            rating:val,
            user:firebase.auth().currentUser.email,
            date: new Date(),
            time: new Date()
        })
    } 

    const handleTitleChange = (val) => {
       
            setData({
                ...data,
                title: val,
                user:firebase.auth().currentUser.email,
                date: new Date(),
                time: new Date()
              });
      }

    const handleDescriptionChange = (val) => {
        
            setData({
                ...data,
                description: val,
                user:firebase.auth().currentUser.email,
                date: new Date(),
                time: new Date()
            });
       
      
    }

    const sendMessage=()=>{

        if((data.description=='')){
            Alert.alert("Sending Failed","You must enter the description")
             return;
        
    }else if((data.description==null)){
        Alert.alert("Sending Failed","You must enter the description")
        return;
        }else{
        
        firebase.database().ref('Reviews').child(data.date.toString()).set(
            {
                date:data.date.getFullYear() + "-"+ parseInt(data.date.getMonth()+1) +"-"+data.date.getDate(),
                time:data.date.getHours() + ":" + data.date.getMinutes(),
                user:data.user,
                name:data.name,
                title:data.title,
                description:data.description,
                respond:data.respond,
                ndate:data.ndate,
                ntime:data.ntime,
                rating:data.rating

            }
        ).then(() => {
            console.log('INSERTED !')
            Alert.alert('Review Added')
            
            setData({

                date:'',
                time:'',
                user:firebase.auth().currentUser.email,
                name:'',
                title:'',
                description:'',
                respond:'',
                ndate:'',
                ntime:'',
                rating:''
            })
        
            
        }).catch((error) => {
            console.log(error);
        });
    }
    }
        return (
            
      <View style={styles.container}>
          <StatusBar backgroundColor='#1C1C1C' barStyle="light-content"/>
        <View style={styles.header}>
            <Text style={styles.text_header}>Add Your Comment About Us</Text>
        </View>
        <Animatable.View 
            animation="fadeInUpBig"
            style={styles.footer}
        >
            <ScrollView>
            <Text style={[styles.text_footer, {marginTop: 35}]}>Name</Text>
            <View style={styles.action}>
                <Feather 
                    name="user"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Enter name"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => handleNameChange(val)}
                    value={data.name}
                />
               
            </View>
            { /*data.isValidEmail ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Email is badly formatted</Text>
            </Animatable.View>
            */}

            <Text style={[styles.text_footer, {marginTop: 35,marginBottom:20}]}>Rating</Text>
            <View style={{flexDirection:'row'}}>
            <TouchableWithoutFeedback> 
             <Animated.View>     
                <FontAwesome onPress={()=>handleRating('1')} onLongPress={()=>handleRating('0')} name={(data.rating=='1'||data.rating=='2'||data.rating=='3'||data.rating=='4'||data.rating=='5')?"star":"star-o"} color="orange" size={32} style={{marginHorizontal:10}}/>
             </Animated.View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback> 
             <Animated.View>     
                <FontAwesome onPress={()=>handleRating('2')} onLongPress={()=>handleRating('0')} name={(data.rating=='2'||data.rating=='3'||data.rating=='4'||data.rating=='5')?"star":"star-o"} color="orange" size={32} style={{marginHorizontal:10}}/>
             </Animated.View>
            </TouchableWithoutFeedback> 
            <TouchableWithoutFeedback> 
             <Animated.View>     
                <FontAwesome onPress={()=>handleRating('3')} onLongPress={()=>handleRating('0')} name={(data.rating=='3'||data.rating=='4'||data.rating=='5')?"star":"star-o"} color="orange" size={32} style={{marginHorizontal:10}}/>
             </Animated.View>
            </TouchableWithoutFeedback>  
            <TouchableWithoutFeedback> 
             <Animated.View>     
                <FontAwesome onPress={()=>handleRating('4')} onLongPress={()=>handleRating('0')} name={(data.rating=='4'||data.rating=='5')?"star":"star-o"} color="orange" size={32} style={{marginHorizontal:10}}/>
             </Animated.View>
            </TouchableWithoutFeedback> 
            <TouchableWithoutFeedback> 
             <Animated.View>     
                <FontAwesome onPress={()=>handleRating('5')} onLongPress={()=>handleRating('0')} name={(data.rating=='5')?"star":"star-o"} color="orange" size={32} style={{marginHorizontal:10}}/>
             </Animated.View>
            </TouchableWithoutFeedback> 
        
            </View>
            <Text style={[styles.text_footer, {
                marginTop: 35
            }]}>Title</Text>
            <View style={styles.action}>
                <Feather 
                    name="feather"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Enter your problem title"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => handleTitleChange(val)}
                    value={data.title}
                />
                
            </View>
            { /*data.isValidPassword ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Password must be 8 characters long.</Text>
            </Animatable.View>
            */}
            <Text style={[styles.text_footer, {
                marginTop: 35
            }]}>Description<Text style={{color:'#610B0B', fontSize:12}}>     **Required</Text></Text>
            <View style={styles.action}>
                <Feather 
                    name="clipboard"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Enter the description"
                    style={styles.textInputArea}
                    autoCapitalize="none"
                    numberOfLines={20}
                    multiline={true}
                    onChangeText={(val) => handleDescriptionChange(val)}
                    value={data.description}
                />
            
               
           </View>
         

           
            <View style={styles.button}>
                <TouchableOpacity
                    style={styles.signIn}
                    onPress={() => sendMessage()}
                >
                <LinearGradient
                    colors={['#424242', '#151515']}
                    style={styles.signIn}
                >
                    <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}>Add Review</Text>
                </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={[styles.signIn, {
                        borderColor: '#424242',
                        borderWidth: 1,
                        marginTop: 15
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color: '#424242'
                    }]}>Back</Text>
                </TouchableOpacity>
            </View>
            </ScrollView>
        </Animatable.View>
      </View>
    );
};

export default AddReviewScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#1C1C1C'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom:30,
        
    },
    footer: {
        flex: Platform.OS === 'ios' ? 3 : 5,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 25,
        fontStyle:"italic"

        
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    textInputArea:{
      textAlign: 'center',
      width:300,
      borderWidth: 1,
      borderColor: '#9E9E9E',
      borderRadius: 20 ,
      backgroundColor : "#FFFFFF",
      height: 150
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    textPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 20
    },
    color_textPrivate: {
        color: 'grey'
    }
  });
