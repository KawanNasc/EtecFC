import React, { useState, useEffect } from 'react';
import { SafeAreaView, TouchableOpacity, View, Text, FlatList, StyleSheet, Alert, ImageBackground } from 'react-native';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from '@expo/vector-icons';
import { getAuth} from 'firebase/auth';
import { collection, doc, deleteDoc, onSnapshot } from 'firebase/firestore';
import { getFirestore } from "firebase/firestore";

export default function Home({ navigation }) {
  
  const auth = getAuth();
  const [clube, setClube] = useState([]);
  const firestore = getFirestore();

  function deleteClube(id) {
    deleteDoc(doc(collection(firestore, 'clubes'), id))
      .catch((error) => {
        console.error('Erro ao excluir clube:', error.message);
      });
  }

  useEffect(() => {
    const unsubscribeClube = onSnapshot(collection(firestore, 'clubes'), (querySnapshot) => {
      const lista = [];
      querySnapshot.forEach((doc) => { lista.push({ ...doc.data(), id: doc.id }); });
      setClube(lista);
    }); 

    return () => { unsubscribeClube();};
  }, [auth, navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={require('../../assets/champinha.jpg')} style={styles.backgroundImage}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Club List</Text>
          <MaterialCommunityIcons name="soccer" size={28} color="white" />
        </View>
        <FlatList 
          data={clube} 
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigation.navigate('Alterar Clube', {
              id: item.id,
              idolo: item.idolo,
              clube: item.clube
            }) }>
              <View style={styles.content}>
                <Text style={styles.title}> Clube: <Text style={styles.itemTitle}>{item.clube}</Text> </Text>
                <Text style={styles.itemText}> Ídolo: <Text style={styles.itemText}>{item.idolo}</Text> </Text>
                <TouchableOpacity onPress={() => deleteClube(item.id)}>
                  <Text style={styles.deleteButton}>Excluir</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )} 
        />
        <View style={styles.addButton}>
          <TouchableOpacity onPress={() => navigation.navigate("Cadastrar Clube")}>
            <MaterialCommunityIcons name="plus-circle-outline" size={60} color="blue" />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(46, 134, 193, 0.7)',
    paddingVertical: 30
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginRight: 10,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)', 
    margin: 20,
    borderRadius: 20,
    padding: 20, 
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#3E4E5E',
  },
  itemText: {
    color: '#000',
    fontSize: 20
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Adicionei uma opacidade ao botão
    borderRadius: 35,
    padding: 10,
    zIndex: 1,
  },
  deleteButton: {
    color: 'red',
    marginTop: 10,
  },
});
