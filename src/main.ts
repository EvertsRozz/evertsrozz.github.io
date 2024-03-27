import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: 'AIzaSyBnADlDGXHG_H4ZHD1EaaKiZuLSzNO1agY',
  authDomain: 'spiffy-sapp.firebaseapp.com',
  projectId: 'spiffy-sapp',
  storageBucket: 'spiffy-sapp.appspot.com',
  messagingSenderId: '1034225124647',
  appId: '1:1034225124647:web:b87f6d693c4a0048495502',
  measurementId: 'G-NPN5WWRSKJ',
};

const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);
