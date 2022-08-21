import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
//let crypto = require('./colonies/crypto/wasm_exec.js');
//let Crypto = require('./colonies/crypto/wasm_exec.js');
import Crypto from './colonies/crypto/wasm_exec.js';

console.log("XXXXXXXXXXXXX")
console.log(crypto)

let c = new Crypto();
c.load().then(() => {
    console.log(c.prvkey())
})


//var go = new Go();
// let promise = new Promise(function(ok, err) {
//     WebAssembly.instantiateStreaming(fetch("./colonies/crypto/cryptolib.wasm"), go.importObject).then((result) => {
//         go.run(result.instance);
//         ok()
//     })
// })

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
