import ColonyRuntime from './colonies/colonies.js'

//let host = "rocinante"
//let host = "localhost"
let host = "colonies.colonyos.io"
let port = "443"
//let port = "8888"
let tls = "true"

//let host = "colonies-api.rocksigma.computer"
//let port = "443"

var colonies = new ColonyRuntime(host, port)
export let global = {
    colonies: colonies,
    colonyId: "79f4131d1666617db31ec3ac313f0ebb5a7e6aba06123ed59edb5f5af02a1494",
    colonyPrvKey: "d82548d819621c944383ee5f31a552ecada386a5c1052493e9858ba8091408a4",
    executorId: "63ff4a50c1233f70e1134db6a62adf339e9012b775dd9831b2d9ef0ec152efe3",
    executorPrvKey: "1c92b99849382e4e7db354fd6d10da44dbce759b72f9bd83d363b16e3d9e981e",
    serverId: "a92bea7c9bccd587dbbd2fff02c1aeed3e37772b9f42b066926d18710f4aecff",
    serverPrvKey: "5437af8dec12c6654a3e08425bc0ef9c8c4063a846c73f96bb7675a7f4ddd6ad",
    host: host,
    port: port,
    tls: tls
};

