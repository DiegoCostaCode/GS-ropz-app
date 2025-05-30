import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useRouter } from 'expo-router';
import Colors from "../theme/colors";

export default function Onboarding() {
    const expo = useRouter();

  return (

    <View style={styles.container}>
        <View style={styles.containerLogo}>
            <Image style={styles.logo} source={require('../assets/ropz-logo-gray.png')} />
        </View>
        
        <View style={styles.btnSection}>
            <Text style={styles.title}>Bem-vindo ao Ropz 🌞</Text>
        
            <TouchableOpacity
                style={styles.mainButton}
                onPress={() => expo.push('/cadastro')}
            >
                <Text style={styles.buttonText}>Cadastrar</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.suButton}
                onPress={() => expo.push('/login')}
            >
                <Text style={styles.suButtonText}>Login</Text>
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
    containerLogo:{
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: '100%',
        backgroundColor: Colors.background,
        padding: 20,
    },
    btnSection:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '70%',
        backgroundColor: Colors.background,
        padding: 20,
    },
    title: {
        fontSize: 16,
        textAlign: 'left',
        fontWeight: 'bold',
        color: Colors.black,
        marginBottom: 20,
        width: '100%',
    },
    mainButton: {
        backgroundColor: Colors.black,
        color: Colors.white,
        padding: 10,
        width: '100%',
        borderRadius: 5,
        margin: 5,
    },
    buttonText: {
        color: Colors.white,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    suButton: {
        backgroundColor: Colors.gray,
        color: Colors.black,
        fontWeight: 'bold',
        padding: 10,
        width: '100%',
        borderRadius: 5,
        margin: 5,
    },
    suButtonText: {
        color: Colors.black,
        fontWeight: 'bold',
        textAlign: 'center',
        textDecorationLine: 'underline'
    },
    logo: {
        width: 80,
        height: 80,
        padding: 10,
        resizeMode: 'contain',
    }
})