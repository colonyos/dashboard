import { Outlet } from 'react-router-dom';
import { useKeycloak } from "@react-keycloak/web";

const PrivateRoute = () => {
    const { keycloak, initialized } = useKeycloak();

    if (!initialized) {
        return <div></div>;
    }

    if (!keycloak.authenticated) {
        keycloak.login(); // Automatically redirect if not authenticated
        return <div></div>;
    }

    return <Outlet />;
};


export default PrivateRoute;
