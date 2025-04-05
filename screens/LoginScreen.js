import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
    const navigation = useNavigation(); // ← necessário para navegar

    return (
        <View style={styles.container}>
            <Image source={require('../assets/Logo.png')} style={styles.logo} />

            <View style={styles.loginBox}>
                <Text style={styles.title}>Bem-vindo!</Text>
                <Text style={styles.subtitle}>Acesse sua conta para continuar</Text>

                <Text style={styles.label}>Email</Text>
                <TextInput style={styles.input} placeholder="Digite seu email" />

                <Text style={styles.label}>Senha</Text>
                <TextInput style={styles.input} placeholder="Digite sua senha" secureTextEntry />

                <TouchableOpacity>
                    <Text style={styles.forgot}>Esqueceu a senha?</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('Dashboard')} // ← Aqui navega para Dashboard
                >
                    <Text style={styles.buttonText}>Entrar</Text>
                </TouchableOpacity>

                <Text style={styles.registerText}>
                    Ainda não tem conta?{' '}
                    <Text
                        style={styles.registerLink}
                        onPress={() => navigation.navigate('Cadastro')} // ← Aqui navega para Cadastro
                    >
                        Cadastre-se
                    </Text>
                </Text>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e0f5e8',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    logo: {
        width: 200,
        height: 200,
        marginBottom: 20,
    },
    loginBox: {
        backgroundColor: '#e0f5e8',
        borderRadius: 15,
        padding: 20,
        width: '100%',
        elevation: 5,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 14,
        textAlign: 'center',
        color: '#555',
        marginBottom: 20,
    },
    label: {
        marginTop: 10,
        fontWeight: '600',
    },
    input: {
        backgroundColor: '#FFFAFA',
        borderRadius: 8,
        padding: 10,
        marginTop: 5,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    forgot: {
        alignSelf: 'flex-end',
        marginTop: 5,
        color: '#00C853',
        fontSize: 12,
    },
    button: {
        backgroundColor: '#00C853',
        borderRadius: 8,
        padding: 12,
        marginTop: 20,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    registerText: {
        marginTop: 15,
        textAlign: 'center',
        color: '#555',
    },
    registerLink: {
        color: '#00C853',
        fontWeight: 'bold',
    },
});
