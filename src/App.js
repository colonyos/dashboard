import logo from './logo.svg';
//import fs from 'fs'
import './App.css';
//import('./colonies/crypto/wasm_exec.js')
//var colonies = import('./colonies/colonyruntime.js');
//var crypto = import('./colonies/crypto/crypto.js')

// const wasmBuffer = fs.readFileSync('./colonies/crypto/cryptolib.wasm');
// WebAssembly.instantiate(wasmBuffer).then(wasmModule => {
//     // Exported function live under instance.exports
//     const { add } = wasmModule.instance.exports;
//     const sum = add(5, 6);
//     console.log(sum); // Outputs: 11
// });


console.log("a");

function App() {

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    );
}

export default App;
