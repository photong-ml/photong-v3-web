import React from 'react';

import { Button, Pane, Text } from 'evergreen-ui';
import { useMsal, useIsAuthenticated } from '@azure/msal-react';
import { loginRequest } from '../authConfig';

export default function LoginButton() {
    const { instance, accounts, inProgress } = useMsal();
    const isAuthenticated = useIsAuthenticated();
    const account = accounts[0];
    const isLoading = inProgress !== 'none';

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
        <Pane display="flex" alignItems="center">
            {account && (
                <Text size={300} marginRight={8}>
                    Signed in as{' '}
                    <Text size={300} fontWeight={600}>
                        {account.name}
                    </Text>
                </Text>
            )}
            <Button appearance="minimal" onClick={handleLogout} isLoading={isLoading}>
                Log out
            </Button>
        </Pane>
    ) : (
        <Button appearance="primary" onClick={handleLogin} isLoading={isLoading}>
            Log in
        </Button>
    );
}
