import AsyncStorage from '@react-native-async-storage/async-storage';

interface Storage {
  method: 'get' | 'set' | 'remove' | 'clear';
  key?: string;
  value?: string;
}
const localStore = async (storage: Storage) => {
  try {
    switch (storage.method) {
      case 'get':
        return await AsyncStorage.getItem(storage.key!);

      case 'set':
        return await AsyncStorage.setItem(storage.key!, storage.value!);

      case 'remove':
        return await AsyncStorage.removeItem(storage.key!);

      case 'clear':
        return await AsyncStorage.clear();

      default:
        return null;
    }
  } catch (error) {
    console.log('AsyncStorage Error:', error);
    return null;
  }
};

export default localStore;