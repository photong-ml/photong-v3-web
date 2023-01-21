import React from 'react';

import { Button } from 'evergreen-ui';
import { useMsal, useIsAuthenticated } from '@azure/msal-react';
import { loginRequest } from '../authConfig';

export default function LoginButton() {
    const { instance } = useMsal();
    const isAuthenticated = useIsAuthenticated();

    function handleLogin() {
        instance.loginRedirect(loginRequest).catch((e) => {
            // skipcq: JS-0002
            console.error(e);
        });
    }

    function handleLogout() {
        instance.logoutRedirect().catch((e) => {
            // skipcq: JS-0002
            console.error(e);
        });
    }

    return isAuthenticated ? (
        <Button appearance="minimal" onClick={handleLogout}>
            Log out
        </Button>
    ) : (
        <Button appearance="primary" onClick={handleLogin}>
            Log in
        </Button>
    );
}
