
// Grafico de pizza com os eletrodomésticos que mais consomem energia em tempo real
import React from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const TopDevicesPieChart = () => {
    const rawData = [
        { name: 'Geladeira', consumption: 35, color: '#00C853' },
        { name: 'Ar-condicionado', consumption: 25, color: '#1E88E5' },
        { name: 'Máquina de Lavar', consumption: 15, color: '#FFC107' },
        { name: 'Forno Elétrico', consumption: 10, color: '#E53935' },
        { name: 'Outros', consumption: 15, color: '#9E9E9E' },
    ];

    const total = rawData.reduce((acc, curr) => acc + curr.consumption, 0);

    const data = rawData.map((item) => ({
        name: item.name,
        percentage: ((item.consumption / total) * 100).toFixed(1),
        consumption: item.consumption,
        color: item.color,
    }));

    const chartData = data.map((item) => ({
        name: item.name,
        consumption: item.consumption,
        color: item.color,
        legendFontColor: '#000', // desnecessário, mas exigido pela lib
        legendFontSize: 12,
    }));

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Consumo por Eletrodoméstico (Tempo Real)</Text>

            <PieChart
                data={chartData}
                width={screenWidth - 80}
                height={250}
                chartConfig={{ color: () => `#000` }}
                accessor={'consumption'}
                backgroundColor={'transparent'}
                paddingLeft={'80'}
                hasLegend={false}
                absolute
            />

            <View style={styles.legendContainer}>
                {data.map((item, index) => (
                    <View key={index} style={styles.legendItem}>
                        <View style={[styles.colorBox, { backgroundColor: item.color }]} />
                        <Text style={styles.legendText}>
                            {item.name} - {item.percentage}%
                        </Text>
                    </View>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginVertical: 20,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 10,
        textAlign: 'center',
    },
    legendContainer: {
        marginTop: 15,
        width: '100%',
        paddingHorizontal: 20,
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6,
    },
    colorBox: {
        width: 14,
        height: 14,
        marginRight: 8,
        borderRadius: 3,
    },
    legendText: {
        fontSize: 14,
        color: '#333',
    },
});

export default TopDevicesPieChart;
