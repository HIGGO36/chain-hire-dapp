// components/AlertMessage.js
import Alert from '@mui/material/Alert';

const AlertMessage = ({ info }) => {
    if (!info.message) return null;
    return <Alert severity={info.severity} sx={{ width: '100%', mt: 3 }}>{info.message}</Alert>;
};
export default AlertMessage;
