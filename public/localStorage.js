const localStorage = {
  save: (key, value, callback) => {
    let saveObj = {};
    saveObj[key] = JSON.stringify(value);
    chrome.storage.local.set(saveObj, callback);
  },
  load: (key, value, callback) => {
    let def = {};
    def[key] = JSON.stringify(value);
    chrome.storage.local.get(def, (fromStorage) => {
      let storage = {};
      storage[key] = JSON.parse(fromStorage[key]);
      callback(storage);
    });
  },
};
