import React, { useState, useEffect } from "react";
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ImageBackground } from 'react-native';
import { app } from '../../firebaseConfig'; 
import { getFirestore, collection, doc, updateDoc } from "firebase/firestore";
import { Ionicons } from '@expo/vector-icons'; 

const firestore = getFirestore(app); 

export default function Alterar({ navigation, route }) {

    const [clube, setClube] = useState(route.params?.clube); 
    const [idolo, setIdolo] = useState(route.params?.idolo);
    
    function altClube() {
        const id = route.params?.id; 

        if (!id) {  
            Alert.alert("Erro", "ID do registro não encontrado. Por favor, tente novamente."); 
            return;
        }

        
        updateDoc(doc(collection(firestore, "clubes"), id), {
            clube: clube,
            idolo: idolo,
        })
        .then(() => {
            Alert.alert("Cadastro", "Registro atualizado com sucesso");
            navigation.navigate("Home");
        })
        .catch((error) => {
            console.error("Erro ao atualizar registro:", error);
            Alert.alert("Erro", "Ocorreu um erro ao atualizar o registro. Por favor, tente novamente.");
        });
    }

    useEffect(() => {
        setClube(route.params?.clube || '');
        setIdolo(route.params?.idolo || '');
    }, [route.params]);

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={require('../../assets/champinha.jpg')} style={styles.backgroundImage}>
                <View style={styles.content}>
                <TouchableOpacity style={styles.goBackButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
                    <Text style={styles.title}>Altere seu clube</Text>
                    <TextInput 
                        style={styles.input} 
                        placeholder="Digite o clube" 
                        onChangeText={setClube} 
                        value={clube} 
                        autoCapitalize="words"
                    />
                    <TextInput 
                        style={styles.input} 
                        placeholder="Digite o ídolo" 
                        onChangeText={setIdolo} 
                        value={idolo} 
                    />
                    <TouchableOpacity style={styles.button} onPress={altClube}>
                        <Text style={styles.buttonText}>Alterar</Text>
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
        fontSize: 30,
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
        marginBottom: 10,
    },
    goBackButton: {
        position: 'absolute',
        top: 20,
        left: 20,
        zIndex: 1,
        marginTop:20
      },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
