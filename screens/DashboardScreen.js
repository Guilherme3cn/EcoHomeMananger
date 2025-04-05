import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Modal,
  TextInput,
  ScrollView,
} from 'react-native';
import ConsumptionChart from '../components/ConsumptionChart';
import TopDevicesPieChart from '../components/TopDevicesPieChart';
import applianceIcons from '../utils/applianceIcons.js'; // Supondo que você tenha um arquivo com os ícones dos eletrodomésticos

export default function DashboardScreen() {
  const [appliances, setAppliances] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newName, setNewName] = useState('');
  const [newConsumption, setNewConsumption] = useState('');
  const [selectedIcon, setSelectedIcon] = useState(null);

  const openModal = () => {
    setModalVisible(true);
    setNewName('');
    setNewConsumption('');
    setSelectedIcon(null);
  };

  const addAppliance = () => {
    if (!newName || !newConsumption || !selectedIcon) return;

    const newAppliance = {
      id: Date.now().toString(),
      name: newName,
      consumption: parseFloat(newConsumption),
      icon: selectedIcon,
    };

    setAppliances([...appliances, newAppliance]);
    setModalVisible(false);
  };

  const deleteAppliance = (id) => {
    setAppliances(appliances.filter(item => item.id !== id));
  };

  const totalConsumption = appliances.reduce((total, item) => total + item.consumption, 0);

  const renderAppliance = ({ item }) => (
    <View style={styles.applianceBox}>
      <Image source={item.icon} style={styles.applianceIcon} />
      <View style={styles.applianceInfo}>
        <Text style={styles.applianceName}>{item.name}</Text>
        <Text style={styles.applianceConsumption}>{item.consumption} kWh</Text>
      </View>
      <TouchableOpacity onPress={() => deleteAppliance(item.id)}>
        <Text style={styles.deleteText}>🗑️</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>EcoHome Manager</Text>

      <View style={styles.consumptionBox}>
        <Text style={styles.consumptionLabel}>Consumo Atual</Text>
        <Text style={styles.consumptionValue}>{totalConsumption.toFixed(2)} kWh</Text>
      </View>

      <Text style={styles.sectionTitle}>Eletrodomésticos Conectados</Text>

      <FlatList
        data={appliances}
        renderItem={renderAppliance}
        keyExtractor={(item) => item.id}
        style={styles.applianceList}
        scrollEnabled={false}
      />

      <TouchableOpacity style={styles.addButton} onPress={openModal}>
        <Text style={styles.addButtonText}>+ Adicionar Dispositivo</Text>
      </TouchableOpacity>

      <View style={styles.graphPlaceholder}>
        <TopDevicesPieChart appliances={appliances} />
      </View>

      <Text style={styles.graphText}>Gráficos de Consumo</Text>
      <ConsumptionChart tipo="diario" />
      <ConsumptionChart tipo="semanal" />
      <ConsumptionChart tipo="mensal" />

      {/* Modal para adicionar novo eletrodoméstico */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Adicionar Dispositivo</Text>
            <TextInput
              placeholder="Nome do dispositivo"
              style={styles.input}
              value={newName}
              onChangeText={setNewName}
            />
            <TextInput
              placeholder="Consumo (kWh)"
              style={styles.input}
              keyboardType="numeric"
              value={newConsumption}
              onChangeText={setNewConsumption}
            />

            <Text style={styles.iconLabel}>Escolha um ícone:</Text>
            <ScrollView horizontal style={styles.iconScroll}>
              {applianceIcons.map((iconObj, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => setSelectedIcon(iconObj.source)}
                  style={[
                    styles.iconOption,
                    selectedIcon === iconObj.source && styles.selectedIcon,
                  ]}
                >
                  <Image source={iconObj.source} style={styles.iconImage} />
                </TouchableOpacity>
              ))}
            </ScrollView>

            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.cancelButton}>
                <Text style={styles.cancelText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={addAppliance} style={styles.confirmButton}>
                <Text style={styles.confirmText}>Adicionar</Text>
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
    padding: 20,
    backgroundColor: '#e0f5e8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  consumptionBox: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
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
    marginBottom: 10,
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
  applianceInfo: {
    flex: 1,
  },
  applianceName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  applianceConsumption: {
    color: '#666',
  },
  deleteText: {
    fontSize: 18,
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
    marginBottom: 20,
  },
  graphText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  iconLabel: {
    fontSize: 14,
    marginBottom: 8,
  },
  iconScroll: {
    marginBottom: 10,
  },
  iconOption: {
    marginRight: 10,
    borderRadius: 8,
    padding: 5,
  },
  iconImage: {
    width: 40,
    height: 40,
  },
  selectedIcon: {
    backgroundColor: '#c8f7dc',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    padding: 10,
  },
  cancelText: {
    color: '#888',
  },
  confirmButton: {
    padding: 10,
  },
  confirmText: {
    color: '#00C853',
    fontWeight: 'bold',
  },
});
