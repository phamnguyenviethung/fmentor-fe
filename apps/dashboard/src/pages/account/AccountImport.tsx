import { Button, MenuItem, Stack, TextField } from '@mui/material';
import React from 'react';
import Dropzone, { FileWithPath } from 'react-dropzone';
import { axiosClient, Role } from '@libs';
const AccountImport = () => {
  const [file, setFile] = React.useState<FileWithPath | null>(null);
  const [role, setRole] = React.useState<Role | null>(Role.STUDENT);
  const handelImport = async () => {
    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append('formFile', file);
    await axiosClient.post(`/accounts/import-accounts/role/${role}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };

  return (
    <Stack spacing={2}>
      <TextField select onChange={(e) => setRole(e.target.value)} value={role}>
        {Object.keys(Role).map((k) => {
          const key = k as keyof typeof Role;
          return (
            <MenuItem key={key} value={Role[key]}>
              {key}
            </MenuItem>
          );
        })}
      </TextField>
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
    </Stack>
  );
};

export default AccountImport;
