import ColonyRuntime from './colonies/colonyruntime.js'

//let host = "localhost"
//let host = "rocinante"
let host = "colonyos.io"
let port = "50080"
let tls = "false"

//let host = "colonies-api.rocksigma.computer"
//let port = "443"

var runtime = new ColonyRuntime(host, port)
export let global = {
    runtime: runtime,
    colonyId: "4787a5071856a4acf702b2ffcea422e3237a679c681314113d86139461290cf4",
    colonyPrvKey: "ba949fa134981372d6da62b6a56f336ab4d843b22c02a4257dcf7d0d73097514",
    runtimeId: "3fc05cf3df4b494e95d6a3d297a34f19938f7daa7422ab0d4f794454133341ac",
    runtimePrvKey: "ddf7f7791208083b6a9ed975a72684f6406a269cfa36f1b1c32045c0a71fff05",
    serverId: "039231c7644e04b6895471dd5335cf332681c54e27f81fac54f9067b3f2c0103",
    serverPrvKey: "fcc79953d8a751bf41db661592dc34d30004b1a651ffa0725b03ac227641499d",
    host: host,
    port: port,
    tls: tls
};

