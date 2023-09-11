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
    colonyId: "7450a5ef27bf2f44cdf9531fd30f15f63a83011320d2f0f85571e3438ae05351",
    colonyPrvKey: "5c73309c6b9f2d87c2b8216ec1ec3fa5880d2a3a3750758a5a2468e97556fd38",
    executorId: "eb6ecf1cfefda6eec2ffd3d8eeb0a9f4ad574a24f557001cd144abc4a4251671",
    executorPrvKey: "69d822dc164593503f4ee41a3538c4458ab84b21ea3f2c2d99c1661f172cbaf9",
    serverId: "2d6b3edf26b792d538604a6a8b8f2de3159c0bd4a419c7515c1d5bae16f2fc2c",
    serverPrvKey: "35c6b50c44d2086756dddef7a6e57ad31b6a2bc9f1678e316405872dbdf2e629",
    host: host,
    port: port,
    tls: tls
};

