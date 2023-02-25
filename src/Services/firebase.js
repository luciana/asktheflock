import { initializeApp } from 'firebase/app'
import { getMessaging, getToken, onMessage } from 'firebase/messaging'
//https://github.com/AudreyHal/React-Firebase-Cloud-Messaging-Demo

// const firebaseConfig = {
//       apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//       authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//       projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//       storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//       messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//       appId: process.env.REACT_APP_FIREBASE_APP_ID,
//   };

const firebaseConfig = {
  apiKey: "AIzaSyCg7YYpq7Uz-tVHft-_oRvAn8g9GYLMds0",
  authDomain: "flock-71ac2.firebaseapp.com",
  projectId: "flock-71ac2",
  storageBucket: "flock-71ac2.appspot.com",
  messagingSenderId: "899073372499",
  appId: "1:899073372499:web:c99c2daac89bcee503f1a6"
};

initializeApp(firebaseConfig);
//console.log("Messaging config", firebaseConfig);
const messaging = getMessaging();
const vapidKey =process.env.REACT_APP_FIREBASE_VAPI_KEY;

export const requestForToken = () => {
    return getToken(messaging, { vapidKey: vapidKey })
      .then((currentToken) => {
        if (currentToken) {
          console.log('current token for client: ', currentToken);
          // Perform any other neccessary action with the token         
        } else {
          // Show permission request UI
          console.log('No registration token available. Request permission to generate one.');
        }
      })
      .catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
      });
  };

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log("payload", payload)
      resolve(payload);
    });
  });