/* eslint-disable react/prop-types */
import TextField from '@mui/material/TextField';

const CustomTextField = ({
  label,
  value,
  onChange,
  variant = 'outlined',
  fullWidth = true,
  margin = 'normal',
  ...props
}) => {
  return (
    <TextField
      label={label}
      variant={variant}
      value={value}
      onChange={onChange}
      fullWidth={fullWidth}
      margin={margin}
      autoComplete='off'
      {...props}
    />
  );
};

export default CustomTextField;
