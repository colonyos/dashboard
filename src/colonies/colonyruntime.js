const input = 0
const output = 1
const err = 2
const env = 3
const Waiting = 0;
const Running = 1;
const Success = 2;
const Failed = 3;

import App from '@app/App';
import Crypto from './crypto/crypto.js';

class ColonyRuntime {
    constructor(host, port) {
        this.crypto = new Crypto()
        this.host = host
        this.port = port
        this.loaded = false
    }

    load() {
        var crypto = this.crypto
        var instance = this
        if (!instance.loaded) {
            return new Promise(function(ok, err) {
                crypto.load().then(() => {
                    instance.loaded = true
                    ok()
                })
            })
        } else {
            return new Promise(function(ok, err) {
                ok()
            })
        }
    }

    crypto() {
        return this.crypto
    }

    sendRPCMsg(msg, prvKey) {
        let rpcMsg = {
            "payloadtype": msg.msgtype,
            "payload": "",
            "signature": ""
        }

        rpcMsg.payload = btoa(JSON.stringify(msg))
        rpcMsg.signature = this.crypto.sign(rpcMsg.payload, prvKey)

        var host = this.host
        var port = this.port

        let promise = new Promise(function(resolve, reject) {
            try {
                let xhr = new XMLHttpRequest();
                xhr.open("POST", "http://" + host + ":" + port + "/api")
                xhr.send(JSON.stringify(rpcMsg))

                xhr.onload = function() {
                    let rpcReplyMsg = JSON.parse(xhr.response)
                    let msg = JSON.parse(atob(JSON.parse(xhr.response).payload))
                    if (rpcReplyMsg.error == true) {
                        reject(msg)
                    } else {
                        resolve(msg)
                    }
                };

                xhr.onerror = function() {
                    reject("Failed to connect to http://" + host + ":" + port)
                };
            } catch (e) {
                reject(e)
            }
        })
        return promise
    }

    add_colony(colony, prvKey) {
        var msg = {
            "msgtype": "addcolonymsg",
            "colony": colony
        }

        return this.sendRPCMsg(msg, prvKey)
    }

    getColonies(prvKey) {
        var msg = {
            "msgtype": "getcoloniesmsg"
        }

        return this.sendRPCMsg(msg, prvKey)
    }

    getColony(colonyid, prvKey) {
        var msg = {
            "msgtype": "getcolonymsg",
            "colonyid": colonyid
        }

        return this.sendRPCMsg(msg, prvKey)
    }

    addRuntime(runtime, prvKey) {
        var msg = {
            "msgtype": "addruntimemsg",
            "runtime": runtime
        }

        return this.sendRPCMsg(msg, prvKey)
    }

    getRuntimes(colonyid, prvKey) {
        var msg = {
            "msgtype": "getruntimesmsg",
            "colonyid": colonyid
        }

        return this.sendRPCMsg(msg, prvKey)
    }

    rejectRuntime(runtimeid, prvKey) {
        var msg = {
            "msgtype": "rejectruntimemsg",
            "runtimeid": runtimeid
        }

        return this.sendRPMsg(msg, prvKey)
    }

    approveRuntime(runtimeid, prvKey) {
        var msg = {
            "msgtype": "approveruntimemsg",
            "runtimeid": runtimeid
        }

        return this.sendRPCMsg(msg, prvKey)
    }

    submitProcessSpec(spec, prvKey) {
        var msg = {
            "msgtype": "submitprocessespecmsg",
            "spec": spec
        }

        return this.sendRPCMsg(msg, prvKey)
    }

    getProcess(processId, prvKey) {
        var msg = {
            "msgtype": "getprocessmsg",
            "processid": processId
        }

        return this.sendRPCMsg(msg, prvKey)
    }


    getProcesses(colonyId, count, state, prvKey) {
        var msg = {
            "msgtype": "getprocessesmsg",
            "colonyid": colonyId,
            "count": count,
            "state": state
        }

        return this.sendRPCMsg(msg, prvKey)
    }

    assign(colonyid, timeout, prvKey) {
        var msg = {
            "msgtype": "assignprocessmsg",
            "latest": false,
            "timeout": timeout,
            "colonyid": colonyid
        }

        return this.sendRPCMsg(msg, prvKey)
    }

    assignLatest(colonyid, timeout, prvKey) {
        var msg = {
            "msgtype": "assignprocessmsg",
            "latest": true,
            "timeout": timeout,
            "colonyid": colonyid
        }

        return this.sendRPCMsg(msg, prvKey)
    }

    addAttribute(attribute, prvKey) {
        attribute.attributetype = output

        var msg = {
            "msgtype": "addattributemsg",
            "attribute": attribute
        }

        return this.sendRPCMsg(msg, prvKey)
    }

    closeProcess(processid, successful, prvKey) {
        var msg = {
            "msgtype": "closesuccessfulmsg",
            "processid": processid
        }

        if (successful) {
            return this.sendRPCMsg(msg, prvKey)
        }

        msg.msgtype = "closefailedmsg"
        return this.sendRPCMsg(msg, prvKey)
    }

    getColonyStats(colonyId, prvKey) {
        var msg = {
            "msgtype": "getcolonystatsmsg",
            "colonyid": colonyId
        }

        return this.sendRPCMsg(msg, prvKey)
    }

    getWorkflows(colonyid, count, state, prvKey) {
        var msg = {
            "msgtype": "getprocessgraphsmsg",
            "count": count,
            "state": state,
            "colonyid": colonyid
        }

        return this.sendRPCMsg(msg, prvKey)
    }

    getWorkflow(processgraphid, prvKey) {
        var msg = {
            "msgtype": "getprocessgraphmsg",
            "processgraphid": processgraphid,
        }

        return this.sendRPCMsg(msg, prvKey)
    }

    getCrons(colonyid, prvKey) {
        var msg = {
            "msgtype": "getcronsmsg",
            "count": 100,
            "colonyid": colonyid
        }

        return this.sendRPCMsg(msg, prvKey)
    }

    getGenerators(colonyid, prvKey) {
        var msg = {
            "msgtype": "getgeneratorsmsg",
            "count": 100,
            "colonyid": colonyid
        }

        return this.sendRPCMsg(msg, prvKey)
    }

    getClusterInfo(serverPrvKey) {
        var msg = {
            "msgtype": "getclustermsg"
        }

        return this.sendRPCMsg(msg, serverPrvKey)
    }

    getServerVersion() {
        var msg = {
            "msgtype": "versionmsg"
        }

        return this.sendRPCMsg(msg, "")
    }

    subscribeProcesses(runtimetype, timeout, state, prvKey, callback) {
        var msg = {
            "msgtype": "subscribeprocessesmsg",
            "runtimetype": runtimetype,
            "state": state,
            "timeout": timeout
        }

        let rpcMsg = {
            "payloadtype": msg.msgtype,
            "payload": "",
            "signature": ""
        }

        rpcMsg.payload = btoa(JSON.stringify(msg))
        rpcMsg.signature = this.crypto.sign(rpcMsg.payload, prvKey)

        let socket = new WebSocket("ws://" + this.host + ":" + this.port + "/pubsub");

        socket.addEventListener('open', function(event) {
            socket.send(JSON.stringify(rpcMsg));
        });

        let promise = new Promise(function(resolve, reject) {
            socket.addEventListener('close', function(event) {
                socket = null
                reject()
            });

            socket.addEventListener('error', function(event) {
                socket = null
                reject()
            });

            socket.addEventListener('message', function(event) {
                msg = JSON.parse(atob(JSON.parse(event.data).payload))
                callback(msg)
            });
        })
        return promise
    }
}

export default ColonyRuntime;
