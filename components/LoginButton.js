import React from "react";

import { Button } from "evergreen-ui";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../authConfig";
import { useIsAuthenticated } from "@azure/msal-react";

export default function LoginButton() {
    const { instance } = useMsal();
    const isAuthenticated = useIsAuthenticated();

    const handleLogin = () => {
        instance.loginRedirect(loginRequest).catch(e => {
            console.error(e);
        });
    }

    const handleLogout = () => {
        instance.logoutRedirect().catch(e => {
            console.error(e);
        });
    }

    return (
        isAuthenticated ?
            <Button appearance='minimal' onClick={handleLogout}>Log out</Button> :
            <Button appearance='primary' onClick={handleLogin}>Log in</Button>
    )
}
