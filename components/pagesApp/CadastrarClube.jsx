import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, SafeAreaView, ImageBackground } from 'react-native';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { Ionicons } from '@expo/vector-icons'; 

export default function CadClube({ navigation }) {
  const [clube, setClube] = useState('');
  const [idolo, setIdolo] = useState('');
  const firestore = getFirestore();

  async function addClube() {
    try {
      await addDoc(collection(firestore, 'clubes'), {
        clube: clube,
        idolo: idolo,
      });
      setClube('');
      setIdolo('');
      Alert.alert("Cadastro", "Clube adicionado com sucesso");
      navigation.navigate("Home");
    } catch (error) {
      console.error("Erro ao adicionar clube:", error.message);
      Alert.alert("Erro", "Ocorreu um erro ao adicionar o clube. Por favor, tente novamente.");
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={require('../../assets/champinha.jpg')} style={styles.backgroundImage}>
        <View style={styles.content}>
          <TouchableOpacity style={styles.goBackButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.title}>Qual seu clube do coração?</Text>
          <TextInput 
              style={styles.input} 
              placeholder="Nome do clube" 
              onChangeText={setClube} 
              value={clube} 
              autoCapitalize="words"
          />
          <TextInput 
              style={styles.input} 
              placeholder="Um ídolo marcante" 
              onChangeText={setIdolo} 
              value={idolo} 
          />
          <TouchableOpacity style={styles.button} onPress={addClube}>
              <Text style={styles.buttonText}>Cadastrar</Text>
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
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 23,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
    textAlign: 'center',
  },
  input: {
    height: 40,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    paddingHorizontal: 10,
    width: '80%'
  },
  button: {
    backgroundColor: 'darkblue',
    height: 40,
    width: '80%',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  goBackButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
    marginTop:20
  },
});
