import React from 'react';
import { Pane, FileUploader, FileCard, } from 'evergreen-ui';

export default function ImageUpload( {marginTop, } ) {
    const [files, setFiles] = React.useState([])
    const [fileRejections, setFileRejections] = React.useState([])
    const handleChange = React.useCallback((files) => setFiles([files[0]]), [])
    const handleRejected = React.useCallback((fileRejections) => setFileRejections([fileRejections[0]]), [])
    const handleRemove = React.useCallback(() => {
        setFiles([])
        setFileRejections([])
    }, [])
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
                        <FileCard
                            key={name}
                            isInvalid={fileRejection != null}
                            name={name}
                            onRemove={handleRemove}
                            sizeInBytes={size}
                            type={type}
                            validationMessage={message}
                        />
                    )
                }}
                values={files}
            />
        </Pane>
    )
}