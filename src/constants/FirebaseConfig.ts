import firebaseApp from 'firebase';

const firebaseConfigData = {
    apiKey: 'AIzaSyBIEj0PaA0EC-Ntbsr1SYHqICMXC7hZoK8',
    authDomain: 'hmpartner-a9a0d.firebaseapp.com',
    databaseURL: 'https://hmpartner-a9a0d-default-rtdb.europe-west1.firebasedatabase.app',
    projectId: 'hmpartner-a9a0d',
    storageBucket: 'hmpartner-a9a0d.appspot.com',
    messagingSenderId: '526807548143',
    appId: '1:526807548143:web:6e89ea73bd348feea91b1a',
};

export const firebaseConfig = firebaseApp.initializeApp(firebaseConfigData,'hm-extension');
