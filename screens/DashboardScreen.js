import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList, Image } from 'react-native';
import ConsumptionChart from '../components/ConsumptionChart';
import TopDevicesPieChart from '../components/TopDevicesPieChart';


export default function DashboardScreen() {
    const appliances = [
        { id: '1', name: 'Geladeira', consumption: '1.2 kWh', icon: require('../assets/fridge.png') },
        { id: '2', name: 'Ar Condicionado', consumption: '2.5 kWh', icon: require('../assets/fridge.png') },
        { id: '3', name: 'TV', consumption: '0.8 kWh', icon: require('../assets/fridge.png') },
        // Você pode adicionar mais
    ];

    const renderAppliance = ({ item }) => (
        <View style={styles.applianceBox}>
            <Image source={require('../assets/fridge.png')} style={styles.applianceIcon} />
            <View>
                <Text style={styles.applianceName}>{item.name}</Text>
                <Text style={styles.applianceConsumption}>{item.consumption}</Text>
            </View>
        </View>
    );

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>EcoHome Manager</Text>

            <View style={styles.consumptionBox}>
                <Text style={styles.consumptionLabel}>Consumo Atual</Text>
                <Text style={styles.consumptionValue}>3.7 kWh</Text>
            </View>

            <Text style={styles.sectionTitle}>Eletrodomésticos Conectados</Text>
            <FlatList
                data={appliances}
                renderItem={renderAppliance}
                keyExtractor={(item) => item.id}
                style={styles.applianceList}
            />

            <TouchableOpacity style={styles.addButton}>
                <Text style={styles.addButtonText}>+ Adicionar Dispositivo</Text>
            </TouchableOpacity>

            //Grafico de consumo em tempo real "pizza"
            <View style={styles.graphPlaceholder}>

                <TopDevicesPieChart />
            </View>

            // Gráficos de consumo diário, semanal e mensal
            <ConsumptionChart tipo="diario" />
            <ConsumptionChart tipo="semanal" />
            <ConsumptionChart tipo="mensal" />

            <Text style={styles.graphText}>Gráficos de Consumo</Text>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e0f5e8',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
    },
    consumptionBox: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 20,
        marginBottom: 20,
        alignItems: 'center',
        elevation: 3,
    },
    consumptionLabel: {
        fontSize: 16,
        color: '#888',
    },
    consumptionValue: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#00C853',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginVertical: 10,
    },
    applianceList: {
        marginBottom: 20,
    },
    applianceBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        elevation: 2,
    },
    applianceIcon: {
        width: 40,
        height: 40,
        marginRight: 15,
    },
    applianceName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    applianceConsumption: {
        color: '#666',
    },
    addButton: {
        backgroundColor: '#00C853',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 20,
    },
    addButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    graphPlaceholder: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 12,
        alignItems: 'center',
        elevation: 3,
        margin: 5
    },
    graphText: {
        fontSize: 16,
        color: '#888',
        marginBottom: 20,

    },
});
