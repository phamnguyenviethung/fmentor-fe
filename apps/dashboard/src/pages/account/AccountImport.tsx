import { Button } from '@mui/material';
import React from 'react';
import Dropzone, { FileWithPath } from 'react-dropzone';
import { useCustomMutation } from '@refinedev/core';
import { axiosClient } from '@libs';
const AccountImport = () => {
  const { mutate } = useCustomMutation();
  const [file, setFile] = React.useState<FileWithPath | null>(null);

  const handelImport = async () => {
    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append('formFile', file);
    await axiosClient.post('/accounts/import-accounts/role/2', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };

  return (
    <div>
      <Dropzone
        onDrop={(acceptedFiles) => console.log(acceptedFiles)}
        accept={{
          'text/csv': [],
        }}
        maxFiles={1}
        onDropAccepted={(f) => setFile(f[0])}
      >
        {({ getRootProps, getInputProps, acceptedFiles }) => (
          <div>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <p>Drag 'n' drop some files here, or click to select files</p>
            </div>

            <div>
              {acceptedFiles.map((file) => {
                return <div key={file.name}>{file.name}</div>;
              })}
            </div>

            <Button onClick={handelImport} disabled={!file}>
              Upload
            </Button>
          </div>
        )}
      </Dropzone>
    </div>
  );
};

export default AccountImport;
