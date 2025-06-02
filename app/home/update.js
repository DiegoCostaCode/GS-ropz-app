import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Alert} from "react-native";
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../../theme/colors';
import axios from 'axios';
import {usuarioResponse, usuarioRequest} from '../types/usuarioResponse';
import { formatTel, formatCep} from '../utils/cadastroFunctions';

export default function Update() {
    
    const expo = useRouter();

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [senha, setSenha] = useState('');
    const [cep, setCep] = useState('');

    const credentials = async () => {
        const id = await AsyncStorage.getItem('userId');
        const token = await AsyncStorage.getItem('userToken');

        const header = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        };

        if(id && token && header) {
            return { id, header };
        } else {
            Alert.alert('Ops!', 'Não foi possível te autenticar! 🙀');
            expo.push('/login');
            return null;
        }
    }

    useEffect(() => {

        setNome('');
        setEmail('');
        setTelefone('');
        setSenha('');
        setCep('');

        const fetchData = async () => {

            credentials().then(({ id, header }) => {
                axios.get(`http://192.168.1.72:8080/usuario/api/${id}`, header)
                .then((res) => {
                    
                const user = usuarioResponse(res.data);

                setNome(user.nome);
                setEmail(user.email);
                setTelefone(user.telefone);
                setSenha(user.senha);
                setCep(user.localizacao.cep);

                })
                .catch((err) => console.error('Erro ao buscar usuário:', err.message));
            });

        };

        fetchData();
    }, []);

    const logOut = async () => {

        console.log('Deslogando usuário...');

        try {

            console.log('Removendo dados do AsyncStorage...');

            await AsyncStorage.removeItem('userId');
            await AsyncStorage.removeItem('userToken');
            await AsyncStorage.removeItem('userLocalId');

        } catch (error) {
            console.error('Erro ao remover dados do AsyncStorage:', error);
            Alert.alert('Ops!', 'Erro ao deslogar. Por favor, tente novamente.🙀');
        }

        console.log('Usuário deslogado');

        Alert.alert('Aaah...', 'Uma pena que está indo embora. Mas você é sempre bem-vindo. 🏚️😽');

        expo.push('/');
    };

    const atualizar = async () => {

        credentials().then(({ id, header }) => {

            const usuarioDTO = usuarioRequest(
            {
                nome: nome,
                email: email,
                telefone: telefone,
                senha: senha,
                cep: cep
            });

            if (usuarioDTO !== null){

                axios.put(`http://192.168.1.72:8080/usuario/api/${id}`, usuarioDTO, header)
                .then(async ( response ) => {

                    console.log('Usuário atualizado com sucesso:', response.data);

                    const usuario = usuarioResponse(response.data);

                    await AsyncStorage.removeItem('userLocalId');
                    await AsyncStorage.setItem('userLocalId', usuario.localizacao.id.toString());
                    
                    await axios.get(`http://192.168.1.72:8080/temperatura/api/current/${usuario.localizacao.id}`, header);
                    await axios.get(`http://192.168.1.72:8080/temperatura/api/forecast/${usuario.localizacao.id}`, header);

                    expo.push('/home')
                    Alert.alert('Uhuul!!', 'Dados atualizado com sucesso!!. 🍃😸');
                })
                .catch((error) => {
                    console.error('Erro ao atualizar perfil:', error.message);
                    Alert.alert('Ops!', 'Erro ao atualizar o perfil. Por favor, tente novamente.🙀');
                });
            }

        });

    }

    const deletar = async () => {

        credentials().then(({ id, header }) => {

            axios.delete(`http://192.168.1.72:8080/usuario/api/${id}`, header)
            .then(() => {
                Alert.alert('Aaahh...', 'É triste vê-lo partir. Até logo! 🏚️😿');
                expo.push('/');
            })
            .catch((error) => {
                Alert.alert('Ops!', 'Erro ao deletar sua conta. 🙀');
            });

        });

    };

    return (

        <View style={styles.container}>
                    
            <View style={styles.inputSection}>
                <Image style={styles.logo} source={require('../../assets/ropz-logo-gray.png')} />

                <Text style={styles.title}>Atualize suas informações ⚙️.</Text>
                
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Nome</Text>
                    <TextInput style={styles.input} value={nome}  onChangeText={setNome}/>
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>E-mail</Text>
                    <TextInput keyboardType="email-address" value={email} style={styles.input}  onChangeText={setEmail} />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Telefone</Text>
                    <TextInput style={styles.input} value={telefone}  onChangeText={number => setTelefone(formatTel(number))}/>
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>CEP</Text>
                    <TextInput style={styles.input} keyboardType="number" value={cep} onChangeText={text => setCep (formatCep(text))} />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Senha</Text>
                    <TextInput style={styles.input} placeholder="Senha super secreta" value={senha} onChangeText={setSenha} secureTextEntry />
                </View>

                <View style={{display: 'flex', flexDirection: 'row', width: '90%'}}>
                    <TouchableOpacity style={styles.atualizarBtn} onPress={atualizar}>
                        <Text style={{textAlign: 'center', fontWeight: 'bold', color: Colors.white}}>Atualizar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.apagarBtn} onPress={deletar}>
                        <Text style={{textAlign: 'center', color: Colors.grayDark}}>Deletar a minha conta</Text>
                    </TouchableOpacity>
                </View>

            </View>

            <TouchableOpacity style={styles.logoutSection} onPress={logOut}>
                <Text style={{textAlign: 'center', color: Colors.white, fontWeight: 'bold'}}>Sair</Text>
            </TouchableOpacity>

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
    logoutSection:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
        borderRadius: 10,
        backgroundColor: Colors.black,
        padding: 10,
        marginTop: 10,
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