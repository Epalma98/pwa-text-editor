import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
// Allows us to write and add to the database
export const putDb = async (content) => {
  console.log('PUT to the database');
  const editorDb = await openDB('jate', 1);
  const tx = editorDb.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  const request = store.put({ id: 1, value: content });
  const result = await request;
  console.log('data stored', result.value);
};

// TODO: Add logic for a method that gets all the content from the database
// Gets data from DB 
export const getDb = async () => {
  console.log('GET from Database');
  const editorDb = await openDB('jate', 1);
  const tx = editorDb.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const request = store.get(1);
  const result = await request;
  result
    ? console.log('data retrieved', result.value)
    : console.log('no data retrieved');
  return result?.value;
};
initdb();
