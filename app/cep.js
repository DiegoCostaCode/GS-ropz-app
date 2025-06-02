import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Alert } from "react-native";
import { useRouter, useLocalSearchParams } from 'expo-router';
import Colors from "../theme/colors";
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { usuarioResponse } from './types/usuarioResponse';
import { formatCep } from './utils/cadastroFunctions';


export default function Cep() {
    const expo = useRouter();

    const { nome, email, telefone, senha } = useLocalSearchParams();
    const [cep, setCep] = useState('');

    const submit = async () => {
    
        if (!nome || !email || !telefone || !senha || !cep) {
            Alert.alert('Ops!', 'Você esqueceu de preencher um campo...😿');
            return;
        }

        const usuarioAuth = {
            nome,
            email,
            telefone,
            senha,
            cep
        }

        console.log(usuarioAuth);

        await axios.post('http://192.168.1.72:8080/usuario/api/', usuarioAuth, {
            headers: {
            'Content-Type': 'application/json',
            },  
        })
        .then(async (response) => {

            const usuario = usuarioResponse(response.data);

            Alert.alert('Uhuul!', 'Deu certo, criamos seu cadastro.😺');

            expo.push({
                pathname: '/login',
                params: { email: usuario.email }
            });

        }).catch((error) => {

            console.log('Erro ao fazer login:', error);

            if(error.status === 400) {
                Alert.alert('Ops!', 'Você já possui um cadastro com esse e-mail.😿');
            } if (error.status === 500 && error.response.data.message.includes('key violation')) {
                Alert.alert('Ops!', 'Já existe um usuário com este e-mail! 😿');
            } else {
                Alert.alert('Ops!', 'Ocorreu um erro ao cadastrar seu usuário. Tente novamente mais tarde. 😿');
            }
        })
    };

    return (

        <View style={styles.container}>
            
            <View style={styles.inputSection}>
                <Image style={styles.logo} source={require('../assets/ropz-logo-gray.png')} />

                <Text style={styles.title}>Woow!!</Text>
                <Text style={styles.importantText}>É um prazer tê-lo aqui, {nome} 💘👋.</Text>
                <Text style={styles.description}>Precisamos de uma info importante agora, seu <Text style={styles.importantText}>CEP.</Text></Text>
                
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        maxLength={9}
                        keyboardType='numeric'
                        placeholder="01234-567"
                        value={cep}
                        onChangeText={text => setCep(formatCep(text))}
                        />
                </View>

                <TouchableOpacity style={styles.nxtButton} onPress={ () => submit()}>
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
    importantText: {
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