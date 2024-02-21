// components/TextInputField.js
import TextField from '@mui/material/TextField';

const TextInputField = ({ id, label, type = "text", value, onChange }) => (
    <TextField
        required
        fullWidth
        id={id}
        label={label}
        name={id}
        type={type}
        autoComplete={id}
        value={value}
        onChange={onChange}
    />
);
export default TextInputField;
