import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, ScrollView } from "react-native";
import { useRouter } from 'expo-router';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../../theme/colors';

// -> http://localhost:8080/relatorio/api/temperaturas/current/1

// -> http://localhost:8080/relatorio/api/temperatura/forecast/1

const Temp = [
    {
        "id": 1,
        "risco": "Baixo",
        "mensagem": "Temperatura confortável e segura. Não há recomendações específicas de proteção contra o calor.",
        "temperaturaId": 1,
        "temperaturaIcon": "https://openweathermap.org/img/wn/01d@2x.png",
        "dataHora": "30/05/2025 11:03:45",
        "dataCriacao": "30/05/2025 11:04:38"
    },
    {
        "id": 2,
        "risco": "Baixo",
        "mensagem": "Temperatura confortável e segura. Não há recomendações específicas de proteção contra o calor.",
        "temperaturaId": 1,
        "temperaturaIcon": "https://openweathermap.org/img/wn/01d@2x.png",
        "dataHora": "30/05/2025 11:03:45",
        "dataCriacao": "30/05/2025 11:04:38"
    },
    {
        "id": 3,
        "risco": "Baixo",
        "mensagem": "Temperatura confortável e segura. Não há recomendações específicas de proteção contra o calor.",
        "temperaturaId": 1,
        "temperaturaIcon": "https://openweathermap.org/img/wn/01d@2x.png",
        "dataHora": "30/05/2025 11:03:45",
        "dataCriacao": "30/05/2025 11:04:38"
    },
    {
        "id": 4,
        "risco": "Baixo",
        "mensagem": "Temperatura confortável e segura. Não há recomendações específicas de proteção contra o calor.",
        "temperaturaId": 1,
        "temperaturaIcon": "https://openweathermap.org/img/wn/01d@2x.png",
        "dataHora": "30/05/2025 11:03:45",
        "dataCriacao": "30/05/2025 11:04:38"
    } 
];

const Warning = 
    {
        "id": 2,
        "risco": "Baixo",
        "mensagem": "Temperaturas confortáveis e seguras. Evite exposição prolongada ao sol.",
        "temperaturaId": 2,
        "temperaturaIcon": "https://openweathermap.org/img/wn/03d@2x.png",
        "dataHora": "02/06/2025 18:00:00",
        "dataCriacao": "30/05/2025 13:14:49"
    }


export default function Home() {
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
                        <Text>Sao Paulo , SP</Text>
                    </View>

                    <View style={styles.coodernates}>
                        <View style={styles.info}>
                            <Text style={styles.importantText}>Lat.</Text>
                            <Text> -50.0000</Text>
                        </View>
                        <View style={styles.info}>
                            <Text style={styles.importantText}>Long.</Text>
                            <Text> -50.0000</Text>
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
                        <Text style={styles.importantText}>Fique ciente!</Text>
                    </View>

                    <Text style={styles.infoText}>Para os próximos 5 dias, temos um mensagem: </Text>
                    
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
                                <Text style={{ color: Colors.black, fontWeight: 'bold' }}>{Warning.dataHora}</Text>
                                <Image
                                    source={{ uri: Warning.temperaturaIcon }}
                                    style={{ width: 25, height: 25, borderRadius: 5, backgroundColor: Colors.aqua }}
                                />
                                <Text style={{ color: Colors.black, fontSize: 12 }}> {Warning.risco}</Text>
                            </View>
                    </View>

                    <View style={styles.recomendationSection}>
                            <View style={{ flex: 0.5, alignItems: 'start' }}>
                                <Text style={styles.importantText}>Risco</Text>
                                <Text>Baixo</Text>
                            </View>
                            <View style={{ flex: 1, alignItems: 'start' }}>
                                <Text style={styles.importantText}>Precauções</Text>
                                <Text>Use roupas leves e confortáveis.</Text>
                            </View>
                        </View>
                </View>

                <View style={styles.weatherSection}>

                    <Text style={styles.importantText}>Clima atual</Text>

                    <View style={styles.weatherSectionContent}>
                        <View style={styles.tempStatuSection}>
                            <View style={styles.iconAndLabel}>
                                <Image style={styles.weatherIconG} source={{ uri: 'https://openweathermap.org/img/wn/03d@2x.png' }} />
                                <Text style={styles.title}>Nublado</Text>
                            </View>
                            <View style={styles.actualTemp}>
                                <Text style={styles.weatherTemp}>15°C</Text>
                            </View>
                        </View>

                        
                        <View style={styles.tempInfo}>
                            <View style={styles.info}>
                                <Text style={styles.importantText}>Max.</Text>
                                <Text style={styles.infoText}> 15*C</Text>
                            </View>
                            <View style={styles.info}>
                                <Text style={styles.importantText}>Min.</Text>
                                <Text style={styles.infoText}> 15*C</Text>
                            </View>
                            <View style={styles.info}>
                                <Text style={styles.importantText}>Sen.</Text>
                                <Text style={styles.infoText}> 18*C</Text>
                            </View>
                            <View style={styles.info}>
                                <Text style={styles.importantText}>Umidade</Text>
                                <Text style={styles.infoText}> 67 m/s</Text>
                            </View>
                        </View>
                        
                        <View style={styles.recomendationSection}>
                            <View style={{ flex: 0.5, alignItems: 'start' }}>
                                <Text style={styles.importantText}>Risco</Text>
                                <Text>Baixo</Text>
                            </View>
                            <View style={{ flex: 1, alignItems: 'start' }}>
                                <Text style={styles.importantText}>Precauções</Text>
                                <Text>Use roupas leves e confortáveis.</Text>
                            </View>
                        </View>
                        
                    </View>

                </View>


                <View style={styles.historySection}>
                    <Text style={styles.importantText}>Histórico de Temperaturas</Text>
                    <View style={{ marginTop: 10 }}>
                        {Temp.map(item => (

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
                                source={{ uri: item.temperaturaIcon }}
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
    },
    weatherTemp: {
        fontSize: 40,
        fontWeight: 'bold',
        color: Colors.black,
        textAlign: 'center',
    },
})
