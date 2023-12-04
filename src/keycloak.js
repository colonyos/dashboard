import Keycloak from "keycloak-js";
const keycloak = new Keycloak({
    url: "https://keycloak.colonyos.io",
    realm: "colonyos",
    clientId: "colonies-dashboard-auth",
    onLoad: "login-required"
    //onLoad: "check-sso",
    //KeycloakResponseType: "code"
});
export default keycloak;

// keycloak.init().then(authenticated => {
//     if (!authenticated) {
//         keycloak.login();
//     }
// }).catch(err => {
//     console.error('Keycloak initialization error:', err);
// });

//export default keycloak;
//
//export var keycloak = Keycloak(initOptions);
// keycloak.init({ onLoad: initOptions.onLoad, KeycloakResponseType: 'code' }).success((auth) => {
//     if (!auth) {
//         window.location.reload();
//     } else {
//         console.info("Authenticated");
//     }
//     setTimeout(() => {
//         keycloak.updateToken(70).success((refreshed) => {
//             if (refreshed) {
//                 console.debug('Token refreshed' + refreshed);
//             } else {
//                 console.warn('Token not refreshed, valid for '
//                     + Math.round(keycloak.tokenParsed.exp + keycloak.timeSkew - new Date().getTime() / 1000) + ' seconds');
//             }
//         }).error(() => {
//             console.error('Failed to refresh token');
//         });

//     }, 60000)
// }).error(() => {
//     console.error("Authenticated Failed");
// });
// const Login = () => {
//     return (
//         <>
//         </>
//     )
// }
//export default keycloak;
