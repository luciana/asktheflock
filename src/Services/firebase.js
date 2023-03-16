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

// const firebaseConfig = {
//   apiKey: "key",
//   authDomain: "project.firebaseapp.com",
//   projectId: "project",
//   storageBucket: "project.appspot.com",
//   messagingSenderId: "id",
//   appId: "1:id:web:c99c2daac89bcee503f1a6"
// };

// initializeApp(firebaseConfig);
// const messaging = getMessaging();
// const vapidKey =process.env.REACT_APP_FIREBASE_VAPI_KEY;

// export const requestForToken = () => {
//     return getToken(messaging, { vapidKey: vapidKey })
//       .then((currentToken) => {
//         if (currentToken) {
//         //  console.log('current token for client: ', currentToken);
//           // Perform any other neccessary action with the token         
//         } else {
//           // Show permission request UI
//         //  console.log('No registration token available. Request permission to generate one.');
//         }
//       })
//       .catch((err) => {
//         console.error('An error occurred while retrieving token. ', err);
//       });
//   };

// export const onMessageListener = () =>
//   new Promise((resolve) => {
//     onMessage(messaging, (payload) => {
//       resolve(payload);
//     });
//   });