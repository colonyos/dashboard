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
                if ("colonies_server_host" in userProfile.attributes && userProfile.attributes.colonies_server_host.length == 1) {
                    global.host = userProfile.attributes.colonies_server_host[0]
                } else {
                    global.error = "Host not specified"
                }

                if ("colonies_server_port" in userProfile.attributes && userProfile.attributes.colonies_server_port.length == 1) {
                    global.port = userProfile.attributes.colonies_server_port[0]
                } else {
                    if (global.error == "") {
                        global.error = "Port not specified"
                    }
                }

                if ("colonies_server_tls" in userProfile.attributes && userProfile.attributes.colonies_server_tls.length == 1) {
                    global.tls = userProfile.attributes.colonies_server_tls[0]
                } else {
                    if (global.error == "") {
                        global.error = "TLS not specified"
                    }
                }

                if ("colonyname" in userProfile.attributes && userProfile.attributes.colonyname.length == 1) {
                    global.colonyName = userProfile.attributes.colonyname[0]
                } else {
                    if (global.error == "") {
                        global.error = "ColonyId not specified"
                    }
                }

                if ("colony_prvkey" in userProfile.attributes && userProfile.attributes.colony_prvkey.length == 1) {
                    global.colonyPrvKey = userProfile.attributes.colony_prvkey[0]
                }

                if ("user_prvkey" in userProfile.attributes && userProfile.attributes.user_prvkey.length == 1) {
                    global.executorPrvKey = userProfile.attributes.user_prvkey[0]
                } else {
                    if (global.error == "") {
                        global.error = "UserPrvKey not specified"
                    }
                }

                if ("serverid" in userProfile.attributes && userProfile.attributes.serverid.length == 1) {
                    global.serverId = userProfile.attributes.serverid[0]
                }

                if ("server_prvkey" in userProfile.attributes && userProfile.attributes.server_prvkey.length == 1) {
                    global.serverPrvKey = userProfile.attributes.server_prvkey[0]
                }

                if ("aws_s3_endpoint" in userProfile.attributes && userProfile.attributes.aws_s3_endpoint.length == 1) {
                    global.awsS3Endpoint = userProfile.attributes.aws_s3_endpoint[0]
                } else {
                    if (global.error == "") {
                        global.error = "AWS S3 endpoint not specified"
                    }
                }

                if ("aws_s3_accesskey" in userProfile.attributes && userProfile.attributes.aws_s3_accesskey.length == 1) {
                    global.awsS3Accesskey = userProfile.attributes.aws_s3_accesskey[0]
                } else {
                    if (global.error == "") {
                        global.error = "AWS S3 accesskey not specified"
                    }
                }

                console.log(global)

                if ("aws_s3_secretkey" in userProfile.attributes && userProfile.attributes.aws_s3_secretkey.length == 1) {
                    global.awsS3Secretkey = userProfile.attributes.aws_s3_secretkey[0]
                } else {
                    if (global.error == "") {
                        global.error = "AWS S3 secretkey not specified"
                    }
                }

                if ("aws_s3_region" in userProfile.attributes && userProfile.attributes.aws_s3_regionlength == 1) {
                    global.awsS3Region = userProfile.attributes.aws_s3_region[0]
                }

                if ("aws_s3_bucket" in userProfile.attributes && userProfile.attributes.aws_s3_bucket.length == 1) {
                    global.awsS3Bucket = userProfile.attributes.aws_s3_bucket[0]
                } else {
                    if (global.error == "") {
                        global.error = "AWS S3 bucket not specified"
                    }
                }

                if ("aws_s3_tls" in userProfile.attributes && userProfile.attributes.aws_s3_tls.length == 1) {
                    global.awsS3TLS = userProfile.attributes.aws_s3_tls[0]
                } else {
                    if (global.error == "") {
                        global.error = "AWS S3 TLS not specified"
                    }
                }

                if ("aws_s3_skipverify" in userProfile.attributes && userProfile.attributes.aws_s3_skipverify.length == 1) {
                    global.awsS3SkipVerify = userProfile.attributes.aws_s3_skipverify[0]
                } else {
                    if (global.error == "") {
                        global.error = "AWS S3 skipverify not specified"
                    }
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
