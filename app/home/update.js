import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image} from "react-native";
import { useRouter } from 'expo-router';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../../theme/colors';


//http://localhost:8080/usuario/api/1

export default function Update() {

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [senha, setSenha] = useState('');
    const [cep, setCep] = useState('');

    return (
        <View style={styles.container}>
                    
            <View style={styles.inputSection}>
                <Image style={styles.logo} source={require('../../assets/ropz-logo-gray.png')} />

                <Text style={styles.title}>Atualize suas informações ⚙️.</Text>
                
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Nome</Text>
                    <TextInput style={styles.input}   onChangeText={setNome}/>
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>E-mail</Text>
                    <TextInput keyboardType="email-address" style={styles.input}  onChangeText={setEmail} />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Telefone</Text>
                    <TextInput style={styles.input} keyboardType="phone-pad" value={telefone}  onChangeText={text => setTelefone(formatTel(text))}/>
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>CEP</Text>
                    <TextInput style={styles.input} keyboardType="number" value={senha} onChangeText={setCep} />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Senha</Text>
                    <TextInput style={styles.input} placeholder="Senha super secreta" value={senha} onChangeText={setSenha} secureTextEntry />
                </View>

                <View style={{display: 'flex', flexDirection: 'row', width: '90%'}}>
                    <TouchableOpacity style={styles.atualizarBtn} >
                        <Text style={{textAlign: 'center', fontWeight: 'bold', color: Colors.white}}>Atualizar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.apagarBtn} >
                        <Text style={{textAlign: 'center', color: Colors.grayDark}}>Deletar a minha conta</Text>
                    </TouchableOpacity>
                </View>

            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.gray,
    },
    inputSection:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'start',
        width: '90%',
        borderRadius: 10,
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
    atualizarBtn: {
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: Colors.black,
        color: Colors.white,
        width: 100,
        padding: 10,
        borderRadius: 25,
        marginTop: 20,
    },
    apagarBtn: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignContent: 'end',
        backgroundColor: 'transparent',
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