import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, Modal, TextInput, ScrollView } from 'react-native';
import ConsumptionChart from '../components/ConsumptionChart';
import TopDevicesPieChart from '../components/TopDevicesPieChart';

// Lista de ícones disponíveis
const iconOptions = [
  require('../assets/fridge.png'),
  require('../assets/ar.png'),
  require('../assets/televisao.png'),
  require('../assets/microondas.png'),
  require('../assets/maquina.png'),
];

export default function DashboardScreen() {
  const [appliances, setAppliances] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newName, setNewName] = useState('');
  const [newConsumption, setNewConsumption] = useState('');
  const [selectedIcon, setSelectedIcon] = useState(iconOptions[0]);

  const addAppliance = () => {
    if (newName && newConsumption) {
      const newItem = {
        id: Date.now().toString(),
        name: newName,
        consumption: newConsumption + ' kWh',
        icon: selectedIcon,
      };
      setAppliances([...appliances, newItem]);
      setNewName('');
      setNewConsumption('');
      setSelectedIcon(iconOptions[0]);
      setModalVisible(false);
    }
  };

  const renderAppliance = ({ item }) => (
    <View style={styles.applianceBox}>
      <Image source={item.icon} style={styles.applianceIcon} />
      <View>
        <Text style={styles.applianceName}>{item.name}</Text>
        <Text style={styles.applianceConsumption}>{item.consumption}</Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>EcoHome Manager</Text>

      <View style={styles.consumptionBox}>
        <Text style={styles.consumptionLabel}>Consumo Atual</Text>
        <Text style={styles.consumptionValue}>3.7 kWh</Text>
      </View>

      <Text style={styles.sectionTitle}>Eletrodomésticos Conectados</Text>
      {appliances.length === 0 ? (
        <Text style={{ textAlign: 'center', color: '#666', marginBottom: 20 }}>Nenhum dispositivo adicionado.</Text>
      ) : (
        <FlatList
          data={appliances}
          renderItem={renderAppliance}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
        />
      )}

      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.addButtonText}>+ Adicionar Dispositivo</Text>
      </TouchableOpacity>

      {/* Gráfico de pizza */}
      <View style={styles.graphPlaceholder}>
        <TopDevicesPieChart />
      </View>

      {/* Gráficos adicionais */}
      <ConsumptionChart tipo="diario" />
      <ConsumptionChart tipo="semanal" />
      <ConsumptionChart tipo="mensal" />
      <Text style={styles.graphText}>Gráficos de Consumo</Text>

      {/* Modal de Adição */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Novo Dispositivo</Text>
            <TextInput
              placeholder="Nome"
              value={newName}
              onChangeText={setNewName}
              style={styles.input}
            />
            <TextInput
              placeholder="Consumo (kWh)"
              value={newConsumption}
              onChangeText={setNewConsumption}
              keyboardType="numeric"
              style={styles.input}
            />

            <Text style={{ fontWeight: 'bold', marginTop: 10 }}>Escolher Ícone:</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginVertical: 10 }}>
              {iconOptions.map((icon, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => setSelectedIcon(icon)}
                  style={[
                    styles.iconOption,
                    selectedIcon === icon && styles.selectedIcon,
                  ]}
                >
                  <Image source={icon} style={{ width: 40, height: 40 }} />
                </TouchableOpacity>
              ))}
            </ScrollView>

            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.cancelButton}>
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={addAppliance} style={styles.saveButton}>
                <Text style={styles.saveButtonText}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    margin: 5,
  },
  graphText: {
    fontSize: 16,
    color: '#888',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: '#000000aa',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginVertical: 8,
  },
  iconOption: {
    padding: 5,
    marginRight: 10,
    borderRadius: 8,
    backgroundColor: '#f1f1f1',
  },
  selectedIcon: {
    borderWidth: 2,
    borderColor: '#00C853',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  cancelButton: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginRight: 10,
  },
  cancelButtonText: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: '#00C853',
    padding: 10,
    borderRadius: 8,
    flex: 1,
  },
  saveButtonText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
  },
});
