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

class ColonyEndpoint {
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
                xhr.open("POST", "https://" + host + ":" + port + "/api")
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
                    reject("Failed to connect to https://" + host + ":" + port)
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

    getColony(colonyname, prvKey) {
        var msg = {
            "msgtype": "getcolonymsg",
            "colonyname": colonyname
        }

        return this.sendRPCMsg(msg, prvKey)
    }

    addExecutor(executor, prvKey) {
        var msg = {
            "executor": executor,
            "msgtype": "addexecutormsg"
        }

        return this.sendRPCMsg(msg, prvKey)
    }

    removeExecutor(executorId, prvKey) {
        var msg = {
            "executorid": executorId,
            "msgtype": "deleteexecutormsg"
        }

        return this.sendRPCMsg(msg, prvKey)
    }

    getExecutors(colonyname, prvKey) {
        var msg = {
            "msgtype": "getexecutorsmsg",
            "colonyname": colonyname
        }

        return this.sendRPCMsg(msg, prvKey)
    }

    getExecutor(colonyname, executorname, prvKey) {
        var msg = {
            "msgtype": "getexecutormsg",
            "colonyname": colonyname,
            "executorname": executorname
        }

        return this.sendRPCMsg(msg, prvKey)
    }

    getLog(processid, since, prvKey) {
        var msg = {
            "msgtype": "getlogsmsg",
            "processid": processid,
            "executorid": "",
            "count": 100,
            "since": since
        }

        return this.sendRPCMsg(msg, prvKey)
    }

    getFileLabels(colonyname, prvKey) {
        var msg = {
            "msgtype": "getfilelabelsmsg",
            "colonyname": colonyname
        }

        return this.sendRPCMsg(msg, prvKey)
    }

    getFiles(colonyname, label, prvKey) {
        var msg = {
            "msgtype": "getfilesmsg",
            "label": label,
            "colonyname": colonyname
        }

        return this.sendRPCMsg(msg, prvKey)
    }

    getFile(colonyname, label, name, prvKey) {
        var msg = {
            "msgtype": "getfilemsg",
            "label": label,
            "name": name,
            "latest": false,
            "fileid": "",
            "colonyname": colonyname
        }

        return this.sendRPCMsg(msg, prvKey)
    }

    getSnapshots(colonyname, prvKey) {
        var msg = {
            "msgtype": "getsnapshotsmsg",
            "colonyname": colonyname
        }

        return this.sendRPCMsg(msg, prvKey)
    }

    getSnapshot(colonyname, snapshotid, prvKey) {
        var msg = {
            "msgtype": "getsnapshotmsg",
            "colonyname": colonyname,
            "snapshotid": snapshotid
        }

        return this.sendRPCMsg(msg, prvKey)
    }

    rejectExecutor(executorid, prvKey) {
        var msg = {
            "msgtype": "rejectexecutormsg",
            "executorid": executorid
        }

        return this.sendRPCMsg(msg, prvKey)
    }

    approveExecutor(executorid, prvKey) {
        var msg = {
            "msgtype": "approveexecutormsg",
            "executorid": executorid
        }

        return this.sendRPCMsg(msg, prvKey)
    }

    submitFunctionSpec(spec, prvKey) {
        var msg = {
            "msgtype": "submitfuncspecmsg",
            "spec": spec
        }

        console.log(msg)

        return this.sendRPCMsg(msg, prvKey)
    }

    DeleteProcess(processid, prvKey) {
        var msg = {
            "msgtype": "deleteprocessmsg",
            "processid": processid
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


    getProcesses(colonyName, count, state, prvKey) {
        var msg = {
            "msgtype": "getprocessesmsg",
            "colonyname": colonyName,
            "count": count,
            "state": state
        }

        return this.sendRPCMsg(msg, prvKey)
    }

    getFunctions(colonyName, prvKey) {
        var msg = {
            "msgtype": "getfunctionsmsg",
            "colonyname": colonyName
        }

        return this.sendRPCMsg(msg, prvKey)
    }

    assign(colonyname, timeout, prvKey) {
        var msg = {
            "msgtype": "assignprocessmsg",
            "latest": false,
            "timeout": timeout,
            "colonyname": colonyname
        }

        return this.sendRPCMsg(msg, prvKey)
    }

    assignLatest(colonyname, timeout, prvKey) {
        var msg = {
            "msgtype": "assignprocessmsg",
            "latest": true,
            "timeout": timeout,
            "colonyname": colonyname
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

    getColonyStats(colonyName, prvKey) {
        var msg = {
            "msgtype": "getcolonystatsmsg",
            "colonyname": colonyName
        }

        return this.sendRPCMsg(msg, prvKey)
    }

    getWorkflows(colonyname, count, state, prvKey) {
        var msg = {
            "msgtype": "getprocessgraphsmsg",
            "count": count,
            "state": state,
            "colonyname": colonyname
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

    getCrons(colonyname, prvKey) {
        var msg = {
            "msgtype": "getcronsmsg",
            "count": 100,
            "colonyname": colonyname
        }

        return this.sendRPCMsg(msg, prvKey)
    }

    getGenerators(colonyname, prvKey) {
        var msg = {
            "msgtype": "getgeneratorsmsg",
            "count": 100,
            "colonyname": colonyname
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

export default ColonyEndpoint;
