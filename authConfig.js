// https://learn.microsoft.com/en-us/azure/active-directory/develop/tutorial-v2-react

export const b2cPolicies = {
    names: {
        signUpSignIn: 'B2C_1_signup_signin',
        editProfile: 'B2C_1_edit_profile',
    },
    authorities: {
        signUpSignIn: {
            authority: 'https://photong.b2clogin.com/photong.onmicrosoft.com/B2C_1_signup_signin',
        },
        editProfile: {
            authority: 'https://photong.b2clogin.com/photong.onmicrosoft.com/B2C_1_edit_profile',
        },
    },
    authorityDomain: 'photong.b2clogin.com',
};

export const msalConfig = {
    auth: {
        clientId: '5c64cf4f-5a01-4917-a2c5-e9a13de15f65',
        authority: b2cPolicies.authorities.signUpSignIn.authority,
        knownAuthorities: [b2cPolicies.authorityDomain],
        redirectUri: '/',
    },
    cache: {
        cacheLocation: 'sessionStorage', // This configures where your cache will be stored
        storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    },
};

// Add scopes here for ID token to be used at Microsoft identity platform endpoints.
export const loginRequest = {
    scopes: [],
};
