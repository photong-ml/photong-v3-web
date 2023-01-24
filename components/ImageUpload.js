import {Button, FileCard, FileUploader, MusicIcon, Pane} from 'evergreen-ui';
import React from 'react';

export default function ImageUpload(
    {marginTop, files, setFiles, generateAudio}) {
  const [fileRejections, setFileRejections] = React.useState([]);
  const handleChange = React.useCallback((fs) => setFiles(fs), []);
  const handleRejected =
      React.useCallback((fr) => setFileRejections([ fr[0] ]), []);
  const handleRemove = React.useCallback(() => {
    setFiles([]);
    setFileRejections([]);
  }, []);

    const handleRender = React.useCallback(
        (file) => {
    let {name, size, type} = file;
    if (name.length > 20)
      name = `${name.slice(0, 20)}...${name.slice(-4)}`;
    const fileRejection = fileRejections.find((fr) => fr.file === file);
    const {message} = fileRejection || {};
            return (
                <Pane>
                    <FileCard
  key = {name} isInvalid = {!!fileRejection} name = {name} onRemove =
      {handleRemove} sizeInBytes = {size} type = {type} validationMessage =
          {message} src =
  {
    URL.createObjectURL(file)
  } />
                    <Button onClick={generateAudio} iconBefore={MusicIcon} appearance="primary" marginTop={16}>
                        Generate music!
                    </Button >
      </Pane>
            );
        },
        [fileRejections, files],
    );

    return (
        <Pane width="100%" marginTop={marginTop}>
            <FileUploader
                label="Upload Image"
                description="The image will be used to generate a soundtrack. Image can be up to 8MB."
                maxSizeInBytes={8 * 1024 ** 2}
                maxFiles={1}
                onChange={handleChange}
                onRejected={handleRejected}
                acceptedMimeTypes={['image/png', 'image/jpeg', 'image/webp']}
                renderFile={handleRender}
                values={files}
            /><
      /Pane>
    );
}
