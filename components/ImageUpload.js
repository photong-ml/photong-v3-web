import React from 'react';
import { Pane, FileUploader, FileCard, Button, MusicIcon } from 'evergreen-ui';

export default function ImageUpload( {marginTop, setUploaded, files, setFiles} ) {
    const [fileRejections, setFileRejections] = React.useState([])
    const handleChange = React.useCallback((files) => setFiles([files[0]]), [])
    const handleRejected = React.useCallback((fileRejections) => setFileRejections([fileRejections[0]]), [])
    const handleRemove = React.useCallback(() => {
        setFiles([])
        setFileRejections([])
    }, [])
    const [loading, setLoading] = React.useState(false);

    const handleSubmit = async () => {
        setLoading(true);
        // TODO: await submit to api
        // TODO: handle error
        // TODO: hand file to index.js
        setLoading(false);
        setUploaded(true);
    }

    return (
        <Pane width='100%' marginTop={marginTop}>
            <FileUploader
                label="Upload Image"
                description="The image will be used to generate a soundtrack. Image can be up to 8MB."
                maxSizeInBytes={8 * 1024 ** 2}
                maxFiles={1}
                onChange={handleChange}
                onRejected={handleRejected}
                acceptedMimeTypes={["image/png", "image/jpeg"]}
                renderFile={(file) => {
                    const { name, size, type } = file
                    const fileRejection = fileRejections.find((fileRejection) => fileRejection.file === file)
                    const { message } = fileRejection || {}
                    return (
                        <Pane>
                            <FileCard
                                key={name}
                                isInvalid={fileRejection != null}
                                name={name}
                                onRemove={handleRemove}
                                sizeInBytes={size}
                                type={type}
                                validationMessage={message}
                                src={URL.createObjectURL(file)}
                            />
                            <Button 
                                onClick={handleSubmit} 
                                isLoading={loading} 
                                iconBefore={MusicIcon} 
                                appearance="primary" 
                                marginTop={16}
                            >
                                Generate music!
                            </Button>
                        </Pane> 
                        
                    )
                }}
                values={files}
            />
        </Pane>
    )
}