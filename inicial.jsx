import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

export default function Inicial({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>calculadora financeira</Text>
      <Pressable style={styles.button} onPress={() => navigation.navigate('Entrada')}>
        <Text style={styles.buttonText}>Entrar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: '800',
    color: '#FFFFFF',
    textTransform: 'uppercase',
    textAlign: 'center',
    position: 'absolute',
    top: '45%',
    transform: [{ translateY: -18 }],
    width: '100%',
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: '#00BFFF',
    borderRadius: 25,
    paddingVertical: 14,
    paddingHorizontal: 36,
    position: 'absolute',
    top: '65%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});