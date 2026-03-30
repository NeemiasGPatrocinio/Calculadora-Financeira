import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { getCredentials } from './storage';

export default function Login({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      setMessage('Preencha usuário e senha.');
      return;
    }

    const stored = await getCredentials();
    if (!stored) {
      setMessage('Nenhum usuário cadastrado. Faça cadastro primeiro.');
      return;
    }

    if (stored.username === username.trim() && stored.password === password) {
      setMessage('');
      navigation.navigate('Entrada');
    } else {
      setMessage('Usuário ou senha incorretos.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <Text style={styles.subtitle}>Informe seu usuário e senha</Text>

      <Text style={styles.label}>Usuário</Text>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        placeholder="Nome de usuário"
        placeholderTextColor="#888"
      />

      <Text style={styles.label}>Senha</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Senha"
        placeholderTextColor="#888"
        secureTextEntry
      />

      <Pressable style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </Pressable>

      <Pressable style={styles.link} onPress={() => navigation.navigate('Cadastro')}>
        <Text style={styles.linkText}>Ainda não tem conta? Cadastre-se</Text>
      </Pressable>

      {message ? <Text style={styles.message}>{message}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 36,
    fontWeight: '800',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  subtitle: {
    color: '#CCCCCC',
    marginBottom: 24,
  },
  label: {
    color: '#FFFFFF',
    marginBottom: 8,
    marginTop: 12,
  },
  input: {
    backgroundColor: '#1c1c1c',
    color: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
  },
  button: {
    marginTop: 24,
    backgroundColor: '#00BFFF',
    borderRadius: 25,
    paddingVertical: 14,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  link: {
    marginTop: 16,
    alignItems: 'center',
  },
  linkText: {
    color: '#00BFFF',
    fontWeight: '600',
  },
  message: {
    marginTop: 16,
    color: '#ff6666',
    textAlign: 'center',
  },
});
