import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import App from './App';
import axios from 'axios';

//const promise = axios.get('https://vitejsvitemqpxe7-gujj--3001--88b6dd69.local-credentialless.webcontainer.io///notes')
//console.log(promise)
//
//const promise2 = axios.get('https://vitejsvitemqpxe7-gujj--3001--88b6dd69.local-credentialless.webcontainer.io/////foobar')
//console.log(promise2)

const notes = [
  {
    id: 1,
    content: 'HTML is easy',
    important: true,
  },
  {
    id: 2,
    content: 'Browser can execute only JavaScript',
    important: false,
  },
  {
    id: 3,
    content: 'GET and POST are the most important methods of HTTP protocol',
    important: true,
  },
];

ReactDOM.createRoot(document.getElementById('root')).render(
  <App notes={notes} />
);
