import { initializeApp, } from "firebase/app";
import { initializeAuth, getReactNativePersistence  } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAHvFzBzEljBz3VUhmS1a7FHZK5gDZfCME",
  authDomain: "etec-fc.firebaseapp.com",
  projectId: "etec-fc",
  storageBucket: "etec-fc.appspot.com",
  messagingSenderId: "612578888291",
  appId: "1:612578888291:web:24b5b6514e71a548430656"
};

const app = initializeApp(firebaseConfig);

initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

const firestore = getFirestore(app);

export { app, firestore };
export default firebaseConfig;