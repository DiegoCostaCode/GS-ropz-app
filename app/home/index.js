import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image, ScrollView, Alert} from "react-native";
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../../theme/colors';
import axios from 'axios';
import forecastResponse from '../types/forecastResponse';
import temperaturasResponse from '../types/temperaturasResponse';

export default function Home() {

    const expo = useRouter();

    const [isLoading, setIsLoading] = useState(true);

    const [relatorioAtual, setRelatorioAtual] = useState([]); 
    const [relatorioPrevisao, setRelatorioPrevisao] = useState(null);


    useEffect(() => {
        const fetchData = async () => {
            
            const idLocalizacao = await AsyncStorage.getItem('userLocalId');
            const token = await AsyncStorage.getItem('userToken');

            const header = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                validateStatus: () => true //DISCLAIMER: Isso é usado para evitar que o Axios lance um erro para códigos de status HTTP,
                //  já que posso fazer algumas requisições e elas serem 404 de NotFound.
            };

            const retries = 10;
            const delay = 3000;

            console.log(`Tentando obter dados climáticos para o local de ID: ${idLocalizacao}`);

            for (let i = 0; i < retries; i++) {

                console.log(`Tentativa ${i + 1} de ${retries}...`);

                const reportCurrentRes = await axios.get(
                    `http://192.168.1.72:8080/relatorio/api/temperaturas/current/${idLocalizacao}`,
                    header
                );
                const reportForecastRes = await axios.get(
                    `http://192.168.1.72:8080/relatorio/api/temperatura/forecast/${idLocalizacao}`,
                    header
                );

                const currentData = temperaturasResponse(reportCurrentRes.data);
                const forecastData = forecastResponse(reportForecastRes.data);

                if (
                    reportCurrentRes.status === 200 &&
                    reportForecastRes.status === 200 &&
                    currentData.length > 0 &&
                    forecastData != null
                ) {
                    console.log('Dados válidos recebidos!');
                    setRelatorioAtual(currentData);
                    setRelatorioPrevisao(forecastData);
                    break;
                }

                console.log(`Tentativa ${i + 1} falhou, tentando novamente em ${delay}ms...`);
                await new Promise(resolve => setTimeout(resolve, delay));
            }

            setIsLoading(false);
        };

        fetchData();
    }, []);

    if (isLoading) {
        return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: Colors.gray
        }}>
            <ActivityIndicator size={48} color={Colors.black} />
            <View style={{ width: '60%', marginTop: 20, alignItems: 'center' }}>
                <Text style={{ fontSize: 15,textAlign: 'center',marginTop: 10, fontWeight: "bold", color: Colors.black }}>Estamos arrumando a casa...desculpe a bagunça. 🧹😸</Text>
            </View>
        </View>
        );
    }

    
    
    return (
        <ScrollView contentContainerStyle={{ alignItems: 'center', paddingBottom: 32, backgroundColor: Colors.gray, }} style={{ flex: 1, width: '100%' }}>
            
            <View style={styles.container}>
                <View style={styles.localizacaoSectionn}>

                    <View style={styles.cityState}>
                        <Ionicons
                            name="compass"
                            color={Colors.black}
                            size={20}
                        />
                        <Text>{relatorioPrevisao.temperatura.localizacao.cidade} , {relatorioPrevisao.temperatura.localizacao.estado}</Text>
                    </View>

                    <View style={styles.coodernates}>
                        <View style={styles.info}>
                            <Text style={styles.importantText}>Lat.</Text>
                            <Text> {relatorioPrevisao.temperatura.localizacao.latitude}</Text>
                        </View>
                        <View style={styles.info}>
                            <Text style={styles.importantText}>Long.</Text>
                            <Text> {relatorioPrevisao.temperatura.localizacao.longitude}</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.warningrSection}>
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 5, marginBottom: 10 }}>
                        <Ionicons
                            name="alert-circle"
                            color={Colors.warn}
                            size={20}
                        />
                        <Text style={styles.importantText}>Fique alerta!</Text>
                    </View>

                    <Text style={styles.infoText}>Para os próximos 5 dias, a maior temperatura será: </Text>
                    
                    <View style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                borderLeftWidth: 2,
                                borderLeftColor: Colors.gray,
                                paddingLeft: 10,
                                borderRadius: 5,
                                marginTop: 10,
                                marginBottom: 10,
                            }}>
                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                                <Text style={{ color: Colors.black, fontWeight: 'bold' }}>{relatorioPrevisao.dataHora}</Text>
                                <Image
                                    source={{ uri: relatorioPrevisao.temperatura.icon }}
                                    style={{ width: 25, height: 25, borderRadius: 5, backgroundColor: Colors.aqua }}
                                />
                             </View>
                    </View>

                    <View style={styles.recomendationSection}>
                            <View style={{ flex: 0.5, alignItems: 'start' }}>
                                <Text style={styles.importantText}>Risco</Text>
                                <Text>{relatorioPrevisao.risco}</Text>
                            </View>
                            <View style={{ flex: 1, alignItems: 'start' }}>
                                <Text style={styles.importantText}>Detalhes</Text>
                                <Text>{relatorioPrevisao.mensagem}</Text>
                            </View>
                        </View>
                </View>

                <View style={styles.weatherSection}>

                    <Text style={styles.importantText}>Clima atual</Text>

                    <View style={styles.weatherSectionContent}>
                        
                        <View style={styles.tempStatuSection}>
                            <View style={styles.iconAndLabel}>
                                <Image style={styles.weatherIconG} source={{ uri: 'https://openweathermap.org/img/wn/03d@2x.png' }} />
                                <Text style={styles.title}>{relatorioAtual[0].temperatura.descricao}</Text>
                            </View>
                            <View style={styles.actualTemp}>
                                <Text style={styles.weatherTemp}>{relatorioAtual[0].temperatura.temperatura.toFixed(1)}°C</Text>
                            </View>
                        </View>

                        
                        <View style={styles.tempInfo}>
                            <View style={styles.info}>
                                <Text style={styles.importantText}>Max.</Text>
                                <Text style={styles.infoText}> {relatorioAtual[0].temperatura.temperaturaMaxima.toFixed(1)}°C</Text>
                            </View>
                            <View style={styles.info}>
                                <Text style={styles.importantText}>Min.</Text>
                                <Text style={styles.infoText}> {relatorioAtual[0].temperatura.temperaturaMinima.toFixed(1)}°C</Text>
                            </View>
                            <View style={styles.info}>
                                <Text style={styles.importantText}>Sen.</Text>
                                <Text style={styles.infoText}> {relatorioAtual[0].temperatura.sensacaoTermica.toFixed(1)}°C</Text>
                            </View>
                            <View style={styles.info}>
                                <Text style={styles.importantText}>Umidade</Text>
                                <Text style={styles.infoText}> {relatorioAtual[0].temperatura.umidade.toFixed(1)} m/s</Text>
                            </View>
                        </View>
                        
                        <View style={styles.recomendationSection}>
                            <View style={{ flex: 0.5, alignItems: 'start' }}>
                                <Text style={styles.importantText}>Risco</Text>
                                <Text>{relatorioAtual[0].risco}</Text>
                            </View>
                            <View style={{ flex: 1, alignItems: 'start' }}>
                                <Text style={styles.importantText}>Detalhes</Text>
                                <Text>{relatorioAtual[0].mensagem}</Text>
                            </View>
                        </View>
                        
                    </View>

                </View>


                <View style={styles.historySection}>
                    <Text style={styles.importantText}>Histórico de Temperaturas</Text>
                    <View style={{ marginTop: 10 }}>
                        {relatorioAtual.map(item => (

                        //DISCLAIMAR PARA O PROFESSOR: Isso foi feito assim, pois estava apresentando conflito entre FlatList e ScrollView, 
                        // que estava dando erro de renderização.

                        <View key={item.id} style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            borderLeftWidth: 2,
                            borderLeftColor: Colors.gray,
                            paddingLeft: 10,
                            borderRadius: 5,
                            marginBottom: 10,
                        }}>
                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                            <Text style={{ color: Colors.black, fontWeight: 'bold' }}>{item.dataHora}</Text>
                            <Image
                                source={{ uri: item.temperatura.icon }}
                                style={{ width: 25, height: 25, borderRadius: 5, backgroundColor: Colors.aqua }}
                            />
                            <Text style={{ color: Colors.black, fontSize: 12 }}> {item.risco}</Text>
                            </View>
                        </View>
                        ))}
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%', 
        justifyContent: 'start', 
        alignItems: 'center',
        marginTop: 20,
    },
    cityState: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2,
        marginRight: 20,
    },
    coodernates:{
        display: 'flex',
        flexDirection: 'row'
    },
    info: {
        display: 'flex',
        flexDirection: 'row',
        marginRight: 20,
    },
    localizacaoSectionn: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: Colors.white,
        width: '100%',
        maxWidth: 300,
        padding: 10,
        borderRadius: 10,
    },
    weatherSection: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100%',
        maxWidth: 300,
        backgroundColor: Colors.white,
        padding: 20,
        borderRadius: 10,
        marginTop: 8,
    },
    weatherSectionContent: {
        marginTop: 10,
        width: '100%',
    },
    recomendationSection: {
        display: 'flex',
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: Colors.gray,
        paddingTop: 5,
        marginTop: 10,
        marginBottom: 10,
    },
    historySection: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: '100%',
        maxWidth: 300,
        backgroundColor: Colors.white,
        padding: 20,
        borderRadius: 10,
        marginTop: 8,
    },
    warningrSection: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: '100%',
        maxWidth: 300,
        backgroundColor: Colors.white,
        padding: 20,
        borderRadius: 10,
        marginTop: 8,
    },
    tempInfo:{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    importantText: {
        fontWeight: 'bold',
        color: Colors.black,
    },
    infoText: {
        color: Colors.black,
        fontSize: 15,
    },
    weatherIconG: {
        width: 80,
        height: 80,
        backgroundColor: Colors.aqua,
        borderRadius: 5,
    },
    weatherIconP: {
        width: 20,
        height: 20,
        backgroundColor: Colors.aqua,
        borderRadius: 5,
    },
    iconAndLabel: {
        flex: 0.5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tempStatuSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    actualTemp: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 20,
        flex: 1,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.black,
        marginBottom: 10,
        textAlign: 'center',
        textTransform: 'capitalize',
    },
    weatherTemp: {
        fontSize: 40,
        fontWeight: 'bold',
        color: Colors.black,
        textAlign: 'center',
    },
})
