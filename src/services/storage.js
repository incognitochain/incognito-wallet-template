import AsyncStorage from '@react-native-community/async-storage';

const Storage = {
  setItem(key, value) {
    return new Promise((resolve, reject) => {
      AsyncStorage.setItem(key, value, err => {
        if (err) {
          return reject(err);
        }
        return resolve();
      });
    });
  },
  getItem(key) {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem(key, (err, rs) => {
        if (err) {
          return reject(err);
        }
        return resolve(rs);
      });
    });
  },
  removeItem(key) {
    return new Promise((resolve, reject) => {
      AsyncStorage.removeItem(key, err => {
        if (err) {
          return reject(err);
        }
        return resolve();
      });
    });
  },
  clear() {
    return new Promise((resolve, reject) => {
      AsyncStorage.clear(err => {
        if (err) {
          return reject(err);
        }
        return resolve();
      });
    });
  },
};

export default Storage;
