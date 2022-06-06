// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDBxmymLEhoMiOKvd2I1bDntm9LJ9vszFw',
  authDomain: 'trolliey.firebaseapp.com',
  projectId: 'trolliey',
  storageBucket: 'trolliey.appspot.com',
  messagingSenderId: '954585772122',
  appId: '1:954585772122:web:c78d6f316e5bd597696863',
  measurementId: 'G-6E7FD2W5Q7',
}
// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const storage = getStorage(app)
