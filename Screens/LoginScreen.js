import { KeyboardAvoidingView, StyleSheet, Text, TextInput, Image, View, TouchableOpacity } from 'react-native';
import React, {useEffect, useState} from 'react';
import { auth } from '../firebase';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')

    const navigation = useNavigation()

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                navigation.replace("Home")
            }
        })

        return unsubscribe
    }, [])

    const handleSignUp = () => {
        try {
            auth
                .createUserWithEmailAndPassword(email, pass)
                .then(userCredentials => {
                    const user = userCredentials.user;
                    console.log(user.email);
                })
        } catch (error) {
            console.log("test");
            alert(error);
        }
        
    }

    const handleLogin = () => {
        auth
         .signInWithEmailAndPassword(email, pass)
         .then(userCredentials => {
            const user = userCredentials.user;
            console.log('Logged in with:', user.email);
        })
    }

  return (
    <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
    >
    <Image style={styles.image} source={require('../assets/T.jpeg')} />
      <Text style={styles.titletext}> MBTA B-Line Tracker {'\n'}</Text>
      <View style={styles.inputContainer}>
                <TextInput 
                    placeholder="Email"
                    value={email}
                    onChangeText={text => setEmail(text)}
                    style={styles.input}
                />
                <TextInput 
                    placeholder="Password"
                    value={pass}
                    onChangeText={text => setPass(text)}
                    style={styles.input}
                    secureTextEntry
                />
        </View>

        <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={handleLogin}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={handleSignUp}
                    style={[styles.button, styles.buttonOutline]}
                >
                    <Text style={styles.buttonOutlineText}>Register</Text>
                </TouchableOpacity>
        </View>
    </KeyboardAvoidingView>
  )
}

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }, 
    inputContainer: {
        width: '80%'
    },
    image: {
        flex: 0,
        width: '45%',
        height: '40%',
        resizeMode: 'contain'
    },
    titletext: {
        fontWeight: 'bold',
        fontSize: 20
    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
    },
    buttonContainer: {
        width: "60%",
        justifyContent: "center",
        alignItems: "center", 
        marginTop: 40,
    },
    button: {
        backgroundColor: '#0782F9',
        width: '100%',
        padding: 15, 
        borderRadius: 10,
        alignItems: "center"
    },
    buttonText: {
        color: 'white', 
        fontWeight: '700',
        fontSize: 16,
    },
    buttonOutline: {
        backgroundColor: 'white',
        marginTop: 5,
        borderColor: '#0782F9',
        borderWidth: 2,
    },
    buttonOutlineText: {
        color: '#0782F9',
        fontWeight: '700',
        fontSize: 16,
    }
})