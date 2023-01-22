import React from 'react';

import { Button } from 'evergreen-ui';
import { useMsal, useIsAuthenticated } from '@azure/msal-react';
import { loginRequest } from '../authConfig';

export default function LoginButton() {
    const { instance, inProgress } = useMsal();
    const isAuthenticated = useIsAuthenticated();
    const isLoading = (inProgress !== 'none');

    const handleLogin = React.useCallback(() => {
        instance.loginRedirect(loginRequest).catch((e) => {
            // skipcq: JS-0002
            console.error(e);
        });
    });

    const handleLogout = React.useCallback(() => {
        instance.logoutRedirect().catch((e) => {
            // skipcq: JS-0002
            console.error(e);
        });
    }, []);

    return isAuthenticated ? (
        <Button appearance="minimal" onClick={handleLogout} isLoading={isLoading}>
            Log out
        </Button>
    ) : (
        <Button appearance="primary" onClick={handleLogin} isLoading={isLoading}>
            Log in
        </Button>
    );
}
