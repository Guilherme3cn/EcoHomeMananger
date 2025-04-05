import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function RegisterScreen() {
    const navigation = useNavigation();

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.registerBox}>
                <Text style={styles.title}>Criar Conta</Text>
                <Text style={styles.subtitle}>Cadastre-se para começar a usar o EcoHome Manager</Text>

                <Text style={styles.label}>Nome completo</Text>
                <TextInput style={styles.input} placeholder="Digite seu nome" />

                <Text style={styles.label}>Email</Text>
                <TextInput style={styles.input} placeholder="Digite seu email" />

                <Text style={styles.label}>Senha</Text>
                <TextInput style={styles.input} placeholder="Crie uma senha" secureTextEntry />

                <Text style={styles.label}>Confirmar senha</Text>
                <TextInput style={styles.input} placeholder="Repita a senha" secureTextEntry />

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('Login')} // Navega de volta ao login
                >
                    <Text style={styles.buttonText}>Cadastrar</Text>
                </TouchableOpacity>

                <Text style={styles.registerText}>
                    Já tem uma conta?{' '}
                    <Text
                        style={styles.registerLink}
                        onPress={() => navigation.navigate('Login')}
                    >
                        Entrar
                    </Text>
                </Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#e0f5e8',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    registerBox: {
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
