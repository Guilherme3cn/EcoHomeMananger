
// Grafico de pizza com os eletrodomésticos que mais consomem energia em tempo real
import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const TopDevicesPieChart = () => {
    const data = [
        { name: 'Geladeira', consumption: 35, color: '#228B22' },
        { name: 'Ar-condicionado', consumption: 25, color: '#3CB371' },
        { name: 'Máquina de Lavar', consumption: 15, color: '#32CD32' },
        { name: 'Forno Elétrico', consumption: 10, color: '#00FF00' },
        { name: 'Outros', consumption: 15, color: '#7FFF00' },
    ];

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Consumo por Eletrodoméstico (Tempo Real)
            </Text>

            <PieChart // Grafixo de pizza
                data={data.map(item => ({
                    name: item.name,
                    consumption: item.consumption,
                    color: item.color,


                }))}
                width={screenWidth - 100}
                paddingLeft='70'
                height={250}
                chartConfig={{
                    color: () => `#FFFAFA`,
                }}
                accessor="consumption"
                backgroundColor="transparent"
                hasLegend={false} //  DESATIVA LEGENDAS DO LADO DIREITO
                absolute
            />

            <View style={styles.legendaContainer}>
                {data.map((item, index) => (
                    <View key={index} style={styles.legendaItem}>
                        <View style={[styles.colorIndicator, { backgroundColor: item.color }]} />
                        <Text style={styles.legendaTexto}>{item.name}</Text>
                    </View>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'flex-start',
        marginVertical: 20,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 10,
        textAlign: 'center',
    },
    legendaContainer: {
        marginTop: 20,
        width: '100%',
    },
    legendaItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    colorIndicator: {
        width: 14,
        height: 14,
        borderRadius: 3,
        marginRight: 10,
    },
    legendaTexto: {
        fontSize: 14,
        color: '#333',
    },
});

export default TopDevicesPieChart;
