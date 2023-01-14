import React from 'react';

import { Pane, Spinner, Heading, } from 'evergreen-ui';

export default function Loading() {
    return (
        <Pane marginTop={40} width='100%' display='flex' flexDirection='column' alignItems='center' >
            <Heading size={400}>Composing soundtrack...</Heading>
            <Spinner size={30} marginTop={16}/>
        </Pane>
    )
}