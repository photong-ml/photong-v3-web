import React from 'react';
import { Pane, Text, Heading, Button, ArrowLeftIcon } from 'evergreen-ui';

export default function Player({ images, setUploaded }) {

    return (
        <Pane width='100%' marginTop={32} backgroundImage={`url(${URL.createObjectURL(images[0])})`} borderRadius={6}>
            <Button iconBefore={ArrowLeftIcon} appearance='minimal' onClick={() => setUploaded(false)}>Select new image</Button>
        </Pane>
    );

}