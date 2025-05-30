import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from "react-native";
import { useRouter, useLocalSearchParams } from 'expo-router';
import Colors from "../theme/colors";
import Ionicons from 'react-native-vector-icons/Ionicons';

// -> http://localhost:8080/usuario/api/

export default function Cep() {
    const expo = useRouter();

    const { nome } = useLocalSearchParams(); 

    return (

        <View style={styles.container}>
            
            <View style={styles.inputSection}>
                <Image style={styles.logo} source={require('../assets/ropz-logo-gray.png')} />

                <Text style={styles.title}>Woow!!</Text>
                <Text style={styles.sub}>É um prazer tê-lo aqui, {nome} 💘👋.</Text>
                <Text style={styles.description}>Precisamos de uma info importante agora, seu CEP.</Text>
                
                <View style={styles.inputContainer}>
                    <TextInput style={styles.input} placeholder="01234-567" />
                </View>

                <TouchableOpacity style={styles.nxtButton} onPress={ () => expo.push('/home')}>
                    <Ionicons name="arrow-forward" size={24} color="white" />
                </TouchableOpacity>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.background,
    },
    inputSection:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'start',
        width: '90%',
        backgroundColor: Colors.background,
        padding: 20,
    },
    inputContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    title: {
        fontSize: 23,
        textAlign: 'left',
        fontWeight: 'bold',
        color: Colors.black,
        width: '100%',
    },
    sub: {
        fontSize: 17,
        textAlign: 'left',
        fontWeight: 'bold',
        color: Colors.black,
        width: '100%',
    },
    description: {
        fontSize: 16,
        textAlign: 'left',
        fontWeight: '300',
        color: Colors.black,
        marginTop: 20,
        marginBottom: 20,
        width: '100%',
    },
    label: {
        width: '30%',
        fontSize: 16,
        color: Colors.black,
        textAlign: 'left',
    },
    input: {
        width: '100%',
        padding: 10,
        borderWidth: 1,
        borderColor: Colors.gray,
        borderRadius: 5,
        backgroundColor: Colors.white,
    },
    nxtButton: {
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: Colors.black,
        color: Colors.white,
        width: 50,
        height: 50,
        padding: 10,
        marginTop: 20,
        borderRadius: 25,
    },
    logo: {
        width: 50,
        height: 50,
        marginBottom: 20,
        resizeMode: 'contain',
    }
})