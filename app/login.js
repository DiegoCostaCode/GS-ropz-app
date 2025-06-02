import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Alert } from "react-native";
import { useRouter, useLocalSearchParams } from 'expo-router';
import { usuarioAuth } from './types/usuarioResponse';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from "../theme/colors";
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';


export default function Login() {
    const expo = useRouter();

    const { email } = useLocalSearchParams();
    const [emailInput, setEmail] = useState('');
    const [senhaInput, setSenha] = useState('');

    const catchCredenciais = () => {
        if (email) {
            setEmail(email);
        }
    };

    useEffect(() => {
        catchCredenciais();
    }, []);

    const login = async () => {

        console.log('Enviando dados de login...');

        const loginAuth = usuarioAuth({
            email: emailInput,
            senha: senhaInput
        })
        
        if (loginAuth == null) {
            Alert.alert('Ops!', 'Você esqueceu de preencher um campo...😿');
            return;
        }

        await axios.post('https://java-gs-app.azurewebsites.net/:8080/api/login', loginAuth, {
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(async (response) => {
            console.log('Usuário encontrado!');

            const token = response.data.token;

            await AsyncStorage.setItem('userId', response.data.usuario.id.toString());
            await AsyncStorage.setItem('userToken', response.data.token);
            await AsyncStorage.setItem('userLocalId', response.data.usuario.localizacao.id.toString());

            header = {
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
                }
            }

            await axios.get(`https://java-gs-app.azurewebsites.net/temperatura/api/current/${response.data.usuario.localizacao.id}`, header);

            await axios.get(`https://java-gs-app.azurewebsites.net/temperatura/api/forecast/${response.data.usuario.localizacao.id}`, header);

            expo.push({
                pathname: '/home'
            });


        }).catch((error) => {

            console.log('Erro ao fazer login:', error.message);

            if (error.status == 401) {
                Alert.alert('Iih!', 'Senha incorreta!😿');
            } if (error.status == 400){
                Alert.alert('Ops!', 'Essa conta não existe em nosso sistema! 😿');
            } if (error.status == 500) {
                Alert.alert('Ops!', 'Estamos com uma instabilidade, tente novamente daqui alguns segundos!!😿');
            }
        });

    };

    
    return (

        <View style={styles.container}>
            
            <View style={styles.inputSection}>
                <Image style={styles.logo} source={require('../assets/ropz-logo-gray.png')} />

                <Text style={styles.description}>Vamos lá, escreva o seu...🔐</Text>
                
                <View style={styles.inputContainer}>
                    <TextInput style={styles.input} placeholder="calor@gmail.com" value={emailInput} onChangeText={setEmail}/>
                </View>

                <View style={styles.inputContainer}>
                    <TextInput style={styles.input} placeholder="Senha super secreta" value={senhaInput} onChangeText={setSenha} secureTextEntry />
                </View>

                <TouchableOpacity style={styles.nxtButton} onPress={login}>
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