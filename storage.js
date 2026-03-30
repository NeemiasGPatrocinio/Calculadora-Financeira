import AsyncStorage from '@react-native-async-storage/async-storage';

const CREDENTIALS_KEY = 'CalcFinanceiraCredentials';

export async function saveCredentials(username, password) {
  try {
    const payload = JSON.stringify({ username, password });
    await AsyncStorage.setItem(CREDENTIALS_KEY, payload);
    return true;
  } catch (error) {
    console.error('saveCredentials', error);
    return false;
  }
}

export async function getCredentials() {
  try {
    const raw = await AsyncStorage.getItem(CREDENTIALS_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    console.error('getCredentials', error);
    return null;
  }
}
