import firebaseApp from 'firebase';

const firebaseConfigData = {
    apiKey: "AIzaSyBqJ8OtdU1q2wYkMYVV3JxaIbZ-bHvCJes",
    authDomain: "hm-extension.firebaseapp.com",
    databaseURL: "https://hm-extension-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "hm-extension",
    storageBucket: "hm-extension.appspot.com",
    messagingSenderId: "818404420837",
    appId: "1:818404420837:web:ff0e2d62362cff6680380c",
    measurementId: "G-YQ3ECSP6RP"
};

export const aleFirebaseConfig = firebaseApp.initializeApp(firebaseConfigData,'ale-hm-extension');
