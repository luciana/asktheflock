/* eslint-disable no-undef */
importScripts('https://www.gstatic.com/firebasejs/8.6.8/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/8.6.8/firebase-messaging.js')
// importScripts('https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js')
// importScripts('https://www.gstatic.com/firebasejs/9.17.1/firebase-messaging.js')



const c = JSON.parse(new URL(location).searchParams.get("firebaseConfig"));
console.log("Service Worker started", c);

const firebaseConfig = {
  apiKey: "AIzaSyCg7YYpq7Uz-tVHft-_oRvAn8g9GYLMds0",
  authDomain: "flock-71ac2.firebaseapp.com",
   projectId: "flock-71ac2",
  storageBucket: "flock-71ac2.appspot.com",
  messagingSenderId: "899073372499",
  appId: "1:899073372499:web:c99c2daac89bcee503f1a6",
};

// if(c){
//   console.log("c is set");
// }else{
//   console.log("c is not set");
// }
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.notification.title
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon || payload.notification.image,
  }

  self.registration.showNotification(notificationTitle, notificationOptions)
})

self.addEventListener('notificationclick', (event) => {
  if (event.action) {
    console.log('notification click event ', event);
    clients.openWindow(event.action)
  }
  event.notification.close()
})