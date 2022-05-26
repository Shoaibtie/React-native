import AsyncStorage from '@react-native-community/async-storage';

class Storage {
    async getLoggedInUser() {
        const userJson = await AsyncStorage.getItem('userDetails');
        if (userJson) {

            return JSON.parse(userJson);
        } else {
            return null;
        }
    }
}

const StorageValue = new Storage();

export default StorageValue;
