import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom'; 
import {createStore,applyMiddleware} from 'redux'
import rootReducer from './redux/reducers/rootReducer';
import {composeWithDevTools} from 'redux-devtools-extension'
import { Provider } from 'react-redux';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import thunk from 'redux-thunk';
import { reduxFirestore, getFirestore } from 'redux-firestore';
import { ReactReduxFirebaseProvider, getFirebase } from 'react-redux-firebase';
import { createFirestoreInstance } from 'redux-firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAwOHtuxFtRT5XSpu7Xp2HIc2ee6Z3yCV4",
  authDomain: "resume-maker-9b338.firebaseapp.com",
  projectId: "resume-maker-9b338",
  storageBucket: "resume-maker-9b338.appspot.com",
  messagingSenderId: "705939257627",
  appId: "1:705939257627:web:64f91adc11f4fa4293fbbe"
};

firebase.initializeApp(firebaseConfig);
firebase.firestore()
//redux store bnae
//since firestore k sath binding kr rhe firebase ko that's why pehle hi firebaseConfig upr bta diye
const reduxStore = createStore(rootReducer,composeWithDevTools(applyMiddleware(thunk.withExtraArgument({getFirebase,getFirestore})),reduxFirestore(firebase)))  //binding for redux to get firestore

ReactDOM.render(
  <Provider store={reduxStore}>
    <BrowserRouter>
      <ReactReduxFirebaseProvider
        firebase={firebase}
        config={firebaseConfig}
        dispatch={reduxStore.dispatch}
        createFirestoreInstance={createFirestoreInstance}>
        <App />
      </ReactReduxFirebaseProvider>
    </BrowserRouter>
  </Provider>
,
  document.getElementById('root')
); 