import { Outlet } from 'react-router-dom';
import { useKeycloak } from "@react-keycloak/web";
import { useEffect } from 'react';
import { global } from '../global'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import ColonyEndpoint from '../colonies/colonies.js'

const PrivateRoute = () => {
    const { keycloak, initialized } = useKeycloak();

    if (!initialized) {
        return <div></div>;
    }

    if (!keycloak.authenticated) {
        keycloak.login(); // Automatically redirect if not authenticated
        return <div></div>;
    }

    useEffect(() => {
        keycloak.loadUserProfile()
            .then(userProfile => {
                console.log(userProfile)
                global.username = userProfile.username
                global.firstname = userProfile.firstName
                global.lastname = userProfile.lastName
                global.email = userProfile.email
                global.error = ""
                if ("coloniesServerHost" in userProfile.attributes && userProfile.attributes.coloniesServerHost.length == 1) {
                    global.host = userProfile.attributes.coloniesServerHost[0]
                } else {
                    global.error = "Host not specified"
                }

                if ("coloniesServerPort" in userProfile.attributes && userProfile.attributes.coloniesServerPort.length == 1) {
                    global.port = userProfile.attributes.coloniesServerPort[0]
                } else {
                    if (global.error == "") {
                        global.error = "Port not specified"
                    }
                }

                if ("coloniesServerTls" in userProfile.attributes && userProfile.attributes.coloniesServerTls.length == 1) {
                    global.tls = userProfile.attributes.coloniesServerTls[0]
                } else {
                    if (global.error == "") {
                        global.error = "TLS not specified"
                    }
                }

                if ("colonyId" in userProfile.attributes && userProfile.attributes.colonyId.length == 1) {
                    global.colonyId = userProfile.attributes.colonyId[0]
                } else {
                    if (global.error == "") {
                        global.error = "ColonyId not specified"
                    }
                }

                if ("colonyPrvKey" in userProfile.attributes && userProfile.attributes.colonyPrvKey.length == 1) {
                    global.colonyPrvKey = userProfile.attributes.colonyPrvKey[0]
                }

                if ("userId" in userProfile.attributes && userProfile.attributes.userId.length == 1) {
                    global.executorId = userProfile.attributes.userId[0]
                } else {
                    if (global.error == "") {
                        global.error = "UserId not specified"
                    }
                }

                if ("userPrvKey" in userProfile.attributes && userProfile.attributes.userPrvKey.length == 1) {
                    global.executorPrvKey = userProfile.attributes.userPrvKey[0]
                } else {
                    if (global.error == "") {
                        global.error = "UserPrvKey not specified"
                    }
                }

                if ("serverId" in userProfile.attributes && userProfile.attributes.serverId.length == 1) {
                    global.serverId = userProfile.attributes.serverId[0]
                }
                if ("serverPrvKey" in userProfile.attributes && userProfile.attributes.serverPrvKey.length == 1) {
                    global.serverPrvKey = userProfile.attributes.serverPrvKey[0]
                }

                global.colonies = new ColonyEndpoint(global.host, global.port)

            })
            .catch(err => {
                console.error("Failed to load user profile", err);
            });
    }, []);

    return <Outlet />;
};


export default PrivateRoute;
