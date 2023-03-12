// /* eslint-disable no-undef */
// importScripts('https://www.gstatic.com/firebasejs/8.6.8/firebase-app.js')
// importScripts('https://www.gstatic.com/firebasejs/8.6.8/firebase-messaging.js')
// // importScripts('https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js')
// // importScripts('https://www.gstatic.com/firebasejs/9.17.1/firebase-messaging.js')



// const c = JSON.parse(new URL(location).searchParams.get("firebaseConfig"));

// const firebaseConfig = {
//   apiKey: "-",
//   authDomain: "-",
//    projectId: "-",
//   storageBucket: "-.appspot.com",
//   messagingSenderId: "-",
//   appId: "1:-:web:c99c2daac89bcee503f1a6",
// };

// firebase.initializeApp(firebaseConfig);

// const messaging = firebase.messaging();

// messaging.onBackgroundMessage((payload) => {
//   //console.log('[firebase-messaging-sw.js] Received background message ', payload);
//   const notificationTitle = payload.notification.title
//   const notificationOptions = {
//     body: payload.notification.body,
//     icon: payload.notification.icon || payload.notification.image,
//   }

//   self.registration.showNotification(notificationTitle, notificationOptions)
// })

// self.addEventListener('notificationclick', (event) => {
//   if (event.action) {  
//     clients.openWindow(event.action)
//   }
//   event.notification.close()
// })