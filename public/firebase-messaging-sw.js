importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');
// // Initialize the Firebase app in the service worker by passing the generated config

const firebaseConfig = {
  apiKey: "AIzaSyCFm4voWbothARSRmUZVRIvcv9KuTWzY5U",
  authDomain: "revival-business.firebaseapp.com",
  projectId: "revival-business",
  storageBucket: "revival-business.firebasestorage.app",
  messagingSenderId: "677685579074",
  appId: "1:677685579074:web:b7566f8313deab2f608cdb",
  measurementId: "G-RE0X5KB76V"
};

firebase?.initializeApp(firebaseConfig)

// Retrieve firebase messaging
const messaging = firebase.messaging();

self.addEventListener('install', function (event) {
    console.log('Hello world from the Service Worker :call_me_hand:');
});


