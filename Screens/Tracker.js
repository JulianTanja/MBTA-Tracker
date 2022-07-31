import { KeyboardAvoidingView, StyleSheet, Text, TextInput, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, {useEffect, useState} from 'react';
import { auth } from '../firebase';
import { useNavigation } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
//import { createNativeStackNavigator } from '@react-navigation/native-stack';


//const Stack = createNativeStackNavigator();

//export default function Tracker() {
const Tracker = () => {
  const [datad, setDatad] = useState([])
  const [loading, setLoading] = useState(true)


  const navigation = useNavigation()

  //const url = "https://api-v3.mbta.com/predictions?sort=departure_time&filter%5Bdirection_id%5D=1&filter%5Bstop%5D=70148&filter%5Broute%5D=Green-B"
  const url = "https://api-v3.mbta.com/schedules?page%5Blimit%5D=6&sort=arrival_time&filter%5Broute_type%5D=0&filter%5Bstop%5D=70149"

  useEffect(() => {
    fetch(url)
    .then((response) => response.json())
    .then((json) => setDatad(json))
    .catch((error) => console.error(error))
    .finally(() => setLoading(false));

  }, [])

  const handleSignOut = () => {
    auth
        .signOut()
        .then(() => {
            navigation.replace("Login")
        })
        .catch(error => alert(error.message))
  }
  
  //edit edit edit
  //function function1(d) {
  //  for (i in json) {
  //    datad.data.attributes.arrival_time; //change output string into something better looking.
  //  }
  //}

  return (
    <View style={styles.h_container}>
      <Text style={styles.title}>MBTA B-Line Tracker</Text>
      <Text> 
        Welcome! 
        {"\n"}
        {"\n"}
      </Text>
      <Text style={styles.text2}>
        Blandford Street Scheduled Arrival Times {"\n"}
        {"\n"}
      </Text>

      {
        loading ? ( <Text>Loading...</Text> ) : (
          datad.data.map((post) => 
          
          (
            <View>
              <Text>{
              //function1(post.attributes.arrival_time)
              post.attributes.arrival_time 
            } {'\n'}</Text>
            
            </View>
          ))
        )
      }

        <TouchableOpacity
            onPress={handleSignOut}
            style={styles.button}
        >
            <Text style={styles.buttonText}> Sign Out</Text>
        </TouchableOpacity>

    </View>
  
  ); 
    
}

export default Tracker;

const styles = StyleSheet.create({
  
  h_container: {
    flex: 1,
    backgroundColor: '#1DB954',
    alignItems: 'center',
    justifyContent: 'center',

  },
  text2: {
    fontWeight: 'bold'
  },
  title: {
    fontSize: 22,
    fontFamily: "Arial", 
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#0782F9',
    width: '60%',
    padding: 15, 
    borderRadius: 10,
    alignItems: "center"
  },
  buttonText: {
    color: 'white', 
    fontWeight: '700',
    fontSize: 16,
  }
});
