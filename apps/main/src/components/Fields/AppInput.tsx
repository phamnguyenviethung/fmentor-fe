import { TextField } from '@mui/material';
import React from 'react';
import { useFormContext } from 'react-hook-form';

interface AppInputProps {
  placeholder: string;
  name: string;
  label: string;
  type: 'text' | 'email' | 'password';
  required?: boolean;
}

const AppInput: React.FC<AppInputProps> = (props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <TextField
      type={props.type ?? 'text'}
      label={props.label}
      error={!!errors[props.name]}
      helperText={errors[props.name]?.message?.toString()}
      required={props.required}
      placeholder={props.placeholder}
      id={props.name}
      {...register(props.name)}
    />
  );
};

export default AppInput;
