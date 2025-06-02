import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Alert } from "react-native";
import { useRouter } from 'expo-router';
import Colors from "../theme/colors";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { formatTel } from './utils/cadastroFunctions';


export default function Cadastro() {
    const expo = useRouter();

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [senha, setSenha] = useState('');

    const submit = () => {

        if (!nome || !email || !telefone || !senha) {
            Alert.alert('Ops!', 'Você esqueceu de preencher um campo...😿');
            return;
        }

        expo.push({
            pathname: '/cep',
            params: {
                nome,
                email,
                telefone,
                senha
            }
            });
    };


    return (

        <View style={styles.container}>
            
            <View style={styles.inputSection}>
                <Image style={styles.logo} source={require('../assets/ropz-logo-gray.png')} />

                <Text style={styles.title}>Precisamos de alguns dados iniciais...</Text>
                
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Nome</Text>
                    <TextInput style={styles.input} placeholder="Calorzinho da Silva"  onChangeText={setNome}/>
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>E-mail</Text>
                    <TextInput keyboardType="email-address" style={styles.input} placeholder="calor@gmail.com" onChangeText={setEmail} />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Telefone</Text>
                    <TextInput style={styles.input} keyboardType="phone-pad" maxLength={15} value={telefone} placeholder="(00) 0000-0000" onChangeText={text => setTelefone(formatTel(text))}/>
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Senha</Text>
                    <TextInput style={styles.input} placeholder="Senha super secreta" value={senha} onChangeText={setSenha} secureTextEntry />
                </View>

                <TouchableOpacity style={styles.nxtButton} onPress={submit} >
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
        fontSize: 17,
        textAlign: 'left',
        fontWeight: 'bold',
        color: Colors.black,
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
        width: '70%',
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
        borderRadius: 25,
        marginTop: 20,
    },
    logo: {
        width: 50,
        height: 50,
        marginBottom: 20,
        resizeMode: 'contain',
    }
})