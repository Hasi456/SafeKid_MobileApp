import React from 'react';
import { View, Text, Button, StyleSheet, StatusBar} from 'react-native';

const NotificationScreen = ({navigation}) => {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor='#000000' barStyle="light-content"/>
        <Text>Notifications</Text>
        {/* <Button
            title="Go to details screen...again"
            onPress={() => navigation.push("Details")}
        />
        <Button
            title="Go to home"
            onPress={() => navigation.navigate("Home")}
        />
        <Button
            title="Go back"
            onPress={() => navigation.goBack()}
        /> */}
      </View>
    );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});
